import React, { useState } from 'react';
import { Text, Button, View, Alert } from 'react-native';
import { db } from '../firebaseConfig';

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const handleBorrow = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert('Limit Reached', 'You cannot borrow more than three books.');
      return;
    }

    setBorrowedBooks([...borrowedBooks, book]);
    await db.collection('borrowed').add(book);
    Alert.alert('Success', 'Book borrowed successfully!');
  };

  return (
    <View>
      <Text>{book.name}</Text>
      <Text>{book.author}</Text>
      <Text>{book.summary}</Text>
      <Button title="Borrow" onPress={handleBorrow} />
    </View>
  );
}
