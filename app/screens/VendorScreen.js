import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { db } from "../config/firebase"
import global from "../config/global"


export default function VendorScreen({ navigation, route }) {
  
  const [vendor, setVendor] = useState({})
  const [bundlesArray, setBundlesArray] = useState([])
  const [itemList, setItemList] = useState([])

  const { vendorID } = route.params

  /**
   * Fetches vendor data from Firestore based on given vendor ID
   * and stores it into vendorData state hook
   * 
   * @param {*} vendorID 
   */
  const fetchVendorData = async(vendorID) => {
    const querySnapshot = await getDoc(doc(db, "vendors", vendorID))
    .then(value => setVendor(value.data()))
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
      temp.push(result.data())
    })

    setBundlesArray(temp)
  }

  useEffect(() => {
    const temp = []

    fetchVendorData(vendorID)
    temp.push(vendor)

    fetchBundlesData(vendorID)
    for(let bundle of bundlesArray) {
      temp.push(bundle)
    }

    setItemList(temp)
    console.log(itemList)
  }, [])
  
  return (
    <View style={styles.mainContainer}>

      <FlatList
        data={itemList}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {

          // If current item is a vendor object
          if(item.address) {
            return (
              <View style={styles.thumbnailContainer}>
                {/* Thumbnail */}
                <Image source={{ uri: item.imageUrl }} style={styles.vendorImage} />

                {/* Vendor Info */}
                <View style={styles.vendorInfoContainer}>
                  <Text style={styles.vendorNameText}>{item.name}</Text>
                  <Text style={styles.vendorAddressText}>{item.address}</Text>
                </View>

                <View style={{ backgroundColor: "black", height: 1, width: "93%", marginTop: 12 }}/>
              </View>
            )
          }

        }}
      />
      
      

      
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",

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
    width: "90%"
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


})