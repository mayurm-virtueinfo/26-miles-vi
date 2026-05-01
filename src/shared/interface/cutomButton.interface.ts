import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  loaderColor?: string;
}