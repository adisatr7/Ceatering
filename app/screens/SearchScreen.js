import { useCallback, useState } from "react"
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { useFocusEffect } from "@react-navigation/native"

import { db } from "../config/firebase"
import global from "../config/global"
import SearchBar from "../components/SearchBar"
import CardSearchResult from "../components/CardSearchResult"
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
      q = query(collection(db, "bundles"), orderBy("price"))

    // If keyword is filled, filter items based on given keyword
    else
      q = query(collection(db, "bundles"), where("tags", "array-contains-any", keyword))
    
    // Attempts to fetch data from Firestore
    const querySnapshot = await getDocs(q)

    // Prepares an empty temporary array to contain search results
    let tempArray = []
    querySnapshot.forEach(doc => {

      // Push fetched data into said temporary array
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
    setResultsCounter(tempArray.length -1)
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

  const renderResultCounter = () => {
    if(resultsCounter > 0 && keyword.length !== 0)
      return <Text style={styles.resultsCounterText}>Menampilkan {resultsCounter} makanan</Text>
  }

  useFocusEffect(
    useCallback(() => {
      searchHandler()
    }, [keyword])
  )

  const gotoVendorScreen = (vendorID) => {
    navigation.navigate(VendorScreen({vendorID: vendorID}))
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <SearchBar onChangeText={searchInputHandler}/>
        { renderResultCounter() }
      </View>
      
      <View style={styles.resultsCardContainer}>
        <FlatList
          contentContainerStyle={ resultsCounter !== 0 ? { paddingTop: 5 } : {}}
          data={resultArray}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {

            if(item.searchNotFound)
              return <Text style={styles.centerText}>Ups, sepertinya makanan yang kamu cari belum terdaftar.</Text>
              
            else if(item.isLastItem)
              return <Text style={styles.endOfResultText}>Akhir dari hasil pencarian.</Text>

            return <CardSearchResult onPress={gotoVendorScreen} item={item} navigation={navigation}/>
          }}
        />
      </View>
      
      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle="light-content"/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: "5%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  headerContainer: {
    width: "100%",
    marginBottom: 10,
    marginTop: StatusBar.currentHeight + 10,
    zIndex: 1,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  resultsCounterText: {
    color: "gray",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginLeft: 1,
    marginTop: 8
  },

  resultsCardContainer: {
    width: "100%",
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
    marginVertical: "80%"
  },

  endOfResultText: {
    alignSelf: "center",
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginTop: 5,
    marginBottom: 200
  }
})