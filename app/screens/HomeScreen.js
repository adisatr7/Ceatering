import { useCallback, useState } from "react"
import { View, Text, StatusBar, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from "react-native"
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"
import { LinearGradient } from "expo-linear-gradient"
import global from "../config/global"

import CardVendor from "../components/CardVendor"
import { CartButton } from "../components/Buttons"
import { auth, db } from "../config/firebase"
import { useFocusEffect } from "@react-navigation/native"


export default function HomeScreen({ navigation }) {

  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  // Database related things
  const [vendors, setVendors] = useState([])
  const [userData, setUserData] = useState({})

  // Fetch user's profile picture from Firestore
  const fetchUserData = async() => {

    const uid = auth.currentUser.uid

    // Run fetch query
    const unsubListener = onSnapshot(doc(db, `users/${uid}`), doc => {
      
      const temp = doc.data()
      temp["uid"] = doc.id
      setUserData(temp)
    })
  }
  
  // Fetch all vendors data from Firestore
  const fetchVendorsData = async() => {
    const temp = []
    const querySnapshot = await getDocs(collection(db, "vendors"))

    querySnapshot.forEach(doc => {

      // Destructure fetched object so the data can be combined with vendor ID
      const { acceptsCustomItem, address, coordinate, imageUrl, name } = doc.data()

      // Push the destructured properties into the array alongside vendor ID
      temp.push({ vendorID: doc.id, name, address, imageUrl, coordinate, acceptsCustomItem})
    })
    setVendors(temp)
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserData()
      fetchVendorsData()
    }, [])
  )

  return (
    <View>
      
      <ScrollView style={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.greenBackground}>
          <Text style={styles.headerText}>Beranda</Text>

          {/* Profile picture */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Profile")} style={styles.profilePictureContainer}>
            <Image source={{ uri: userData.imageUrl? userData.imageUrl : null }} style={styles.profilePicture}/>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteBackground}>

          {/* Advertisement section */}
          <TouchableOpacity activeOpacity={0.7} style={styles.adContainer} >
            <Image style={{height: "100%", width: "100%", borderRadius: 10}} source={{uri: "https://suryasemesta.com/wp-content/uploads/sites/43/2020/04/acf2033b-contoh-kalimat-promosi-makanan-yang-menarik-dan-sering-digunakan.jpg"}}/>
            <LinearGradient start={{ x: 0.5, y: 0.55 }} end={{ x: 0.5, y: 0.95 }} colors={["transparent", "black"]} style={styles.darkOverlay}/>
            <Text style={styles.adText}>Iklan</Text>
          </TouchableOpacity>

          {/* Recommended */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Rekomendasi</Text>
            <View style={styles.sectionListContainer}>
              <FlatList
                data={vendors.slice().sort(() => Math.random() - 0.5)}
                renderItem={({item}) => <CardVendor vendor={item} onPress={() => navigation.navigate("Vendor", { vendorID: item.vendorID } )} />}
                keyExtractor={(item) => item.vendorID}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Populer */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionNameText}>Populer</Text>
            <View style={styles.sectionListContainer}>
              <FlatList
                data={vendors.slice().sort(() => Math.random() - 0.5)}
                renderItem={({item}) => <CardVendor vendor={item} onPress={() => navigation.navigate("Vendor", { vendorID: item.vendorID } )} />}
                keyExtractor={(item) => item.vendorID}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Void (bottom margin) */}
          <View style={{ height: 50 }}/>

        </View>
      </ScrollView>
      
      <CartButton/>

      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={hasScrolledDown? "dark-content" : "light-content"}/>
    </View>
  )
}


const homeScreenElements = {
  offset: 50,
  marginVertical: 7
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  whiteBackground: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: "6%",
    backgroundColor: "white"
  },
  
  greenBackground: {
    backgroundColor: global.color.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    height: StatusBar.currentHeight + 155,
    width: "100%"
  },
  
  headerText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline2,
    marginLeft: 22,
    marginTop: StatusBar.currentHeight + 20
  },

  profilePictureContainer: {
    backgroundColor: "white",
    borderRadius: 55,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    marginRight: 22,
    marginTop: StatusBar.currentHeight + 26,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  profilePicture: {
    borderRadius: 55,
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "white",
    resizeMode: "cover"
  },

  adContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 10,
    height: 150,
    width: "100%",
    bottom: homeScreenElements.offset,
    marginBottom: homeScreenElements.marginVertical
  },

  adText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    position: "absolute",
    color: "white",
    bottom: 3,
  },

  darkOverlay: {
    opacity: 0.9,
    borderRadius: 10,
    height: "50%", 
    width: "100%",
    position: "absolute",
    bottom: 0,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  sectionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    bottom: homeScreenElements.offset,
    marginVertical: 10
  },

  sectionNameText: {
    color: "black",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginBottom: 6
  },

  showMoreContainer: {

  },

  showMoreText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  sectionListContainer: {
    alignSelf: "flex-start",
    width: "100%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})