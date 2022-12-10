import { useEffect, useRef, useState } from "react"
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore"

import { db } from "../config/firebase"
import global from "../config/global"
import { SearchBar, triGram} from "../components/SearchBar"
import ItemCard from "../components/ItemCard"
import VendorScreen from "./VendorScreen"


export default function SearchScreen({navigation}) {

  const [resultArray, setResultArray] = useState([])
  const [resultsCounter, setResultsCounter] = useState("")
  const [keyword, setKeyword] = useState([])
  
  /**
   * Handles the actual search
   */
  const searchHandler = async() => {

    // Depending on the keyword in the search bar, different query will be used
    let q = null

    // If keyword is empty, show all items
    if(keyword.length === 0)
      q = query(collection(db, "bundles"))

    // If keyword is filled, filter items based on given keyword
    else
      q = query(collection(db, "bundles"), where("tags", "array-contains-any", keyword))
    
    // Attempts to fetch data from Firestore
    const querySnapshot = await getDocs(q)

    // Prepares an empty temporary array to contain search results
    let tempArray = []
    querySnapshot.forEach(doc => {

      // Push fetched bundles data into the temporary array
      const data = doc.data()
      data["id"] = doc.id
      data["isBundle"] = true
      tempArray.push(data)
    })

    // In case of 404...
    if(tempArray.length === 0)
      tempArray.push({ id: '-1', searchNotFound: true })
    
    // Prints a text sign when user has reached the end of the list
    else
      tempArray.push({ isLastItem: true, id: 'lastItem' })

    // Updates the main results array and counter
    setResultArray(tempArray)
    setResultsCounter(tempArray.length)
  }
  
  /**
   * Breaks down a string sentence into an array of string words
   * @param {*} sentence String containing a sentence
   * @returns Array of string words
   */
  const breakSentenceIntoWords = (sentence) => {
    let temp = sentence.toLowerCase()
    return temp.match(/\b(\w+)\b/g)
  }

  /**
   * Handles keyword update in the search bar
   * @param {*} text Whatever text is in the search bar
   */
  const searchInputHandler = (text) => {

    // In case the search input is empty
    if(text === "")
      setKeyword([])

    // Otherwise, if the keyword contains at least one space, breaks
    // the sentence into an array of words
    else {
      const temp = breakSentenceIntoWords(text)
      setKeyword(temp)
    }
  }

  useEffect(() => {
    searchHandler()
  }, [keyword])

  const gotoVendorScreen = (vendorID) => {
    navigation.navigate(VendorScreen({vendorID: vendorID}))
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatingHeaderContainer}>
        <SearchBar onChangeText={searchInputHandler}/>
        {/* <Text style={styles.resultsCounterText}>Menampilkan 12 makanan</Text> */}
      </View>
      
      <View style={styles.resultsCardContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 75, paddingTop: 7 }}
          data={resultArray}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {

            // if(item.isEmpty)
            //   return <Text style={styles.centerText}>Hasil pencarian kamu akan muncul disini.</Text>

            if(item.searchNotFound)
              return <Text style={styles.centerText}>Ups, sepertinya makanan yang kamu cari belum terdaftar.</Text>

            else if(item.isLastItem)
              return <Text style={styles.endOfResultText}>Akhir dari hasil pencarian.</Text>

            return <ItemCard onPress={gotoVendorScreen} item={item} navigation={navigation}/>
          }}
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
    height: "90%",
    width: "100%",
    top: 10,
    zIndex: 0,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  centerText: {
    alignSelf: "center",
    textAlign: "center",
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginHorizontal: 60,
    marginVertical: 265
  },

  endOfResultText: {
    alignSelf: "center",
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginTop: 5
  }
})