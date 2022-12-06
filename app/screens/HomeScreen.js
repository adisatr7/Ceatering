import { View, Text, StatusBar, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import global from "../config/global"
import Icon from "@expo/vector-icons/MaterialIcons"

import { logout } from "../components/UserAuthentication"
import { data, recommendedTags } from "../data/Data"
import BigCard from "../components/BigCard"
import { CartButton } from "../components/Buttons"

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
            <Image style={{height: "100%", width: "100%", borderRadius: 10}} source={{uri: "https://cdn0-production-images-kly.akamaized.net/ETx_C-6RiCxqJHnxNe2QJkONrz8=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/844683/original/003049300_1428322197-is.JPG"}}/>
            <Text style={styles.adText}>Iklan</Text>
          </TouchableOpacity>

          {/* Recommended */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Rekomendasi</Text>
            <View style={styles.sectionListContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => <BigCard vendor={item} />}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          
          {/* Top Restaurants */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Populer</Text>
            <View style={styles.sectionListContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => <BigCard vendor={item} />}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Can handle custom order */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Bisa Buat Paket Sendiri</Text>
            <View style={styles.sectionListContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => <BigCard vendor={item} />}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Reset button */}
          <Text onPress={resetHandler}>Reset app state</Text>

          {/* Logout button */}
          <Text onPress={logoutHandler}>Logout</Text>

        </View>
      </ScrollView>
      
      <CartButton/>

      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={hasScrolledDown? "dark-content" : "light-content"}/>
    </View>
  )
}


const homeScreenElements = {
  offset: 50,
  marginVertical: 7
}

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
    fontSize: global.fontSize.body,
    position: "absolute",
    color: "white",
    bottom: 0
  },

  sectionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    bottom: homeScreenElements.offset,
    marginVertical: 10
  },

  sectionNameText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginBottom: 6
  },

  showMoreContainer: {

  },

  showMoreText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  sectionListContainer: {
    alignSelf: "flex-start",
    width: "100%",
    height: 154,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})