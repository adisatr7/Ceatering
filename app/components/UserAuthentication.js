import { Alert } from "react-native"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../config/firebase"
import { useAuthRequest } from "expo-auth-session/providers/google"

import strings from "../config/strings"


const auth = getAuth(app)

/**
 * Register a new account with email and password
 * @param {*} email 
 * @param {*} password 
 */
export async function registerWithEmail(email, username, password) {
  
}

export function checkIfLoggedInBefore() {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if(user)
      return "success"
  })
}

// TODO: Implement this once app is built
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider()

  // Start a sign in process for an unauthenticated user.
  const result = await signInWithPopup(auth, provider)

  if (result) {
    
    const user = result.user                                          // This is the signed-in user
    const credential = provider.credentialFromResult(auth, result);   // This gives you a Facebook Access Token.

    const token = credential.accessToken
  }
  // As this API can be used for sign-in, linking and reauthentication,
  // check the operationType to determine what triggered this redirect
  // operation.
  const operationType = result.operationType
}

export function logout() {
  auth.signOut().then(() => {
  })
  .catch((error) => {
    alert(error.code)
  })
}