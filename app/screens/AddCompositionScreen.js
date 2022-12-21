import { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View, ScrollView, StatusBar } from "react-native"

import { BackButton } from "../components/Buttons"
import CardItem from "../components/CardItem"
import ModalQtyPrompt from "../components/ModalQtyPrompt"
import global from "../config/global"


export default function AddCompositionScreen({navigation, route}) {

  const { vendorID, list } = route.params
  
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({ name: "", qty: 0 })

  const askForQuantity = (item) => {
    setModalIsVisible(true)
    setSelectedItem(item)
  }

  const addComposition = () => {
    setModalIsVisible(false)
    navigation.navigate("CustomItemCreator", { vendorID: vendorID, newItem: selectedItem })
  }

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
        
        { /* Screen title text */ }
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton {...{navigation}} />
          <Text style={styles.headerText}>Tambah {list[0].category}</Text>
        </View>

        <ModalQtyPrompt 
          title={selectedItem.name} 
          caption="Masukkan jumlah:" 
          item={selectedItem} 
          setItem={setSelectedItem} 
          visible={modalIsVisible}
          onSubmit={addComposition}
          onCancel={() => setModalIsVisible(false)}
        />

        { list.map(item => { if(item.qty == 0) return <CardItem onPress={() => askForQuantity(item)} key={item.id} {...{item}} /> })}

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

  scrollContainer: {
    backgroundColor: "white",
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
    marginBottom: 15,
    marginTop: StatusBar.currentHeight + 20
  },

  captionText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.body,
    marginTop: 8
  },

  categoryHeaderText: {
    fontFamily: global.font.regular,
    fontSize: global.fontSize.headline3,
    marginVertical: 7
  },
  
  addItemButton: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1.3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    borderColor: global.debugMode? "magenta" : global.color.primary
  },

  addItemText: {
    color: global.color.primary,
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  },

  staticContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
  },

  itemContainer: {
    marginTop: 10,
    width: "90%",

    borderWidth: global.debugMode ? 1 : 0,
    borderColor: "magenta"
  },

  grayButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    elevation: 2
  },

  greenButton: {
    backgroundColor: global.color.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    elevation: 2
  },

  buttonText: {
    color: "white",
    fontFamily: global.font.bold,
    fontSize: global.fontSize.body
  }

})