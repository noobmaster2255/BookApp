import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false); // State to track if book is borrowed

  useEffect(() => {
    const fetchBook = async () => {
      // Fetch book details from "books" collection
      const docRef = collection(db, "books");
      const docSnapshot = await getDocs(docRef);
      const bookData = docSnapshot.docs.find((doc) => doc.id === bookId);
      setBook(bookData.data());

      // Check if the book is already borrowed
      const borrowedRef = collection(db, "borrowed");
      const borrowedQuery = query(borrowedRef, where("bookId", "==", bookId));
      const borrowedSnapshot = await getDocs(borrowedQuery);
      if (!borrowedSnapshot.empty) {
        setIsBorrowed(true); // Set book as borrowed
      }
    };

    fetchBook();
  }, [bookId]);

  const handleBorrow = async () => {
    try {
      // Add book to the "borrowed" collection if it's not already borrowed
      if (!isBorrowed) {
        await addDoc(collection(db, "borrowed"), {
          bookId,
          bookName: book.name,
          author: book.author,
        });
        setIsBorrowed(true); // Set book as borrowed
        Alert.alert("Success", "You have borrowed this book!");
      } else {
        Alert.alert("Already Borrowed", "You have already borrowed this book.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not borrow the book.");
    }
  };

  return (
    <View style={styles.container}>
      {book ? (
        <>
          <Text style={styles.title}>{book.name}</Text>
          <Text style={styles.author}>By {book.author}</Text>
          <Text style={styles.summary}>{book.summary}</Text>
          <Button
            title={isBorrowed ? "Book Already Borrowed" : "Borrow"}
            onPress={handleBorrow}
            disabled={isBorrowed} // Disable button if book is borrowed
            style={styles.button}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
  },
  summary: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default BookDetail;
