import { OTPForm } from "@/src/components/auth/otp-form";
import { CustomButton } from "@/src/components/shared/CustomButton";
import { CustomInput } from "@/src/components/shared/CustomInput";
import { CustomText } from "@/src/components/shared/CustomText";
import { Screen } from "@/src/components/shared/Screen";
import Routes from "@/src/constants/routes";
import { getLoginValidationSchema } from "@/src/constants/schema";
import { ImageUrls } from "@/src/constants/urls";
import { usePreferences } from "@/src/context/PreferencesContext";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import useDisableBack from "@/src/hooks/useDisableBack";
import { useSequentialFadeIn } from "@/src/hooks/useSequentialFadeIn";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { devLog, showSuccess, updateUser } from "@/src/shared/utils/helper";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Animated, View } from "react-native";

export default function LoginScreen() {
  //states
  const [isVerified, setIsVerified] = useState(true);
  const [previousEmail, setPreviousEmail] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");

  //hooks
  const { setUser } = usePreferences();
  const globalStyles = useGlobalStyles();
  const authScreenStyles = useAuthScreenStyles();
  const validationSchema = getLoginValidationSchema();
  const TextList = useTextListOnFocus();
  useDisableBack();
  const fadeIn = useSequentialFadeIn(1);

  //api calls
  const { loginApi } = usePostApi();
  const { loading: loginLoading, callApi: callLoginApi } =
    useCallApiWhenRequired(loginApi, async (data) => {
      if (data?.verification_required) {
        setIsVerified(false);
      } else {
        showSuccess(TextList.loginSuccess);
        updateUser(data, setUser, router);
      }
    });

  return (
    <>
      {isVerified ? (
        <Screen
          withSafeArea={true}
          style={authScreenStyles.loginscreenContainer}
        >
          <Animated.View style={fadeIn(1)}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                devLog("Form values:", values);
                setPreviousEmail(values.email.trim());
                setPreviousPassword(values.password.trim());
                callLoginApi({
                  email: values.email.trim(),
                  password: values.password.trim(),
                  grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE,
                  client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
                  client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
                });
              }}
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
                  <View style={[globalStyles.alignSelfCenter]}>
                    <Image
                      source={ImageUrls.loginLogo}
                      style={authScreenStyles.loginLogo}
                    />
                  </View>
                  <View style={authScreenStyles.loginformContainer}>
                    <View>
                      <CustomText style={authScreenStyles.logintitleText}>
                        {TextList.loginYourAccount}
                      </CustomText>
                      <CustomText style={authScreenStyles.loginsubTitleText}>
                        {TextList.welcomeTo26Miles}
                      </CustomText>
                    </View>

                    <View>
                      <CustomInput
                        label={TextList.emailAddress}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        placeholder={TextList.emailAddressPlaceholder}
                        inputMode="email"
                        error={
                          touched.email && errors.email ? errors.email : ""
                        }
                      />
                      <CustomInput
                        label={TextList.password}
                        secondaryLabel={TextList.forgotPassword}
                        onSecondaryLabelPress={() =>
                          router.push(`/${Routes.FORGOT}`)
                        }
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder={TextList.passwordPlaceholder}
                        secureTextEntry
                        error={
                          touched.password && errors.password
                            ? errors.password
                            : ""
                        }
                      />
                    </View>

                    <View style={authScreenStyles.loginbuttonContainer}>
                      <CustomButton
                        title={TextList.login}
                        onPress={handleSubmit}
                        disabled={!(isValid && dirty)}
                        loading={loginLoading}
                      />
                    </View>

                    <CustomText
                      style={[
                        globalStyles.alignSelfCenter,
                        authScreenStyles.loginFooterText,
                      ]}
                    >
                      {TextList.dontHaveAnAccount}{" "}
                      <CustomText
                        style={authScreenStyles.loginSignUpText}
                        onPress={() => router.push(`/${Routes.SIGNUP}`)}
                      >
                        {TextList.signUp}
                      </CustomText>
                    </CustomText>
                  </View>
                </>
              )}
            </Formik>
          </Animated.View>
        </Screen>
      ) : (
        <OTPForm
          previousPassword={previousPassword}
          isEmailVerify={true}
          onSubmit={async (data) => {
            updateUser(data, setUser, router);
          }}
          backOnPress={() => {
            setIsVerified(true);
          }}
          previousEmail={previousEmail}
        />
      )}
    </>
  );
}
