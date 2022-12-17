import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useFonts } from "@expo-google-fonts/nunito"
import AppLoading from "expo-app-loading"

import { loadString } from "./app/components/LocalStorage"
import global from "./app/config/global"

import OnboardingScreen from "./app/screens/OnboardingScreen"
import LoginScreen from "./app/screens/LoginScreen"
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen"
import RegisterScreen from "./app/screens/RegisterScreen"
import BottomTabNav from "./app/components/BottomTabNav"
import VendorScreen from "./app/screens/VendorScreen"
import EditProfileScreen from "./app/screens/EditProfileScreen"
import EditPasswordScreen from "./app/screens/EditPasswordScreen"
import SettingsScreen from "./app/screens/SettingsScreen"
import HelpCenterScreen from "./app/screens/HelpCenterScreen"
import SavedAddressesScreen from "./app/screens/SavedAddressesScreen"

const Stack = createStackNavigator()


export default function App() {

  const isFirstTime = async() => {
    loadString("@isFirstRun").then((value) => {
      return (value === "false")
    })
  }

  // Load custom fonts
  let [fontsLoaded] = useFonts(global.fontArray)
  if(!fontsLoaded)
    <AppLoading/>
  
  else
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isFirstTime? "Onboarding" : "Login"}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Main" component={BottomTabNav}/>
            <Stack.Screen name="Vendor" component={VendorScreen}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
            <Stack.Screen name="EditPassword" component={EditPasswordScreen}/>
            <Stack.Screen name="Addresses" component={SavedAddressesScreen}/>
            <Stack.Screen name="Help" component={HelpCenterScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
});
