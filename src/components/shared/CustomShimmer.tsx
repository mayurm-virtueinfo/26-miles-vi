import { useTheme } from "@/src/context/ThemeContext";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleProp, View, ViewStyle } from "react-native";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface CustomShimmerProps {
  style?: StyleProp<ViewStyle>;
  shimmerColors?: string[];
  count?: number;
  duration?: number;
  backgroundColor?: string;
}

const CustomShimmer: React.FC<CustomShimmerProps> = ({
  style,
  shimmerColors,
  count = 1,
  duration=1000,
}) => {
  const globalStyles = useGlobalStyles();
  const sharedStyles = useSharedComponentStyles();
  const { colors } = useTheme();

  const shimmerColorSet = shimmerColors || [
    colors.shimmerMainColor,
    colors.shimmerSecondaryColor,
    colors.shimmerMainColor,
  ];
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    translateX.setValue(-SCREEN_WIDTH);
    Animated.loop(
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: duration,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            style,
            {
              overflow: "hidden",
              backgroundColor: shimmerColorSet[0], // base background
            },
            count > 1 && index !== count - 1 ? globalStyles.mb10 : null,
          ]}
        >
          <Animated.View
             style={[
              sharedStyles.shimmerMovement,
              {
                transform: [
                  { translateX },
                  { rotate: '130deg' }, // <- Add this line
                ],
              },
            ]}
          >
            <LinearGradient //@ts-ignore
              colors={shimmerColorSet}
              style={[globalStyles.h100Per,globalStyles.w100Per]}
            />
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

export default CustomShimmer;
