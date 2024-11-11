import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../firebaseConfig';

export default function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await db.collection('books').get();
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBooks();
  }, []);

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
