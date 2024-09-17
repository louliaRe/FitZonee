import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OfferCard = ({ offer, onOfferClick }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onOfferClick(offer.offer_id)}>
      <Text style={styles.offerText}><Text style={styles.title}>{offer.name}</Text> </Text>
      {/* <Text style={styles.offerText}>Start Date: {offer.start_date}</Text> */}
      <Text style={styles.offerText}><Text style={styles.end}>Till</Text>  {offer.end_date} <Text style={styles.end}>!!</Text></Text>
      <Text style={styles.price}> ${offer.price}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2c',

    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  offerText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#a1E533',
  },
  price: {
    color: 'red',
  },
  end:{
    color:'#61c9af'

  }
});

export default OfferCard;
