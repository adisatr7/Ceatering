import { async } from "@firebase/util"
import { useFocusEffect } from "@react-navigation/native"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useCallback, useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { BackButton } from "../components/Buttons"
import CardComposition from "../components/CardComposition"
import { db } from "../config/firebase"
import global from "../config/global"


export default function NewCustomItemScreen({navigation, route}) {

  const { vendorID } = route.params

  const [anekaNasi, setAnekaNasi] = useState([])
  const [anekaSayur, setAnekaSayur] = useState([])
  const [anekaLauk, setAnekaLauk] = useState([])
  const [anekaExtra, setAnekaExtra] = useState([])

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

      switch(data["category"]) {
        case "nasi":
          tempNasi.push(data)
          break
        case "sayur":
          tempSayur.push(data)
          break
        case "lauk":
          tempLauk.push(data)
          break
        case "extra":
          tempExtra.push(data)
          break
        default:
          break
      }
    })

    setAnekaNasi(tempNasi)
    setAnekaSayur(tempSayur)
    setAnekaLauk(tempLauk)
    setAnekaExtra(tempExtra)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  const renderNasi = () => {
    if(anekaNasi.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Nasi</Text>

          { anekaNasi.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }

        </View>
      )
  }

  const renderSayur = () => {
    if(anekaSayur.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Sayur</Text>

          { anekaSayur.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }

        </View>
      )
  }

  const renderLauk = () => {
    if(anekaLauk.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Lauk</Text>

          { anekaLauk.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }

        </View>
      )
  }

  const renderExtra = () => {
    if(anekaExtra.length > 0)
      return (
        <View>
          <Text style={styles.categoryHeaderText}>Extra</Text>

          { anekaExtra.map(item => { return <CardComposition key={item.id} {...{item}}/> }) }

        </View>
      )
  }


  // -- Main --
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Screen title text */ }
        <Text style={styles.headerText}>Buat Paket Baru</Text>

        { renderNasi() }
        { renderSayur() }
        { renderLauk() }
        { renderExtra() }

      </ScrollView>

      <View style={styles.staticContainer}>

        {/* Save and Go Back button */}
        <TouchableOpacity activeOpacity={0.7} style={styles.grayButton}>
          <Text style={styles.grayButtonText}>Simpan dan Pesan</Text>
        </TouchableOpacity>

        {/* Save and Add to Cart button */}
        <TouchableOpacity activeOpacity={0.7} style={styles.greenButton}>
          <Text style={styles.greenButtonText}>Simpan dan Pesan</Text>
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
    marginBottom: 20
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
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

  categoryHeaderText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginVertical: 7
  },

  grayButton: {
    backgroundColor: "silver",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    elevation: 2
  },

  grayButtonText: {
    color: "black",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
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

  greenButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})