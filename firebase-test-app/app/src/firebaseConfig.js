// firebase.js or firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWL5j47Bz_iAd23TBwCndwTrPqkBKMfUc",
  authDomain: "fir-testapp-a1461.firebaseapp.com",
  projectId: "fir-testapp-a1461",
  storageBucket: "fir-testapp-a1461.firebasestorage.app",
  messagingSenderId: "404830249152",
  appId: "1:404830249152:web:f95379650c65c18adbcd25",
  measurementId: "G-RLLYHGHCE1" // not used in React Native
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Works in Expo Go (memory only, no persistence)

export  default auth