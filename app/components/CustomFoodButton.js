import { TouchableOpacity, StyleSheet, Text, ImageBackground } from "react-native"
import Icon from "@expo/vector-icons/Feather"
import global from "../config/global"



export default function CustomFoodButton({icon, style}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]}>
      <Icon name="plus-square" size={styles.icon.size} style={styles.icon} color={styles.icon.color} />
      <Text style={styles.text}>Buat paket sendiri</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 55,
    width: "100%",
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,
  },

  // background: {
  //   borderRadius: 10
  // },

  // overlay: {
  //   opacity: 0.9,
  //   height: "100%", 
  //   width: "100%",
  //   position: "absolute",
  //   left: 0,
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,

  //   borderWidth: global.debugMode ? 0 : 0,
  //   borderColor: "magenta"
  // },

  icon: {
    color: "black",
    marginLeft: 18,
    size: 24
  },

  text: {
    color: "black",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginLeft: 10,
    marginRight: 10,

    borderWidth: global.debugMode ? 0 : 0,
    borderColor: "magenta"
  }
})