import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiEons5V9IVZdm8flBIDqPcgRuuPcu2cU",
  authDomain: "cateringapp-invfest2022.firebaseapp.com",
  projectId: "cateringapp-invfest2022",
  storageBucket: "cateringapp-invfest2022.appspot.com",
  messagingSenderId: "1069466856598",
  appId: "1:1069466856598:web:da9a75d7fd044d19d0e6b7",
  measurementId: "G-L8BCDKGWZZ",
  storageBucket: "gs://cateringapp-invfest2022.appspot.com/"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize authenticator
export const auth = getAuth(app)

// Initialize Firestore Database
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)