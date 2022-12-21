import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"

import global from "../config/global"


export default function CardItem({item, navigation, onPress}) {

  const formattedPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.mainContainer} >
      <Image source={{uri: item.imageUrl}} style={styles.image}/>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.priceText}>Rp{formattedPrice}</Text>
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
    flex: 3,
    justifyContent: "center",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  text: {
    color: "black",
    fontFamily: global.font.medium,
    fontSize: global.fontSize.body,
    marginHorizontal: 10,
    marginVertical: 8
  },

  priceText: {
    color: "black",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginHorizontal: 10,
    marginBottom: 14
  },

  captionText: {
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 5
  }
})