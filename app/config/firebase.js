import { initializeApp, auth } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from 'react'


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiEons5V9IVZdm8flBIDqPcgRuuPcu2cU",
  authDomain: "cateringapp-invfest2022.firebaseapp.com",
  projectId: "cateringapp-invfest2022",
  storageBucket: "cateringapp-invfest2022.appspot.com",
  messagingSenderId: "1069466856598",
  appId: "1:1069466856598:web:da9a75d7fd044d19d0e6b7",
  measurementId: "G-L8BCDKGWZZ"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)