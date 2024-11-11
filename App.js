import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './screens/HomeStack';
import BorrowedScreen from './screens/BorrowedScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Borrowed" component={BorrowedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
