import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const borrowedSnapshot = await getDocs(collection(db, 'borrowed'));
      const borrowedData = borrowedSnapshot.docs.map(doc => doc.data());
      setBorrowedBooks(borrowedData);
    };

    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      const borrowedDoc = collection(db, 'borrowed');
      const docSnapshot = await getDocs(borrowedDoc);
      const docToDelete = docSnapshot.docs.find(doc => doc.data().bookId === bookId);
      if (docToDelete) {
        await deleteDoc(docToDelete.ref);
        setBorrowedBooks(borrowedBooks.filter(book => book.bookId !== bookId));
        Alert.alert('Success', 'You have returned the book!');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not return the book.');
    }
  };

  return (
    <View>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <View>
            <Text>{item.bookName} by {item.author}</Text>
            <Button title="Return" onPress={() => handleReturn(item.bookId)} />
          </View>
        )}
      />
    </View>
  );
};

export default Borrowed;
