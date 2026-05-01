import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { fontScale, mvs } from "@/src/shared/utils/responsive";
import { StyleSheet } from "react-native";

export const useAuthScreenStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    splashScreenContainer: {
      backgroundColor:colors.splashbackground,
    },
    splashLogo: {
      width: Utility.SP_400,
      height: Utility.SP_400,
    },
    lottie: {
      width: Utility.SP_200,
      height: Utility.SP_100,
    },

    bottomLottie: {
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    loginFooterText: {
      fontSize: fontScale(16),
      fontWeight: "600",
      color: colors.dontHaveAnAccountColor,
      marginTop: Utility.SP_10,
    },
    loginSignUpText: {
      fontSize: fontScale(16),
      fontWeight: "600",
      color: colors.forgotPasswordColor,
    },
    loginscreenContainer: {
      paddingHorizontal: Utility.SP_20,
    },
    loginLogo: {
      height: Utility.SP_217,
      width: Utility.SP_217,
    },
    loginformContainer: {
      width: "100%",
      gap: Utility.SP_20,
      marginTop: Utility.SP_20,
      justifyContent: "center",
    },
    logintitleText: {
      fontSize: fontScale(24.43),
      fontWeight: "700",
    },
    loginsubTitleText: {
      fontSize: fontScale(17.1),
      fontWeight: "400",
      marginTop: Utility.SP_10,
    },
    loginbuttonContainer: {
      gap: Utility.SP_10,
    },

    //signup screen styles
    signUpGradientContainer: {
      paddingHorizontal: 0,
      borderBottomLeftRadius: Utility.SP_20,
      borderBottomRightRadius: Utility.SP_20,
      alignItems: "center",
      paddingBottom:Utility.SP_40
    },
    signUpheaderText: {
      marginTop: Utility.SP_70,
      fontSize: fontScale(24.43),
      color: colors.tabBarbackground,
      fontWeight: "600",
    },
    signUpformContainer: {
      marginTop: Utility.SP_20,
      paddingHorizontal: Utility.SP_20,
    },
    signUpcheckboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Utility.SP_20,
    },
    signUpcheckboxText: {
      fontSize: fontScale(14),
      fontWeight: "500",
      flex: 1,
    },
    signUplinkText: {
      fontWeight: "700",
      color: colors.forgotPasswordColor,
    },

    //Otp Styles
    otpHeaderContainer: {
      backgroundColor: colors.signupGradient2,
      borderBottomLeftRadius: Utility.SP_20,
      borderBottomRightRadius: Utility.SP_20,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical:Utility.SP_70
    },
    headerAnimation: {
      width: Utility.SP_150,
      height: Utility.SP_150,
      marginTop: Utility.SP_50,
    },
    otpHeaderTextContainer: {
      paddingHorizontal: Utility.SP_10,
      marginTop: Utility.SP_20,
    },
    otpHeaderText: {
      fontSize: fontScale(24.43),
      fontWeight: "600",
      marginBottom: Utility.SP_5,
      width: Utility.SP_345,
      alignSelf: "center",
    },
    otpHeaderTextDescription: {
      fontSize: fontScale(17.1),
      fontWeight: "400",
      marginTop: Utility.SP_10,
      marginBottom: Utility.SP_40,
      width: Utility.SP_345,
      alignSelf: "center",
    },
    otpInputContainer: {
      width: Utility.SP_345,
      alignSelf: "center",
      marginBottom: Utility.SP_40,
    },
    container: {
      gap: Utility.SP_10,
    },
    // existing styles remain unchanged...
    pinCodeContainer: {
      width: Utility.SP_74,
      height: Utility.SP_74,
      borderRadius: Utility.SP_9,
      backgroundColor: colors.inputBackground,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: mvs(1.64),
      borderColor: colors.inputBorder,
      marginHorizontal: 5,
    },
    activePinCodeContainer: {
      borderColor: colors.signupGradient2,
    },
    filledPinCodeContainer: {
      borderColor: colors.signupGradient2,
    },
    disabledPinCodeContainer: {
      backgroundColor: colors.inputBackground,
      borderColor: colors.inputBorder,
    },
    pinCodeText: {
      fontSize: fontScale(24),
      color: colors.text,
      fontWeight: "bold",
    },
    focusStick: {
      width: Utility.SP_2,
      height: Utility.SP_20,
      backgroundColor: "white",
      alignSelf: "center",
    },
    placeholderText: {
      color: colors.inputPlaceholderColor,
    },
    resendContainer: {
      alignItems: "center",
      marginTop: Utility.SP_10,
    },
    timerText: {
      fontSize: fontScale(16),
      color: colors.inputPlaceholderColor,
      fontWeight: "600",
    },
    backButtonContainer: {
      height: Utility.SP_40,
      width: Utility.SP_40,
      backgroundColor: colors.backButtonColor,
      borderRadius: Utility.SP_8,
      position: "absolute",
      top: Utility.SP_77,
      left: Utility.SP_20,
      justifyContent: "center",
      alignItems: "center",
    },
    top50:{
      top:Utility.SP_50
    }
  });
};
