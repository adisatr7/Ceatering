import firestore from "@react-native-firebase/firestore"


export const allVendors = firestore().collection("vendors")