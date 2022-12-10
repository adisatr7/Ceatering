import { ImageBackground, View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from "react-native"

import global from "../config/global"


export default function ItemCard({item}) {

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.mainContainer} >
      <Image source={{uri: item.imageUrl}} style={styles.image}/>
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.nameText}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.vendorNameText}>{item.vendorName}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 10,
    paddingRight: 6,
    height: 75,
    width: "100%",
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
    borderRadius: 10,
    flex: 1
  },
  
  textContainer: {
    backgroundColor: "white",
    flex: 3,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  nameText: {
    color: "black",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginHorizontal: 7,
    marginTop: 4
  },

  vendorNameText: {
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginBottom: 10,
    marginHorizontal: 7,
    marginTop: 3
  }
})