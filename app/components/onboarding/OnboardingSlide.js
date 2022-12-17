import { ImageBackground, View, Text, StyleSheet, StatusBar, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import global from "../../config/global"


export default function OnboardingSlide({item}) {

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={item.background} style={styles.background}>
        <LinearGradient colors={["transparent", "black"]} style={styles.darkOverlay}/>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{item.header}</Text>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },

  background: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    flexDirection: "column-reverse",
    alignItems: "center"
  },
  
  textContainer: {
    marginTop: StatusBar.currentHeight,
    width: "85%",
    top: 160,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  darkOverlay: {
    opacity: 0.9,
    height: "80%", 
    width: "100%",
    position: "absolute",
    bottom: 0,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  void: {
    height: 380
  },

  headerText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline1,
    marginRight: 40
  },

  captionText: {
    color: "white",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginRight: 20,
    marginVertical: 24
  }
})