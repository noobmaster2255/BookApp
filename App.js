// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BooksList from './screens/BooksList';
import BookDetail from './screens/BookDetail';
import Borrowed from './screens/Borrowed';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Books List" component={BooksList} />
      <Stack.Screen name="Book Detail" component={BookDetail} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIcon: ({ color, size }) => (
            // Default icon if you don't provide one per tab
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Borrowed" 
          component={Borrowed} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="book" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

export default App;
