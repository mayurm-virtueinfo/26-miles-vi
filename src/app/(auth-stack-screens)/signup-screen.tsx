import { OTPForm } from "@/src/components/auth/otp-form";
import { CustomButton } from "@/src/components/shared/CustomButton";
import CustomDropdown from "@/src/components/shared/CustomDropDown";
import { CustomInput } from "@/src/components/shared/CustomInput";
import { CustomText } from "@/src/components/shared/CustomText";
import GradientHeader from "@/src/components/shared/GradientHeader";
import PhoneNumberInput from "@/src/components/shared/PhoneNumberInput";
import PlaceAutocompleteInput from "@/src/components/shared/PlacesAutoComplete/PlaceAutocompleteInput";
import { Screen } from "@/src/components/shared/Screen";
import { USStates } from "@/src/constants/constantsArray";
import { getSignUpValidationSchema } from "@/src/constants/schema";
import { WebUrls } from "@/src/constants/urls";
import { usePreferences } from "@/src/context/PreferencesContext";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import { useDelayedRender } from "@/src/hooks/useDelayedRender";
import { useSequentialFadeIn } from "@/src/hooks/useSequentialFadeIn";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { devLog, showSuccess, updateUser } from "@/src/shared/utils/helper";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Animated, Linking, View } from "react-native";

const SignupScreen = () => {
  const fadeIn = useSequentialFadeIn(1);
  const shouldRender = useDelayedRender(5);
  const [previousEmail, setPreviousEmail] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const globalStyles = useGlobalStyles();
  const validationSchema = getSignUpValidationSchema();
  const { registerApi } = usePostApi();
  const { setUser } = usePreferences();
  const TextList = useTextListOnFocus();
  const authScreenStyles = useAuthScreenStyles();
  const { loading: signupLoading, callApi: callRegisterApi } =
    useCallApiWhenRequired(registerApi, (response) => {
      showSuccess(response?.data?.message);
      setOtpSend(true);
    });

  return (
    <Screen withSafeArea={false}>
      {shouldRender && (
        <Animated.View style={fadeIn(1)}>
          {!otpSend ? (
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                initials: "",
                address: "",
                city: "",
                state: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                devLog("valyes", values);
                setPreviousEmail(values.email);
                setPreviousPassword(values.password);
                callRegisterApi({
                  first_name: values.firstName,
                  last_name: values.lastName,
                  email: values.email,
                  password: values.password,
                  password_confirmation: values.confirmPassword,
                  grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE,
                  client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
                  client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
                  initials: values.initials,
                  street: "2", //@ts-ignore
                  city: values.city, //@ts-ignore
                  state: values.state.name, //@ts-ignore
                  zip_code: values.state.zip,
                  phone: values.phone,
                  address:values.address
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
                setFieldValue,
              }) => (
                <>
                  <GradientHeader
                    title={TextList.createYourAccount} //@ts-ignore
                    stateName={values?.state?.name}
                    initials={values?.initials}
                    backOnPress={() => {
                      router.back();
                    }}
                  />
                  <View style={authScreenStyles.signUpformContainer}>
                    <CustomInput
                      label={TextList.firstName}
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder={TextList.firstNamePlaceholder}
                      error={
                        touched.firstName && errors.firstName
                          ? errors.firstName
                          : ""
                      }
                    />
                    <CustomInput
                      label={TextList.lastName}
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder={TextList.lastNamePlaceholder}
                      error={
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : ""
                      }
                    />
                    <CustomInput
                      label={TextList.emailAddress}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder={TextList.emailAddressPlaceholder}
                      inputMode="email"
                      error={touched.email && errors.email ? errors.email : ""}
                    />
                    <CustomInput
                      label={TextList.initials}
                      value={values.initials}
                      onChangeText={(text) => {
                        const filtered = text
                          .replace(/[^A-Za-z]/g, "")
                          .toUpperCase(); // only alphabets, and uppercase
                        handleChange("initials")(filtered);
                      }}
                      onBlur={handleBlur("initials")}
                      placeholder={TextList.initialsPlaceholder}
                      maxLength={4}
                      error={
                        touched.initials && errors.initials
                          ? errors.initials
                          : ""
                      }
                    />
                    <PlaceAutocompleteInput
                      label={TextList.address}
                      value={values.address}
                      onChangeText={({ address, city }) => {
                        setFieldValue("address", address);
                        setFieldValue("city", city);
                      }} //@ts-ignore
                      onBlur={handleBlur("address")}
                      placeholder={TextList.address_placeholder}
                      error={
                        touched.address && errors.address
                          ? errors.address
                          : ""
                      }
                    />
                    <CustomDropdown
                      label={TextList.vehicleState}
                      //@ts-ignore
                      value={values?.state?.code}
                      onChange={(selectedState) => {
                        const stateObj =
                          USStates.find((s) => s.code === selectedState) ||
                          null;
                        setFieldValue("state", stateObj);
                      }}
                      items={USStates.map((state) => ({
                        label: `${state.name}`,
                        value: state.code,
                        image: state.imageUri,
                      }))}
                      imageContentFit="cover"
                      placeholder={TextList.selectState}
                    />
                    <PhoneNumberInput
                      label={TextList.phoneNumber}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder={TextList.phoneNumberPlaceholder}
                      inputMode="tel"
                      error={touched.phone && errors.phone ? errors.phone : ""}
                    />
                    <CustomInput
                      label={TextList.password}
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
                    <CustomInput
                      label={TextList.confirmPassword}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      placeholder={TextList.confirmPassword}
                      secureTextEntry
                      error={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""
                      }
                    />

                    <View style={authScreenStyles.signUpcheckboxContainer}>
                      <CustomText style={authScreenStyles.signUpcheckboxText}>
                        {TextList.termsAndConditionsText}{" "}
                        <CustomText
                          style={authScreenStyles.signUplinkText}
                          onPress={() => {
                            Linking.openURL(WebUrls.termsAndConditions);
                          }}
                        >
                          {TextList.termsAndConditions}
                        </CustomText>{" "}
                        {TextList.and}{" "}
                        <CustomText
                          style={authScreenStyles.signUplinkText}
                          onPress={() => {
                            Linking.openURL(WebUrls.privacyPolicy);
                          }}
                        >
                          {TextList.privacyPolicy}
                        </CustomText>
                      </CustomText>
                    </View>

                    <CustomButton
                      title={TextList.register}
                      onPress={handleSubmit}
                      loading={signupLoading}
                      disabled={!isValid || !dirty}
                    />
                    <CustomText
                      style={[
                        globalStyles.alignSelfCenter,
                        authScreenStyles.loginFooterText,
                        globalStyles.mt20,
                      ]}
                    >
                      {TextList.alreadyHaveAnAccount}
                      <CustomText
                        style={authScreenStyles.loginSignUpText}
                        onPress={() => {
                          router.back();
                        }}
                      >
                        {" "}
                        {TextList.login}
                      </CustomText>
                    </CustomText>
                  </View>
                </>
              )}
            </Formik>
          ) : (
            <OTPForm
              onSubmit={async (response) => {
                updateUser(response, setUser, router);
              }}
              isEmailVerify={true}
              previousEmail={previousEmail}
              previousPassword={previousPassword}
            />
          )}
        </Animated.View>
      )}
    </Screen>
  );
};

export default SignupScreen;
