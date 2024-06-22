import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

interface ServicesCardProps {
  ServiceName: string;
  Image: any; // 'any' can be changed to the correct type local or uri
}

const ServicesCard: React.FC<ServicesCardProps> = ({ ServiceName, Image }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={Image} style={styles.cardImage} />
      
        <Text style={styles.text}>{ServiceName}</Text>
     
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 5,
    elevation: 6,
    
  }, cardImage: {
    width: '100%', // Make the image fill the container
    height: 180, // Set a fixed height; adjust as needed
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute', // Position the text absolutely
    bottom: 0, // Distance from the bottom
    left: 0, // Distance from the left
    right: 0, // Distance from the right
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with some transparency
    padding: 10, // Add some space around the text
    color: '#FFF', // White text color
    textAlign: 'left', // Center the text
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
});

export default ServicesCard;
