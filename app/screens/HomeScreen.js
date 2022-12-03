import { View, Text, StatusBar, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import global from "../config/global"
import Icon from "@expo/vector-icons/MaterialIcons"
import { logout } from "../components/UserAuthentication"


export default function HomeScreen() {

  const [username, setUsername] = useState("(user)")
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  const totalReset = async() => {
    await AsyncStorage.removeItem("@isFirstRun")
  }

  const resetHandler = () => {
    alert("Commencing total reset...")
    totalReset()
  }

  const logoutHandler = () => {
    alert("Logging out...")
    logout()
  }

  return (
    <View>
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.greenBackground}>
          <Text style={styles.headerText}>Beranda</Text>
        </View>

        <View style={styles.whiteBackground}>

          {/* Advertisement section */}
          <TouchableOpacity activeOpacity={0.7} style={styles.adContainer} >
            <Text style={styles.adText}>Iklan</Text>
          </TouchableOpacity>
          
          {/* Top Restaurants */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Restoran Populer</Text>
            {/* TODO: Bikin Flatlist nama2 restoran */}
          </View>          

          {/* Reset button */}
          <Text onPress={resetHandler}>Text</Text>

          {/* Logout button */}
          <Text onPress={logoutHandler}>Logout</Text>

        </View>
      </ScrollView>
      
      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={hasScrolledDown? "dark-content" : "light-content"}/>
    </View>
  )
}


const homeScreenElements = {
  offset: 50,
  marginVertical: 7
}

// searchBar: {
//   top: 125,
//   position: "absolute",
//   width: "90%",
//   alignSelf: "center"
// },

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  whiteBackground: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: "6%",
    backgroundColor: "white"
  },
  
  greenBackground: {
    backgroundColor: global.color.primary,
    height: StatusBar.currentHeight + 155,
    width: "100%"
  },
  
  headerText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline2,
    marginLeft: 22,
    marginTop: StatusBar.currentHeight + 20
  },

  adContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 150,
    width: "100%",
    bottom: homeScreenElements.offset,
    marginBottom: homeScreenElements.marginVertical,

    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity
  },

  adText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    bottom: homeScreenElements.offset,
    marginVertical: 10
  },

  sectionNameText: {
    color: "black",
    fontFamily: global.font.semibold,
    fontSize: global.fontSize.headline3
  },

  showMoreContainer: {

  },

  showMoreText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }
})