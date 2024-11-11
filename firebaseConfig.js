import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
  });
}

export const db = firestore();
