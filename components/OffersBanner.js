import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const OffersBanner = ({ onClick }) => {
  return (

    <TouchableOpacity style={styles.bannerContainer} onPress={onClick}>
 <FontAwesome5 name="tags" size={20} color="#fff" style={styles.icon} />

    <Text style={styles.bannerText}>OFFERS Section >></Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    bannerContainer: {
        height: 40,
        backgroundColor: '#8ee53f',
        flexDirection: 'row', // Align the icon and text in a row
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      icon: {
        marginRight: 10, // Add space between icon and text
      },
      bannerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
      },
    });
    export default OffersBanner;