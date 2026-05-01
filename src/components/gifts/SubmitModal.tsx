// SubmitModal.tsx
import { ImageUrls } from "@/src/constants/urls";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGiftStyles } from "@/src/styles/GiftsScreen/GiftsScreenStyles";
import { Image } from "expo-image";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { CustomText } from "../shared/CustomText";

interface SubmitModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const TextList = useTextListOnFocus();
  const giftStyles = useGiftStyles();
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={giftStyles.SubmitModaloverlay}>
        <View style={giftStyles.SubmitModalmodalContainer}>
          {/* Medal Image */}
          <View style={giftStyles.SubmitModalimageWrapper}>
            <Image
              source={ImageUrls.medal} // <-- Replace with your image path
              style={giftStyles.SubmitModalimage}
              contentFit="contain"
              cachePolicy={"memory-disk"}
            />
          </View>

          {/* Title */}
          <CustomText style={giftStyles.SubmitModaltitle}>
            {TextList.readyToSubmit}
          </CustomText>

          {/* Subtitle */}
          <CustomText style={giftStyles.SubmitModalsubtitle}>
            {TextList.submitDetails}
          </CustomText>

          {/* Buttons */}
          <View style={giftStyles.SubmitModalbuttonContainer}>
            <TouchableOpacity
              style={giftStyles.SubmitModalcancelButton}
              onPress={onCancel}
            >
              <CustomText style={giftStyles.cancelText}>
                {TextList.cancel}
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={giftStyles.submitButton}
              onPress={onSubmit}
            >
              <CustomText style={giftStyles.SubmitModalsubmitText}>
                {TextList.submit}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubmitModal;
