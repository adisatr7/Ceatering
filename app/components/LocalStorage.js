import AsyncStorage from "@react-native-async-storage/async-storage"


/**
 * Saves a String to local async storage
 * @param {*} key 
 * @param {*} value 
 */
export const saveString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    console.log(e)
  }
}


/**
 * Saves an Object to local async storage as a String
 * @param {*} key 
 * @param {*} value 
 */
export const saveObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}


/**
 * Loads a String from local async storage
 * @param {*} key 
 * @returns Saved String value
 */
export const loadString = async(key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null)
      return value
  } catch(e) {
    console.log(e)
  }
}


/**
 * Loads an Object from local async storage
 * @param {*} key 
 * @returns Saved object/value
 */
export const loadObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e)
  }
}
