import { ViewStyle } from "react-native";

export interface LoaderProps {
  message?: string; // Optional message to display with the loader
  style?: ViewStyle | any;
  color?: string;
  size?: number | 'large' | 'small' | undefined;
}
