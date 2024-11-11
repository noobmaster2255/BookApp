import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const BooksList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data using onSnapshot (real-time updates)
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Book Detail', { bookId: item.id })}
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BooksList;
