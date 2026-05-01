import { ImageUrls } from "@/src/constants/urls";
import { useTheme } from "@/src/context/ThemeContext";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Image, ImageBackground } from "expo-image";
import React, { useEffect, useState } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import { CustomText } from "./CustomText";
import Loader from "./Loader";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

interface NumberPlateProps {
  stateName?: string;
  showLeftOrRightPlate?: boolean;
  initials?: string;
  delay?: number; // Optional: for future dynamic delay
  containertStyle?:StyleProp<ViewStyle>;
}

const NumberPlateView: React.FC<NumberPlateProps> = ({
  stateName = "Your State",
  initials = "XX",
  delay = 800, // default delay
  showLeftOrRightPlate = true,
  containertStyle
}) => {
  const sharedComponentStyles = useSharedComponentStyles();
  const [loading, setLoading] = useState(true);
  const globalStyles = useGlobalStyles();
  const {colors}=useTheme()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  if (loading) {
    return (
      <View
        style={[
          sharedComponentStyles.NumberPlateViewContainer,
          globalStyles.verticalAlignment,
          globalStyles.mt70,
        ]}
      >
        <Loader size="large"  color={colors.text}/>
      </View>
    );
  }

  return (
    <Animated.View style={[sharedComponentStyles.NumberPlateViewContainer,containertStyle]}>
      {showLeftOrRightPlate ? (
        <Image
          source={ImageUrls.leftPlate}
          style={sharedComponentStyles.NumberPlateViewleftSvg}
          contentFit="fill"
          cachePolicy={"memory-disk"}
        />
      ) : (
        <View style={sharedComponentStyles.NumberPlateViewleftSvg} />
      )}
      <ImageBackground
        source={ImageUrls.numberPlate}
        style={[sharedComponentStyles.NumberPlateViewplateBackground]}
        contentFit="fill"
        cachePolicy={"memory-disk"}
      >
        <CustomText style={sharedComponentStyles.NumberPlateViewstateText}>
          {stateName}
        </CustomText>
        <CustomText style={sharedComponentStyles.NumberPlateViewnumberText}>
          {initials.toUpperCase() || "XX"}-XXX
        </CustomText>
      </ImageBackground>
      {showLeftOrRightPlate ? (
        <Image
          source={ImageUrls.rightPlate}
          style={sharedComponentStyles.NumberPlateViewleftSvg}
          contentFit="fill"
          cachePolicy={"memory-disk"}
        />
      ) : (
        <View style={sharedComponentStyles.NumberPlateViewleftSvg} />
      )}
    </Animated.View>
  );
};

export default React.memo(NumberPlateView);
