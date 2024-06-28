import { Tabs } from 'expo-router';
import React from 'react';
import {TabBarIcon} from '../../components/navigation/TabBarIcon';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import MainView from '../../components/MainView';

export default function TabLayout() {
  const colorScheme = useColorScheme();


  
  return (
    <MainView>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="Services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'storefront':'storefront-outline'} color={color} />
          ),
        }}
      />
         <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person':'person-outline'} color={color} />
          ),
        }}
      />
          <Tabs.Screen
        name="Community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper':'newspaper-outline'} color={color} />
          ),
        }}
      />
  
    </Tabs>
    </MainView>
  );
}
