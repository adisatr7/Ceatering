import { useState } from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"

import global from "../config/global"
import SearchBar from "../components/SearchBar"

export default function SearchScreen({navigation}) {

  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [resultsText, setResultsText] = useState("")

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatingHeaderContainer}>
        <SearchBar/>
        
        {/* <Text style={styles.resultsCounterText}>Menampilkan 12 makanan</Text> */}
      </View>
      
      {/* TODO: Make FlatList! */}
      
      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={hasScrolledDown? "dark-content" : "light-content"}/>
    </View>
  )
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