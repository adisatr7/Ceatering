import { async } from "@firebase/util"
import { useFocusEffect } from "@react-navigation/native"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, StatusBar } from "react-native"

import { BackButtonWithPrompt } from "../components/Buttons"
import CardComposition from "../components/CardComposition"
import { db } from "../config/firebase"
import global from "../config/global"


export default function CustomItemCreatorScreen({navigation, route}) {

  // Vendor ID, used for querying purpose
  const { vendorID } = route.params

  // Array containing all compositions
  const [anekaNasi, setAnekaNasi] = useState([])
  const [anekaSayur, setAnekaSayur] = useState([])
  const [anekaLauk, setAnekaLauk] = useState([])
  const [anekaExtra, setAnekaExtra] = useState([])

  // Compositions that have been added to the custom item
  const [addedNasi, setAddedNasi] = useState([])
  const [addedSayur, setAddedSayur] = useState([])
  const [addedLauk, setAddedLauk] = useState([])
  const [addedExtra, setAddedExtra] = useState([])

  // Custom item that just got added
  const [newItem, setNewItem] = useState({})

  // Fetches all compositions from Firestore
  const fetchData = async() => {
    const q = query(collection(db, "compositions"), where("vendorID", "==", vendorID))
    const querySnapshot = await getDocs(q)
    .catch(error => {
      console.log(error.code)
      return -1
    })

    const tempNasi = []
    const tempSayur = []
    const tempLauk = []
    const tempExtra = []

    querySnapshot.forEach(result => {
      let data = result.data()
      data["id"] = result.id
      data["qty"] = 0

      switch(data["category"]) {
        case "nasi":
          if(!addedNasi.includes(data))
            tempNasi.push(data)
          break
        case "sayur":
          if(!addedSayur.includes(data))
            tempSayur.push(data)
          break
        case "lauk":
          if(!addedLauk.includes(data))
            tempLauk.push(data)
          break
        case "extra":
          if(!addedExtra.includes(data))
            tempExtra.push(data)
          break
      }
    })

    setAnekaNasi(tempNasi)
    setAnekaSayur(tempSayur)
    setAnekaLauk(tempLauk)
    setAnekaExtra(tempExtra)
  }

  useEffect(() => {
    if(route.params?.newItem) {
      setNewItem(route.params.newItem)
      let temp = []

      switch(newItem.category) {
        case "nasi":
          temp = addedNasi.slice()
          temp.push(newItem)
          setAddedNasi(temp)
          break
        case "sayur":
          temp = addedSayur.slice()
          temp.push(newItem)
          setAddedSayur(temp)
          break
        case "lauk":
          temp = addedLauk.slice()
          temp.push(newItem)
          setAddedLauk(temp)
          break
        case "extra":
          temp = addedExtra.slice()
          temp.push(newItem)
          setAddedExtra(temp)
          break
      }
    }
    fetchData()
  }, [route.params?.newItem, addedExtra, addedLauk, addedNasi, addedSayur])
  


  // Render compositions based on category
  const renderNasi = () => {
    if(anekaNasi.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Nasi</Text>
          <View style={{ width: "100%", marginBottom: 10, marginTop: 3 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => gotoCompScreen(anekaNasi)}>
            <View style={styles.addItemButton}>
              <Text style={styles.addItemText}>+ Tambah Nasi</Text>
            </View>
          </TouchableOpacity>
          </View>
          { addedNasi.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }
        </View>
      )
  }

  const renderSayur = () => {
    if(anekaSayur.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Sayur</Text>
          <View style={{ width: "100%", marginBottom: 10, marginTop: 3 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => gotoCompScreen(anekaSayur)}>
            <View style={styles.addItemButton}>
              <Text style={styles.addItemText}>+ Tambah sayur</Text>
            </View>
          </TouchableOpacity>
          </View>
          { addedSayur.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }
        </View>
      )
  }

  const renderLauk = () => {
    if(anekaLauk.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Lauk</Text>
          <View style={{ width: "100%", marginBottom: 10, marginTop: 3 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => gotoCompScreen(anekaLauk)}>
            <View style={styles.addItemButton}>
              <Text style={styles.addItemText}>+ Tambah Lauk</Text>
            </View>
          </TouchableOpacity>
          </View>
          { addedLauk.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }
        </View>
      )
  }

  const renderExtra = () => {
    if(anekaExtra.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Extra</Text>
          <View style={{ width: "100%", marginBottom: 10, marginTop: 3 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => gotoCompScreen(anekaExtra)}>
            <View style={styles.addItemButton}>
              <Text style={styles.addItemText}>+ Tambah Extra</Text>
            </View>
          </TouchableOpacity>
          </View>
          { addedExtra.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }
        </View>
      )
  }

  const gotoCompScreen = (list) => {
    navigation.navigate("AddComposition", { vendorID: vendorID, list: list } )
  }
  

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        { /* Screen title text */ }
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButtonWithPrompt {...{navigation}} />
          <Text style={styles.headerText}>Buat Paket Baru</Text>
        </View>

        { renderNasi() }
        { renderSayur() }
        { renderLauk() }
        { renderExtra() }

      </ScrollView>

      <View style={styles.staticContainer}>

        {/* Save and Go Back button */}
        <TouchableOpacity activeOpacity={0.7} style={styles.grayButton}>
          <Text style={styles.buttonText}>Simpan Untuk Nanti</Text>
        </TouchableOpacity>

        {/* Save and Add to Cart button */}
        <TouchableOpacity activeOpacity={0.7} style={styles.greenButton}>
          <Text style={styles.buttonText}>Simpan dan Pesan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },

  scrollContainer: {
    backgroundColor: "white",
    width: "85%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },


  backIcon: {
    color: global.color.primary
  },

  headerText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3,
    marginBottom: 15,
    marginTop: StatusBar.currentHeight + 20
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  categoryHeaderText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginVertical: 7
  },
  
  addItemButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1.3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    borderColor: global.debugMode? "magenta" : global.color.primary
  },

  addItemText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  staticContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
  },

  itemContainer: {
    marginTop: 10,
    width: "90%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  grayButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    elevation: 2
  },

  greenButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    elevation: 2
  },

  buttonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})