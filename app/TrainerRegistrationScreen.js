import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal,TouchableOpacity  } from 'react-native';
import { Card,Button } from 'react-native-paper';
import { currentStatus } from './API/ClientAPI';
import { useAuth } from './AuthContext';
import MainView from '../components/MainView';
import RatingComponent from '../components/RatingComponent';
import { rate } from './API/ClientAPI';


const TrainerRegistrationScreen = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rateTarget, setRateTarget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await currentStatus(authState.accessToken);
        console.log('response of status', response);
        setStatusData(response);
        setLoading(false);
      } catch (e) {
        console.log('Error in getting trainer status', e);
        alert('Error in getting trainer status', e);
        setLoading(false);
      }
    };

    fetchData();
  }, [authState.accessToken]);

  if (loading) {
    return <ActivityIndicator size="large" color="#a1E533" />;
  }

  const handleRatingSubmit = async (rating) => {
    console.log("ra",rating);
    const payload = {
      value: rating,
      gym: statusData.gym[0].branch, // Gym branch ID for both cases
      trainer: rateTarget === 'trainer' ? statusData.trainer.trainer : null, // Include trainer ID if rating the trainer
      is_app_rate: false,
    };
   console.log('the payload', payload);
    try {
      await rate(authState.accessToken, payload);
      alert('Rating submitted successfully!');
      setShowRatingModal(false); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating', error);
    }
  };
  return (
    <MainView>
    <View style={styles.container}>
      {statusData?.gym?.length > 0 && (
    <TouchableOpacity onPress={() => { setShowRatingModal(true); setRateTarget('gym'); }}>

        <Card style={styles.card}>
         
            <Text style={styles.title}>The gym that you are in now</Text>
          <Card.Content>
            <Text style={styles.text}> {statusData.gym[0].gym_name}</Text>
            <Text style={styles.text}>Branch: {statusData.gym[0].branch_address}</Text>
            <Text style={styles.text}>
              Subscription Type: {statusData.gym[0].registration_type === 1 ? 'Daily' : 'monthly'}
            </Text>
            <Text style={styles.text}>
              Start Date: {new Date(statusData.gym[0].start_date).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>
              End Date: {new Date(statusData.gym[0].end_date).toLocaleDateString()}
            </Text>
          </Card.Content>
        </Card>
        </TouchableOpacity>
      )}

      {statusData?.trainer && (
      <TouchableOpacity onPress={() => { setShowRatingModal(true); setRateTarget('trainer'); }}>

        <Card style={styles.card}>
           <Text style={styles.title}>Your trainer</Text>
          <Card.Content>
            <Text style={styles.text}>Trainer Username: {statusData.trainer.trainer_username}</Text>
            <Text style={styles.text}>
              Registration Type: {statusData.trainer.registration_type}
            </Text>
            <Text style={styles.text}>
              Start Date: {new Date(statusData.trainer.start_date).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>
              End Date: {new Date(statusData.trainer.end_date).toLocaleDateString()}
            </Text>
          </Card.Content>
        </Card>
        </TouchableOpacity>
      )}

      {!statusData?.gym?.length && !statusData?.trainer && (
        <Text>No gym or trainer subscription found.</Text>
      )}
       <Modal visible={showRatingModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <RatingComponent onSubmit={handleRatingSubmit} />
            <Button onPress={() => setShowRatingModal(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    
    </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor:'#2c2c2c'

  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color:'#a1E533'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add some opacity to the background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TrainerRegistrationScreen;
