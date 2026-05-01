import { CustomButton } from "@/src/components/shared/CustomButton";
import CustomDropdown from "@/src/components/shared/CustomDropDown";
import { CustomInput } from "@/src/components/shared/CustomInput";
import GradientHeader from "@/src/components/shared/GradientHeader";
import { Screen } from "@/src/components/shared/Screen";
import {
  USStates,
  vehicleColor,
  vehicleMake,
} from "@/src/constants/constantsArray";
import Routes from "@/src/constants/routes";
import { getVehicleFormValidationSchema } from "@/src/constants/schema";
import { usePreferences } from "@/src/context/PreferencesContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { devLog, filterStatesByName } from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";

const SubmitVehicleScreen = () => {
  const { user } = usePreferences();
  const { colors } = useTheme();
  const TextList = useTextListOnFocus();
  const validationSchema = getVehicleFormValidationSchema();
  const globalStyles = useGlobalStyles();
  const getUserStateObject = filterStatesByName(user?.state)[0];
  const platform = user?.subscription?.platform;
  const productId = user?.subscription?.product_id;

  const subscriptionBasic =
    (platform === "android" && productId === "com.android.monthly.basic") ||
    (platform === "ios" && productId === "com.monthly.basic")
      ? true
      : false;
      
  return (
    <Screen withSafeArea={false}>
      <GradientHeader
        stateName={user?.state}
        initials={user?.initials}
        title={TextList.RegisterAndWin}
        gradientColors={[colors.signupGradient2, colors.signupGradient]}
        backOnPress={() => {
          router.back();
        }}
      />
      <Formik
        initialValues={{
          licensePlate: "",
          vehicleMake: "",
          vehicleColor: "",
          state: subscriptionBasic ? getUserStateObject : null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          devLog("Form Values:", values);
          router.navigate({
            pathname: `/${Routes.GIFT}`,
            params: {
              vehicleData: JSON.stringify(values), // Send as string to avoid deep object issues
            },
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
          <View style={[globalStyles.paddingHorizontal10, globalStyles.mt20]}>
            {/* License No Plate */}
            <CustomInput
              label={TextList.licensePlateNumberLabel}
              value={values.licensePlate}
              onChangeText={(text) => {
                // Remove anything that's not a letter, digit, or dash
                let cleaned = text.replace(/[^A-Za-z0-9-]/g, "");

                // Ensure letters (max 4) come first
                let letters = cleaned
                  .replace(/[^A-Za-z]/g, "")
                  .toUpperCase()
                  .slice(0, 4);

                // Check if user added dash or auto-insert it after letters
                let hasDash =
                  cleaned.includes("-") || cleaned.length > letters.length;

                // Get everything after the dash: allow unlimited digits
                let afterLetters = cleaned.slice(letters.length);
                let numbers = afterLetters.replace(/[^0-9]/g, "");

                // Build formatted string
                let formatted = letters;
                if (hasDash && letters.length > 0) {
                  formatted += "-";
                }
                formatted += numbers;

                handleChange("licensePlate")(formatted);
              }}
              onBlur={handleBlur("licensePlate")}
              placeholder={TextList.licensePlatePlaceHolder}
              error={
                touched.licensePlate || errors.licensePlate
                  ? errors.licensePlate
                  : ""
              }
            />

            {/* Vehicle Color */}
            <CustomDropdown
              label={TextList.vehicleColor}
              value={values.vehicleColor}
              enableOtherOption
              placeholder={TextList.VehicleColorPlaceHolder}
              onChange={(value: any) => {
                setFieldValue("vehicleColor", value);
              }}
              error={
                touched.vehicleMake && errors.vehicleMake
                  ? errors.vehicleMake
                  : ""
              }
              items={vehicleColor.map((item) => ({
                label: item.name,
                value: item.name,
                color: item.hex,
              }))}
            />
            {/* Vehicle Make */}
            <CustomDropdown
              label={TextList.vehicleMake}
              value={values.vehicleMake}
              enableOtherOption
              placeholder={TextList.VehicleMakePlaceHolder}
              onChange={(value: any) => {
                setFieldValue("vehicleMake", value);
              }}
              error={
                touched.vehicleMake && errors.vehicleMake
                  ? errors.vehicleMake
                  : ""
              }
              items={vehicleMake.map((item) => ({
                label: item.make,
                value: item.make,
                image: item.logo_url,
              }))}
            />
            {/* State */}
            <CustomDropdown
              disabled={subscriptionBasic}
              label={TextList.vehicleState}
              //@ts-ignore
              value={values?.state?.code}
              onChange={(selectedState) => {
                const stateObj =
                  USStates.find((s) => s.code === selectedState) || null;
                setFieldValue("state", stateObj);
              }}
              items={USStates.map((state) => ({
                label: `${state.name}`,
                value: state.code,
                image: state.imageUri,
              }))}
              imageContentFit="cover"
            />

            {/* Submit Button */}
            <CustomButton
              title={TextList.continue}
              onPress={handleSubmit}
              disabled={!isValid || !dirty}
              // loading={vehicleSubmitLoading}
              buttonStyle={globalStyles.mt20}
            />
          </View>
        )}
      </Formik>
    </Screen>
  );
};

export default SubmitVehicleScreen;
