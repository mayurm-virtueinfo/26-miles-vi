import { fontsFamily } from "@/src/constants/fontsFamily";
import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { fontScale } from "@/src/shared/utils/responsive";
import { Platform, StyleSheet } from "react-native";
const IMAGE_WIDTH = Utility.SP_75;
const SPACING = Utility.SP_10;

export const useSharedComponentStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    section: {
      flexDirection: "row",
      alignItems: "center",
      gap: Utility.SP_16,
      paddingRight: Utility.SP_10,
    },
    btnContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Utility.SP_5,
    },
    headerLeftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Utility.SP_16,
      paddingVertical: Utility.SP_10,
      paddingRight: Utility.SP_10,
    },
    HeaderLeftTitle: {
      color: colors.text,
      fontSize: fontScale(37.23),
      fontWeight: "700",
      fontStyle: "italic",
    },
    screenheaderLeft: {
      paddingLeft: Utility.SP_10,
    },
    screenHeaderRight: {
      paddingRight: Utility.SP_10,
    },
    scrollViewContent: {
      paddingBottom: Utility.SP_80,
    },
    scrollViewSafeAreaContent: {
      paddingBottom: Utility.SP_52,
    },
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    text: {
      color: colors.text,
      fontSize: fontScale(14),
      fontWeight: "400",
    },
    CustomInputContainer: {
      marginBottom: Utility.SP_24,
    },
    CustomInputLabel: {
      color: colors.text,
      fontSize: fontScale(16),
      fontWeight: "600",
      marginBottom: Utility.SP_10,
    },
    CustomSecondaryLabel: {
      color: colors.forgotPasswordColor,
      marginBottom: Utility.SP_10,
    },
    CustomInput: {
      paddingVertical: Utility.SP_8,
      color: colors.text,
      fontSize: fontScale(14),
      height: Utility.SP_55,
      borderRadius: Utility.SP_8,
      paddingHorizontal: Utility.SP_10,
    },
    InputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: Utility.SP_0_5,
      borderColor: colors.inputBorder,
      borderRadius: Utility.SP_8,
      height: Utility.SP_55,
      backgroundColor: colors.inputBackground,
    },
    CustomButton: {
      backgroundColor: colors.buttonBackground,
      height: Utility.SP_55,
      borderRadius: Utility.SP_30,
      alignItems: "center",
      justifyContent: "center",
    },
    CustomButtonText: {
      color: colors.reverseText,
      fontWeight: "600",
      fontSize: fontScale(16),
    },
    CustomDisabledButton: {
      opacity: Utility.SP_0_5,
    },
    CustomInputErrorText: {
      color: colors.red,
      fontSize: fontScale(12),
      marginTop: Utility.SP_4,
    },
    checkboxBase: {
      borderWidth: Utility.SP_2,
      borderRadius: Utility.SP_20,
      justifyContent: "center",
      alignItems: "center",
    },
    checkmark: {
      width: Utility.SP_10,
      height: Utility.SP_10,
      backgroundColor: colors.reverseText,
      borderRadius: Utility.SP_2,
    },
    PhoneNumberInputinputContainer: {
      flexDirection: "row",
      borderWidth: Utility.SP_0_5,
      borderColor: colors.inputBorder,
      alignItems: "center",
      height: Utility.SP_55,
      backgroundColor: colors.inputBackground,
      borderRadius: Utility.SP_8,
      paddingHorizontal: Utility.SP_10,
    },
    PhoneNumberInputflagContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: Utility.SP_10,
      borderRightWidth: Utility.SP_0_5,
      borderRightColor: colors.inputBorder,
      height: Utility.SP_55,
      paddingRight: Utility.SP_10,
    },
    PhoneNumberInputflag: {
      fontSize: fontScale(18),
      marginRight: Utility.SP_4,
    },
    PhoneNumberInputcode: {
      fontSize: fontScale(14),
      color: colors.text,
    },
    PhoneNumberInputtextInput: {
      flex: 1,
      fontSize: fontScale(14),
      color: colors.text,
    },
    PhoneNumberInputmodalBackdrop: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    PhoneNumberInputmodalContent: {
      backgroundColor: "#fff",
      marginHorizontal: Utility.SP_30,
      borderRadius: Utility.SP_10,
      maxHeight: "60%",
      paddingVertical: Utility.SP_20,
    },
    PhoneNumberInputcountryItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: Utility.SP_12,
    },
    PhoneNumberInputname: {
      fontSize: Utility.SP_16,
    },

    //StatesDropDown Styles

    StateDropdowndropDownContainerStyle: {
      marginBottom: Utility.SP_80,
    },
    StateDropdownplaceholderStyle: {
      color: colors.inputPlaceholderColor,
      fontSize: fontScale(14),
    },
    StateDropdowntextStyle: {
      color: colors.text,
      fontSize: fontScale(14),
    },
    searchTextInputStyle: {
      borderColor: colors.text,
      color: colors.text,
    },
    StateDropdowndropDownStyle: {
      backgroundColor: colors.inputBackground,
      borderWidth: Utility.SP_0_5,
      borderColor: colors.inputBorder,
      borderRadius: Utility.SP_8,
      width: "100%",
      paddingHorizontal: Utility.SP_10,
      paddingVertical: 0,
      marginVertical: 0,
      marginBottom: Utility.SP_24,
      marginTop: 0,
      height: Utility.SP_55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    StateDropdownmodalContentContainerStyle: {
      backgroundColor: colors.background,
    },

    //NumberPlateView Styles
    NumberPlateViewContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginTop: Utility.SP_40,
    },
    NumberPlateViewleftSvg: {
      height: Utility.SP_96,
      width: Utility.SP_47,
    },
    NumberPlateViewplateBackground: {
      width: "70%",
      height: "130%",
      alignItems: "center",
    },
    NumberPlateViewstateText: {
      color: colors.numberPlateStateColor,
      fontSize: fontScale(25),
      fontWeight: "500",
      marginTop: Platform.OS == "android" ? Utility.SP_10 : Utility.SP_14,
      fontFamily: fontsFamily.BrushScriptStd,
    },
    NumberPlateViewnumberText: {
      color: colors.numberPlateText,
      fontSize: fontScale(40.48),
      fontWeight: "700",
      marginTop: Platform.OS == "android" ? Utility.SP_4 : Utility.SP_10,
      fontFamily: fontsFamily.TheBoldFont,
      lineHeight: Utility.SP_50,
    },

    //TabBarIcon Styles
    tabBarIconContainer: {
      marginTop: Utility.SP_40,
      height: Utility.SP_52,
      justifyContent: "space-between",
    },
    tabBarIconActive: {
      width: Utility.SP_7,
      height: Utility.SP_7,
      borderRadius: Utility.SP_20,
      alignSelf: "center",
    },

    //LicensePlateSlider Styles
    LicensePlateSliderContainer: {
      height: Utility.SP_50,
      overflow: "hidden",
    },
    LicensePlateSlider: {
      flexDirection: "row",
    },
    LicensePlateSliderImage: {
      width: IMAGE_WIDTH,
      height: Utility.SP_50,
      marginRight: SPACING,
    },

    // Pricing Card styles
    PricingCard: {
      width: "100%",
      height: Utility.SP_106,
      borderRadius: Utility.SP_18,
      padding: Utility.SP_20,
      marginVertical: Utility.SP_10,
      justifyContent: "center",
      borderWidth: 1.15,
      borderColor: colors.pricingCardBoder,
    },
    PricingCardnonPopularBackground: {
      backgroundColor: colors.background, // Solid color for non-popular card
    },
    PricingCardpopularCard: {
      position: "relative",
    },
    PricingCardpopularBadge: {
      position: "absolute",
      top: Utility.SP_10,
      left: Utility.SP_20,
      borderRadius: Utility.SP_27,
      paddingHorizontal: Utility.SP_8,
      paddingVertical: Utility.SP_4,
      borderWidth: 0.34,
      borderColor: colors.white,
    },
    PricingCardpopularText: {
      color: colors.white,
      fontSize: fontScale(11.47),
      fontWeight: "600",
    },
    PricingCardtitle: {
      color: colors.text,
      fontSize: fontScale(19.5),
      fontWeight: "600",
      textAlign: "left",
      width: "100%",
    },
    PricingCardsubtitle: {
      color: colors.pricingCardSubtitle,
      fontSize: fontScale(12.62),
      textAlign: "left",
      width: "100%",
    },
    PricingCardTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    //Custom Image styles
    previewContainer: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    fullscreenImage: {
      width: "100%",
      height: "100%",
    },
    noImageContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.imageBackgroundColor,
    },

    //custom dropDown
    CustomDropdownmodalOverlay: {
      flex: 1,
      backgroundColor: colors.background,
    },
    CustomDropdownmodalContent: {
      maxHeight: "100%",
      padding: Utility.SP_16,
      borderTopLeftRadius: Utility.SP_20,
      borderTopRightRadius: Utility.SP_20,
      marginTop: Utility.SP_30,
    },
    CustomDropdownheader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Utility.SP_12,
    },
    CustomDropdownmodalTitle: {
      fontSize: fontScale(16),
      fontWeight: "600",
    },
    CustomDropdownitem: {
      paddingVertical: Utility.SP_12,
      paddingHorizontal: Utility.SP_10,
      flexDirection: "row",
      gap: Utility.SP_20,
      borderColor: colors.text,
    },
    CustomDropdownnoResultText: {
      textAlign: "center",
      marginTop: Utility.SP_10,
      fontSize: fontScale(16),
      color: colors.text,
    },
    customDropDownLabel: { fontSize: fontScale(16) },
    vehicleMake: {
      width: Utility.SP_50,
      height: Utility.SP_50,
      backgroundColor: colors.whiteOpacity6,
      borderRadius: Utility.SP_50,
    },
    customDropDownFlag: {
      width: Utility.SP_35,
      height: Utility.SP_35,
      borderRadius: Utility.SP_35,
    },
    confirmOtherButton: {
      backgroundColor: colors.black, // or colors.primary
    },
    confirmOtherText: {
      color: colors.white,
    },
    customDropDownOtherInputContainer: {
      backgroundColor: colors.white,
      padding: Utility.SP_16,
      borderTopLeftRadius: Utility.SP_16,
      borderTopRightRadius: Utility.SP_16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      height: Utility.SP_200,
    },
    customDropDownOtherInputModal: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.actionSheetOverlay,
    },

    row: { flexDirection: "row", gap: Utility.SP_10 },

    //toast config
    toastContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: "90%",
      padding: Utility.SP_12,
      borderRadius: Utility.SP_12,
      shadowColor: colors.text,
      gap: Utility.SP_10,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      marginTop: Utility.SP_20,
      backgroundColor: colors.toastBackground,
      borderWidth: 1,
      borderColor: colors.toastBorder,
    },
    toastTextContainer: {
      flex: 1,
      borderLeftWidth: 1,
      borderColor: colors.toastBorder,
      paddingLeft: Utility.SP_10,
    },
    toastTitle: {
      color: colors.black,
      fontSize: fontScale(14),
      fontWeight: "600",
    },
    toastSubtitle: {
      color: colors.black,
      fontSize: fontScale(10),
      marginTop: Utility.SP_1,
    },
    toastLottieFile: {
      flex: 1,
      height: Utility.SP_32,
      width: Utility.SP_32,
    },
    shimmerMovement: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: Utility.SP_360,
    },
    
    //Submitting Overlay 
    SubmittingOverlayContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.submitModalOverlay,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999, // ensures it's above everything else
      elevation: 10, // for Android
    },
    SubmittingOverlaybox: {
      padding: Utility.SP_20,
      borderRadius: Utility.SP_10,
      alignItems: "center",
      marginBottom:Utility.SP_30,
      backgroundColor:colors.black
    },
    SubmittingOverlaytext: {
      marginTop: Utility.SP_10,
      color:colors.white
    },
    //Places Input shared Styles
    listView:{
      backgroundColor: colors.inputBackground,
      borderWidth: Utility.SP_0_5,
      borderColor: colors.inputBorder,
      borderRadius: Utility.SP_8,
      marginTop: Utility.SP_5,
      elevation: 2, // for Android shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    listViewRow:{
      paddingHorizontal: Utility.SP_12,
      flexDirection: "row",
      backgroundColor: colors.inputBackground,
    },
    separator: {
      height: 1,
      backgroundColor: colors.inputBorder,
    },
    description: {
      color: colors.text,
      fontSize: fontScale(14),
    },
    listEmptyComponent: { height: Utility.SP_40 }
  });
};
