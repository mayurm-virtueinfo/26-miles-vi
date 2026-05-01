import CustomShimmer from "@/src/components/shared/CustomShimmer";
import { CustomText } from "@/src/components/shared/CustomText";
import Loader from "@/src/components/shared/Loader";
import { Screen } from "@/src/components/shared/Screen";
import { SVG } from "@/src/constants/svg";
import { Utility } from "@/src/constants/utility";
import { usePreferences } from "@/src/context/PreferencesContext";
import { useTheme } from "@/src/context/ThemeContext";
import useCallApiOnLoad from "@/src/hooks/useCallApiOnload";
import { useInAppPurchase } from "@/src/hooks/useInAppPurchase";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import useGetApi from "@/src/services/ApiHooks/getApis";
import { openSubscriptionSettings } from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ManageSubscriptions = () => {
  const globalStyles = useGlobalStyles();
  const TextList = useTextListOnFocus();
  const settingStyles = useSettingScreenStyles();
  const { colors } = useTheme();
  const { user, setUser } = usePreferences();
  const { getCurrentSubscriptionApi } = useGetApi();

  const {
    data: subscriptionData,
    loading,
    callApi: callSucriptionApi,
  } = useCallApiOnLoad(getCurrentSubscriptionApi);

  const { handlePurchase, loading: paymentLoading } = useInAppPurchase(
    (data) => {
      //@ts-ignore
      setUser((prev) => ({
        ...prev,
        subscription: data?.data?.subscription,
      }));
      callSucriptionApi();
    }
  );
  const renderItem = ({ item }: any) => {
    const showAction =
      Platform.OS === subscriptionData?.data?.subscription?.platform;
    const ProductId =
      Platform.OS === "ios" ? item?.apple_product_id : item?.google_product_id;
    return (
      <View style={settingStyles.ManageSubscriptionsplanCard}>
        <View style={settingStyles.manageScreenNextPlans}>
          <CustomText style={settingStyles.ManageSubscriptionsprice}>
            ${item?.price}
            <CustomText style={settingStyles.ManageSubscriptionspriceSuffix}>
              {TextList.manageSubscriptions_priceSuffix}
            </CustomText>
          </CustomText>

          {showAction ? (
            <TouchableOpacity
              style={globalStyles.verticalAlignment}
              onPress={() => {
                handlePurchase(ProductId);
              }}
            >
              {paymentLoading ? (
                <Loader size={"small"} />
              ) : (
                <CustomText
                  style={settingStyles.ManageSubscriptionsdowngradeText}
                >
                  {item?.price > subscriptionData?.data?.subscription?.price
                    ? TextList.manageSubscriptions_upgrade
                    : TextList.manageSubscriptions_downgrade}
                </CustomText>
              )}
            </TouchableOpacity>
          ) : (
            <MaterialIcons
              name={"lock"}
              size={Utility.SP_24}
              color={colors.text}
            />
          )}
        </View>
        <View
          style={[
            settingStyles.ManageSubscriptionsrowWithGap,
            globalStyles.mt20,
          ]}
        >
          <View style={globalStyles.verticalAlignment}>
            <SvgXml xml={SVG.circularTick} />
          </View>
          <View style={globalStyles.verticalAlignment}>
            <CustomText
              style={[
                settingStyles.ManageSubscriptionsbenefitText,
                globalStyles.fs20,
              ]}
            >
              {item?.description}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen withSafeArea={false} style={globalStyles.paddingHorizontal10}>
      <CustomText style={settingStyles.ManageSubscriptionstitle}>
        {TextList.manageSubscriptions_title}
      </CustomText>
      {Platform.OS !== user?.subscription?.platform && (
        <View style={settingStyles.manageSubcriptionPlatformErrorContainer}>
          <CustomText style={settingStyles.manageSubcriptionPlatformErrorText}>
            ⚠️{" "}
            {user?.subscription?.platform === "ios"
              ? TextList.manageSubscriptionPlatformIOSError
              : TextList.manageSubscriptionPlatformAndroidError}
          </CustomText>
        </View>
      )}
      {loading ? (
        <CustomShimmer style={settingStyles.currentSubscriptionShimmer} />
      ) : (
        <View style={settingStyles.ManageSubscriptionsBox}>
          <View style={settingStyles.ManageSubscriptionsrowSpaceBetween}>
            <View style={globalStyles.verticalAlignment}>
              <CustomText style={settingStyles.ManageSubscriptionslabel}>
                {TextList.manageSubscriptions_currentPlanLabel}
              </CustomText>
            </View>
            <CustomText style={settingStyles.ManageSubscriptionsprice}>
              ${subscriptionData?.data?.subscription?.price}
              <CustomText style={settingStyles.ManageSubscriptionspriceSuffix}>
                {TextList.manageSubscriptions_priceSuffix}
              </CustomText>
            </CustomText>
          </View>

          <View style={settingStyles.ManageSubscriptionsrowWithGap}>
            {subscriptionData?.data?.subscription?.is_popular && (
              <View style={globalStyles.verticalAlignment}>
                <SvgXml xml={SVG.premium} />
              </View>
            )}
            <CustomText style={settingStyles.ManageSubscriptionspremiumText}>
              {subscriptionData?.data?.subscription?.package_name}
            </CustomText>
          </View>

          <CustomText>
            {TextList.manageSubscriptions_nextBillingDate}:{" "}
            {moment(subscriptionData?.data?.subscription?.ends_at).format(
              "MMMM D, YYYY"
            )}
          </CustomText>
        </View>
      )}

      <CustomText
        style={settingStyles.ManageSubscriptionscancelText}
        onPress={() => {
          openSubscriptionSettings();
        }}
      >
        {TextList.manageSubscriptions_cancelSubscription}
      </CustomText>
      {loading ? (
        <CustomShimmer
          style={settingStyles.currentSubscriptionDescriptionShimmer}
        />
      ) : (
        <View style={settingStyles.ManageSubscriptionsbenefitsBox}>
          <View style={settingStyles.ManageSubscriptionsrowWithGap}>
            <View style={globalStyles.verticalAlignment}>
              <SvgXml xml={SVG.circularTick} />
            </View>
            <CustomText style={[settingStyles.ManageSubscriptionsbenefitText]}>
              {subscriptionData?.data?.subscription?.package_description}
            </CustomText>
          </View>
        </View>
      )}
      <CustomText style={settingStyles.ManageSubscriptionssubscribeLabel}>
        {TextList.manageSubscriptions_subscribeLabel}
      </CustomText>
      {loading ? (
        <CustomShimmer
          style={settingStyles.otherSubscriptionDescriptionShimmer}
        />
      ) : (
        <FlatList
          data={subscriptionData?.data?.available_packages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      )}

      <CustomText
        style={[settingStyles.ManageSubscriptionsdisclaimer, globalStyles.mt20]}
      >
        {TextList.manageSubscriptions_disclaimer_line1}
      </CustomText>
      <CustomText style={settingStyles.ManageSubscriptionsdisclaimer}>
        {TextList.manageSubscriptions_disclaimer_line2}
      </CustomText>
    </Screen>
  );
};

export default ManageSubscriptions;
