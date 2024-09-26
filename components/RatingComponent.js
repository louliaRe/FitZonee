import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For star icons
import { Button } from 'react-native-paper';

const Star = ({ filled, onPress, size }) => {
  const scaleValue = new Animated.Value(1);

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    animateScale();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <MaterialCommunityIcons
          name={filled ? 'star' : 'star-outline'}
          size={size || 30}
          color={filled ? '#a1E533' : '#B0B0B0'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const RatingComponent = ({ maxRating = 5, size, onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    console.log("rating", rate)
    setRating(rate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Give us your feedback!</Text>
      <View style={styles.starContainer}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            filled={index < rating}
            onPress={() => handleRating(index + 1)}
            size={size}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>Your rating: {rating} / {maxRating}</Text>
      <Button
        textColor='#2c2c2c'
        style={styles.submitButton}
        onPress={() => onSubmit(rating)} // Call the onSubmit handler with the selected rating
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#a1E553',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,   
  },
  ratingText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  submitButton:{
    backgroundColor: '#a1E553',
     marginTop: 10,
     marginBottom: 5,
     color:'#2c2c2c'
  }
});

export default RatingComponent;
