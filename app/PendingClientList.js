import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import RequestClientCard from '../components/RequestClientCard'; 
import { getPendingTrainees, approveTrainee } from './API/CoachAPI'; 
import { useAuth } from './AuthContext';
import { all } from 'axios';

const PendingClientList = () => {
  const { authState } = useAuth();
  const [clients, setClients] = useState([]);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch pending clients when the component mounts
    const fetchPendingClients = async () => {
      try {
        const data = await getPendingTrainees(authState.accessToken);
        console.log("trainees pinned in :",data);
        setClients(data);
      } catch (error) {
        setErrorMessage('Failed to fetch pending clients.');
        setVisible(true);
      }
    };

    fetchPendingClients();
  }, []);

  const handleAccept = async (clientId) => {
    try {
      const data = { registration_status: 'accepted', rejection_reason: null };
      const res=

      await approveTrainee(clientId, authState.accessToken, data);
      console.log("Accepted", res);
      setClients(clients.filter(client => client.Trainer_registration_id !== clientId));
    } catch (error) {
      setErrorMessage('Failed to accept client.', error);
      setVisible(true);
    }
  };

  const handleReject = async (clientId) => {
    try {
      const data = { registration_status: 'rejected', rejection_reason: null };
      const res= await approveTrainee(clientId, authState.accessToken, data);
      console.log("rej", res);
      alert("Accepted successfully:",res);

      setClients(clients.filter(client => client.Trainer_registration_id !== clientId));
    } catch (error) {
      setErrorMessage('Failed to reject client.', error);
      alert('Failed to reject client', error);
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Clients</Text>
      <ScrollView>
        {clients.map(client => (
          <RequestClientCard
            key={client.id}
            client={client}
            onAccept={() => handleAccept(client.Trainer_registration_id)}
            onReject={() => handleReject(client.Trainer_registration_id)}
          />
        ))}
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
          color: '#fff',
        }}
      >
        <Text style={{ color: '#fff' }}>{errorMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});

export default PendingClientList;
