import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Icons for nutrients
import { useLocalSearchParams } from 'expo-router';
import MainView from '../components/MainView';

const randomImages = [
    require('../assets/images/rec1.jpg'),
    require('../assets/images/rec2.jpg'),
    require('../assets/images/rec3.jpg'),
];

const RecipeDisplay = ({ recipes }) => {
    if (recipes.length === 0) {
      return <Text>No recipes available.</Text>;
    }
      const getRandomImage = () => {
        return randomImages[Math.floor(Math.random() * randomImages.length)];
    };

    const renderRecipe = ({ item: recipe }) => (
        <View style={styles.recipeCard}>
          <Image source={getRandomImage()} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{recipe.name}</Text>
          
          <View style={styles.nutrientRow}>
            <FontAwesome5 name="burn" size={20} color="orange" />
            <Text style={styles.nutrientText}>{recipe.calories} kcal</Text>
          </View>
          
          <View style={styles.nutrientRow}>
            <FontAwesome5 name="drumstick-bite" size={20} color="green" />
            <Text style={styles.nutrientText}>{recipe.protein} g protein</Text>
          </View>
          
          <View style={styles.nutrientRow}>
            <FontAwesome5 name="oil-can" size={20} color="blue" />
            <Text style={styles.nutrientText}>{recipe.fats} g fats</Text>
          </View>
      
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((ingredient, i) => (
              <Text key={i} style={styles.ingredientText}>• {ingredient}</Text>
            ))
          ) : (
            <Text style={styles.ingredientText}>• {recipe.ingredients || "No ingredients listed"}</Text>
          )}
        </View>
      );
      

    return (
        <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}

        />
    );
};

const NutritionResultScreen = () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const { recipe } = useLocalSearchParams();
    console.log("recipes before parse: " + recipe)
  
    useEffect(() => {
        setLoading(true);
      if (recipe) {
        try {
          const parsedRecipes = JSON.parse(recipe);
          console.log("Parsed Recipes:", parsedRecipes);
          setRecipes(parsedRecipes);
        } catch (error) {
          console.error('Error parsing recipe data:', error);
          // You might want to show an error message to the user here
        }
      }
      setLoading(false);
    }, [recipe]);
  
    console.log("recipe", recipes);
  
    return (
        <MainView>
        <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : recipes.length > 0 ? (
          <RecipeDisplay recipes={recipes} />
        ) : (
          <Text style={styles.text}>No recipes found!</Text>
        )}
      </View>
      </MainView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  
  recipeCard: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#a1E533',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeName: {
    shadowColor: '#a1E533',
    color:'#a1E533',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  nutrientText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  ingredientsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    color:'#a1E533',

  },
  ingredientText: {
    fontSize: 14,
    color: '#fff',
  },
 text:{
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: '35%',


     color: '#fff',
  },
});

export default NutritionResultScreen;
