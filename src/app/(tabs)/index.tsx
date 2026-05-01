import LicensePlateSlider from "@/src/components/home/LicensePlateSlider";
import { CustomButton } from "@/src/components/shared/CustomButton";
import CustomShimmer from "@/src/components/shared/CustomShimmer";
import { CustomText } from "@/src/components/shared/CustomText";
import { Screen } from "@/src/components/shared/Screen";
import { StaticColors } from "@/src/constants/Colors";
import Routes from "@/src/constants/routes";
import { ImageUrls } from "@/src/constants/urls";
import { usePreferences } from "@/src/context/PreferencesContext";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import useDisableBack from "@/src/hooks/useDisableBack";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import useGetApi from "@/src/services/ApiHooks/getApis";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useHomeScreenStyles } from "@/src/styles/HomeScreen/HomeScreenStyles";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import MyWinnings from "../(gift-stack-screen)/my-winnings";

const HomeScreen = () => {
  const TextList = useTextListOnFocus();
  const { user } = usePreferences();
  const globalStyles = useGlobalStyles();
  const homeScreenStyles = useHomeScreenStyles();
  const { getCurrentVehicleSubmissionApi } = useGetApi();
  const isFocus = useIsFocused();
  const {
    data: checkVehicleSubmission,
    loading,
    callApi,
  } = useCallApiWhenRequired(getCurrentVehicleSubmissionApi);
  useDisableBack();

  useEffect(() => {
    if (isFocus) {
      callApi();
    }
  }, [isFocus]);

  return (
    <Screen
      withSafeArea={false}
      tabScreen={true}
      style={globalStyles.paddingHorizontal10}
    >
      <CustomText style={homeScreenStyles.greeting}>
        {TextList.hello} {user?.first_name}
      </CustomText>
        <View style={homeScreenStyles.bannerContainer}>
          <LicensePlateSlider />

          <View>
            <CustomText style={homeScreenStyles.bannerTitle}>
              {TextList.matchAndWin}
            </CustomText>
            <CustomText style={homeScreenStyles.bannerTitle} numberOfLines={1}>
              {TextList.monthlyAmazingRewards}
            </CustomText>
            <CustomText
              style={homeScreenStyles.bannerSubtitle}
              numberOfLines={1}
            >
              {TextList.enterYourInitialsFindAPlateAndWin}
            </CustomText>
          </View>
          {loading ? (
            <CustomShimmer
              style={homeScreenStyles.bannerbutton}
              duration={900}
              shimmerColors={[
                StaticColors.goldShimmer1, // soft gold edge
                StaticColors.goldShimmer2, // strong gold center
                StaticColors.goldShimmer1, // soft gold edge
              ]}
            />
          ) : (
            <CustomButton
              title={ //@ts-ignore
                checkVehicleSubmission?.data?.has_registered_vehicle_this_month
                  ? TextList.offerClosed
                  : TextList.tryNow
              }
              onPress={() => {
                router.push(`/${Routes.SUBMIT_VEHICLE}`);
              }}
              disabled={//@ts-ignore
                checkVehicleSubmission?.data?.has_registered_vehicle_this_month
              }
              buttonStyle={homeScreenStyles.bannerbutton}
              textStyle={homeScreenStyles.bannerbuttonText}
            />
          )}
          <LottieView
            source={ImageUrls.rewardAnimation}
            autoPlay
            loop
            style={homeScreenStyles.bannerlottie}
          />
        </View>

      <MyWinnings />
    </Screen>
  );
};

export default HomeScreen;
