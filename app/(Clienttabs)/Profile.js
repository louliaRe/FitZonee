import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper';
import { useAuth } from '../AuthContext'
import { useRouter } from 'expo-router'; // For routing
import { getProfile } from '../API/ClientAPI'; // Assuming you have a profile API
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import MainView from '../../components/MainView';

const UserProfile = () => {
  const { authState, logout } = useAuth();
  const { username } = authState;
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null); // Store user data

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

  if (!userProfile) {
    return <Text>Loading...</Text>; // Display loading state until the data is fetched
  }

  const handleOrders = () => {
    router.push('/OrdersScreen');
  };

  // const { first_name, last_name, age, height, current_weight, gender, points, wallet } = userProfile.user;

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

        {/* Logout Button */}
        <Button style={styles.btn} onPress={logout}>Logout</Button>
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
    color: "#fff",
    marginTop: 20,
  },
});

export default UserProfile;
