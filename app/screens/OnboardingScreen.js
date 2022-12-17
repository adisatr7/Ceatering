import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, FlatList, StatusBar, Animated, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import { loadString, saveString } from "../components/LocalStorage"
import slides from "../components/onboarding/slidesArray"
import OnboardingSlide from "../components/onboarding/OnboardingSlide"
import global from "../config/global"
import Paginator from "../components/onboarding/Paginator"


export default function OnboardingScreen({navigation}) {
  
  // Onboarding related stuff
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)
  
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentSlide(viewableItems[0].index)
  }).current
  
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current
  
  
  // Next/Prev button handler
  const renderPrevButton = () => {
    if(currentSlide > 0) {
      return (
        <TouchableOpacity activeOpacity={0.7} style={styles.prevButtonContainer} onPress={prevSlide}>
          <Icon name="arrow-back" size={16} style={styles.prevButtonIcon} />
          <Text style={styles.prevButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
      )
    }
  }
  
  const prevSlide = () => {
    if(currentSlide > 0) {
      slidesRef.current.scrollToIndex({ index: currentSlide -1 })
    } else {
      console.log("First slide")
    }
  }
  
  const renderNextButton = () => {
    // "Next Slide" button
    if(currentSlide < slides.length -1) {
      return (
        <TouchableOpacity activeOpacity={0.7} style={styles.nextButtonContainer} onPress={nextSlide}>
          <Text style={styles.nextButtonText}>Selanjutnya</Text>
          <Icon name="arrow-forward" size={16} style={styles.nextButtonIcon} />
        </TouchableOpacity>
      )
    }
    
    // "Continue to App" button
    else {
      return (
        <TouchableOpacity activeOpacity={0.7} style={styles.startAppButtonContainer} onPress={closeOnboarding}>
          <Text style={styles.startAppButtonText}>Buat Pesanan</Text>
          <Icon name="restaurant" size={16} style={styles.startAppButtonIcon} />
        </TouchableOpacity>
      )
    }
  }
  
  const nextSlide = () => {
    if(currentSlide < slides.length -1) {
      slidesRef.current.scrollToIndex({ index: currentSlide +1 })
    } else {
      console.log("Last slide")
    }
  }
  
  const closeOnboarding = () => {
    saveString("@isFirstRun", "false")
    navigation.replace("Login")
  }
  
  const checkIfFirstTime = () => {
    loadString("@isFirstRun").then((value) => {
      if(value === "false")
      closeOnboarding()
    })
  }
  
  useEffect(() => {
    checkIfFirstTime()
  })
  
  // -- Main --
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={slides}
        renderItem={ ({item}) => <OnboardingSlide item={item} /> }
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        keyExtractor={ (item) => item.id }
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        onScroll={
          Animated.event( [{
            nativeEvent: {contentOffset: {x: scrollX}}
          }],
          {useNativeDriver: false}
        )}
      />
      
      <Text style={styles.skipText} onPress={closeOnboarding}>Lewati</Text>
      
      { renderPrevButton() }
      { renderNextButton() }

      <View style={styles.paginator}>
        <Paginator data={slides} scrollX={scrollX}/>
      </View>

      <StatusBar hidden={true}/>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },

  textContainer: {
    height: "100%",
    width: "95",
    flexDirection: "column",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  skipText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    position: "absolute",
    alignSelf: "flex-end",
    color: "white",
    marginVertical: 50,
    right: 26,

    borderWidth: global.debugMode? 1 : 0,
    borderColor: "magenta"
  },

  prevButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 26,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  prevButtonText: {
    color: "white",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    textAlign: "left"
  },

  prevButtonIcon: {
    color: "white",
    marginRight: 7
  },

  nextButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 26,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  nextButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    textAlign: "right"
  },

  nextButtonIcon: {
    color: "white",
    marginLeft: 7
  },

  startAppButtonContainer: {
    position: "absolute",
    bottom: 36,
    right: 26,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "green",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    
    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  startAppButtonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body,
    textAlign: "right"
  },

  startAppButtonIcon: {
    color: "white",
    marginLeft: 4
  },

  paginator: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-start",
    bottom: 140,
    left: 20,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})