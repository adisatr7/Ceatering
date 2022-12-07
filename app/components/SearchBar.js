import { setDoc } from "firebase/firestore"
import { StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { db } from "../config/firebase"

import global from "../config/global"


const GENERATION_OFFSET = new Date("5000-01-01").getTime()
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

/**
 * This will generate an id in chronological reverse order.
 * This means the default sort of objects added using this ID will return newest first.
 * If this code survives past year 5000, you will experience Y5K.
 * 
 * @returns ID to sort search results
 */
const generateId = () => {
  let autoId = ""

  // Generates random ID
  for (let i = 0; i < 10; i++)
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  
  return (GENERATION_OFFSET - Date.now()).toString(32) + autoId
}

/**
 * Generates a trigram
 * @param {*} txt 
 * @returns trigram map
 */
export const triGram = (txt) => {
  const map = {}
  const s1 = (txt || "").toLowerCase()
  const n = 3

  for (let k = 0; k <= s1.length - n; k++) 
    map[s1.substring(k, k + n)] = true
  
  return map
}

/**
 * This will add a new firestore record enhanced with search data.
 * It will then store it as '_smeta'. Note the slice, which caps the 
 * length of the string
 * 
 * @param {*} doc 
 */
export const addPost = async(doc) => {
  const id = generateId()
  const data = {
    ...doc,
    ...triGram([doc.name || ''].join(' ').slice(0, 500))
  };
  
  // We set the id manually here to ensure ordering
  const postRef = doc(db, "items", id)
  await setDoc(postRef, data)
}


export default function SearchBar({style, onEndEditing, onChangeText}) {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" size={20} style={styles.searchIcon}/>
      <TextInput 
        keyboardType="web-search"
        returnKeyType="search"
        onEndEditing={onEndEditing} 
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
    width: "105%",
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