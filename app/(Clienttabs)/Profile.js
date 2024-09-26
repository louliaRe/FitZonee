import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper';
import { useAuth } from '../AuthContext'
import { useRouter } from 'expo-router'; 
import { getProfile,currentStatus } from '../API/ClientAPI'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; //  icons
import MainView from '../../components/MainView';
import RatingComponent from '../../components/RatingComponent'; 
import { rate } from '../API/ClientAPI';

const UserProfile = () => {
  const { authState, logout } = useAuth();
  const { username } = authState;
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null); 

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getProfile(authState.accessToken);
        setUserProfile(response);
        console.log("User profile data", response);
      } catch (error) {
        console.log("Error fetching profile data", error);
      }
    };
    fetchInfo();
  }, [authState.accessToken]);

  useEffect(()=>{
    const fetchCoach= async()=>{
      try{
        const response= await currentStatus(authState.accessToken);
        console.log('response of get current', response);
      }catch(error){
        console.log('Error in get current', error);
      }
    }
  })

  if (!userProfile) {
    return(  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#8ee53f" />
  </View>
);
  }

  const handleOrders = () => {
    router.push('/OrdersScreen');
  };

  const handleChat=()=>{
    router.push('/ChatRoomsScreen')
   }

   const handleTrainerRegist=()=>{
    router.push('/TrainerRegistrationScreen');
   }

   const handleRatingSubmit = async (rating) => {
    console.log("ra",rating);
    const payload = {
      value: rating,
      gym: null, // Gym branch ID for both cases
      trainer:  null, // Include trainer ID if rating the trainer
      is_app_rate: true,
    };
   console.log('the payload', payload);
    try {
      await rate(authState.accessToken, payload);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating', error.join(', '));
    }
  };

  return (
    <MainView>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Avatar.Image 
            size={80} 
            source={userProfile.image_path ? { uri: userProfile.image_path } : require('../../assets/images/profile.png')} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userProfile.user.first_name} {userProfile.user.last_name}</Text>
            <View style={styles.row}>
              <Icon name="cake" size={16} color="#a1E533" />
              <Text style={styles.details}>Age: {userProfile.user.age}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="straighten" size={16} color="#a1E533" />
              <Text style={styles.details}>Height: {userProfile.height} cm</Text>
            </View>
            <View style={styles.row}>
              <Icon name="fitness-center" size={16} color="#a1E533" />
              <Text style={styles.details}>Weight: {userProfile.current_weight} kg</Text>
            </View>
            <View style={styles.row}>
              <Icon name={userProfile.user.gender ? "male" : "female"} size={16} color="#a1E533" />
              <Text style={styles.details}>Gender: {userProfile.user.gender ? 'Female' : 'Male'}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.details}>Points: {userProfile.points}</Text>
            </View>
          </View>
        </View>

        {/* Wallet Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Wallet Balance</Title>
            <Paragraph style={styles.walletBalance}>${userProfile.wallet.balance}</Paragraph>
          </Card.Content>
        </Card>

        {/* BMI Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>BMI & Fat Percentage</Title>
            <View style={styles.row}>
              <Icon name="health-and-safety" size={16} color="#a1E533" />
              <Text style={styles.details}>BMI: {userProfile.current_BMI.BMI.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="opacity" size={16} color="#a1E533" />
              <Text style={styles.details}>Fat: {userProfile.current_BMI.fat_percentage.toFixed(2)}%</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Goal Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Current Goal</Title>
            <Paragraph style={styles.details}>Goal: {userProfile.history[0].goal}</Paragraph>
            <Paragraph style={styles.details}>Goal Weight: {userProfile.history[0].goal_weight} kg</Paragraph>
            <Paragraph style={styles.details}>Achieved Weight: {userProfile.history[0].achieved_weight} kg</Paragraph>
            <Paragraph style={styles.details}>Predicted Date: {userProfile.history[0].predicted_date}</Paragraph>
          </Card.Content>
        </Card>

        {/* Orders Button */}
        <Card style={styles.card} onPress={handleOrders}>
          <Card.Content>
            <Text style={styles.ordersText}>View Your Orders</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={handleChat}>
          <Card.Content>
            <Text style={styles.ordersText}>View Your Chats</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={handleTrainerRegist}>
          <Card.Content>
            <Text style={styles.ordersText}>Your trainer registration</Text>
          </Card.Content>
        </Card>
        {/* Rating Section */}
        <Card style={styles.card}>
          <RatingComponent onSubmit={handleRatingSubmit}/>
        </Card>

        {/* Logout Button */}
        <Button style={styles.btn} textColor='#2c2c2c' onPress={logout}>Logout</Button>
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
  avatar: {
    backgroundColor: '#2C2C2C',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2d2d2d'
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#2C2C2C',
  },
  title: {
    color: '#a1E533',
    fontSize: 18,
  },
  walletBalance: {
    color: '#fff',
    fontSize: 16,
  },
  ordersText: {
    color: '#a1E533',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#a1E533',
    marginTop: 20,
    marginBottom:20,
  },
});

export default UserProfile;
