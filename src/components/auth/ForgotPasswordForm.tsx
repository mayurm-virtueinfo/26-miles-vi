import { CustomButton } from "@/src/components/shared/CustomButton";
import { CustomInput } from "@/src/components/shared/CustomInput";
import { getForgotPasswordValidationSchema } from "@/src/constants/schema";
import { ImageUrls } from "@/src/constants/urls";
import { useSequentialFadeIn } from "@/src/hooks/useSequentialFadeIn";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Formik } from "formik";
import React from "react";
import { Animated, View } from "react-native";
import { CustomText } from "../shared/CustomText";
import { Screen } from "../shared/Screen";
import ForgotHeader from "./ForgotHeader";
import { ForgotPasswordFormProps } from "./interfaces/auth.interface";

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onPressLoading,
  backOnPress,
}) => {
  const validationSchema = getForgotPasswordValidationSchema();
  const authScreenStyles = useAuthScreenStyles();
  const globalStyles = useGlobalStyles();
  const TextList = useTextListOnFocus();
  const fadeIn = useSequentialFadeIn(1);
  return (
    <Screen withSafeArea={false} style={authScreenStyles.container}>
      <Animated.View style={fadeIn(1)}>
        <ForgotHeader lottieSource={ImageUrls.forgotPasswordAnimation}  backOnPress={backOnPress} />
        <Formik
          initialValues={{ email: "" }}
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
                  {TextList.forgotPassword}
                </CustomText>
                <CustomText
                  style={[
                    authScreenStyles.otpHeaderTextDescription,
                    globalStyles.alignSelfStart,
                  ]}
                >
                  {TextList.sendOtpEmailDescription}
                </CustomText>
              </View>
              <View style={globalStyles.paddingHorizontal10}>
                <CustomInput
                  label={TextList.emailAddress}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder={"Hello@example.com"}
                  inputMode="email"
                  error={touched.email || errors.email ? errors.email : ""}
                />

                <CustomButton
                  title={TextList.sendResetOtp}
                  onPress={handleSubmit}
                  disabled={!(isValid && dirty)}
                  loading={onPressLoading}
                />
              </View>
            </>
          )}
        </Formik>
      </Animated.View>
    </Screen>
  );
};
