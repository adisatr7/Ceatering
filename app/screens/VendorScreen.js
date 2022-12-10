import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { useState } from "react"
import { StyleSheet, View } from "react-native"


export default function VendorScreen({navigation, vendorID}) {
  
  const [vendorData, setVendorData] = useState({})
  const [bundlesArray, setBundlesArray] = useState([])

  /**
   * Fetches vendor data from Firestore based on given vendor ID
   * and stores it into vendorData state hook
   * 
   * @param {*} vendorID 
   */
  const fetchVendorData = (vendorID) => {
    const querySnapshot = getDoc(db, `vendors/${vendorID}`)

    querySnapshot.then(value => {
      setVendorData(value.data())
      console.log(`Vendor data: ${vendorData}`)
    })
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

    const temp = []
    querySnapshot.forEach(result => {
      temp.push(result.data())
    })
    setBundlesArray(temp)
    console.log(`This vendor sells these bundles: ${bundlesArray}`)
  }
  
  return (
    <View style={styles.mainContainer}>

    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  vendorImage: {},

  
})