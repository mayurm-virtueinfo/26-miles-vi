import LicensePlateSlider from "@/src/components/home/LicensePlateSlider";
import { CustomButton } from "@/src/components/shared/CustomButton";
import CustomImage from "@/src/components/shared/CustomImage";
import CustomShimmer from "@/src/components/shared/CustomShimmer";
import { CustomText } from "@/src/components/shared/CustomText";
import GradientText from "@/src/components/shared/GradientText";
import Loader from "@/src/components/shared/Loader";
import PricingCard from "@/src/components/shared/PricingCard";
import { Screen } from "@/src/components/shared/Screen";
import Routes from "@/src/constants/routes";
import { ImageUrls, WebUrls } from "@/src/constants/urls";
import { usePreferences } from "@/src/context/PreferencesContext";
import { useTheme } from "@/src/context/ThemeContext";
import useCallApiOnLoad from "@/src/hooks/useCallApiOnload";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import useDisableBack from "@/src/hooks/useDisableBack";
import { useInAppPurchase } from "@/src/hooks/useInAppPurchase";
import { useSequentialFadeIn } from "@/src/hooks/useSequentialFadeIn";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import useGetApi from "@/src/services/ApiHooks/getApis";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { removeKeysFromSecureStorage } from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import { router } from "expo-router";
import React, { useState } from "react";
import { Animated, FlatList, Linking, Platform, View } from "react-native";

const SubscriptionsScreen = () => {
  useDisableBack();
  const globalStyles = useGlobalStyles();
  const { colors } = useTheme();
  const settinStyles = useSettingScreenStyles();
  const TextList = useTextListOnFocus();
  const fadeIn = useSequentialFadeIn(1);
  const { getSubscriptionPackagesApi } = useGetApi();
  const { logoutApi } = usePostApi();
  const [subscriprion, setSubscription] = useState<string>("");
  const [subscriprionID, setSubscriptionID] = useState<number>(0);
  const { setUser } = usePreferences();
  const { data: subscriptionData, loading } = useCallApiOnLoad(
    getSubscriptionPackagesApi,
    undefined,
    true,
    (data) => {
      setSubscriptionID(data?.data[0]?.id);
      setSubscription(
        Platform.OS === "android"
          ? data?.data[0]?.google_product_id
          : data?.data[0]?.apple_product_id
      );
    }
  );
  const { loading: logoutApiLoading, callApi: calllogoutApi } =
    useCallApiWhenRequired(logoutApi, async (data) => {
      await removeKeysFromSecureStorage(["@access_token", "@refresh_token"]);
      router.push(`/${Routes.LOGIN}`);
    });

  const { handlePurchase, loading: paymentLoading } = useInAppPurchase(
    (data) => {
      //@ts-ignore
      setUser((prev) => ({
        ...prev,
        subscription: data?.data?.subscription,
      }));
      router.push(`/${Routes.TABS}`);
    }
  );

  return (
    <Screen withSafeArea={false}>
      <Animated.View style={fadeIn(1)}>
        <View style={settinStyles.SubscriptionsScreenheaderImageContainer}>
          <CustomImage
            imageUri={ImageUrls.subscriptionsBackground}
            showOverlay
            style={settinStyles.SubscriptionsScreenheaderImage}
          />
          {/* <CustomText onPress={()=>{router.push(`/${Routes.TABS}`)}} style={{position:'absolute',right:20, top:70}}> X </CustomText> */}
        </View>

        <View style={globalStyles.paddingHorizontal10}>
          <GradientText
            colors={[
              colors.signupGradient2,
              colors.gradientTextSecond,
              colors.gradientTextSecond,
            ]}
            style={settinStyles.SubscriptionsScreenheadingText}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {TextList.subcriptionHeading}
          </GradientText>

          <LicensePlateSlider />
          {loading ? (
            <CustomShimmer style={settinStyles.subcriptionShimmer} count={2} />
          ) : (
            <FlatList
              data={subscriptionData?.data}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => (
                <PricingCard
                  title={item?.name}
                  subtitle={item?.description}
                  price={item?.price}
                  showPopularTag={item?.is_popular}
                  onPress={() => [
                    setSubscription(
                      Platform.OS === "ios"
                        ? item?.apple_product_id
                        : item?.google_product_id
                    ),
                    setSubscriptionID(item?.id),
                  ]}
                  showBorder={subscriprionID === item?.id}
                  duration={item?.duration}
                />
              )}
              scrollEnabled={false}
            />
          )}

          <CustomText style={settinStyles.SubscriptionsScreensubscriptionNote}>
            {TextList.monthlyAccess}{" "}
            <CustomText
              style={settinStyles.SubscriptionsScreensubscriptionNoteDetail}
            >
              {TextList.monthlyAccessDescription}
            </CustomText>
          </CustomText>

          <CustomButton
            title={TextList.continue}
            loading={paymentLoading}
            disabled={loading}
            onPress={() => {
              handlePurchase(subscriprion);
            }}
            buttonStyle={settinStyles.SubscriptionsScreencontinueButton}
          />

          <View style={settinStyles.SubscriptionsScreenfooterLinksContainer}>
            <CustomText
              onPress={() => {}}
              style={settinStyles.SubscriptionsScreenfooterLinkText}
            >
              {TextList.termsofuse}
            </CustomText>
            <CustomText style={settinStyles.SubscriptionsScreenfooterLinkText}>
              {" "}
              |{" "}
            </CustomText>
            <CustomText
              onPress={() => {
                Linking.openURL(WebUrls.privacyPolicy);
              }}
              style={settinStyles.SubscriptionsScreenfooterLinkText}
            >
              {TextList.privacyPolicy}
            </CustomText>
            <CustomText style={settinStyles.SubscriptionsScreenfooterLinkText}>
              {" "}
              |{" "}
            </CustomText>
            {logoutApiLoading ? (
              <View style={[globalStyles.verticalAlignment,settinStyles.backtoLogingLoader]}>
                <Loader size={"small"} />
              </View>
            ) : (
              <CustomText
                onPress={() => {
                  calllogoutApi();
                }}
                style={[
                  settinStyles.SubscriptionsScreenfooterLinkText,
                  settinStyles.backtoLogin,
                ]}
              >
                {TextList.back_to_login}
              </CustomText>
            )}
          </View>
        </View>
      </Animated.View>
    </Screen>
  );
};

export default SubscriptionsScreen;
