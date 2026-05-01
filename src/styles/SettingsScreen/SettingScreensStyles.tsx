import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { fontScale } from "@/src/shared/utils/responsive";
import { StyleSheet } from "react-native";

export const useSettingScreenStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    profileSection: {
      height: Utility.SP_106,
      marginTop: Utility.SP_40,
      backgroundColor: colors.profileTab,
      flexDirection: "row",
      borderRadius: Utility.SP_20,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Utility.SP_20,
      gap: Utility.SP_10,
    },
    profiLeImageAndText: { flexDirection: "row", gap: Utility.SP_10 },
    profileImage: {
      width: Utility.SP_60,
      height: Utility.SP_60,
      borderRadius: Utility.SP_50,
      backgroundColor: colors.profileImageBackGround,
    },
    profileName: {
      fontSize: fontScale(16),
      lineHeight: Utility.SP_24,
      fontWeight: "600",
    },
    otherSettingText: { fontWeight: "700", marginTop: Utility.SP_20 },
    container: {
      backgroundColor: colors.profileTab,
      width: "100%",
      borderRadius: Utility.SP_20,
      marginTop: Utility.SP_10,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: Utility.SP_20,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: Utility.SP_15,
    },
    icon: {
      marginRight: Utility.SP_14,
    },
    text: {
      fontSize: fontScale(16.08),
      color: colors.settingTabsTitles,
      fontWeight: "500",
    },
    separator: {
      height: 1,
      backgroundColor: colors.settingTabsSeparator,
    },
    EditProfileHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
      justifyContent: "center",
    },
    EditProfileImage: {
      width: Utility.SP_120,
      height: Utility.SP_120,
      borderRadius: Utility.SP_100,
      backgroundColor: "#ccc",
    },

    EditCameraIconContainer: {
      backgroundColor: colors.cameraIconContainer,
      position: "absolute",
      height: Utility.SP_26,
      width: Utility.SP_26,
      zIndex: 100,
      borderRadius: Utility.SP_25,
      justifyContent: "center",
      alignItems: "center",
      right: Utility.SP_10,
      bottom: Utility.SP_2,
    },
    initialAndState: {
      fontSize: fontScale(15),
      color: colors.signupGradient2,
    },
    LanguageModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.actionSheetOverlay,
    },
    LanguageModalContent: {
      backgroundColor: colors.white,
      borderRadius: Utility.SP_20,
      width: "100%",
      alignItems: "center",
      bottom: 0,
      position: "absolute",
      height: Utility.SP_220,
    },
    LanguageModalbuttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    LanguageModalbutton: {
      padding: Utility.SP_10,
    },
    LanguageModalbuttonText: {
      color: colors.black,
      fontSize: fontScale(18),
      paddingHorizontal: Utility.SP_20,
      paddingVertical: Utility.SP_10,
    },
    LanguageModaloption: {
      width: "90%",
      paddingVertical: Utility.SP_10,
      backgroundColor: colors.languageModalTabBackground,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Utility.SP_20,
      flexDirection: "row",
    },
    LanguageModaloptionText: {
      fontWeight: "700",
      fontSize: fontScale(18),
      color: colors.black,
    },
    LanguageModalenglishOtpionContainer: {
      borderTopLeftRadius: Utility.SP_20,
      borderTopRightRadius: Utility.SP_20,
      height: Utility.SP_60,
    },
    LanguageModalspanishOptionContainer: {
      borderBottomLeftRadius: Utility.SP_20,
      borderBottomRightRadius: Utility.SP_20,
      height: Utility.SP_60,
      borderTopWidth: 1,
      borderColor: colors.languageModalTabBorder,
    },
    SubscriptionsScreenheaderImageContainer: {
      width: "100%",
      height: Utility.SP_220,
    },
    SubscriptionsScreenheaderImage: {
      width: "100%",
      height: "100%",
    },
    SubscriptionsScreenheadingText: {
      fontSize: fontScale(33.38),
      fontWeight: "800",
      marginTop: Utility.SP_20,
    },
    SubscriptionsScreensubscriptionNote: {
      color: colors.monthlyAccessHeading,
      fontSize: fontScale(14),
      fontWeight: "800",
      textAlign: "center",
      lineHeight: Utility.SP_20,
      marginTop: Utility.SP_5,
    },
    SubscriptionsScreensubscriptionNoteDetail: {
      color: colors.monthlyAccessDetail,
      fontSize: fontScale(14),
      fontWeight: "500",
    },
    SubscriptionsScreencontinueButton: {
      marginTop: Utility.SP_20,
    },
    SubscriptionsScreenfooterLinksContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: Utility.SP_10,
    },
    SubscriptionsScreenfooterLinkText: {
      fontSize: fontScale(12),
      fontWeight: "600",
      color: colors.monthlyAccessHeading,
    },
    subcriptionShimmer: {
      width: "100%",
      height: Utility.SP_106,
      borderRadius: Utility.SP_18,
      marginTop: Utility.SP_10,
    },

    //Image picker modal
    headerStyle: {
      width: "90%",
      flexDirection: "row",
      paddingVertical: Utility.SP_20,
    },
    headerText: {
      color: colors.black,
      width: "90%",

      fontSize: fontScale(18),
      fontWeight: "700",
    },
    buttonStyle: {
      justifyContent: "flex-start",
      gap: Utility.SP_10,
    },

    //Manage subscriptions styles
    ManageSubscriptionstitle: {
      fontSize: fontScale(16),
      alignSelf: "center",
      paddingVertical: Utility.SP_10,
    },
    ManageSubscriptionsBox: {
      width: "100%",
      height: Utility.SP_156,
      backgroundColor: colors.profileTab,
      borderRadius: Utility.SP_20,
      padding: Utility.SP_30,
      justifyContent: "space-between",
      marginTop: Utility.SP_10,
    },
    ManageSubscriptionsrowSpaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ManageSubscriptionslabel: {
      fontSize: fontScale(14),
    },
    ManageSubscriptionsprice: {
      fontSize: fontScale(20),
      fontWeight: "500",
    },
    ManageSubscriptionspriceSuffix: {
      fontWeight: "500",
    },
    ManageSubscriptionsrowWithGap: {
      flexDirection: "row",
      gap: Utility.SP_10,
    },
    ManageSubscriptionspremiumText: {
      fontSize: fontScale(24),
      fontWeight: "600",
    },
    ManageSubscriptionscancelText: {
      alignSelf: "flex-end",
      marginTop: Utility.SP_10,
    },
    ManageSubscriptionsbenefitsBox: {
      width: "100%",
      // height: Utility.SP_200,
      backgroundColor: colors.profileTab,
      borderRadius: Utility.SP_20,
      paddingVertical: Utility.SP_20,
      paddingHorizontal: Utility.SP_30,
      justifyContent: "space-between",
      marginTop: Utility.SP_20,
    },
    ManageSubscriptionsbenefitText: {
      fontSize: fontScale(16),
    },
    ManageSubscriptionssubscribeLabel: {
      fontWeight: "600",
      marginTop: Utility.SP_20,
    },
    ManageSubscriptionsplanCard: {
      width: "100%",
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: Utility.SP_10,
      padding: Utility.SP_20,
      marginTop: Utility.SP_10,
    },
    ManageSubscriptionsdowngradeText: {
      fontSize: fontScale(13),
      fontWeight: "500",
      color: colors.cameraIconContainer,
    },
    ManageSubscriptionsdisclaimer: {
      fontSize: fontScale(12),
      width: Utility.SP_318,
      textAlign: "center",
      alignSelf: "center",
      marginTop: Utility.SP_10,
    },
    manageSubcriptionPlatformErrorContainer: {
      borderWidth: 1,
      borderColor: "red",
      borderRadius: Utility.SP_10,
      padding: Utility.SP_20,
      marginTop: Utility.SP_20,
    },
    manageSubcriptionPlatformErrorText: { textAlign: "justify" },
    backtoLogin: {
      fontWeight: "bold",
      color: colors.text,
    },
    backtoLogingLoader: { width: Utility.SP_25 },
    manageScreenNextPlans: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: colors.inputBorder,
      paddingBottom: Utility.SP_10,
    },
    currentSubscriptionShimmer: {
      width: "100%",
      height: Utility.SP_156,
      borderRadius: Utility.SP_20,
      marginTop: Utility.SP_10,
    },
    currentSubscriptionDescriptionShimmer: {
      width: "100%",
      height: Utility.SP_70,
      borderRadius: Utility.SP_20,
      marginTop: Utility.SP_20,
    },
    otherSubscriptionDescriptionShimmer: {
      width: "100%",
      height: Utility.SP_100,
      borderRadius: Utility.SP_10,
      marginTop: Utility.SP_10,
    },
  });
};
