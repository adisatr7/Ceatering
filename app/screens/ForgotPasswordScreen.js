import { useState } from "react"
import { Text, SafeAreaView, StatusBar, StyleSheet, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import global from "../config/global"


export default function ForgotpasswordScreen({navigation}) {

  // Input handler
  const [email, setEmail] = useState("")

  const emailInputHandler = (enteredEmail) => {
    setEmail(enteredEmail)
  }

  const submitHandler = () => {
    console.log(`Submitting reset password request from email "${email}"...`)
  }

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Greetings text */ }
        <Text style={styles.headerText}>Lupa Kata Sandi?</Text>
        <Text style={styles.captionText}>Masukkan alamat e-mail kamu untuk menyetel ulang kata sandi kamu!</Text>

        { /* Email input */ }
        <Text style={styles.emailLabel}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="email" 
            clearButtonMode="always" 
            keyboardType="email-address" 
            onChangeText={emailInputHandler} 
            placeholder="Masukkan alamat e-mail kamu"
            style={styles.emailField} 
          />
        </View>

        { /* Submit button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Lanjutkan</Text>
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


  backIcon: {
    color: global.color.primary
  },

  headerText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  emailLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 35
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

  submitButton: {
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

  submitButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})