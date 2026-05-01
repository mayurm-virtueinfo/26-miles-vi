import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import React, { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { CustomText } from "../CustomText";
import Loader from "../Loader";
import { useSharedComponentStyles } from "../sharedComponentsStyes/sharedComponentsStyes";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle | ViewStyle[];
  showMessageAfterMs?: number;
  message?: string;
}

const LoadPlacesIngIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "small",
  color,
  style = [],
  showMessageAfterMs = 2000,
}) => {
  const globalStyles = useGlobalStyles();
  const sharedStyles = useSharedComponentStyles();
  const { colors } = useTheme();
  const TextList = useTextListOnFocus();

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, showMessageAfterMs);

    return () => clearTimeout(timeout);
  }, [showMessageAfterMs]);

  return (
    <View
      style={[
        globalStyles.verticalAlignment,
        sharedStyles.listEmptyComponent,
        ...(Array.isArray(style) ? style : [style]),
      ]}
    >
      {showText ? (
        <CustomText>{TextList.no_matching_addresses_found}</CustomText>
      ) : (
        <Loader size={size} color={color || colors.text} />
      )}
    </View>
  );
};

export default LoadPlacesIngIndicator;
