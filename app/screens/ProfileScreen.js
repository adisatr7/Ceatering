import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { auth, db } from "../config/firebase"
import Icon from "@expo/vector-icons/Ionicons"

import global from "../config/global"
import { deleteData } from "../components/LocalStorage"


export default function ProfileScreen({navigation}) {

  // Variable hooks
  const [user, setUser] = useState({})

  // Fetch user's profile picture from Firestore
  const fetchUserData = async() => {

    const uid = auth.currentUser.uid

    // Run fetch query
    const unsubListener = onSnapshot(doc(db, `users/${uid}`), doc => {
      
      const temp = doc.data()
      temp["uid"] = doc.id
      setUser(temp)
      
      console.log(user)
    })
  }

  const logoutHandler = () => {
    Alert.alert("Yakin Ingin Keluar Sekarang?", "Kamu akan diminta untuk masuk kembali ke akun kamu untuk dapat menggunakan aplikasi ini lagi", [
      { text: "Batal" },
      { text: "Keluar", onPress: () => {
        auth.signOut()
          .then(() => {
            deleteData("@isFirstRun")
            navigation.replace("Onboarding")
          })
          .catch((error) => {
            alert(error.code)
        })
        
      } }
    ])
  }

  const gotoEditProfile = () => {
    navigation.navigate("EditProfile", { user: user })
  }

  const gotoEditPassword = () => {
    navigation.navigate("EditPassword", { user: user })
  }

  const gotoSavedAddresses = () => {
    navigation.navigate("Addresses")
  }

  const gotoHelpCenter = () => {
    navigation.navigate("Help")
  }

  const gotoSettings = () => {
    navigation.navigate("Settings")
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>

      {/* Green Background */}
      <View style={styles.greenContainer}>

        {/* Screen title */}
        <Text style={styles.screenTitleText}>Profil</Text>

        {/* User profile info container */}
        <View style={{ flexDirection: "row" }}>

          {/* Profile picture */}
          <View style={styles.profilePictureContainer}>
            <Image source={{ uri: user.imageUrl? user.imageUrl : null }} style={styles.profilePicture}/>
          </View>

          <View style={styles.profileInfoContainer}>

            {/* User display name */}
            <Text style={styles.displayNameText}>{user.displayName}</Text>

            {/* User e-mail */}
            <Text style={styles.emailText}>{user.email}</Text>

            {/* Level bar */}
            {/* -> Exp needed to level up = 100 x user level */}
            <View style={{ flexDirection: "row" }}>
              <View style={{
                backgroundColor: "white", 
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
                height: 10,
                width: `${user.exp / user.level}%`,
                marginVertical: 10,
                opacity: 0.85
              }}/>
              <View style={{
                backgroundColor: "white", 
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
                height: 10,
                width: `${100 - (user.exp / user.level)}%`,
                marginVertical: 10,
                opacity: 0.5
              }}/>
            </View>

            {/* User level and exp text container */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

              {/* User level */}
              <Text style={styles.levelText}>Level {user.level}</Text>

              {/* User exp */}
              <Text style={styles.expText}>Exp {user.exp}</Text>
            
            </View>
          </View>
        </View>
      </View>

      {/* Everything below this will be rendered above white background */}
      <View style={styles.buttonsContainer}>

        {/* Go to Edit Profile screen */}
        <ProfileScreenButton icon={"create-outline"} text={"Ubah profil"} onPress={gotoEditProfile}/>

        {/* Go to Change Password screen */}
        <ProfileScreenButton icon={"key-outline"} text={"Ubah Kata Sandi"} onPress={gotoEditPassword}/>

        {/* Go to Gamification screen */}
        <ProfileScreenButton icon={"ribbon-outline"} text={"Misi Harian"}/>

        {/* Go to Address Manager screen */}
        <ProfileScreenButton icon={"location-outline"} text={"Alamat Tersimpan"} onPress={gotoSavedAddresses}/>

        {/* Go to Help Center screen */}
        <ProfileScreenButton icon={"information-circle-outline"} text={"Pusat Bantuan"} onPress={gotoHelpCenter}/>

        {/* Go to Settings screen */}
        <ProfileScreenButton icon={"settings-outline"} text={"Pengaturan"} onPress={gotoSettings}/>

        {/* Logout Button */}
        <ProfileScreenButton icon={"log-out-outline"} text={"Keluar"} onPress={logoutHandler}/>

      </View>


      {/* Margin bottom */}
      <View style={{ height: 100}} />

      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={"light-content"}/>
    </ScrollView>
  )
}


export function ProfileScreenButton({icon, text, onPress}) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
        <Icon name={icon} size={24} />
        <Text style={styles.buttonText}>{text}</Text>
        <Icon style={styles.chevron} name="chevron-forward" size={24} />
      </TouchableOpacity>

      <StatusBar animated translucent backgroundColor={global.color.statusBar} barStyle={"light-content"}/>
    </View>
  )
}


const styles = StyleSheet.create({
  greenContainer: {
    backgroundColor: global.color.primary,
    borderBottomRightRadius: 50,
    paddingBottom: 40,
    paddingLeft: 22,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  screenTitleText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline2,
    marginTop: StatusBar.currentHeight + 20
  },
  
  profilePictureContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 55,
    marginTop: 24,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  profilePicture: {
    borderRadius: 55,
    height: 100,
    width: 100,
    borderWidth: 2.5,
    borderColor: "white",
    resizeMode: "cover"
  },

  profileInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 30,
    marginTop: 20,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  displayNameText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.headline3,
  },
  
  emailText: {
    alignSelf: "flex-start",
    color: "white",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 2
  },

  levelText: {
    textAlign: "left",
    color: "white",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  expText: {
    textAlign: "right",
    color: "white",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body
  },

  buttonsContainer: {
    flex: 1,
    marginTop: 10,
    // paddingHorizontal: 22
  },

  button: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    marginLeft: 20,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  buttonText: {
    fontFamily: global.font.medium,
    fontSize: global.fontSize.body,
    marginLeft: 20
  },

  chevron: {
    position: "absolute",
    right: 18
  }
})