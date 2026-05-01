import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { fontScale } from "@/src/shared/utils/responsive";
import { StyleSheet } from "react-native";

export const useHomeScreenStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    greeting: {
      fontSize: fontScale(16),
      fontWeight: "600",
      marginTop: Utility.SP_10,
      marginBottom: Utility.SP_10,
    },
    bannerContainer: {
      width: "100%",
      height: Utility.SP_216,
      backgroundColor: colors.signupGradient2,
      borderRadius: Utility.SP_16,
      marginTop: Utility.SP_10,
      padding: Utility.SP_15,
      justifyContent: "space-between",
    },
    bannerTitle: {
      fontSize: fontScale(22),
      fontWeight: "900",
      color: colors.bannerHeading,
    },
    bannerSubtitle: {
      fontSize: fontScale(16),
      color: colors.bannerSubheading,
    },
    bannerbutton: {
      width: Utility.SP_102,
      height: Utility.SP_35,
      backgroundColor: colors.black,
      borderRadius: Utility.SP_8,
    },
    bannerbuttonText: {
      color: colors.white,
      fontSize: fontScale(12.77),
      fontWeight: "500",
    },
    bannerlottie: {
      width: Utility.SP_100,
      height: Utility.SP_100,
      position: "absolute",
      right: 0,
      bottom: 0,
    },

    // MyWinnings
    MyWinningsHeading: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Utility.SP_20,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      marginTop: Utility.SP_100,
    },
    shimmerStyle: {
      width: "100%",
      height: Utility.SP_130,
      borderRadius: Utility.SP_12,
    },
    heading: {
      fontSize: fontScale(24.43),
      marginTop: Utility.SP_30,
      fontWeight: "600",
    },
    listContent: {
      gap: Utility.SP_20,
      paddingBottom: Utility.SP_30,
    },
    card: {
      backgroundColor: colors.myWinningsCard,
      padding: Utility.SP_16,
      borderRadius: Utility.SP_12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Utility.SP_20,
    },
    column: {
      flex: 1,
    },
    label: {
      fontSize: fontScale(14),
      color: colors.myWinningsCardlabel,
      marginTop: Utility.SP_10,
      fontWeight: "500",
    },
    value: {
      fontSize: fontScale(18),
      fontWeight: "700",
      color: colors.myWinningsCardValue,
      marginTop: Utility.SP_5,
    },
    mt23: {
      marginTop: Utility.SP_23,
    },
    statusBadgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: Utility.SP_20,
      height: Utility.SP_32,
      paddingHorizontal: Utility.SP_15,
      alignSelf: "flex-start",
      justifyContent: "center",
      marginTop: Utility.SP_10,
      gap: Utility.SP_5,
    },
    statusBadgeText: {
      fontWeight: "500",
      fontSize: fontScale(12.77),
    },
    myWinningsShimmer: {
      width: "100%",
      height: "40%",
      borderRadius: Utility.SP_12,
    },
  });
};
