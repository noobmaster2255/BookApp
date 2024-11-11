import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksListScreen from './screens/BooksListScreen';
import BookDetailScreen from './screens/BookDetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={BooksListScreen} options={{ title: 'Books' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Book Details' }} />
    </Stack.Navigator>
  );
}
