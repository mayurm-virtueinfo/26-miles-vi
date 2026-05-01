import { useTheme } from "@/src/context/ThemeContext";
import { CustomButtonProps } from "@/src/shared/interface/cutomButton.interface";
import React from "react";
import {
  TouchableOpacity
} from "react-native";
import { CustomText } from "./CustomText";
import Loader from "./Loader";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";



export const CustomButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled = false,
  loading = false,
  loaderColor,
}: CustomButtonProps) => {
    const sharedStyles=useSharedComponentStyles();
    const {colors}=useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        sharedStyles.CustomButton,
        buttonStyle,
        (disabled || loading) && sharedStyles.CustomDisabledButton,
      ]}
    >
      {loading ? (
        <Loader size={"small"} color={loaderColor || colors.reverseText} />
      ) : (
        <CustomText style={[sharedStyles.CustomButtonText, textStyle]}>{title}</CustomText>
      )}
    </TouchableOpacity>
  );
};


