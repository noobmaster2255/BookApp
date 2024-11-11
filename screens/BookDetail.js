import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = collection(db, 'books');
      const docSnapshot = await getDocs(docRef);
      const bookData = docSnapshot.docs.find(doc => doc.id === bookId);
      setBook(bookData.data());
    };

    fetchBook();
  }, [bookId]);

  const handleBorrow = async () => {
    try {
      // You can add book to a borrowed collection or perform other actions
      await addDoc(collection(db, 'borrowed'), {
        bookId,
        bookName: book.name,
        author: book.author,
      });
      Alert.alert('Success', 'You have borrowed this book!');
    } catch (error) {
      Alert.alert('Error', 'Could not borrow the book.');
    }
  };

  return (
    <View>
      {book ? (
        <>
          <Text>{book.name}</Text>
          <Text>{book.author}</Text>
          <Text>{book.summary}</Text>
          <Button title="Borrow" onPress={handleBorrow} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default BookDetail;
