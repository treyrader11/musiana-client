import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// sdk api: https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "musiana-b4007.firebaseapp.com",
  projectId: "musiana-b4007",
  storageBucket: "musiana-b4007.appspot.com",
  messagingSenderId: "572663555535",
  appId: "1:572663555535:web:e921794d455fb9a1741eba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export default app;
