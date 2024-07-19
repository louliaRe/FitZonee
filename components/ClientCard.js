// components/ClientCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ClientCard = ({ client, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(client)} style={styles.card}>
      <Image source={{ uri: client.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{client.name}</Text>
        <Text style={styles.age}>{client.age} years old</Text>
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
