import { useState } from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"

import global from "../config/global"
import SearchBar from "../components/SearchBar"

export default function FavoritesScreen({navigation}) {

  
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "6%",
    paddingTop: 40,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  floatingHeaderContainer: {
    position: "absolute",
    width: "100%",
    top: StatusBar.currentHeight + 10,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  resultsCounterText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 10,
  }
})