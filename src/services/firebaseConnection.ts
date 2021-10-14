
import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
   // Utilizando variaveis de ambiente
   apiKey: process.env.FIREBASE_APIKEY,
   authDomain: "board-240d9.firebaseapp.com",
   projectId: "board-240d9",
   storageBucket: "board-240d9.appspot.com",
   messagingSenderId: "107261487175",
   appId: "1:107261487175:web:1cc38f81cfe49d69d0a962",
   measurementId: "G-PT7SPXY9FP"
};

// Initialize Firebase if dosn't have any connection
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

// exportando o firebase
export default firebase;