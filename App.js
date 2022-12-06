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
import MainScreen from "./app/screens/MainScreen"
import { auth } from "./app/config/firebase"


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

    // return <MainScreen/>

    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isFirstTime? "Onboarding" : "Login"}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/>
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
