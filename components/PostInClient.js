import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import { useAuth } from '../app/AuthContext';
import {getComments} from '../app/API/ClientAPI';

const PostInClient = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [reactionCount, setReactionCount] = useState(post.reaction_count); 
    const [loading, setLoading] = useState(false);
  
    const ws = useRef(null); // WebSocket reference
    const { authState } = useAuth();
    const [wsReady, setWsReady] = useState(false);
  
    const socketUrl = useMemo(() => {
      return `ws://192.168.43.228:8000/community/websocket/`;
    }, []);
  
    useEffect(() => {
      if (!socketUrl) return;
  
      ws.current = new WebSocket(socketUrl, [], {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          },
        });
      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setWsReady(true);
      };
  
      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received', message);

        if (message.type === 'receive_fun' && message.post_id === post.post_id) {
            // Update the reaction count with the total reactions from the server
            setReactionCount(message.total_reactions);
          }
      };
  
      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setWsReady(false);
      };
  
      ws.current.onerror = (error) => {
        console.error('WebSocket error', error);
      };
  
      return () => {
        ws.current.close();
      };
    }, [socketUrl]);
  
    const im = 'http://192.168.43.228:8000/media/';
  
    const handleAddComment = () => {
      if (newComment.trim() && wsReady) {
        const commentPayload = {
          type: 'comment',
          comment: newComment,
          post_id: post.post_id
        };
        ws.current.send(JSON.stringify(commentPayload));
  
        const newCommentObj = {
          pk: comments.length + 1,
          comment: newComment,
          clients: authState.user,
          created_at: new Date().toISOString(),
          reply: [],
          allow_delete: true,
        };
        
        setComments([...comments, newCommentObj]);
        setNewComment('');
      }
    };
      
    const handleLike = () => {
      if (wsReady) {
        const likePayload = {
          type: 'reaction',
          reaction: 'like',
          post_id: post.post_id
        };
        ws.current.send(JSON.stringify(likePayload));
        console.log('Like sent via WebSocket', post.post_id);
      }
    };
  
    const toggleComments = async (post_id) => {
      setShowComments(!showComments);
      if (!showComments) {
        setLoading(true);
        try {
          const response = await getComments(authState.accessToken, post_id);
          setComments(response);
        } catch (e) {
          console.log('Error in get comments', e);
          alert('Error fetching comments');
        } finally {
          setLoading(false);
        }
      }
    };
  
    return (
      <Card style={styles.card}>
        <Card.Title 
          title={post.poster.name}
          titleStyle={styles.publisherName}
          left={(props) => (
            <Avatar.Icon style={styles.icon} size={45} icon="account" />
          )}
        />
        <Card.Content>
          <Text style={styles.time}>{new Date(post.created_at).toLocaleDateString()}</Text>
          {post.content && <Text style={styles.post}>{post.content}</Text>}
          {post.image && post.image.length > 0 && post.image.map((img, index) => (
            <Image key={index} source={{ uri: `${im}${img}` }} style={styles.img} />
          ))}
  
          <View style={styles.reactionRow}>
            <Text style={styles.reactions}>{reactionCount} {reactionCount === 1 ? 'Like' : 'Likes'}</Text>
            <Text style={styles.reactions}>{post.comments_count || 0} {post.comments_count === 1 ? 'Comment' : 'Comments'}</Text>
          </View>
  
          <Card.Actions>
            <Button onPress={handleLike} textColor='#a1E533'>Like</Button>
            <TouchableOpacity onPress={() => toggleComments(post.post_id)}>
              <Text style={styles.commentToggle}>{showComments ? 'Hide Comments' : 'See Comments'}</Text>
            </TouchableOpacity>
          </Card.Actions>
  
          {loading && <ActivityIndicator size="small" color="#a1E533" />}
          
          {showComments && !loading && comments.length > 0 && (
            <View style={styles.commentsContainer}>
              {comments.map((comment) => (
                <View key={comment.pk} style={styles.comment}>
                  <Text style={styles.commentAuthor}>{comment.clients}</Text>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <Text style={styles.commentDate}>{new Date(comment.created_at).toLocaleString()}</Text>
                </View>
              ))}
            </View>
          )}
  
          {showComments && !loading && comments.length === 0 && (
            <Text style={styles.noCommentsText}>No comments yet.</Text>
          )}
  
          {showComments && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#fff"
                value={newComment}
                onChangeText={setNewComment}
              />
              <Button onPress={handleAddComment} textColor='#2c2c2c' mode='contained' style={styles.commentbtn}> Comment</Button>
            </>
          )}
        </Card.Content>
      </Card>
    );
  };
  

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#2C2C2C',
    color: '#a1E533',
  },
  publisherName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    backgroundColor: '#a1E533',
  },
  post: {
    color: '#fff',
    marginTop: 10,
  },
  time: {
    color: '#888',
    marginBottom: 10,
    fontSize: 10,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  reactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reactions: {
    color: '#fff',
  },
  commentToggle: {
    color: '#a1E533',
    marginTop: 10,
  },
  commentsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 10,
  },
  comment: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#a1E533',
  },
  commentText: {
    color: '#fff',
  },
  commentDate: {
    fontSize: 10,
    color: '#999',
  },
  commentbtn: {
    backgroundColor: '#a1E533',
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ccc',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
  noCommentsText: {
    color: '#888',
    marginTop: 10,
  },
});

export default PostInClient;
