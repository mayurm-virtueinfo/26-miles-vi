import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image, ImageContentFit } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ImageStyle,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

interface CustomImageProps {
  imageUri?: string;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
  previewable?: boolean;
  contentFit?: "cover" | "contain" | "center" | "fill" | "none" | "scale-down";
  showOverlay?: boolean; 
}

const CustomImage: React.FC<CustomImageProps> = ({
  imageUri,
  style,
  onPress,
  previewable = false,
  contentFit = "cover",
  showOverlay = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const blurOpacity = useRef(new Animated.Value(1)).current;
  const { theme, colors } = useTheme();
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const sharedStyles=useSharedComponentStyles();

  const flattenStyle = StyleSheet.flatten(style) || {};
  const borderRadius = flattenStyle.borderRadius || 0;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation;

    if (loading && imageUri && !loadError) {
      blurOpacity.setValue(0.6);
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.delay(200),
          Animated.timing(blurOpacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(blurOpacity, {
            toValue: 0.6,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      blurOpacity.stopAnimation();
      Animated.timing(blurOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }

    return () => {
      loopAnimation?.stop();
    };
  }, [loading, imageUri, loadError]);

  const handleImagePress = () => {
    if (onPress) {
      onPress();
    } else if (previewable && imageUri) {
      setPreviewVisible(true);
    }
  };

  const ImageContent =
    imageUri && !loadError ? (
      <>
        <Image
          source={imageUri}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
          contentFit={contentFit as ImageContentFit}
          transition={1000}
          cachePolicy="memory-disk"
          onLoadStart={() => {
            setLoading(true);
            setLoadError(false);
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoadError(true);
            setLoading(false);
          }}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { opacity: blurOpacity, borderRadius, overflow: "hidden" },
          ]}
        >
          <BlurView
            intensity={50}
            tint={theme === "dark" ? "light" : "dark"}
            style={[StyleSheet.absoluteFill, { borderRadius }]}
          />
        </Animated.View>
        {showOverlay && (
          <LinearGradient
            colors={["transparent", "transparent",colors.background]}
            style={[StyleSheet.absoluteFill, { borderRadius }]}
          />
        )}
      </>
    ) : (
      <View style={[StyleSheet.absoluteFill, sharedStyles.noImageContainer]}>
        {/* {__DEV__ ? (
          <CustomText>{imageUri}</CustomText>
        ) : ( */}
        <MaterialIcons
          name="image-not-supported"
          color={colors.text}
          size={Utility.SP_40}
        />
        {/* )} */}
      </View>
    );

  const ImageWrapper = (
    <Pressable
      //@ts-ignore
      style={[style, { overflow: "hidden", borderRadius }]}
      disabled={!previewable && !onPress}
      onPress={handleImagePress}
    >
      {ImageContent}
    </Pressable>
  );

  return (
    <>
      {ImageWrapper}

      {previewable && imageUri && (
        <Modal visible={isPreviewVisible} transparent animationType="fade">
          <Pressable
            onPress={() => setPreviewVisible(false)}
            style={sharedStyles.previewContainer}
          >
            <Image
              source={imageUri}
              style={sharedStyles.fullscreenImage}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </Pressable>
        </Modal>
      )}
    </>
  );
};



export default CustomImage;
