import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const BooksList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Book Detail', { bookId: item.id })}
            style={styles.bookItem}
          >
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  bookItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});



export default BooksList;
