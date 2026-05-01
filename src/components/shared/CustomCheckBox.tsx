import { useTheme } from "@/src/context/ThemeContext";
import { CustomCheckboxProps } from "@/src/shared/interface/customCheckBox.interface";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";



export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  size = 24,
  color = "#rgba(216, 216, 221, 1)", // default primary color
}) => {
  const sharedStyles = useSharedComponentStyles();
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onChange} activeOpacity={0.8}>
      <View
        style={[
          sharedStyles.checkboxBase,
          {
            width: size,
            height: size,
            borderColor: color || colors.inputBorder,
          },
          checked && {
            backgroundColor: color ,
            borderColor: color || colors.inputBorder,
          },
        ]}
      >
        {checked && <View style={sharedStyles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
};


