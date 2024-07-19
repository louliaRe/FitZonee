import {NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '../hooks/useColorScheme';
import SignUp from './SignUp';
import Login from './Login';
// import store from './store';
import MainView from '../components/MainView';
import { CartProvider } from '../components/Cart';
import CartDetails from './CartDetails';
import Services from './(tabs)/Services';
import Courses from './Courses';
import Profile from './(tabs)/Profile'
import CoachHome from './CoachHome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AuthProvider } from './AuthContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
    <CartProvider>

          <MainView>
          <Stack>
          <Stack.Screen name='Login'/>
         
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* <Stack.Screen name="+not-found" /> */}
              <Stack.Screen name='Services'/>
              <Stack.Screen name='Courses'/>
              <Stack.Screen name='Profile'/>
              <Stack.Screen name='CartDetails'/>
              <Stack.Screen name='CoachHome'/>
              <Stack.Screen name='ClientsList'/>
            
            </Stack>
          
          </MainView>
          </CartProvider>
          </AuthProvider>
    
  );
}
