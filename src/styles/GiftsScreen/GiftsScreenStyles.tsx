import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { fontScale, width } from "@/src/shared/utils/responsive";
import { StyleSheet } from "react-native";
export const useGiftStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    flatListContainer: {
      paddingBottom: Utility.SP_20,
      backgroundColor: colors.giftsBackground,
      borderTopLeftRadius: Utility.SP_20,
      borderTopRightRadius: Utility.SP_20,
      flex: 1,
      paddingTop: Utility.SP_5,
    },
    title: {
      fontWeight: "600",
      fontSize: fontScale(24.43),
      marginTop: Utility.SP_30,
      paddingLeft: Utility.SP_20,
    },
    subTitle: {
      fontSize: fontScale(18),
      marginBottom: Utility.SP_20,
      marginTop: Utility.SP_10,
      paddingLeft: Utility.SP_20,
    },
    mainConatiner: { flex: 1, justifyContent: "space-between" },
    collumWraper: { marginTop: Utility.SP_12, justifyContent: "space-between" },
    list: {
      paddingBottom: Utility.SP_20,
    },
    row: {
      marginBottom: Utility.SP_16,
    },
    card: {
      width: "48%",
      height: Utility.SP_180,
      borderRadius: Utility.SP_20,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    label: {
      fontSize: fontScale(17),
      fontWeight: "700",
      position: "absolute",
      bottom: Utility.SP_20,
      left: Utility.SP_20,
      color: colors.white,
    },
    flatlistContainerInside: { alignSelf: "center", width: "95%" },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
    },
    CategoryChipscontainer: {
      marginBottom: Utility.SP_30,
      height: Utility.SP_50,
    },
    CategoryChipslistContent: {
      paddingHorizontal: Utility.SP_16,
      marginTop: Utility.SP_5,
    },
    chip: {
      backgroundColor: colors.categoryChipBackground,
      paddingHorizontal: Utility.SP_20,
      height: Utility.SP_39,
      borderRadius: Utility.SP_50,
      justifyContent: "center",
      alignItems: "center",
    },
    chipText: {
      color: colors.white,
      fontSize: fontScale(14),
      fontWeight: "500",
    },
    checkBoxConatainer: {
      backgroundColor: colors.selectedGiftCheckBoxContainer,
      height: Utility.SP_22,
      width: Utility.SP_22,
      borderRadius: Utility.SP_20,
      position: "absolute",
      right: Utility.SP_10,
      top: Utility.SP_10,
      alignItems: "center",
      justifyContent: "center",
    },
    SubmitModaloverlay: {
      flex: 1,
      backgroundColor: colors.submitModalOverlay,
      justifyContent: "center",
      alignItems: "center",
    },
    SubmitModalmodalContainer: {
      width: "90%",
      backgroundColor: colors.white,
      borderRadius: Utility.SP_30,
      padding: Utility.SP_20,
      alignItems: "center",
    },
    SubmitModalimageWrapper: {
      width: Utility.SP_180,
      height: Utility.SP_180,
      borderRadius: Utility.SP_90,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Utility.SP_24,
    },
    SubmitModalimage: {
      width: "100%",
      height: "100%",
    },
    SubmitModaltitle: {
      fontSize: fontScale(18),
      fontWeight: "700",
      color: colors.black,
      marginBottom: Utility.SP_10,
    },
    SubmitModalsubtitle: {
      fontSize: fontScale(13),
      color: colors.submitModalDetails,
      marginBottom: Utility.SP_30,
      textAlign: "center",
    },
    SubmitModalbuttonContainer: {
      flexDirection: "row",
      gap: Utility.SP_20,
    },
    SubmitModalcancelButton: {
      backgroundColor: colors.signupGradient2,
      height: Utility.SP_52,
      width: Utility.SP_124,
      borderRadius: Utility.SP_34,
      alignItems: "center",
      justifyContent: "center",
    },
    submitButton: {
      backgroundColor: colors.black,
      height: Utility.SP_52,
      width: Utility.SP_124,
      borderRadius: Utility.SP_34,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelText: {
      fontSize: fontScale(14),
      fontWeight: "700",
      color: colors.black,
    },
    SubmitModalsubmitText: {
      color: colors.white,
      fontSize: fontScale(14),
      fontWeight: "700",
    },
    giftsShimmer: {
      backgroundColor: "black",
      width: width/2.2,
      height: Utility.SP_180,
      borderRadius: Utility.SP_20,
      marginBottom: Utility.SP_15,
    },
    shimmerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginTop:Utility.SP_10
    },
    selectedType: {
      position: "absolute",
      top: -Utility.SP_3,
      right: Utility.SP_1,
      backgroundColor: colors.signupGradient2,
      borderRadius: Utility.SP_20,
      height: Utility.SP_15,
      width:  Utility.SP_15,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
