import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView,ActivityIndicator } from 'react-native';
import MainView from '../components/MainView';
import { Button } from 'react-native-paper';
import{ dietDetails} from '../app/API/AIAPI';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';

const SmartNutritionPlan = () => {
    const router = useRouter();

const {authState}= useAuth();
  const [nutritionValues, setNutritionValues] = useState({
    max_Calories: 0,
    max_daily_fat: 0,
    max_daily_Saturatedfat: 0,
    max_daily_Cholesterol: 0,
    max_daily_Sodium: 0,
    max_daily_Carbohydrate: 0,
    max_daily_Fiber: 0,
    max_daily_Sugar: 0,
    max_daily_Protein: 0,
  });
 const[loading, setLoading]= useState(false)
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleChange = (field, value) => {
    const intValue = parseInt(value, 10) || 0;
    setNutritionValues({ ...nutritionValues, [field]: intValue });
  };

  const handleIngredientAdd = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8ee53f" />
      </View>
    );
  }
  const handleSubmit = async () => {
    try{ 
    const payload = {
      max_nutritional_values: nutritionValues,
      ingredient_filter: ingredients,
    };
    console.log('Submitting:', payload);
    // Submit payload to the API
     setLoading(true);
   
    const res = await dietDetails(authState.accessToken,payload );
    console.log("res", res);

    router.push({pathname:'/NutritionResultScreen',
    params: { recipe : JSON.stringify(res.data) }
     });
    setLoading(false);
    }catch(error){
     console.log(error)
     alert("Error: " + error)
    }  
  };

  return (
    <MainView>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Max Nutritional Values</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Max Calories"
          keyboardType="numeric"
          value={nutritionValues.max_Calories}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_Calories', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Fat"
          keyboardType="numeric"
          value={nutritionValues.max_daily_fat}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_fat', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Saturated Fat"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Saturatedfat}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Saturatedfat', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Cholesterol"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Cholesterol}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Cholesterol', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Sodium"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Sodium}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Sodium', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Carbohydrate"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Carbohydrate}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Carbohydrate', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Fiber"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Fiber}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Fiber', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Sugar"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Sugar}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Sugar', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Daily Protein"
          keyboardType="numeric"
          value={nutritionValues.max_daily_Protein}
          placeholderTextColor="#999"
          onChangeText={(value) => handleChange('max_daily_Protein', value)}
        />
  
        <Text style={styles.header}>Ingredient Filter</Text>
        <View style={styles.ingredientContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add ingredient"
            value={ingredient}
            onChangeText={setIngredient}
            placeholderTextColor="#999"

          />
          <Button style={styles.btn} mode='contained' textColor='#2c2c2c' onPress={handleIngredientAdd} >Add</Button>
        </View>
  
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>{item}</Text>
        ))}
  
        <Button style={styles.btn} mode='contained' textColor='#2c2c2c'  onPress={handleSubmit} >Submit</Button>
      </ScrollView>
    </MainView>
  );
        }
  
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,

  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#a1E533',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a1E533',
    color:'#fff',
    backgroundColor:'#2c2c2c',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredient: {
    backgroundColor: '#666',
    color:'#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    fontSize: 16,
  },
  btn:{
    marginBottom:30,
    backgroundColor:'#a1E533',
    borderRadius:5,
    fontSize:16,
  }
});

export default SmartNutritionPlan;
