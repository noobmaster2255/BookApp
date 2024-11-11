import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const borrowedSnapshot = await getDocs(collection(db, "borrowed"));
      const borrowedData = borrowedSnapshot.docs.map((doc) => doc.data());

      const uniqueBooks = [];
      borrowedData.forEach((book) => {
        if (!uniqueBooks.some((b) => b.bookId === book.bookId)) {
          uniqueBooks.push(book);
        }
      });

      setBorrowedBooks(uniqueBooks);
    };

    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      const borrowedDoc = collection(db, "borrowed");
      const docSnapshot = await getDocs(borrowedDoc);
      const docToDelete = docSnapshot.docs.find((doc) => doc.data().bookId === bookId);

      if (docToDelete) {
        await deleteDoc(docToDelete.ref);

        setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));

        Alert.alert("Success", "You have returned the book!");
      }
    } catch (error) {
      Alert.alert("Error", "Could not return the book.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookName}>{item.bookName}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>
            <Button
              title="Return"
              onPress={() => handleReturn(item.bookId)}
              style={styles.button}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  bookContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
  },
});

export default Borrowed;
