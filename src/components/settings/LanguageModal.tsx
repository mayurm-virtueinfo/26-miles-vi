import { useTheme } from "@/src/context/ThemeContext";
import i18n from "@/src/language-config/i18n";
import { getTextList } from "@/src/language-config/TextList";
import { saveToSecureStorage } from "@/src/shared/utils/helper";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { CustomCheckbox } from "../shared/CustomCheckBox";
import { CustomText } from "../shared/CustomText";
interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  onDone?: (language: string) => void;
}
const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  onClose,
  onDone,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const TextList=getTextList();
  const settingsStyles=useSettingScreenStyles();
  const {colors}=useTheme();
  useEffect(() => {
    // Reset selected language when modal opens
    if (visible) {
      setSelectedLanguage(i18n.language);
    }
  }, [visible]);

  const handleDone = async () => {
    if(selectedLanguage!==i18n.language){
      onDone?.(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
      await saveToSecureStorage('@language',selectedLanguage)
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={settingsStyles.LanguageModalContainer}>
        <View style={settingsStyles.LanguageModalContent}>
          <View style={settingsStyles.LanguageModalbuttonContainer}>
            <TouchableOpacity style={settingsStyles.LanguageModalbutton} onPress={onClose}>
              <CustomText style={settingsStyles.LanguageModalbuttonText}>{TextList.cancel}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={settingsStyles.LanguageModalbutton} onPress={handleDone}>
              <CustomText
                style={[settingsStyles.LanguageModalbuttonText, { color: colors.languageModalDoneColor }]}
              >
                {TextList.done}
              </CustomText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              settingsStyles.LanguageModaloption,
              settingsStyles.LanguageModalenglishOtpionContainer,
            ]}
            activeOpacity={1}
            onPress={() => setSelectedLanguage("en")}
          >
            <CustomText style={settingsStyles.LanguageModaloptionText}>English</CustomText>
            <CustomCheckbox
              checked={selectedLanguage === "en"}
              onChange={() => setSelectedLanguage("en")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[
              settingsStyles.LanguageModaloption,
              settingsStyles.LanguageModalspanishOptionContainer,
            ]}
            onPress={() => setSelectedLanguage("es")}
          >
            <CustomText style={settingsStyles.LanguageModaloptionText}>Español</CustomText>
            <CustomCheckbox
              checked={selectedLanguage === "es"}
              onChange={() => setSelectedLanguage("es")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



export default LanguageModal;
