import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import global from "../config/global"
import { useState } from "react"
import { auth } from "../config/firebase"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"


export default function ModalPasswordPrompt({visible, onSuccess, onCancel}) {

  // Toggle password visibility handler
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [eyeIcon, setEyeIcon] = useState(require("../assets/eye_black.png"))
  
  const showPasswordButtonHandler = () => {
    setPasswordVisibility(!passwordVisibility)

    if(passwordVisibility) 
      setEyeIcon(require("../assets/eye_black.png"))
    else 
      setEyeIcon(require("../assets/eye_colored.png"))
  }

  // Input handler
  const [password, setPassword] = useState("")

  const passwordInputHandler = (enteredPassword) => {
    setPassword(enteredPassword)
  }

  // Warning text
  const [warningText, setWarningText] = useState("")
  
  // Submit handler
  const submitHandler = () => {

    // Some foolproofing first...
    if(!password) 
      setWarningText("Kata sandi tidak boleh kosong!")
    
    else if(password.length < 6)
      setWarningText("Kata sandi memiliki setidaknya 6 karakter!")

    else {

      
      const user = auth.currentUser
      const credential = EmailAuthProvider.credential(user.email, password)
      
      reauthenticateWithCredential(user, credential)
      .then(value => {
          console.log("Password is correct")
          onSuccess()
        })
        .catch(error => {
          console.log(error)

          if(error.code === "auth/wrong-password")
            setWarningText("Kata sandi kamu salah!")
        })
    }
  }


  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Pressable style={styles.darkOverlay} onPress={onCancel}>
        <View style={styles.container}>
          
          {/* Header and caption text */}
          <Text style={styles.title}>Konfirmasi Keamanan</Text>
          <Text style={styles.caption}>Untuk menjaga keamanan akun kamu, masukkan kata sandi kamu disini:</Text>
          
          {/* Password input */}
          <View style={styles.inputContainer}>
            <TextInput 
              autoComplete="password"
              textContentType="password"
              returnKeyType="send"
              onChangeText={passwordInputHandler}
              placeholder="Masukkan kata sandi kamu"
              secureTextEntry={!passwordVisibility} 
              style={styles.passwordinputField} 
            />

            {/* Eye icon */}
            <TouchableOpacity activeOpacity={0.8} style={styles.eyeButtonContainer} onPress={showPasswordButtonHandler}>
              <Image source={eyeIcon} style={styles.eyeButton} />
            </TouchableOpacity>

          </View>

        {/* Error messages */}
        <Text style={styles.redCaption}>{warningText}</Text>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

          { /* Cancel button */ }
          <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Batalkan</Text>
          </TouchableOpacity>

          { /* Submit button */ }
          <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>

        </View>


        </View>
      </Pressable>
    </Modal>
  )
}


const styles = StyleSheet.create({

  darkOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    maxWidth: "90%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  title: {
    alignSelf: "flex-start",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
  },

  caption: {
    alignSelf: "flex-start",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 10
  },

  redCaption: {
    alignSelf: "flex-start",
    color: "red",
    fontFamily: global.font.semibold,
    fontSize: global.fontSize.body,
    marginTop: 5
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

  passwordinputField: {
    width: "83%",
    marginLeft: 5,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  eyeButton: {
    height: 20,
    width: 20
  },

  cancelButton: {
    backgroundColor: "silver",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    // width: "100%",
    marginTop: 30,
    paddingHorizontal: 25,
    elevation: 2
  },

  submitButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    // width: "100%",
    marginTop: 30,
    paddingHorizontal: 25,
    elevation: 2
  },

  buttonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }
})