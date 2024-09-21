import React, { useState,useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Avatar, Title, Paragraph, Button,IconButton  } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';
import MainView from '../components/MainView';
import { getTraineeDetails } from './API/CoachAPI';

const TraineesProfile = () => {
  const { client: client } = useLocalSearchParams();
  trainee = JSON.parse(client);
  ws= useRef()

  // const [trai, setTrai]= useState(client)
  const router= useRouter();
  const {authState}=useAuth();
  console.log("clienttt in trainee:", trainee);
  console.log("client_id in trainee:", trainee.client_id);
  const[currentTrainee,setCurrentTrainee]= useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getTraineeDetails(trainee.client_id, authState.accessToken);
        console.log("res of trainee's details", details);
        setCurrentTrainee(details)
      } catch (e) {
        console.log("err of trainee details", e);
        alert("error", e); 
      }
    };
  
    fetchDetails(); 
  }, []);

  if (!currentTrainee) {
    return <Text>Loading...</Text>;  
  }

  //  data  available before trying to access 
  const { client_details } = currentTrainee;
  const goalInfo = client_details.current_goal[0]; 
  const { BMI, fat_percentage } = client_details.body_data;


  const handleCreatTrainingPlan=()=>{
   router.push("/CreateTrainingPlan");
  }
  const handleChatPress = () => {
    router.push({
      pathname: '/ChatScreen',
      params: {
        isNewChat: true,
        user_id: currentTrainee.client_details.user_id 
      },
    });
  };

  const handleNu=()=>{
    router.push("/CreateNutritionPlan");
  }
  const handleShowNutrition=(ClientId)=>{
    router.push(`/ShowNutritionPlan?clientId=${ClientId}`);
  }
  const handleShowTraining=(ClientId)=>{
    router.push(`/DisplayTrainingPlan?clientId=${ClientId}`);
  }

  if (!trainee) {
    return (
      <MainView>
        <View style={styles.container}>
          <Text>No client data available</Text>
        </View>
      </MainView>
    );
  } else {

    return (
      <MainView>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
          <Avatar.Icon  style={styles.pic} size={80} icon="account" />
            <View style={styles.userInfo}>
             <Text style={styles.name}>{client_details.username}</Text> 
              <IconButton
              icon="chat"
              size={30}
              onPress={handleChatPress}
              color="#a1E533"
              style={styles.chatIcon}  
            />
            </View>
            
          </View>

          <Card style={styles.card}>
            <Card.Content>
            <Title style={styles.title}>Client Information</Title>
            <Paragraph style={styles.details}>Age: {client_details.age}</Paragraph>
            <Paragraph style={styles.details}>Gender: {client_details.gender}</Paragraph>
            <Paragraph style={styles.details}>Height: {client_details.height} cm</Paragraph>
            <Paragraph style={styles.details}>Current Weight: {client_details.current_weight} kg</Paragraph>
            <Paragraph style={styles.details}>Goal: {goalInfo.goal}</Paragraph>
            <Paragraph style={styles.details}>Goal Weight: {goalInfo.goal_weight} kg</Paragraph>
            <Paragraph style={styles.details}>Activity Level: {goalInfo.activity_level}</Paragraph>
            <Paragraph style={styles.details}>BMI: {BMI}</Paragraph>
            <Paragraph style={styles.details}>Fat Percentage: {fat_percentage}%</Paragraph>
   
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button mode="contained" style={styles.button} onPress={() => handleCreatTrainingPlan()}>
              Create Training Plan
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => handleShowTraining(client.id)}>
              Show Training Plan
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" style={styles.button} onPress={() => handleNu()}>
              Create Nutrition Plan
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => handleShowNutrition(client.id)}>
              Show Nutrition Plan
            </Button>
          </View>
        </ScrollView>
      </MainView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pic: {
    backgroundColor: '#2C2C2C',
  },
  userInfo: {
    flex: 1,              // Ensures the userInfo section takes up available space
    flexDirection: 'row', // Arranges the name and chat icon in a row
    alignItems: 'center', // Vertically aligns items
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a1E533',
    flex: 1,    
    marginLeft:5,          // Ensures the name takes up available space
  },
  chatIcon: {
    marginLeft: 5,       // Adds some space between the name and the chat icon
    
    backgroundColor: '#a1E533', 
    color: '#a1E533',
  },

  details: {
    fontSize: 16,
    color: '#fff',
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#2C2C2C',
  },
  title: {
    color: '#a1E533',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#a1E533',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default TraineesProfile;
