import { useState } from "react"
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, Pressable, View } from "react-native"

import global from "../config/global"


export default function ModalQtyPrompt({item, setItem, visible, title, caption, onCancel, onSubmit}) {

  const [warning, setWarning] = useState("")
  const [qtyInput, setQtyInput] = useState(item.qty > 0? item.qty : 1)

  const submitHandler = () => {
    if(qtyInput >= 0) {
      const temp = item
      temp["qty"] = qtyInput
      setItem(temp)
      onSubmit()
    }
    
    else
      setWarning("Jumlah tidak boleh kurang dari 0!")
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Pressable onPress={onCancel}>
        <View style={styles.darkOverlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Tambahkan {title}?</Text>

            <View style={{ flexDirection: "row", marginTop: 15, alignSelf: "center" }}>
              <Text style={styles.caption}>{caption}</Text>
              <TextInput
                autoFocus
                selectTextOnFocus
                defaultValue={qtyInput.toString()}
                numberOfLines={1}
                keyboardType="numeric"
                onChangeText={(text) => setQtyInput(text)}
                style={styles.input}
                textAlign="center"
              />
            </View>

            {/* Error messages */}
            <Text style={styles.warningText}>{warning}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

              { /* Cancel button */ }
              <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Batalkan</Text>
              </TouchableOpacity>

              { /* Submit button */ }
              <TouchableOpacity activeOpacity={0.7} style={styles.submitButton} onPress={submitHandler}>
                <Text style={styles.buttonText}>Tambah</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Pressable>
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
    marginRight: 15,
    marginTop: 10
  },

  warningText: {
    alignSelf: "flex-start",
    color: "red",
    fontFamily: global.font.semibold,
    fontSize: global.fontSize.body,
    marginTop: 10
  },

  input: {
    borderColor: "silver",
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    width: 50,

  },

  cancelButton: {
    backgroundColor: "silver",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    // width: "100%",
    marginTop: 20,
    marginRight: 10,
    paddingHorizontal: 25,
    elevation: 2
  },

  submitButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    height: 40,
    // width: "100%",
    marginTop: 20,
    marginLeft: 10,
    paddingHorizontal: 25,
    elevation: 2
  },

  buttonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }
})