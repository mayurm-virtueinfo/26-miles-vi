// hooks/useImagePicker.ts
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { devLog, showError } from "../shared/utils/helper";
import { useTextListOnFocus } from "./useTextListOnFocus";

export type ImageObject = {
  uri: string;
  name: string | undefined;
  type: string | undefined;
};

export const useImagePicker = () => {
  const TextList=useTextListOnFocus();
  const requestMediaLibraryPermission = async (): Promise<boolean> => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(TextList.permission_required, TextList.library_permission_detail);
        return false;
      }
      return true;
    } catch (error) {
      devLog("Media Library Permission Error:", error);
      return false;
    }
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(TextList.permission_required, TextList.camera_permission_detail);
        return false;
      }
      return true;
    } catch (error) {
      devLog("Camera Permission Error:", error);
      return false;
    }
  };

  const pickFromLibrary = async (): Promise<ImageObject | null | any> => {
    try {
      const hasPermission = await requestMediaLibraryPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });

      if (!result.canceled) {
        devLog("result", result);
        const imageObject = {
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].mimeType,
        };
        return imageObject;
      }
      return null;
    } catch (error) {
      devLog("ImagePicker Error:", error);
      showError(TextList.failed_to_open_image_library);
      return null;
    }
  };

  const takePhoto = async (): Promise<ImageObject | null | any> => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageObject = {
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].mimeType,
        };
        return imageObject;
      }
      return null;
    } catch (error) {
      devLog("Camera Error:", error);
      showError( TextList.failed_to_open_camera);
      return null;
    }
  };

  return {
    pickFromLibrary,
    takePhoto,
  };
};
