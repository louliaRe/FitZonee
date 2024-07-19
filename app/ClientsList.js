// screens/ClientsList.js
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import ClientCard from '../components/ClientCard';
import MainView from '../components/MainView';

const ClientsList = () => {
  const clients = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      name: 'Samia Um',
      age: 28,
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      name: 'Jack Ru',
      age: 32,
    },
  ];

  const handleClientPress = (client) => {
    console.log('Client pressed:', client);
  };

  return (
    <MainView>
      <View style={styles.container}>
        <Text style={styles.title}>Trainers</Text>
        <ScrollView>
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} onPress={handleClientPress} />
          ))}
        </ScrollView>
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
});

export default ClientsList;
