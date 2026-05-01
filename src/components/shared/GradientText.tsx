// GradientText.tsx
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TextProps } from "react-native";

interface GradientTextProps extends TextProps {
  colors: string[];
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ colors, children, style, ...rest }) => {
  return (
    <MaskedView
      maskElement={
        <Text {...rest} style={[style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
        {/* @ts-ignore */}
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text {...rest} style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
