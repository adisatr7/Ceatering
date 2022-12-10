import { StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import global from "../config/global"


export function SearchBar({style, onChangeText}) {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" size={20} style={styles.searchIcon}/>
      <TextInput 
        keyboardType="web-search"
        returnKeyType="search"
        onChangeText={onChangeText} 
        placeholder="Pencarian makanan" 
        style={styles.inputField} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    width: "102%",
    backgroundColor: "white",
    borderColor: global.color.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    elevation: 1,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity
  },

  searchIcon: {
    marginLeft: 12,
    marginRight: 8
  },

  inputField: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,

    flex: 1,
    marginRight: 14,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})