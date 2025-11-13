import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Gera uma chave única por usuário
 */
const getUserKey = (userId: string, key: string) => `profile_${key}_${userId}`

export const saveUserData = async (userId: string, key: string, value: string) => {
  try {
    await AsyncStorage.setItem(getUserKey(userId, key), value)
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error)
  }
}

export const getUserData = async (userId: string, key: string) => {
  try {
    return await AsyncStorage.getItem(getUserKey(userId, key))
  } catch (error) {
    console.error(`Erro ao obter ${key}:`, error)
    return null
  }
}

export const deleteUserData = async (userId: string, key: string) => {
  try {
    await AsyncStorage.removeItem(getUserKey(userId, key))
  } catch (error) {
    console.error(`Erro ao remover ${key}:`, error)
  }
}

export const clearAllUserData = async (userId: string) => {
  const keys = ["name", "email", "notifications", "darkmode", "image"]
  try {
    await Promise.all(keys.map(key => AsyncStorage.removeItem(getUserKey(userId, key))))
  } catch (error) {
    console.error("Erro ao limpar dados do usuário:", error)
  }
}

export default {
  saveUserData,
  getUserData,
  deleteUserData,
  clearAllUserData,
}