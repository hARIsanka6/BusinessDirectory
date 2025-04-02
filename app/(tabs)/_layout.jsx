import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: 'gray' }, // Default color for unselected (gray)
          tabBarActiveTintColor: "black", // Color when selected (black) for text
          tabBarInactiveTintColor: 'gray', // Color when not selected (gray) for text
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? '#7303fc' : 'gray'} // Icon color changes based on focus
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarLabelStyle: { color: 'gray' }, // Default color for unselected (gray)
          tabBarActiveTintColor: "black", // Color when selected (black) for text
          tabBarInactiveTintColor: 'gray', // Color when not selected (gray) for text
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="search"
              size={24}
              color={focused ? '#7303fc' : 'gray'} // Icon color changes based on focus
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: 'gray' }, // Default color for unselected (gray)
          tabBarActiveTintColor: "black", // Color when selected (black) for text
          tabBarInactiveTintColor: 'gray', // Color when not selected (gray) for text
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="people"
              size={24}
              color={focused ? '#7303fc' : 'gray'} // Icon color changes based on focus
            />
          ),
        }}
      />
    </Tabs>
  );
}
