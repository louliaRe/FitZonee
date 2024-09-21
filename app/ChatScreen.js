import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Avatar } from 'react-native-paper';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image , ActivityIndicator} from 'react-native';
import MediaPicker from '../components/MediaPicker';
import { useAuth } from './AuthContext';
import { useLocalSearchParams } from 'expo-router'; // Assuming you're using expo-router
import { getMessages } from './API/ClientAPI';
import MainView from '../components/MainView';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wsReady, setWsReady] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const ws = useRef(null);

  const { authState } = useAuth();
  const { chatroom_id, isNewChat, user_id } = useLocalSearchParams(); // Get chatroom_id and isNewChat from URL params
  const parsedIsNewChat = isNewChat === 'true';

if(chatroom_id){
  console.log('chatroom_id', chatroom_id);
}
  


  const socketUrl = useMemo(() => {
    return isNewChat === 'true' //if  'true'
      ? `ws://192.168.43.228:8000/websocket/new/${user_id}/`
      : `ws://192.168.43.228:8000/websocket/old/${chatroom_id}/`; // Old chat URL
  }, [isNewChat, authState.user_id, chatroom_id]);

  useEffect(() => {
    if (!socketUrl) return;

    ws.current = new WebSocket(socketUrl, [], {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    });

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      console.log('WebSocket state:', ws.current.readyState);
      setWsReady(true);
        };

    ws.current.onmessage = (event) => {
      console.log('WebSocket message', event);
      try {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        if (message.type === 'new_message') {
          const newMessage = {
            message: message.message,
            sender: authState.user_id,
            timestamp: new Date(), // Use current time for new messages
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
        if (message.type === 'message_seen') {
          console.log(`Message seen: ${message.message}`);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket connection closed.');
        
      }
    };
  }, [socketUrl]);
   
  console.log('ws ready',wsReady );
  useEffect(() => {
    if (chatroom_id !=undefined  && wsReady) {
      console.log("ddddd")

      setLoading(true);
      const fetchConvo = async () => {
        try {
          const res = await getMessages(authState.accessToken, chatroom_id);

          console.log("convo ",res);
          // Map the API response to the format expected by the chat
          const formattedMessages = res.map((msg) => {
          
            
  
            return {
              message: msg.message,
              sender:  msg.user === authState.user_id,
              timestamp: new Date(`${msg.date}T${msg.time}`), // Combine date and time
              isSeen: msg.is_seen,
            };
          });
          setMessages(formattedMessages);
          setLoading(false);
        } catch (e) {
          console.log('Error fetching messages', e);
        }
      };
  
        fetchConvo();
   
    }
  }, [authState.accessToken, chatroom_id, wsReady]);

 console.log("messages", messages);

  const sendMessage = () => {
    console.log('Send role', authState.role);
    if (inputText.trim() !== '' || selectedMedia) {
      const newMessage = {
        type: 'new_message',
        message: inputText,
        // media: selectedMedia,
        sender: true,
      };

            // Add to  chat & send via WebSocket
            console.log('send message', JSON.stringify(newMessage));
            ws.current.send(JSON.stringify({ 
              type: 'new_message', 
              message: inputText, 
              sender: authState.user_id // Send authState.user_id to the server
            }));
        
            // Append the new message to the state
            setMessages((prevMessages) => [...prevMessages, newMessage]);


      setInputText('');
      setSelectedMedia(null);
    }
  };

  const markMessageAsSeen = (message) => {
    const seenMessage = {
      type: 'message_seen',
      message: message.text,
    };
    ws.current.send(JSON.stringify(seenMessage));
    
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
  };

  const renderItem = ({ item }) => {
    const isCurrentUser =
     item.sender

    if (!isCurrentUser) {
      // Mark message as seen outside of useEffect
      markMessageAsSeen(item);
    }

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#8ee53f" />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.rightMessageRow : styles.leftMessageRow,
        ]}
      >
        {!isCurrentUser && <Avatar.Icon style={styles.image} size={40} icon="account" />}
        <View
          style={[
            styles.messageContainer,
            isCurrentUser ? styles.rightMessage : styles.leftMessage,
          ]}
        >
          {item.message ? <Text style={styles.messageText}>{item.message}</Text> : null}
          {item.media ? <Image source={{ uri: item.media.uri }} style={styles.media} /> : null}
          <Text style={styles.timestamp}>{formatTime(new Date(item.timestamp))}</Text>
          
        </View>
        {isCurrentUser && <Avatar.Icon style={styles.image} size={40} icon="account" />}
      </View>
    );
  };

  return (
    <MainView>
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Use index as a fallback key
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        {selectedMedia && <Image source={{ uri: selectedMedia.uri }} style={styles.previewMedia} />}
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <MediaPicker onPickMedia={(media) => setSelectedMedia(media)} />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    </MainView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    backgroundColor:'#665'
  },
  messagesList: {
    padding: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  leftMessageRow: {
    justifyContent: 'flex-start',
    marginLeft: 10,

  },
  rightMessageRow: {
    justifyContent: 'flex-end',
    marginRight: 10,

  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  leftMessage: {
    backgroundColor: '#9BA1A6',
    marginLeft: 10,
  },
  rightMessage: {
    backgroundColor: '#a1E533',
    marginRight: 10,
  },
  messageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#2c2c2c',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
    backgroundColor: '#666',
  },
  media: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    backgroundColor: '#2C2C2C',
  },
  textInput: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 10,
    backgroundColor: '#444',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#a1E533',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
