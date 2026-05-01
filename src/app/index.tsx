/**
 * SplashScreen Component
 *
 * This is the initial screen displayed when the app launches.
 * It shows the app's logo centered on the screen along with a loading animation at the bottom.
 * Used for branding and initial loading operations (e.g., fetching user preferences or app data).
 * Created by: Muneeb Qureshi
 * Date: 03/06/2025
 */

import { Screen } from "@/src/components/shared/Screen";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { ImageUrls } from "../constants/urls";
import { usePreferences } from "../context/PreferencesContext";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const globalStyles = useGlobalStyles();
  const authScreenStyles = useAuthScreenStyles();
  const { getUserLoading } = usePreferences();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Screen withSafeArea={false} withScrollView={false} style={authScreenStyles.splashScreenContainer}>
      <Animated.View
        style={[
          globalStyles.fullScreenVerticalAlignment,
          { opacity: fadeAnim },
        ]}
      >
        <View style={globalStyles.fullScreenVerticalAlignment}>
          <Image
            source={ImageUrls.splashLogo}
            style={authScreenStyles.splashLogo}
            contentFit="fill"
            cachePolicy={'memory-disk'}
          />
        </View>

        <View
          style={[
            authScreenStyles.bottomLottie,
            { display: getUserLoading ? "flex" : "none" },
          ]}
        >
          <LottieView
            source={ImageUrls.loadingBackground}
            autoPlay
            loop
            style={authScreenStyles.lottie}
          />
        </View>
      </Animated.View>
    </Screen>
  );
};

export default SplashScreen;
