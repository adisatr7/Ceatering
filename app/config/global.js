import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito"


export default {
  debugMode: true,
  
  color: {
    primary: "#19B200",
    secondary: "",
    statusBar: "rgba(0, 0, 0, 0.3)",
    lightGray: "#c7c7c7"
  },

  font: {
    regular: "Nunito_400Regular",
    medium: "Nunito_500Medium",
    semibold: "Nunito_600SemiBold",
    bold: "Nunito_700Bold"
  },

  fontArray: { 
    Nunito_400Regular, 
    Nunito_500Medium, 
    Nunito_600SemiBold, 
    Nunito_700Bold 
  },

  fontSize: {
    headline1: 32,
    headline2: 28,
    headline3: 22,
    body: 14,
    caption: 12
  },

  styles: {
    brandlogo: {
      alignSelf: "center",
      resizeMode: "stretch",
      height: 110,
      width: 120,
      marginTop: 15,

      borderWidth: global.debugMode ? 1 : 0,
      borderColor: "magenta"
    },

  },
}