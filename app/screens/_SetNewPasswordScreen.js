import { useState } from "react"
import { Text, SafeAreaView, StatusBar, StyleSheet, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import global from "../config/global"


export default function SetNewPasswordScreen({navigation}) {

  // Input handler
  const [newPassword, setNewPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")

  const passwordInputHandler = (enteredPassword) => {
    setNewPassword(enteredPassword)
  }

  const passwordVerificationInputHandler = (enteredPasswordVerification) => {
    setVerifyPassword(enteredPasswordVerification)
  }

  const submitHandler = () => {
    console.log(`Setting new password...`)
    // TODO: Implement password reset
  }

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Greetings text */ }
        <Text style={styles.headerText}>Atur Kata Sandi Baru</Text>
        <Text style={styles.captionText}>Silahkan masukkan kata sandi baru kamu! Panjang kata sandi setidaknya 6 huruf atau angka.</Text>

        { /* Password input */ }
        <Text style={styles.firstInputLabel}>Kata Sandi Baru</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="password"
            textContentType="password"
            onChangeText={passwordInputHandler}
            placeholder="Masukkan kata sandi kamu"
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* Verify password input */ }
        <Text style={styles.inputLabel}>Ulangi Kata Sandi</Text>
        <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoComplete="password"
            textContentType="password"
            onChangeText={passwordVerificationInputHandler}
            placeholder="Masukkan ulang kata sandi kamu"
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* Submit button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Simpan</Text>
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

  backButton: {
    marginTop: StatusBar.currentHeight * 2,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    width: 40,
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,

    borderWidth: global.debugMode ? 0 : 0,
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
    marginTop: 8,
    marginRight: 40
  },

  firstInputLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 30
  },

  inputLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 20
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

  inputField: {
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