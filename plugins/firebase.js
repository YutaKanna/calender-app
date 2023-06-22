import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC71pc-gJ8gde5dw-OkdTXc71CQy31nEU0",
  authDomain: "calender-app-26366.firebaseapp.com",
  projectId: "calender-app-26366",
  storageBucket: "calender-app-26366.appspot.com",
  messagingSenderId: "1084160299759",
  appId: "1:1084160299759:web:e0ba6e46a1f57006d9011a"
};

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export { firestore }
