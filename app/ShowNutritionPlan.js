import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const ShowNutritionPlan = () => {
    const { clientId: clientString } = useLocalSearchParams();
  const router = useRouter();

  const nutritionPlan = {
    planName: 'Weight Loss Plan',
    proteinRequired: '150',
    carbsRequired: '200',
    fatsRequired: '50',
    caloriesRequired: '1800',
    weeksNumber: '6',
    notes: 'This plan is focused on gradual weight loss and maintaining muscle mass.',
    mealSchedules: [
      {
        day: 'Monday',
        meals_types: [
          {
            type: 'Breakfast',
            meals: [
              { name: 'Oatmeal', portion_size: '100', portion_unit: 'grams' },
              { name: 'Scrambled Eggs', portion_size: '3', portion_unit: 'eggs' },
            ],
          },
          {
            type: 'Lunch',
            meals: [
              { name: 'Grilled Chicken Salad', portion_size: '200', portion_unit: 'grams' },
              { name: 'Quinoa', portion_size: '150', portion_unit: 'grams' },
            ],
          },
          {
            type: 'Dinner',
            meals: [
              { name: 'Baked Salmon', portion_size: '150', portion_unit: 'grams' },
              { name: 'Steamed Broccoli', portion_size: '100', portion_unit: 'grams' },
            ],
          },
        ],
      },
      {
        day: 'Tusday',
        meals_types: [
          {
            type: 'Breakfast',
            meals: [
              { name: 'Oatmeal', portion_size: '100', portion_unit: 'grams' },
              { name: 'Scrambled Eggs', portion_size: '3', portion_unit: 'eggs' },
            ],
          },
          {
            type: 'Lunch',
            meals: [
              { name: 'Grilled Chicken Salad', portion_size: '200', portion_unit: 'grams' },
              { name: 'Quinoa', portion_size: '150', portion_unit: 'grams' },
            ],
          },
          {
            type: 'Dinner',
            meals: [
              { name: 'Baked Salmon', portion_size: '150', portion_unit: 'grams' },
              { name: 'Steamed Broccoli', portion_size: '100', portion_unit: 'grams' },
            ],
          },
        ],
      },
    ],
  };

  const handleCreatePlan = () => {
    router.push('/CreateNutritionPlan');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{nutritionPlan.planName}</Text>

      <View style={styles.planDetails}>
        <Text style={styles.detailText}>Protein Required: {nutritionPlan.proteinRequired}g</Text>
        <Text style={styles.detailText}>Carbs Required: {nutritionPlan.carbsRequired}g</Text>
        <Text style={styles.detailText}>Fats Required: {nutritionPlan.fatsRequired}g</Text>
        <Text style={styles.detailText}>Calories Required: {nutritionPlan.caloriesRequired}kcal</Text>
        <Text style={styles.detailText}>Number of Weeks: {nutritionPlan.weeksNumber}</Text>
        <Text style={styles.detailText}>Notes: {nutritionPlan.notes}</Text>
      </View>

      {nutritionPlan.mealSchedules.map((schedule, index) => (
        <View key={index} style={styles.scheduleSection}>
          <Text style={styles.scheduleTitle}>Day {index + 1}: {schedule.day}</Text>
          {schedule.meals_types.map((mealType, mealTypeIndex) => (
            <View key={mealTypeIndex} style={styles.mealType}>
              <Text style={styles.mealTypeTitle}>{mealType.type}</Text>
              {mealType.meals.map((meal, mealIndex) => (
                <View key={mealIndex} style={styles.mealDetails}>
                  <Text style={styles.mealDetailText}>Meal: {meal.name}</Text>
                  <Text style={styles.mealDetailText}>Portion Size: {meal.portion_size} {meal.portion_unit}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a1E553',
    marginBottom: 20,
  },
  planDetails: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  scheduleSection: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a1E533',
    marginBottom: 10,
  },
  mealType: {
    marginBottom: 20,
  },
  mealTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  mealDetails: {
    marginLeft: 20,
    marginBottom: 10,
  },
  mealDetailText: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default ShowNutritionPlan;
