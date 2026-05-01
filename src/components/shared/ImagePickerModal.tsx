// components/ImagePickerModal.tsx
import { SVG } from "@/src/constants/svg";
import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { useImagePicker } from "@/src/hooks/useImagePicker";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { CustomText } from "./CustomText";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ImagePickerModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const { takePhoto, pickFromLibrary } = useImagePicker();
  const TextList = useTextListOnFocus();
  const settingsStyles = useSettingScreenStyles();
  const {colors}=useTheme();
  const handleTakePhoto = () => {
    onClose(); // Pehle modal band karo
    setTimeout(async () => {
      const uri = await takePhoto();
      onSubmit(uri);
    }, 600); // 300ms delay
  };

  const handlePickFromLibrary = () => {
    onClose();
    setTimeout(async () => {
      const uri = await pickFromLibrary();
      onSubmit(uri);
    }, 600);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={settingsStyles.LanguageModalContainer}>
        <View style={settingsStyles.LanguageModalContent}>
          <View
            style={settingsStyles.headerStyle}
          >
            <CustomText
              style={settingsStyles.headerText}
            >
              {TextList.addProfilePhoto}
            </CustomText>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={Utility.SP_20} color={colors.black}/>
            </Pressable>
          </View>
          <TouchableOpacity
            style={[
              settingsStyles.LanguageModaloption,
              settingsStyles.LanguageModalenglishOtpionContainer,
              settingsStyles.buttonStyle,
            ]}
            activeOpacity={0.7}
            onPress={handleTakePhoto}
          >
            <SvgXml xml={SVG.camera} />
            <CustomText style={settingsStyles.LanguageModaloptionText}>
              {TextList.take_photo}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              settingsStyles.LanguageModaloption,
              settingsStyles.LanguageModalspanishOptionContainer,
              settingsStyles.buttonStyle,
            ]}
            onPress={handlePickFromLibrary}
          >
            <SvgXml xml={SVG.gallery} />
            <CustomText style={settingsStyles.LanguageModaloptionText}>
              {TextList.choose_from_library}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
