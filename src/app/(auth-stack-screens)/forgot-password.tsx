import { ForgotPasswordForm } from "@/src/components/auth/ForgotPasswordForm";
import { OTPForm } from "@/src/components/auth/otp-form";
import { ResetPasswordForm } from "@/src/components/auth/reset-password-form";
import { Utility } from "@/src/constants/utility";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { showSuccess } from "@/src/shared/utils/helper";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const ForgotPasswordScreen = () => {
  const [previousEmail, setPreviousEmail] = useState("");
  const [resetTokken, setResettokken] = useState("");
  const [step, setStep] = useState<0 | 1 | 2>(0); // Narrow type improves safety
  const { sendOtpApiResetPassword, passwordResetApi } = usePostApi();
  const { loading: sendOtpLoading, callApi: callSendOtpApi } =
    useCallApiWhenRequired(sendOtpApiResetPassword, (response) => {
      showSuccess(response?.data?.message || response?.message);
      setStep(1);
    });
  const { loading: passwordResetLoading, callApi: callPasswordResetApi } =
    useCallApiWhenRequired(passwordResetApi, (response) => {
      showSuccess(response?.data?.message || response?.message);
      router.back();
    });

  const renderStepForm = () => {
    switch (step) {
      case 0:
        return (
          <ForgotPasswordForm
            backOnPress={() => {
              router.back();
            }}
            onPressLoading={sendOtpLoading}
            onSubmit={(values) => {
              setPreviousEmail(values.email);
              callSendOtpApi({ email: values.email });
            }}
          />
        );
      case 1:
        return (
          <OTPForm
            backOnPress={() => {
              setStep(0);
            }}
            onSubmit={(response) => {
              setResettokken(response?.data?.reset_token);
              setStep(2);
            }}
            previousEmail={previousEmail}
          />
        );
      case 2:
        return (
          <ResetPasswordForm
            backOnPress={() => {
              setStep(1);
            }}
            onSubmit={(values) => {
              callPasswordResetApi({
                email: previousEmail,
                reset_token: resetTokken,
                password: values.password,
                password_confirmation: values.confirmPassword,
              });
            }}
            onPressLoading={passwordResetLoading}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStepForm()}</>;
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  screenContainer: {},
  formContainer: {},
  formInnerContainer: {
    width: "100%",
    gap: Utility.SP_10,
  },
});
