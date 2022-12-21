import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native"
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"

import { BackButton } from "../components/Buttons"
import { auth } from "../config/firebase"
import ModalLoading from "../components/ModalLoading"
import global from "../config/global"
import strings from "../config/strings"


export default function EditPasswordScreen({navigation, route}) {

  // Get user's current (old) email and display name
  const {user} = route.params

  // Loading animation hook
  const [isLoading, setIsLoading] = useState(false)

  // Input hooks
  const [oldPasswordInput, setOldPasswordInput] = useState("")
  const [newPasswordInput, setNewPasswordInput] = useState("")
  const [newPasswordVerifInput, setNewPasswordVerifInput] = useState("")


  // Input handlers
  const oldPasswordInputHandler = (enteredText) => {
    setOldPasswordInput(enteredText)
  }

  const newPasswordInputHandler = (enteredText) => {
    setNewPasswordInput(enteredText)
  }

  const newPasswordVerifInputHandler = (enteredText) => {
    setNewPasswordVerifInput(enteredText)
  }

  const submitHandler = () => {

    if(!oldPasswordInput || !newPasswordInput || !newPasswordVerifInput) {
      Alert.alert(
        "Ets, Tunggu Dulu", 
        "Pastikan kamu mengisi semua kolom yang ada!",
        [{ text: "Tutup" }])
    }
    
    else if(newPasswordInput !== newPasswordVerifInput) {
      Alert.alert(
        "Verifikasi Kata Sandi Baru Tidak Cocok", 
        "Pastikan kamu memasukkan kedua kata sandi baru kamu dengan benar!",
        [{ text: "Tutup" }])
    }

    else {

      // Plays loading animation
      setIsLoading(true)

      // Reauthenticate user before making changes
      const user = auth.currentUser
      const credential = EmailAuthProvider.credential(user.email, oldPasswordInput)

      reauthenticateWithCredential(user, credential)
        .catch(error => console.log(error))
        .then(() => {
    
          // Attempts to update user's password
          updatePassword(auth.currentUser, newPasswordInput)
            .then(() => {
              
              // Stops loading animation
              setIsLoading(false)
    
              // Shows popup alert
              Alert.alert("Berhasil!", "Kata sandi kamu berhasil diubah!", [{ text: "Tutup" }])
              navigation.goBack()
            })
            .catch(error => {
              console.log(error)
    
              // Stops loading animation
              setIsLoading(false)

              // Password < 6 digit
              if(error.code === "auth/weak-password")
                Alert.alert(strings.alert.weakPassword.title, strings.alert.weakPassword.desc)
              
              // Bad network
              if(error.code === "auth/network-request-failed")
                Alert.alert(strings.alert.networkError.title, strings.alert.networkError.desc)
            })
        })
    }
  }


  // -- Main --
  return (
    <SafeAreaView style={styles.background}>

      {/* Loading animation that plays when the submit button is clicked */}
      <ModalLoading title="Menyimpan Perubahan" caption="Data profil baru kamu sedang disimpan" visible={isLoading} />

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        { /* Screen Header */ }
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }} >
          <BackButton navigation={navigation} />
          <Text style={styles.headerText}>Ubah Kata Sandi</Text>
        </View>

        { /* Old password input */ }
        <Text style={styles.inputLabel}>Kata Sandi Lama</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Masukkan kata sandi lama kamu"
            textContentType="password"
            autoComplete="off"
            returnKeyType="next"
            // onSubmitEditing={() => this.newPasswordRef.focus()}
            blurOnSubmit={false}
            onChangeText={oldPasswordInputHandler}
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* New password input */ }
        <Text style={styles.inputLabel}>Kata Sandi Baru</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Masukkan kata sandi baru kamu"
            autoComplete="password-new"
            textContentType="newPassword"
            returnKeyType="next"
            // ref={input => this.newPasswordRef = input}
            // onSubmitEditing={() => this.newPasswordVerifRef.focus()}
            onChangeText={newPasswordInputHandler}
            secureTextEntry
            style={styles.inputField} 
          />
        </View>

        { /* Verify password input */ }
        <Text style={styles.inputLabel}>Ulangi Kata Sandi Baru</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Masukkan lagi kata sandi baru kamu"
            autoComplete="password-new"
            textContentType="newPassword"
            returnKeyType="done"
            // ref={input => this.newPasswordVerifRef = input}
            onSubmitEditing={submitHandler}
            onChangeText={newPasswordVerifInputHandler}
            secureTextEntry
            style={styles.inputField} 
          />
        </View>


        { /* Submit button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Simpan Perubahan</Text>
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
    fontSize: global.fontSize.headline3,
    marginBottom: 15,
    marginTop: StatusBar.currentHeight + 20
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  profilePictureContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 65,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  profilePicture: {
    borderRadius: 65,
    height: 120,
    width: 120,
    borderWidth: 2.5,
    borderColor: "white",
    resizeMode: "cover"
  },

  editPictureButton: {
    position: "absolute",
    bottom: -5,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global.color.primary,
    borderRadius: 25,
    height: 45,
    width: 45,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
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
    height: 45,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10
  },

  inputField: {
    width: "100%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  submitButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 15,
    elevation: 2
  },

  submitButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})