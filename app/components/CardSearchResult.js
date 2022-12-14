import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"

import global from "../config/global"


export default function CardSearchResult({item, navigation}) {

  const pressHandler = () => {
    navigation.navigate("Vendor", {vendorID: item.vendorID})
  }

  const formattedPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return (
    <TouchableOpacity onPress={pressHandler} activeOpacity={0.7} style={styles.mainContainer} >
      <Image source={{uri: item.imageUrl}} style={styles.image}/>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.priceText}>Rp{formattedPrice}</Text>
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
    flex: 3,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  nameText: {
    color: "black",
    fontFamily: global.font.medium,
    fontSize: global.fontSize.body,
    marginHorizontal: 10,
    marginTop: 4
  },

  priceText: {
    color: "black",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginHorizontal: 10,
    marginTop: 2
  },

  vendorNameText: {
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginLeft: 10,
    marginRight: 8,
    marginTop: 5
  }
})