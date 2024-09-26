import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const NutritionIntro = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/SmartNutritionPlan');
  };

  return (
    <ImageBackground 
      source={ require('../assets/images/pg.png') }
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Welcome to Your Personalized Nutrition Plan!</Text>
        <Text style={styles.description}>
          To help you achieve your goals, we'll need some information about your daily nutritional intake. Based on this, we'll recommend a nutrition plan tailored specifically for you.
        </Text>
        <Text style={styles.description}>
          Simply provide your nutritional limits, and we'll take care of the rest!
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} color="#8ee53f" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    height:'100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default NutritionIntro;
