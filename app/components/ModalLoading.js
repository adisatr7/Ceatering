import { Modal, StyleSheet, Text, View } from "react-native"
import { Flow } from "react-native-animated-spinkit"

import global from "../config/global"


export default function ModalLoading({visible, title, caption}) {

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.darkOverlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.caption}>{caption}</Text>
          <Flow color={global.color.primary} size={40} style={styles.animation} />
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({

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
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    maxWidth: "90%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  title: {
    alignSelf: "flex-start",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
  },

  caption: {
    alignSelf: "flex-start",
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 10
  },

  animation: {
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 30
  }
})