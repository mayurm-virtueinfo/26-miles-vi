// components/gifts/SubmittingOverlay.tsx
import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import React from "react";
import { View } from "react-native";
import { CustomText } from "./CustomText";
import Loader from "./Loader";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

const SubmittingOverlay = ({ visible }: { visible: boolean }) => {
  const { colors } = useTheme();
  const sharedStyles=useSharedComponentStyles();
  const TextList=useTextListOnFocus();

  if (!visible) return null;

  return (
    <View style={sharedStyles.SubmittingOverlayContainer}>
      <View style={[sharedStyles.SubmittingOverlaybox]}>
        <Loader size="large" color={colors.white} />
        <CustomText style={sharedStyles.SubmittingOverlaytext}>{TextList.submitting}...</CustomText>
      </View>
    </View>
  );
};


export default SubmittingOverlay;
