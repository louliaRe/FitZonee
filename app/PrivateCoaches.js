import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';

const PrivateCoaches = () => {
  const router= useRouter();
  const coaches = [
    { id: 1, name: 'Coach A', specialization: 'Strength Training', imageUrl: 'https://via.placeholder.com/150', onlineTrainingPrice:10,privateTrainingPrice:30 },
    { id: 2, name: 'Coach B', specialization: 'Cardio', imageUrl: 'https://via.placeholder.com/150', onlineTrainingPrice:10,privateTrainingPrice:30 },
    { id: 3, name: 'Coach C', specialization: 'Zumba', imageUrl: 'https://via.placeholder.com/150', onlineTrainingPrice:10,privateTrainingPrice:30 },
    { id: 4, name: 'Coach D', specialization: 'Yoga', imageUrl: 'https://via.placeholder.com/150' , onlineTrainingPrice:10,privateTrainingPrice:30},
  ];


  const handlePress = (coach) => {
    console.log(`Pressed coach: ${coach.name}`);
    router.push({pathname:'/CoachesDetails',
                params: {coach:JSON.stringify(coach) }});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Coaches</Text>
      <View style={styles.carouselWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {coaches.map((coach) => (
            <TouchableOpacity key={coach.id} onPress={() => handlePress(coach)}>
            <View key={coach.id} style={styles.coachCard} >
              <Avatar.Icon style={styles.pic} size={80} icon="account" />
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachSpecialization}>{coach.specialization}</Text>
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 80,
    color:'#a1E533'
  },
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    paddingHorizontal: 10,
  },
  coachCard: {
    width: 150,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    alignItems: 'center',
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  coachSpecialization: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
    pic:{
      backgroundColor:'#2C2C2C',
      color:'#a1E533'
     },  
});

export default PrivateCoaches;