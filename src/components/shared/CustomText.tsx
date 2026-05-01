// components/CustomText.js
import { CustomTextProps } from "@/src/shared/interface/customText.interface";
import React, { useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

export const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  onPress,
  numberOfLines, // No default value, making it optional
  ...props
}) => {
  const [opacity] = useState(new Animated.Value(1)); // Initial opacity is 1
  const sharedComponentStyles = useSharedComponentStyles();

  const handlePressIn = () => {
    // Start animated opacity change on press in
    Animated.timing(opacity, {
      toValue: 0.5, // Reduced opacity
      duration: 150, // Duration for the animation
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();
  };

  const handlePressOut = () => {
    // Start animated opacity reset on press out
    Animated.timing(opacity, {
      toValue: 1, // Full opacity
      duration: 150, // Duration for the animation
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();
  };

  const renderText = (
    <Animated.Text
      style={[sharedComponentStyles.text, style, { opacity }]} // Apply animated opacity
      numberOfLines={numberOfLines} // Set number of lines if provided
      adjustsFontSizeToFit
      {...props}
    >
      {children}
    </Animated.Text>
  );

  // Apply the press effect only if onPress is provided
  if (onPress) {
    return (
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {renderText}
      </TouchableWithoutFeedback>
    );
  }

  // If no onPress, just render the Text component without TouchableWithoutFeedback
  return renderText;
};
