import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { getCoaches} from './API/ClientAPI';
import { useAuth } from './AuthContext';
import MainView from '../components/MainView';

const PrivateCoaches = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [coaches, setCoaches] = useState([]);

  
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await getCoaches(authState.accessToken, authState.branch_id); 
        console.log('response of get coaches:', response);  
        setCoaches(response); 
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchCoaches();
  }, [authState.accessToken]);

  
  const handlePress = (coach) => {
    console.log(`Pressed coach: ${coach.employee.user.username}`);
    router.push({
      pathname: '/CoachesDetails',
      params: { coach: JSON.stringify(coach) },
    });
  };

  return (
    <MainView>
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Coaches</Text>
      <View style={styles.carouselWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.carousel}>
          {coaches.map((coach) => (
            <TouchableOpacity key={coach.trainer_id} onPress={() => handlePress(coach)}>
              <View style={styles.coachCard}>
                <Avatar.Icon style={styles.pic} size={80} backgroundColor='#a1E533'  icon="account" />
                <Text style={styles.coachName}>{coach.employee.user.username}</Text>
                <Text style={styles.coachAge}><Text style={styles.coachTitle}>Age:</Text> {coach.employee.user.age}</Text>
                <Text style={styles.coachAge}><Text style={styles.coachTitle}>Gender:</Text>  {coach.employee.user.gender? 'Female' : 'Male'}</Text>
                <Text style={styles.coachEmail}><Text style={styles.coachTitle}>Email:</Text>  {coach.employee.user.email}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a1E533',
    marginBottom: 80,
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
    width: 210,
    height:280,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    // alignItems: 'center',
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    alignSelf:'center'
  },
  coachTitle :{
    fontWeight:'bold',
    color:'#d0f297',
    fontSize: 16,
    alignSelf:'flex-start'
  },
  coachAge: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  coachEmail: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 5,
  },
  pic: {
    alignSelf:'center',
  },

});

export default PrivateCoaches;