import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { CustomInputProps } from "@/src/shared/interface/customInput.interface";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { CustomText } from "./CustomText";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  error,
  secondaryLabel,
  onSecondaryLabelPress,
  ...rest
}) => {
  const sharedStyles = useSharedComponentStyles();
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const globalStyles = useGlobalStyles();
  const { colors } = useTheme();
  return (
    <View style={[sharedStyles.CustomInputContainer, containerStyle]}>
      {label && (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <CustomText style={sharedStyles.CustomInputLabel}>{label}</CustomText>
          <CustomText style={sharedStyles.CustomSecondaryLabel} onPress={onSecondaryLabelPress}>{secondaryLabel}</CustomText>
        </View>
      )}
      <View style={sharedStyles.InputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholderColor}
          secureTextEntry={isSecure}
          selectionColor={colors.text}
          style={[sharedStyles.CustomInput, globalStyles.flex1]}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Feather
              name={isSecure ? "eye-off" : "eye"}
              size={Utility.SP_19}
              color={colors.eyeColor}
              style={globalStyles.paddingHorizontal10}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <CustomText style={sharedStyles.CustomInputErrorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
