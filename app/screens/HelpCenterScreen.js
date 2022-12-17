import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import global from "../config/global"


export default function HelpCenterScreen({navigation}) {

  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Screen title text */ }
        <Text style={styles.headerText}>Pusat Bantuan</Text>

        {/* TODO: Add the actual settings thingy */}

        { /* Submit button */ }
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity> */}

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