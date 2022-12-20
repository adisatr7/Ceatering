import { TouchableOpacity, StatusBar, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons/"
import global from "../config/global"


export function BackButton({navigation}) {

  const backButtonHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={backButtonHandler} >
      <View style={styles.backButton}>
        <Ionicons name="arrow-back" size={18} style={styles.backIcon}/>
      </View>
    </TouchableOpacity>
  )
}


export function CartButton({navigation}) {

  const cartButtonHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.cartButton} onPress={cartButtonHandler}>
      <Ionicons name="cart-outline" size={24} style={styles.cartIcon}/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: 15,
    marginRight: 12,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    width: 40,
    elevation: 3,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,

    borderWidth: global.debugMode ? 0 : 0,
    borderColor: "magenta"
  },

  backIcon: {
    color: global.color.primary
  },


  cartButton: {
    color: "white",
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 10,
    height: 45,
    width: 45,
    elevation: 1.5,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,

    borderWidth: global.debugMode ? 0 : 0,
    borderColor: "magenta"
  },

  cartIcon: {
    color: global.color.primary,
    bottom: -3
  }
})