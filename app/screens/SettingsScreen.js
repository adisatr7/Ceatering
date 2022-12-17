import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import global from "../config/global"


export default function SettingsScreen({navigation}) {

  const submitHandler = () => {
    // TODO: Implement!
  }


  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Screen title text */ }
        <Text style={styles.headerText}>Pengaturan</Text>

        {/* TODO: Add the actual settings thingy */}

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
    marginBottom: 20
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
    height: 50,
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