import { CustomButton } from "@/src/components/shared/CustomButton";
import { CustomInput } from "@/src/components/shared/CustomInput";
import { CustomText } from "@/src/components/shared/CustomText";
import { getResetPasswordValidationSchema } from "@/src/constants/schema";
import { ImageUrls } from "@/src/constants/urls";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Screen } from "../shared/Screen";
import ForgotHeader from "./ForgotHeader";
import { ResetPasswordFormProps } from "./interfaces/auth.interface";

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  onPressLoading,
  backOnPress,
}) => {
  const validationSchema = getResetPasswordValidationSchema();
  const authScreenStyles = useAuthScreenStyles();
  const TextList = useTextListOnFocus();
  const globalStyles = useGlobalStyles();
  return (
    <Screen withSafeArea={false}>
      <ForgotHeader lottieSource={ImageUrls.resetPasswordAnimation} backOnPress={backOnPress}/>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <View style={authScreenStyles.otpHeaderTextContainer}>
              <CustomText
                style={[
                  authScreenStyles.otpHeaderText,
                  globalStyles.alignSelfStart,
                ]}
              >
                {TextList.resetPassword}
              </CustomText>
              <CustomText
                style={[
                  authScreenStyles.otpHeaderTextDescription,
                  globalStyles.alignSelfStart,
                  globalStyles.mb0,
                ]}
              >
                {TextList.resetPasswordDescription}
              </CustomText>
            </View>
            <View style={[globalStyles.paddingHorizontal10, globalStyles.mt20]}>
              <CustomInput
                label={TextList.enterNewPassword}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder={TextList.enterNewPassword}
                secureTextEntry
                error={
                  touched.password && errors.password ? errors.password : ""
                }
              />

              <CustomInput
                label={TextList.confirmNewPassword}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder={TextList.confirmNewPassword}
                secureTextEntry
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />

              <CustomButton
                title={TextList.resetPasswordButton}
                onPress={handleSubmit}
                disabled={!(isValid && dirty)}
                loading={onPressLoading}
              />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
};
