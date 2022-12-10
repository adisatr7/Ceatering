import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import { auth } from "../config/firebase"
import global from "../config/global"
import strings from "../config/strings"


export default function RegisterScreen({navigation}) {

  // Input handler
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVerification, setPasswordVerification] = useState("")

  const emailInputHandler = (enteredEmail) => {
    setEmail(enteredEmail)
  }

  const usernameInputHandler = (enteredUsername) => {
    setUsername(enteredUsername)
  }

  const passwordInputHandler = (enteredPassword) => {
    setPassword(enteredPassword)
  }

  const verifyPasswordInputHandler = (verifyPasswordC) => {
    setPasswordVerification(verifyPasswordC)
  }

  
  // Register handler
  const registerHandler = () => {

    // Checks if all input field are filled
    if(!username || !email || !password || !passwordVerification)
      Alert.alert(strings.alert.emptyForm.title, strings.alert.emptyForm.desc)

    // Checks if user entered the same value for both password input field
    else if(password !== passwordVerification)
      Alert.alert(strings.alert.passwordVerificationFailed.title, strings.alert.passwordVerificationFailed.desc)


    else {

      // Register process
      console.log(`Registering new user "${email}"...`)

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user
          user.displayName = username
          console.log(`Sign up successful user "${email}"!`)

          // A verification code is sent to user's email address
          // BUG: Unhandled promise
          sendEmailVerification(user, { handleCodeInApp: true,  })
            .then(() => {
              // Enter something here
            })
            .catch((error) => {
              console.log(error.code)
            })
        })
        .catch((error) => {
        console.log(error.code, error.message)

        // Input is not an email
        if(error.code === "auth/invalid-email")
          Alert.alert(strings.alert.invalidEmail.title, strings.alert.invalidEmail.desc)

        // Password < 6 digit
        if(error.code === "auth/weak-password")
          Alert.alert(strings.alert.weakPassword.title, strings.alert.weakPassword.desc)
          
        // Bad network
        if(error.code === "auth/network-request-failed")
          Alert.alert(strings.alert.networkError.title, strings.alert.networkError.desc)
          
        // Email already in use
        if(error.code === "auth/email-already-in-use")
          Alert.alert(strings.alert.emailInUse.title, strings.alert.emailInUse.desc, [
            { text: "Masuk", onPress: navigation.navigate("Login") }, { text: "Tutup" }
          ])
      })
    }
  }

  // Go to Verify E-mail screen
  const gotoMainScreen = () => {
    navigation.replace("Main")
  }

  // Go to Login screen
  const gotoLoginScreen = () => {
    navigation.navigate("Login")
  }

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />
      
        { /* Header */ }
        <Text style={styles.headerText}>Gabung Bersama Kami</Text>
        <Text style={styles.captionText}>Buat akun baru sekarang dan mulai buat pesanan catering harian dengan mudah dan nyaman!</Text>
        
        { /* Email input */ }
        <Text style={styles.firstInputLabel}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="email" 
            keyboardType="email-address"
            textContentType="emailAddress"
            clearButtonMode="always"
            returnKeyType="next" 
            onSubmitEditing={() => this.usernameInputRef.focus()}
            blurOnSubmit={false}
            placeholder="Masukkan alamat e-mail kamu"
            onChangeText={emailInputHandler} 
            style={styles.inputField}
          />
        </View>

        { /* Username input */ }
        <Text style={styles.inputLabel}>Nama Pengguna</Text>
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoCapitalize="words" 
            autoComplete="name" 
            textContentType="name"
            clearButtonMode="always"
            returnKeyType="next" 
            ref={input => this.usernameInputRef = input}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            blurOnSubmit={false}
            placeholder="Masukkan nama lengkap kamu"
            onChangeText={usernameInputHandler}
            style={styles.inputField}
          />
        </View>

        { /* Password input */ }
        <Text style={styles.inputLabel}>Kata Sandi</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="password"
            textContentType="newPassword"
            returnKeyType="next"
            ref={input => this.passwordInputRef = input}
            onSubmitEditing={() => this.passwordVerifRef.focus()}
            blurOnSubmit={false}
            onChangeText={passwordInputHandler}
            placeholder="Masukkan kata sandi kamu"
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* Verify password input */ }
        <Text style={styles.inputLabel}>Konfirmasi Kata Sandi</Text>
        <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="password"
            textContentType="password"
            returnKeyType="send"
            ref={input => this.passwordVerifRef = input}
            onSubmitEditing={registerHandler}
            onChangeText={verifyPasswordInputHandler}
            placeholder="Masukkan ulang kata sandi kamu"
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* Register button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.registerButton} onPress={registerHandler}>
          <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },

  container: {
    backgroundColor: "white",
    height: "100%",
    width: "85%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  greetingsContainer: {
    flexDirection: "column"
  },

  headerText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3
  },

  captionText: {
    marginTop: 5,
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  firstInputLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 19
  },

  inputLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 10
  },

  inputContainer: {
    borderColor: global.color.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10
  },

  inputField: {
    width: "89%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  leftIcons: {
    marginRight: 10,
    opacity: 0.5,
    size: 20
  },

  registerButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    marginVertical: 35,
    paddingHorizontal: 15,
    elevation: 2
  },

  registerButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }
})