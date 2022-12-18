import { Modal, StyleSheet, Text, View } from "react-native"
import Lottie from "lottie-react-native"



export default function LoadingFinishedModal({visible, onFinish}) {

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.darkOverlay}>
        <View style={styles.container}>


          <Text>Testaaa</Text>
          <Lottie source={require("../assets/animations/loadingcomplete.json")} />
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modal: {

  },

  darkOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    height: 200,
    width: 300,

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  }
})