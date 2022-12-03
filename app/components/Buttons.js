import { TouchableOpacity, StatusBar, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import global from "../config/global"


export function BackButton({navigation}) {

  const backButtonHandler = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.backButton} onPress={backButtonHandler} >
      <Icon name="arrow-back" size={18} style={styles.backIcon}/>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  backButton: {
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: 15,
    marginRight: 12,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    width: 40,
    elevation: 2,
    shadowColor: global.shadowColor,
    shadowOpacity: global.shadowOpacity,

    borderWidth: global.debugMode ? 0 : 0,
    borderColor: "magenta"
  },

  backIcon: {
    color: global.color.primary
  },
})