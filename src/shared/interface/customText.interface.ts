import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export interface CustomTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle> | any;
  onPress?: () => void;
  numberOfLines?: number | undefined; // Optional prop to specify max lines
}