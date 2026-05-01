import { OTPForm } from "@/src/components/auth/otp-form";
import { CustomButton } from "@/src/components/shared/CustomButton";
import CustomImage from "@/src/components/shared/CustomImage";
import { CustomInput } from "@/src/components/shared/CustomInput";
import ImagePickerModal from "@/src/components/shared/ImagePickerModal";
import PhoneNumberInput from "@/src/components/shared/PhoneNumberInput";
import PlaceAutocompleteInput from "@/src/components/shared/PlacesAutoComplete/PlaceAutocompleteInput";
import { Screen } from "@/src/components/shared/Screen";
import { getUpdateValidationSchema } from "@/src/constants/schema";
import { usePreferences } from "@/src/context/PreferencesContext";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import { ImageObject } from "@/src/hooks/useImagePicker";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { devLog, showSuccess } from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, setUser } = usePreferences();
  const [modalVisible, setModalVisible] = useState(false);
  const [previousEmail, setPreviousEmail] = useState("");
  const globalStyles = useGlobalStyles();
  const TextList = useTextListOnFocus();
  const settingStyles = useSettingScreenStyles();
  const navigation = useNavigation();
  const [showOtp, setShowOtp] = useState(false);
  const validationSchema = getUpdateValidationSchema();
  const { updateUserApi } = usePostApi();
  const { loading: updateUserLoading, callApi: callUpdateUserApi } =
    useCallApiWhenRequired(updateUserApi, async (data) => {
      setImageUri(null);
      setUser(data?.data?.user);
      showSuccess(data?.message);
      if (data?.data?.requires_verification) {
        setShowOtp(true);
      }
    });
  const [imageUri, setImageUri] = useState<ImageObject | null | any>(null);

  useEffect(() => {
    if (showOtp === true) {
      navigation.setOptions({
        headerShown: false, // Hides header when true
      });
    } else {
      navigation.setOptions({
        headerShown: true, // Hides header when true
      });
    }
  }, [navigation, showOtp]);

  return (
    <>
      {showOtp ? (
        <OTPForm
          onSubmit={(response) => {
            setUser(response?.data?.user);
            setShowOtp(false);
          }}
          backOnPress={() => {
            setShowOtp(false);
          }}
          isProfileEmailUpdate={true}
          previousEmail={previousEmail}
        />
      ) : (
        <Screen withSafeArea={false} style={globalStyles.paddingHorizontal10}>
          <View style={settingStyles.EditProfileHeader}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                activeOpacity={0.7}
                style={settingStyles.EditCameraIconContainer}
              >
                <Feather name="camera" size={15} />
              </TouchableOpacity>
              <CustomImage
                imageUri={
                  imageUri?.uri ||
                  user?.profile_photo ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(`${user?.first_name} ${user?.last_name}`)
                }
                style={settingStyles.EditProfileImage}
                previewable
              />
            </View>
          </View>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: user?.first_name || "",
              lastName: user?.last_name || "",
              email: user?.email || "",
              phone: user?.phone, // If user.phone is available, use that
              address: user?.address,
              city: user?.city,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              devLog("values", values);
              //@ts-ignore
              setPreviousEmail(user?.email);
              const formData = new FormData();

              formData.append("first_name", values.firstName);
              formData.append("last_name", values.lastName);
              formData.append("email", values.email);
              formData.append("phone", values?.phone);
              formData.append("street", user?.street);
              formData.append("city", values.city);
              formData.append("zip_code", user?.zip_code);
              formData.append("address", values.address);
              imageUri && formData.append("profile_image", imageUri);
              callUpdateUserApi(formData);
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
              <View>
                <CustomInput
                  label={TextList.firstName}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  placeholder={TextList.firstNamePlaceholder}
                  error={
                    touched.firstName || errors.firstName
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
                    touched.lastName || errors.lastName ? errors.lastName : ""
                  }
                />

                <CustomInput
                  label={TextList.emailAddress}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder={TextList.emailAddressPlaceholder}
                  containerStyle={globalStyles.mb15}
                  inputMode="email"
                  error={touched.email || errors.email ? errors.email : ""}
                />
                <PlaceAutocompleteInput
                  label={TextList.address}
                  value={values.address}
                  defaultValue={values.address}
                  onChangeText={({ address, city }) => {
                    setFieldValue("address", address);
                    setFieldValue("city", city);
                  }} //@ts-ignore
                  onBlur={handleBlur("address")}
                  placeholder={TextList.address_placeholder} //@ts-ignore
                  error={
                    touched.address && errors.address ? errors.address : ""
                  }
                />
                <PhoneNumberInput
                  label={TextList.phoneNumber} //@ts-ignore
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder={TextList.phoneNumberPlaceholder}
                  inputMode="tel"
                  //@ts-ignore
                  error={touched.phone || errors.phone ? errors.phone : ""}
                />
                <CustomButton
                  title={TextList.updateProfile}
                  onPress={handleSubmit}
                  loading={updateUserLoading}
                  disabled={!isValid || (!dirty && !imageUri)}
                />
              </View>
            )}
          </Formik>
          <ImagePickerModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={(imageObject) => {
              if (imageObject) {
                setImageUri(imageObject);
              }
            }}
          />
        </Screen>
      )}
    </>
  );
}
