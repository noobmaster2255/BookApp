import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, Image } from "react-native";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = collection(db, "books");
        const docSnapshot = await getDocs(docRef);
        const bookData = docSnapshot.docs.find((doc) => doc.id === bookId);
        setBook(bookData.data());

        const borrowedRef = collection(db, "borrowed");
        const borrowedQuery = query(borrowedRef, where("bookId", "==", bookId));
        const borrowedSnapshot = await getDocs(borrowedQuery);
        if (!borrowedSnapshot.empty) {
          setIsBorrowed(true);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch book details.");
      }
    };

    fetchBook();
  }, [bookId]);

  const handleBorrow = async () => {
    try {
      if (!isBorrowed) {
        await addDoc(collection(db, "borrowed"), {
          bookId,
          bookName: book.name,
          author: book.author,
        });
        setIsBorrowed(true);
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
          <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
          <Text style={styles.title}>{book.name}</Text>
          <Text style={styles.author}>By {book.author}</Text>
          <Text style={styles.summary}>{book.summary}</Text>
          <Button
            title={isBorrowed ? "Book Already Borrowed" : "Borrow"}
            onPress={handleBorrow}
            disabled={isBorrowed}
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
  coverImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
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
    marginBottom: 10,
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
