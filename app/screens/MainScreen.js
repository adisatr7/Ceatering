import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import * as Icon from "@expo/vector-icons/"

import global from "../config/global"

// Import Screens
import HomeScreen from "./HomeScreen"
import SearchScreen from "./SearchScreen"
import ScheduleScreen from "./ScheduleScreen"
import FavoritesScreen from "./FavoritesScreen"
import ProfileScreen from "./ProfileScreen"
import { useState } from "react"


const Tab = createBottomTabNavigator()


export default function MainScreen({navigation}) {

  const [midButtonPressed, setMidButtonPressed] = useState(false)

  const MiddleButton = ({children, onPress}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.midButton}
    >
      <View>
        {children}
      </View>
    </TouchableOpacity>
  )
  
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        backBehavior="initialRoute"
        initialRouteName="Home"
        screenOptions={ ({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if(route.name === "Home") {
              if(focused)
                return <Image source={require("../assets/navigation/nav_home_active.png")} style={styles.icon}/>
              else
                return <Image source={require("../assets/navigation/nav_home_inactive.png")} style={styles.icon}/>
            }

            else if(route.name === "Search") {
              if(focused)
              return <Icon.Ionicons name="search" color={global.color.primary} size={23}/>
              else
              return <Icon.Ionicons name="search-outline" color={global.color.primary} size={23}/>
            }
            
            else if(route.name === "Schedule") {
              if(focused)
                return <Image source={require("../assets/navigation/nav_schedule_active.png")} style={styles.middleIcon}/>
              else
                return <Image source={require("../assets/navigation/nav_schedule_inactive.png")} style={styles.middleIcon}/>
            }
              
            else if(route.name === "Favorites") {
              if(focused)
                return <Icon.Ionicons name="heart" color={global.color.primary} size={23}/>
              else
                return <Icon.Ionicons name="heart-outline" color={global.color.primary} size={23}/>
            }

            else if(route.name === "Profile") {
              if(focused)
                return <Image source={require("../assets/navigation/nav_profile_inactive.png")} style={styles.icon}/>
              else
                return <Image source={require("../assets/navigation/nav_profile_inactive.png")} style={styles.icon}/>
            }
          },

          tabBarLabelStyle: styles.textLabel,

          tabBarStyle: {
            backgroundColor: "white",
            backfaceVisibility: "hidden",
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            marginBottom: 10,
            marginHorizontal: 10,
          },

          // tabBarBackground: () => {
          //   return (
          //     <View style={styles.mainContainer}>
          //       <ImageBackground style={{ height: "100%", width: "100%" }} imageStyle={styles.background} source={require("../assets/navigation/navbar_bg.png")}/>
          //     </View>
          //   )
          // }
        })}

      >
        <Tab.Screen name="Home" options={{headerShown: false, tabBarLabel: "Beranda"}} component={HomeScreen}/>
        <Tab.Screen name="Search" options={{headerShown: false, tabBarLabel: "Pencarian"}} component={SearchScreen}/>
        <Tab.Screen name="Schedule" options={{tabBarButton: (props) => (<MiddleButton {...props}/>), headerShown: false, tabBarLabel: "", tabBarLabelStyle: {position: "absolute"}}} component={ScheduleScreen}/>
        <Tab.Screen name="Favorites" options={{headerShown: false, tabBarLabel: "Favorit"}} component={FavoritesScreen}/>
        <Tab.Screen name="Profile" options={{headerShown: false, tabBarLabel: "Profil"}} component={ProfileScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  )
}


const midButtonOptions = {

}

const styles = StyleSheet.create({
  mainContainer: {
    top: 600,
    flexDirection: "row",
    width: "100%",
    height: 60,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  background: {
    resizeMode: "cover",
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,
    shadowOffset: { height: 1 },

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  icon: {
    height: 24,
    width: 24,
    elevation: 2,
  },

  
  // inactiveIcon: {
    //   height: 24,
    //   width: 24
    // },
    
  textLabel: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.caption
  },
  
  midButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: global.color.primary,
    borderRadius: 50,
    height: 58,
    width: 58,
    bottom: 30,
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },
  
  middleIcon: {
    height: 32,
    width: 32
  }
})