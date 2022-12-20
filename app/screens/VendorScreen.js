import { useCallback, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import Icon from "@expo/vector-icons/Ionicons"

import { BackButton } from "../components/Buttons"
import { db } from "../config/firebase"
import global from "../config/global"
import CardItem from "../components/CardItem"


export default function VendorScreen({ navigation, route }) {
  
  const [vendor, setVendor] = useState({})
  const [bundles, setBundles] = useState([])
  const [compositions, setCompositions] = useState([])
  const [savedCustomItems, setSavedCustomItems] = useState([])

  const { vendorID } = route.params

  /**
   * Fetches vendor data from Firestore based on given vendor ID
   * and stores it into vendorData state hook
   * 
   * @param {*} vendorID 
   */
  const fetchVendorData = async(vendorID) => {
    const querySnapshot = await getDoc(doc(db, "vendors", vendorID))
    .then(doc => setVendor(doc.data()))
    .catch(error => console.log(error.code))
  }

  /**
   * Fetches data for bundles that are sold by this vendor
   * and stores it into bundlesArray state hook
   * 
   * @param {*} vendorID 
   */
  const fetchBundlesData = async(vendorID) => {
    const q = query(collection(db, "bundles"), where("vendorID", "==", vendorID))
    const querySnapshot = await getDocs(q)
    .catch(error => {
      console.log(error.code)
      return -1
    })

    const temp = []
    querySnapshot.forEach(result => {
      let data = result.data()
      data["id"] = result.id
      temp.push(data)
    })

    setBundles(temp)
  }

  useFocusEffect(
    useCallback(() => {
      fetchVendorData(vendorID)
      // TODO: Fetch custom item ingredients
      // TODO: Fetch saved custom items
      fetchBundlesData(vendorID)
  
    }, [])
  )

  // Renders (or not) stuff that are only shown if vendor accepts custom item order
  const renderNewCustomItemButton = () => {
    if(vendor.acceptsCustomItem) {
      return (
        <View style={{ width: "88%", marginTop: 3 }}>
          <Text style={styles.categoryHeaderText}>Ingin coba hal baru?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("NewCustomItem", { vendorID: vendorID })}>
            <View style={styles.newCustomItemButton}>
              <Icon name="restaurant-outline" size={styles.newCustomItemIcon.size} style={styles.newCustomItemIcon}/>
              <Text style={styles.newCustomItemText}>Buat paket sendiri</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View>

      {/* Back button */}
      <View style={styles.backbutton}>
        <BackButton navigation={navigation}/>
      </View>
      
      <ScrollView contentContainerStyle={styles.mainContainer}>

        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: vendor.imageUrl }} style={styles.vendorImage} />
        </View>

        {/* Vendor Info */}
        <View style={styles.vendorInfoContainer}>
          <Text style={styles.vendorNameText}>{vendor.name}</Text>
          <Text style={styles.vendorAddressText}>{vendor.address}</Text>
        </View>

        {/* Divider */}
        <View style={{ backgroundColor: "black", height: 1, width: "90%", marginTop: 12 }}/>
      
        {/* "Create custom item" button will appear if the vendor accepts such request */}
        { renderNewCustomItemButton() }

        {/* If user has created a custom item before, they will be listed here */}

        {/* Bundles */}
        <View style={styles.itemContainer}>
          <Text style={styles.categoryHeaderText}>Menu Paket</Text>
          { bundles.map(item => <CardItem key={item.id} item={item} navigation={navigation} /> ) }
        </View>

        {/* End of the line text */}
        <Text style={styles.endOfResultText}>Akhir dari daftar menu makanan.</Text>

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    alignItems: "center",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  backbutton: {
    position: "absolute",
    left: 20,
    zIndex: 3,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  thumbnailContainer: {
    alignItems: "center",
    height: 210,
    width: "100%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  vendorImage: {
    height: "100%",
    width: "100%",

    alignItems: "center",
    resizeMode: "cover",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  vendorInfoContainer: {
    width: "88%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  vendorNameText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginTop: 12
  },

  vendorAddressText: {
    color:"gray",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginTop: 3
  },

  newCustomItemButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    borderColor: global.debugMode? "magenta" : "black"
  },

  newCustomItemIcon: {
    size: 20,
    marginRight: 6
  },

  newCustomItemText: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
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

  endOfResultText: {
    alignSelf: "center",
    color: "grey",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.caption,
    marginTop: 5,
    marginBottom: 50
  }
})