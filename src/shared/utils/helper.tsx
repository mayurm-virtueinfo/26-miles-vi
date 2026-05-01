import { USStates } from "@/src/constants/constantsArray";
import Routes from "@/src/constants/routes";
import { WebUrls } from "@/src/constants/urls";
import i18n from "@/src/language-config/i18n";
import { getTextList } from "@/src/language-config/TextList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { ShowToastOptions } from "../interface/helperToast.interface";

export const changeLanguage = async (lang: string) => {
  await saveToSecureStorage("@language", lang);
  i18n.changeLanguage(lang);
};

// utils/logger.ts
export const devLog = (...args: any[]) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const showError = (messageOrOptions: string | ShowToastOptions) => {
  let type = "error";
  let text1 = getTextList().error;
  let text2 = getTextList().somethingWentWrong;

  if (typeof messageOrOptions === "string") {
    text2 = messageOrOptions || text2;
  } else {
    type = messageOrOptions.type || type;
    text1 = messageOrOptions.text1 || text1;
    text2 = messageOrOptions.text2 || text2;
  }

  Toast.show({
    type,
    text1: `${text1}!`,
    text2,
  });
};
export const showSuccess = (messageOrOptions: string | ShowToastOptions) => {
  let type = "success";
  let text1 = getTextList().success;
  let text2 = getTextList().somethingWentWrong;

  if (typeof messageOrOptions === "string") {
    text2 = messageOrOptions || text2;
  } else {
    type = messageOrOptions.type || type;
    text1 = messageOrOptions.text1 || text1;
    text2 = messageOrOptions.text2 || text2;
  }

  Toast.show({
    type,
    text1: `${text1}!`,
    text2,
  });
};

/**
 * Save a string value to AsyncStorage.
 * @param key - The key under which the value will be stored.
 * @param value - The string value to store.
 */
export async function saveToSecureStorage(
  key: string,
  value: string
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    devLog("[AsyncStorage] Error saving data:", error);
  }
}

/**
 * Retrieve a string value from AsyncStorage.
 * @param key - The key whose value you want to retrieve.
 * @returns The stored string value, or null if not found.
 */
export async function getFromSecureStorage(
  key: string
): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    devLog("[AsyncStorage] Error retrieving data:", error);
    return null;
  }
}

/**
 * Removing multiple keys from AsyncStorage.
 * @param key - The array of keys to remove.
 */
export async function removeKeysFromSecureStorage(key: string[]) {
  try {
    await AsyncStorage.multiRemove(key);
  } catch (error) {
    devLog("[AsyncStorage] Error removing data:", error);
    return null;
  }
}
/**
 * Removing all data from AsyncStorage.
 */
export async function removeAllKeysFromSecureStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    devLog("[AsyncStorage] Error removing all data:", error);
    return null;
  }
}

export const updateUser = async (
  data: any,
  setUser: (user: any) => void,
  router: any
) => {
  await saveToSecureStorage("@access_token", data?.data?.access_token);
  await saveToSecureStorage("@refresh_token", data?.data?.refresh_token);
  setUser(data?.data?.user);
  if (data?.data?.user?.subscription) {
    router.push(`/${Routes.TABS}`);
  } else {
    router.push(`/${Routes.SUBSCRIPTION}`);
  }
};

// Notifications Helper Functions
export const initializeNotifications = async () => {
  if (Device.isDevice) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission for notifications not granted!");
      return;
    }
  }

  // ✅ Android-specific setup
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
};

//Helper function shows local notification
export const showNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null, // immediate notification
  });
};

//Helper function to capitaliza first letter
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const openSubscriptionSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL(WebUrls.cancelIOSSubscription);
  } else if (Platform.OS === "android") {
    Linking.openURL(WebUrls.cancelAndroidSubscription);
  }
};

export const filterStatesByName = (searchTerm: string) => {
  if (!searchTerm) return "";
  return USStates.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
