import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secondaryLabel?: string;
  onSecondaryLabelPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}