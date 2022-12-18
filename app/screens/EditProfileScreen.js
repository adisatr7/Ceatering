import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Text, SafeAreaView, StatusBar, StyleSheet, View, Image, TextInput, Pressable, TouchableOpacity, ScrollView, Alert } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker"

import { BackButton } from "../components/Buttons"
import { auth, db, storage } from "../config/firebase"
import global from "../config/global"
import { ref, uploadBytes } from "firebase/storage"
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth"


export default function EditProfileScreen({navigation, route}) {

  // Get user's current (old) email and display name
  const {user} = route.params

  // Input hooks
  const [newEmail, setNewEmail] = useState(user.email)
  const [newDisplayName, setNewUsername] = useState(user.displayName)
  const [newImageUrl, setNewImageUrl] = useState("")

  // Input handlers
  const emailInputHandler = (enteredEmail) => {
    setNewEmail(enteredEmail)
  }

  const usernameInputHandler = (enteredEmail) => {
    setNewUsername(enteredEmail)
  }
  

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    
    console.log(result)
    
    if (!result.canceled) {
      setNewImageUrl(result.assets[0].uri)
    }
  }
  

  const uploadImageAsync = async() => {
    
    const response = await fetch(newImageUrl).catch(e => console.log(e))
    const blob = await response.blob().catch(e => console.log(e))
    const filename = newImageUrl.substring(newImageUrl.lastIndexOf("/") +1)
    
    let uploadDirRef = ref(storage, `ProfilePictures/${user.uid}/${filename}`)
    uploadBytes(uploadDirRef, blob, {contentType: "image"})
  }
  

  const updateUserData = async() => {
    await updateDoc(doc(db, "users", user.uid), {
      displayName: newDisplayName,
      email: newEmail,
      imageUrl: newImageUrl? newImageUrl : user.imageUrl,
    })
    .catch(error => console.log(error.code))
  }


  const updateUserAuth = async() => {
    
    // Updates display name and URL to user's profile picture
    updateProfile(user, {
      displayName: newDisplayName,
      photoURL: newImageUrl
    })

    // Updates user's email used to login (only if it's changed)
    if(user.email !== newEmail) {
      updateEmail(user, newEmail).catch(e => console.log(e))
      sendEmailVerification(user)
    }
  }
  
  const submitHandler = () => {
    
    // Update profile picture
    uploadImageAsync()
      
    // Update user data in Firestore
    updateUserData()
    
    // Update user auth
    updateUserAuth()
    
    // Update done, user is brought back to previous screen
    Alert.alert("Perubahan Tersimpan!", "Data profil kamu berhasil diubah!")
    navigation.goBack()
    }
    
    // -- Main --
    return (
      <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        <BackButton navigation={navigation} />

        { /* Screen title text */ }
        <Text style={styles.headerText}>Ubah Profil</Text>

        {/* Profile picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: newImageUrl? newImageUrl : user.imageUrl? user.imageUrl : null }} style={styles.profilePicture}/>

          {/* Change picture button */}
          <TouchableOpacity activeOpacity={0.9} style={styles.editPictureButton} onPress={pickImageHandler}>
            <Icon name="camera-outline" color="white" size={26} />
          </TouchableOpacity>

        </View>

        { /* Email input */ }
        <Text style={styles.inputLabel}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoCapitalize="none"
            autoComplete="email" 
            clearButtonMode="always" 
            defaultValue={user.email}
            keyboardType="email-address"
            onChangeText={emailInputHandler} 
            style={styles.inputField} 
          />
        </View>

        { /* Username input */ }
        <Text style={styles.inputLabel}>Nama Pengguna</Text>
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={styles.leftIcons.size} style={styles.leftIcons} />
          <TextInput 
            autoCapitalize="words" 
            autoComplete="name" 
            textContentType="name"
            clearButtonMode="always"
            defaultValue={user.displayName}
            onChangeText={usernameInputHandler}
            style={styles.inputField}
          />
        </View>

        { /* Submit button */ }
        <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>

      </ScrollView>
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

  container: {
    backgroundColor: "white",
    height: "100%",
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

  profilePictureContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 65,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  profilePicture: {
    borderRadius: 65,
    height: 120,
    width: 120,
    borderWidth: 2.5,
    borderColor: "white",
    resizeMode: "cover"
  },

  editPictureButton: {
    position: "absolute",
    bottom: -5,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: global.color.primary,
    borderRadius: 25,
    height: 45,
    width: 45,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  inputLabel: {
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    marginTop: 10
  },

  inputContainer: {
    borderColor: global.color.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10
  },

  leftIcons: {
    marginRight: 6,
    opacity: 0.5,
    size: 20
  },

  inputField: {
    width: "89%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  submitButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    marginTop: 35,
    paddingHorizontal: 15,
    elevation: 2
  },

  submitButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})