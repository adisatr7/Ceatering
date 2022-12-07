import { useEffect, useState } from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

import { db } from "../config/firebase"
import global from "../config/global"
import SearchBar from "../components/SearchBar"


export default function SearchScreen({navigation}) {

  const [resultArray, setResultArray] = useState([])
  const [resultsCounter, setResultsCounter] = useState("")
  const [keyword, setKeyword] = useState("")

  const fetchData = async() => {
    const snap = await getDoc(doc(db, "bundles/3Km6RXWJmnGF0tSM8id0"))

    if(snap.exists()) {
      const {tags} = snap.data()
      console.log(tags)
    }
    else
      console.log("Item doesn't exist!")
  }

  const buildConstraints = () => {
    const result = []
    triGram(searchTxt).forEach(name =>
      result.push(where(`_smeta.${name}`, '==', true))
    )
    return result
  }

  const searchInputHandler = (text) => {
    setKeyword(text)
  }

  const searchHandler = () => {
    fetchData()
    // First we build out all our search constraints
    const searchConstraints = buildConstraints()

    // Combine that with any other search constraint
    let constraints = [
      collection(db, 'bundles'),
      where('postType', '==', 'altfuel'),
      where('visibility', '==', 'public'),
      ...searchConstraints,
      limit(5)
    ];

    // Build the query and get the documents
    const q = query.apply(this, constraints);
    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach(doc =>
      results.push({ _id: doc.id, ...doc.data() })
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.floatingHeaderContainer}>
        <SearchBar onEndEditing={searchHandler} onChangeText={searchInputHandler}/>
        {/* <Text style={styles.resultsCounterText}>Menampilkan 12 makanan</Text> */}
      </View>
      
      {/* TODO: Make FlatList! */}
      
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
    paddingHorizontal: "6%",
    paddingTop: 40,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  floatingHeaderContainer: {
    position: "absolute",
    width: "100%",
    top: StatusBar.currentHeight + 10,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  resultsCounterText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 10,
  }
})