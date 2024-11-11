import React, { useEffect, useState } from 'react';
import { FlatList, Text, Button, View } from 'react-native';
import { db } from '../firebaseConfig';

export default function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const snapshot = await db.collection('borrowed').get();
      setBorrowedBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (id) => {
    await db.collection('borrowed').doc(id).delete();
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== id));
  };

  return (
    <FlatList
      data={borrowedBooks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.author}</Text>
          <Button title="Return" onPress={() => handleReturn(item.id)} />
        </View>
      )}
    />
  );
}
