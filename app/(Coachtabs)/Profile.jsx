import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView , ActivityIndicator} from 'react-native';
import { Card, Avatar, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainView from '../../components/MainView';
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';
import { getprofile } from '../API/CoachAPI';

const UserProfile = () => {
  const [loading, setLoading]= useState(false)
  const router = useRouter();
  const { authState, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const { username } = authState;

  useEffect(() => {
    setLoading(true);

    const fetchProfile = async () => {
      try {
        const res = await getprofile(authState.accessToken);
        setProfileData(res.profile_data);
        setLoading(false)
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, [authState.accessToken]);

  const handleChat = () => {
    router.push('/ChatRoomsScreen');
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8ee53f" />
      </View>
    );
  }

  const handleGroups=()=>{
    router.push('/GroupsOfCoachScreen');
  }
  return (
    <MainView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
        <Avatar.Icon style={styles.pic} size={80} icon="account" />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{profileData?.employee?.user?.username}</Text>
            <View style={styles.infoItem}>
              <Icon name="fitness-center" size={20} color="#a1E533" />
              <Text style={styles.details}>Trainer</Text>
            </View>
            {/* Display Private and Online Training Prices */}
            <View style={styles.infoItem}>
              <Text style={styles.details}>Private Training Price: {profileData?.private_training_price} $</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.details}>Online Training Price: {profileData?.online_training_price} $</Text>
            </View>
          </View>
        </View>
      

        <Card style={styles.card} onPress={handleGroups}>
          <Card.Content>
          <View style={styles.infoItem}>
              <Icon name="people" size={20} color="#a1E533" />
            <Title style={styles.title}>Groups</Title>
            </View>
       

          </Card.Content>
        </Card>

        <Card style={styles.card}>
  <Card.Content>
    <View style={styles.chatContainer}>
      <Icon name="chat" size={20} color="#a1E533" />
      <Text style={styles.chat} onPress={handleChat}>
        Chats
      </Text>
    </View>
  </Card.Content>
</Card>


        <Button style={styles.btn} mode='contained' textColor='#000' onPress={logout}>
          Logout
        </Button>
      </ScrollView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2d2d2d'
  },
  pic: {
    backgroundColor: '#2C2C2C',
  },
  userInfo: {
    marginLeft: 10,
    marginTop: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a1E533',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  chat:{
    fontSize: 20,
    color:'#fff',
    marginLeft: 10
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#2C2C2C',
  },
  chatContainer: {
    flexDirection: 'row',  // Ensures horizontal alignment
    alignItems: 'center',  // Vertically aligns the icon and text
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },
  group: {
    marginTop: 10,
  },
 
  btn: {
    backgroundColor: '#a1E533',
    color: '#fff',
  },
  course: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
