import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../app/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTraineeDetails } from '../app/API/CoachAPI';

const ClientCard = ({ onPress, client }) => {
   const {authState}= useAuth();
  //  const { client: client}= useLocalSearchParams();
   const [trainer, setTrainer]= useState({client})
 
   console.log("cl inside card", client)
   console.log("tr inside card", trainer)

   console.log("trainer inside card id", trainer.client.client_id)



  //  useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const details = await getTraineeDetails(trainer.client.client_id, authState.accessToken);
  //       console.log("res of trainee's details", details);
  //     } catch (e) {
  //       console.log("err of trainee details", e);
  //       alert("error", e); 
  //     }
  //   };
  
  //   fetchDetails(); 
  // }, []);


  return (
    <TouchableOpacity onPress={() => onPress(client)} style={styles.card}>
      <FontAwesome name="user" size={40} color="#a1E533" style={styles.image}/>  
      <View style={styles.info}>
        <Text style={styles.name}>{client.username}</Text>
        <Text style={styles.age}> trainee's num {client.cliend_id} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2C',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  age: {
    fontSize: 14,
    color: '#b4b6d6',
  },
});

export default ClientCard;
