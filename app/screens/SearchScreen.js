import { useEffect, useRef, useState } from "react"
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore"

import { db } from "../config/firebase"
import global from "../config/global"
import { SearchBar, triGram} from "../components/SearchBar"
import ItemCard from "../components/ItemCard"


export default function SearchScreen({navigation}) {

  const [resultArray, setResultArray] = useState([])
  const [resultsCounter, setResultsCounter] = useState("")
  const [keyword, setKeyword] = useState([])
  
  /**
   * Handles the actual search
   */
  const searchHandler = async() => {
    // Query for bundle items that has matching tags with keyword
    const q = query(collection(db, "bundles"), where("tags", "array-contains-any", keyword))
    const querySnapshot = await getDocs(q)

    // Prepares an empty temporary array to contain search results
    const tempArray = []
    querySnapshot.forEach(doc => {

      // Push fetched data into the temporary array
      const data = doc.data()
      data["bundleID"] = doc.id
      tempArray.push(data)
    })

    // Updates the main results array and counter
    setResultArray(tempArray)
    setResultsCounter(tempArray.length)

    console.log(resultArray)
  }
  
  /**
   * Breaks down a string sentence into an array of string words
   * @param {*} sentence String containing a sentence
   * @returns Array of string words
   */
  const breakSentenceIntoWords = (sentence) => {
    return sentence.match(/\b(\w+)\b/g)
  }

  /**
   * Handles keyword update in the search bar
   * @param {*} text Whatever text is in the search bar
   */
  const searchInputHandler = (text) => {
    const temp = breakSentenceIntoWords(text)
    setKeyword(temp)
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatingHeaderContainer}>
        <SearchBar onEndEditing={searchHandler} onChangeText={searchInputHandler}/>
        {/* <Text style={styles.resultsCounterText}>Menampilkan 12 makanan</Text> */}
      </View>
      
      <View style={styles.resultsCardContainer}>
        <FlatList
          data={resultArray}
          keyExtractor={item => item.bundleID}
          showsVerticalScrollIndicator
          renderItem={({item}) => <ItemCard item={item}/>}
        />
      </View>
      
      <StatusBar animated translucent backgroundColor={"transparent"} barStyle="dark-content"/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: 40,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  floatingHeaderContainer: {
    position: "absolute",
    width: "100%",
    top: StatusBar.currentHeight + 10,
    zIndex: 1,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  resultsCounterText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 10,
  },

  resultsCardContainer: {
    alignSelf: "flex-start",
    height: "95%",
    width: "100%",
    top: 33,
    zIndex: 0,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})