import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { auth, db } from "../config/firebase"
import global from "../config/global"


export default function ProfileScreen({navigation}) {

  // Variable hooks
  const [profilePicture, setProfilePicture] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  // Fetch user's profile picture from Firestore
  const fetchUserData = async() => {

    // Get user's ID
    const uid = auth.currentUser.uid

    // Run fetch query
    const unsubListener = onSnapshot(doc(db, `users/${uid}`), doc => {

      // Destructure fetched data
      const { displayName, email, imageUrl } = doc.data()
  
      // Update user's display name, email, and profile picture in the app
      setDisplayName(displayName)
      setUserEmail(email)
      setProfilePicture(imageUrl? {uri: imageUrl} : null)
    })

    
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView style={StyleSheet.scrollContainer}>

        {/* Header title */}
        <Text style={styles.headerText}>Profil</Text>

        {/* Profile picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={profilePicture} style={styles.profilePicture}/>
        </View>

        {/* Display name */}
        <Text style={styles.displayNameText}>{displayName}</Text>

        {/* User email */}
        <Text style={styles.emailText}>{userEmail}</Text>

      </ScrollView>

      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={"dark-content"}/>
    </View>
  )
}


const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "blue",
    height: "100%",
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  headerText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline2,
    marginLeft: 22,
    marginTop: StatusBar.currentHeight + 20
  },

  profilePictureContainer: {
    alignSelf: "center",
    backgroundColor: global.color.primary,
    borderRadius: 55,
    marginTop: 24,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  profilePicture: {
    borderRadius: 55,
    height: 110,
    width: 110,
    resizeMode: "cover"
  },

  displayNameText: {
    alignSelf: "center",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3,
    marginTop: 12,
  },

  emailText: {
    alignSelf: "center",
    color: "gray",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
  }
})