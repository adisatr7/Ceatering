import { ImageBackground, View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from "react-native"

import global from "../config/global"


export default function CardItem({vendor}) {

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.mainContainer} >
      <Image source={{uri: vendor.imageUrl}} style={styles.image}/>
      <Text numberOfLines={2} style={styles.vendorNameText}>{vendor.name}</Text>
      <Text numberOfLines={1} style={styles.vendorAddressText}>{vendor.address}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    marginBottom: 2,
    marginRight: 10,
    width: 142,
    borderRadius: 10,
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  image: {
    alignItems: "center",
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 100,
    width: 142,
  },
  
  textContainer: {
    backgroundColor: "white",
    width: "85%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  vendorNameText: {
    color: "black",
    fontFamily: global.font.semibold,
    fontSize: global.fontSize.body,
    marginHorizontal: 7,
    marginTop: 4
  },

  vendorAddressText: {
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginBottom: 10,
    marginHorizontal: 7,
    marginTop: 3
  }
})