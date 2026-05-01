import { CustomButton } from "@/src/components/shared/CustomButton";
import { ImageUrls } from "@/src/constants/urls";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { showSuccess } from "@/src/shared/utils/helper";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { CustomText } from "../shared/CustomText";
import { Screen } from "../shared/Screen";
import ForgotHeader from "./ForgotHeader";
import { OTPFormProps } from "./interfaces/auth.interface";

export const OTPForm: React.FC<OTPFormProps> = ({
  onSubmit,
  previousEmail,
  isEmailVerify = false,
  previousPassword,
  isProfileEmailUpdate = false,
  backOnPress,
}) => {
  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const globalStyles = useGlobalStyles();
  const authScreenStyles = useAuthScreenStyles();
  const TextList = useTextListOnFocus();
  const {
    verifyOtpApitoResetPassword,
    otpResendToResetPassword,
    emailVerifyApi,
    resendEmailVerifyApi,
    verifyUserEmailApi,
  } = usePostApi();

  //Reset password case
  const {
    loading: resendOtpToResetPasswordLoading,
    callApi: callResendOtpToResetPassword,
  } = useCallApiWhenRequired(otpResendToResetPassword, (response) => {
    showSuccess(response?.data?.message || response?.message);
  });
  const { loading: verifyOtpLoading, callApi: callVerifyOtpApi } =
    useCallApiWhenRequired(verifyOtpApitoResetPassword, (response) => {
      showSuccess(response?.data?.message || response?.message);
      onSubmit(response);
    });

  //Email verify case
  const {
    loading: resendEmailVerifyLoading,
    callApi: callResendEmailVerifyApi,
  } = useCallApiWhenRequired(resendEmailVerifyApi, (response) => {
    showSuccess(response?.data?.message || response?.message);
  });
  const { loading: emailVerifyApiLoading, callApi: callEmailVerifyApi } =
    useCallApiWhenRequired(emailVerifyApi, (response) => {
      showSuccess(response?.data?.message || response?.message);
      onSubmit(response);
    });

  //Email verify in case of profile update
  const {
    loading: profileEmailVerifyApiLoading,
    callApi: callProfileEmailVerifyApi,
  } = useCallApiWhenRequired(verifyUserEmailApi, (response) => {
    showSuccess(response?.data?.message || response?.message);
    onSubmit(response);
  });

  useEffect(() => {
    if (
      !(resendOtpToResetPasswordLoading || resendEmailVerifyLoading) &&
      timer > 0
    ) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (
      timer === 0 &&
      !(resendOtpToResetPasswordLoading || resendEmailVerifyLoading)
    ) {
      setCanResend(true);
    }
  }, [timer, resendOtpToResetPasswordLoading, resendEmailVerifyLoading]);

  const handleOTPChange = (text: string) => {
    setOtpValue(text);
  };

  const handleFilled = (code: string) => {
    setOtpValue(code);
  };

  const handleSubmit = () => {
    if (otpValue.length === 4) {
      if (isProfileEmailUpdate) {
        callProfileEmailVerifyApi({ otp: otpValue });
      } else if (isEmailVerify) {
        callEmailVerifyApi({
          email: previousEmail,
          password: previousPassword,
          otp: otpValue,
          grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE,
          client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
          client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
        });
      } else {
        callVerifyOtpApi({
          email: previousEmail,
          otp: otpValue,
        });
      }
    }
  };

  const handleResendOTP = () => {
    setCanResend(false); // Disable resend button
    setTimer(30); // Reset timer value
    if (isProfileEmailUpdate) {
      callResendEmailVerifyApi({ email: previousEmail });
    } else if (isEmailVerify) {
      callResendEmailVerifyApi({ email: previousEmail });
    } else {
      callResendOtpToResetPassword({ email: previousEmail });
    }
    // onResend(); // Call parent resend API handler
  };

  return (
    <Screen withSafeArea={false} style={authScreenStyles.container}>
      <ForgotHeader lottieSource={ImageUrls.otpAnimation} backOnPress={backOnPress}/>
      <View style={authScreenStyles.otpHeaderTextContainer}>
        <CustomText style={authScreenStyles.otpHeaderText}>
          {TextList.otpValidation}
        </CustomText>
        <CustomText style={authScreenStyles.otpHeaderTextDescription}>
          {TextList.weHaveSentOtpOnYourEmailAddress}
        </CustomText>
        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={handleOTPChange}
          onFilled={handleFilled}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          textProps={{
            accessibilityRole: "text",
            accessibilityLabel: "OTP digit",
            allowFontScaling: false,
          }}
          theme={{
            containerStyle: authScreenStyles.otpInputContainer,
            pinCodeContainerStyle: authScreenStyles.pinCodeContainer,
            pinCodeTextStyle: authScreenStyles.pinCodeText,
            focusStickStyle: authScreenStyles.focusStick,
            focusedPinCodeContainerStyle:
              authScreenStyles.activePinCodeContainer,
            placeholderTextStyle: authScreenStyles.placeholderText,
            filledPinCodeContainerStyle:
              authScreenStyles.filledPinCodeContainer,
            disabledPinCodeContainerStyle:
              authScreenStyles.disabledPinCodeContainer,
          }}
        />

        <CustomButton
          title={TextList.continue}
          onPress={handleSubmit}
          loading={verifyOtpLoading || emailVerifyApiLoading}
          disabled={otpValue.length !== 4}
        />
        <View style={authScreenStyles.resendContainer}>
          <CustomText
            style={[
              globalStyles.alignSelfCenter,
              authScreenStyles.loginFooterText,
            ]}
          >
            {TextList.didntReceiveAnOtp}{" "}
            {resendOtpToResetPasswordLoading ||
            resendEmailVerifyLoading ||
            profileEmailVerifyApiLoading ? (
              <CustomText style={authScreenStyles.timerText}>
                {TextList.resending}...
              </CustomText>
            ) : canResend ? (
              <CustomText
                style={authScreenStyles.loginSignUpText}
                onPress={handleResendOTP}
              >
                {TextList.resendOtp}
              </CustomText>
            ) : (
              <CustomText style={authScreenStyles.timerText}>
                {TextList.resendIn} {timer}s
              </CustomText>
            )}
          </CustomText>
        </View>
      </View>
    </Screen>
  );
};
