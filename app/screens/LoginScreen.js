import { useCallback, useEffect, useState } from "react"
import { Alert, Text, SafeAreaView, StyleSheet, StatusBar, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthRequest } from "expo-auth-session/providers/google"
import Icon from "react-native-vector-icons/MaterialIcons"

import { auth } from "../config/firebase"
import global from "../config/global"
import strings from "../config/strings"
import LoadingModal from "../components/LoadingModal"



export default function LoginScreen({navigation}) {

  // Loading animation hook
  const [isLoading, setIsLoading] = useState(true)

  // Toggle password visibility handler
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [eyeIcon, setEyeIcon] = useState(require("../assets/eye_black.png"))
  
  const showPasswordButtonHandler = () => {
    if(passwordVisibility) {
      setPasswordVisibility(false)
      setEyeIcon(require("../assets/eye_black.png"))
    } else {
      setPasswordVisibility(true)
      setEyeIcon(require("../assets/eye_colored.png"))
    }
  }

  
  // Input handler
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailInputHandler = (enteredEmail) => {
    setEmail(enteredEmail)
  }

  const passwordInputHandler = (enteredPassword) => {
    setPassword(enteredPassword)
  }


  // Login with Email & Password handler
  const loginHandler = () => {

    // Checks if all input fields are filled
    if(!email || !password)
      Alert.alert(strings.alert.emptyForm.title, strings.alert.emptyForm.desc)
    
    else {

      // Starts loading animation
      setIsLoading(true)

      // Login process
      console.log(`Signing in user "${email}"...`)
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Logged in 
          const user = userCredential.user
        })
        .catch((error) => {
          console.log(error.code, error.message)

          // Stops loading animation
          setIsLoading(false)

          // Input is not an email
          if(error.code === "auth/invalid-email")
            Alert.alert(strings.alert.invalidEmail.title, strings.alert.invalidEmail.desc)

          // Wrong password
          if(error.code === "auth/wrong-password")
            Alert.alert(strings.alert.invalidPassword.title, strings.alert.invalidPassword.desc)

          // Account not found
          if(error.code === "auth/user-not-found")
            Alert.alert(strings.alert.accNotFound.title, strings.alert.accNotFound.desc)

          // Network error
          if(error.code === "auth/network-request-failed")
            Alert.alert(strings.alert.networkError.title, strings.alert.networkError.desc)
            
            // Too many attempts
          if(error.code === "auth/too-many-requests")
            Alert.alert(strings.alert.tooManyAttempts.title, strings.alert.tooManyAttempts.desc)
        })
    }
  }
  
  // This part is where user skips the Login screen entirely if they have logged in before
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        console.log(`Login successful user ${user.uid}!`)
        setIsLoading(false)
        gotoMainScreen()
        
        return unsubscribe
      }
      else
        setIsLoading(false)
    })
  })

  // Login with Google account handler
  const [request, response, promptAsync] = useAuthRequest({
    expoClientId: "1069466856598-7qq700ichpvg4p9ctonof587bih79fmu.apps.googleusercontent.com"
  })

  const googleLoginHandler = () => {
    promptAsync()
  }

  // Login with Apple account handler
  const appleLoginHandler = () => {
    alert("To be added in the future!")
  }

  // Go to Registration up screen
  const gotoRegister = () => {
    navigation.navigate("Register", {isOnAnotherScreen: isLoading})
  }

  // Go to Forgot Password screen
  const gotoForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  // Go to Main screen
  const gotoMainScreen = () => {
    navigation.replace("Main")
  }

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>

      {/* Loading animation */}
      <LoadingModal title="Tunggu sebentar" caption="Menghubungkan ke server..." visible={isLoading}/>

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        <Image style={global.styles.brandlogo} source={require("../assets/brandlogo_colored.png")} />

        { /* Greetings text */ }
        <Text style={styles.headerText}>Selamat Datang Kembali</Text>
        <Text style={styles.captionText}>Yuk masuk dulu ke akunmu untuk dapat menikmati layanan catering harian dari kami!</Text>

        { /* Email input */ }
        <Text style={styles.emailLabel}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoCapitalize="none"
            autoComplete="email" 
            clearButtonMode="always" 
            keyboardType="email-address" 
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInputRef.focus()}
            blurOnSubmit={false}
            placeholder="Masukkan alamat e-mail kamu"
            onChangeText={emailInputHandler} 
            style={styles.emailField} 
          />
        </View>

        { /* Password input and show/hide password button */ }
        <Text style={styles.passwordLabel}>Kata Sandi</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="password"
            textContentType="newPassword"
            returnKeyType="send"
            ref = {(input) => this.passwordInputRef = input}
            onSubmitEditing={loginHandler}
            onChangeText={passwordInputHandler}
            placeholder="Masukkan kata sandi kamu"
            secureTextEntry={!passwordVisibility} 
            style={styles.passwordField} 
          />
          <Pressable style={styles.eyeButtonContainer} onPress={showPasswordButtonHandler}>
            { /* TODO: Use <Icon> when able! */ }
            <Image source={eyeIcon} style={styles.eyeButton} />
          </Pressable>
        </View>

        { /* Forgot password */ }
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Lupa kata sandi? </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={gotoForgotPassword} >
            <Text style={styles.forgotPasswordButton}>Klik disini!</Text>
          </TouchableOpacity>
        </View>

        { /* Login button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.loginButton} onPress={loginHandler}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>

        { /* Login with Apple */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.loginAltButton} onPress={appleLoginHandler}>
          <Image style={styles.appleIcon} source={require("../assets/apple_black.png")}/>
          <Text style={styles.loginAltButtonText}>Masuk dengan akun Apple</Text>
        </TouchableOpacity>

        { /* Login with Google */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.loginAltButton} onPress={googleLoginHandler}>
          <Image style={styles.googleIcon} source={require("../assets/google_colored.png")}/>
          <Text style={styles.loginAltButtonText}>Masuk dengan akun Google</Text>
        </TouchableOpacity>

        { /* Don't have an account yet? <Register> now! */ }
        <View style={styles.noAccountYetContainer}>
          <Text style={styles.noAccountYetText}>Belum punya akun? </Text>
          <TouchableOpacity activeOpacity={0.4} onPress={gotoRegister} >
            <Text style={styles.noAccountYetButton}>Daftar</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountYetText}> sekarang!</Text>
        </View>

        <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle="dark-content"/>
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

  headerText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3,
    marginTop: 0
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  emailLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 20
  },

  passwordLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 12
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

  leftIcons: {
    marginRight: 6,
    opacity: 0.5,
    size: 20
  },

  emailField: {
    width: "89%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  passwordField: {
    width: "81%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  eyeButtonContainer: {
    justifyContent: "center",
    right: 0,
    padding: 5,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  eyeButton: {
    height: 20,
    width: 20
  },

  forgotPasswordContainer: {
    flexDirection: "row",
    marginHorizontal: 3,
    top: 10,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  forgotPasswordText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  forgotPasswordButton: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  loginButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    marginTop: 35,
    paddingHorizontal: 15,
    elevation: 2
  },

  loginButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  loginAltButton: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    marginTop: 15,
    paddingHorizontal: 15,
    elevation: 2
  },

  appleIcon: {
    height: 22,
    width: 22,
    margin: 5
  },

  googleIcon: {
    height: 20,
    width: 20,
    margin: 8
  },

  loginAltButtonText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  noAccountYetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 30,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  noAccountYetText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  noAccountYetButton: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }
})