import { useEffect, useState } from "react"
import { Text, SafeAreaView, StatusBar, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import global from "../config/global"


export default function VerifyEmailScreen({navigation}) {

  // Input handler
  const [otp, setOtp] = useState("")

  const otpInputHandler = (enteredOtp) => {
    setOtp(enteredOtp)
  }

  const submitHandler = () => {
    console.log(`Applying OTP "${otp}"...`)
  }

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.mainContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        { /* Header */ }
        <View style={styles.headerContainer}>
          <BackButton navigation={navigation}/>
          <View style={styles.greetingsContainer}>
            <Text style={styles.headerText}>Verifikasi Email</Text>
          </View>
        </View>

        { /* Caption */ }
        <Text style={styles.captionText}>Kode OTP telah dikirimkan ke email kamu. Masukkan kode yang kamu terima disini:</Text>

        { /* OTP input | TODO: Lanjutin */ }
        <Text style={styles.inputLabel}>Kode OTP</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="email" 
            clearButtonMode="always" 
            keyboardType="email-address" 
            onChangeText={otpInputHandler} 
            placeholder="Masukkan alamat e-mail Anda"
            style={styles.emailField} 
          />
        </View>

        { /* Submit button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Verifikasi</Text>
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

  mainContainer: {
    backgroundColor: "white",
    height: "100%",
    width: "85%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
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
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  inputLabel: {
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
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 1,
  },

  submitButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})