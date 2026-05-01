import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, InteractionManager } from "react-native";

export const useSequentialFadeIn = (count: number) => {
  const animatedValues = useRef<Animated.Value[]>(
    Array.from({ length: count }, () => new Animated.Value(0))
  ).current;

  const hasAnimatedOnce = useRef(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused || hasAnimatedOnce.current) return;

    animatedValues.forEach((opacity) => opacity.setValue(0));

    InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        const animations = animatedValues.map((opacity, index) =>
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            delay: index * 100,
            useNativeDriver: true,
          })
        );

        Animated.stagger(100, animations).start(() => {
          hasAnimatedOnce.current = true;
        });
      });
    });
  }, [isFocused]);

  const getAnimatedStyle = (index: number) => {
    if (index < 1 || index > animatedValues.length) {
      return { opacity: new Animated.Value(0) };
    }

    return {
      opacity: animatedValues[index - 1],
    };
  };

  return getAnimatedStyle;
};
