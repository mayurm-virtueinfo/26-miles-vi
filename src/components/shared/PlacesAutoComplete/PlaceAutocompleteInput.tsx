import { useTheme } from "@/src/context/ThemeContext";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CustomText } from "../CustomText";
import { useSharedComponentStyles } from "../sharedComponentsStyes/sharedComponentsStyes";
import LoadPlacesIngIndicator from "./LoadPlacesIngIndicator";

interface Props {
  label: string;
  onChangeText: (value: { address: string; city: string }) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  apiKey: string;
  locationBias?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  defaultValue?: string; // initial value (optional)
}

const PlaceAutocompleteInput: React.FC<Props> = ({
  label,
  onChangeText,
  onBlur,
  placeholder,
  error,
  apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  locationBias,
  defaultValue = "",
}) => {
  const ref = useRef<any>(null);
  const sharedStyles = useSharedComponentStyles();
  const globalStyles = useGlobalStyles();
  const { colors } = useTheme();
  const extractCity = (components: any[] = []) => {
    return (
      components.find((c) => c.types.includes("locality"))?.long_name ||
      components.find((c) => c.types.includes("administrative_area_level_2"))
        ?.long_name ||
      ""
    );
  };
  useEffect(() => {
    if (defaultValue && ref.current) {
      ref.current.setAddressText(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View style={sharedStyles.CustomInputContainer}>
      <CustomText style={sharedStyles.CustomInputLabel}>{label}</CustomText>

      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder}
        fetchDetails={true}
        onPress={(data, details = null) => {
          const address = data?.description || "";
          const city = extractCity(details?.address_components);

          onChangeText({ address, city }); // 👈 pass both back
        }}
        disableScroll
        GooglePlacesDetailsQuery={{
          fields: "address_components",
        }}
        query={{
          key: apiKey,
          language: "en",
          ...(locationBias && {
            location: `${locationBias.latitude},${locationBias.longitude}`,
            radius: locationBias.radius,
          }),
        }}
        listLoaderComponent={<LoadPlacesIngIndicator />}
        textInputProps={{
          onBlur,
          defaultValue,
          placeholderTextColor: colors.inputPlaceholderColor,
          selectionColor: colors.text,
          clearButtonMode: "never",
        }}
        debounce={700}
        listEmptyComponent={<LoadPlacesIngIndicator />}
        styles={{
          textInput: [sharedStyles.CustomInput, sharedStyles.InputWrapper],
          listView: sharedStyles.listView,
          row: sharedStyles.listViewRow,
          separator: sharedStyles.separator,
          description: sharedStyles.description,
        }}
        enablePoweredByContainer={false}
      />

      {error ? (
        <CustomText style={sharedStyles.CustomInputErrorText}>
          {error}
        </CustomText>
      ) : null}
    </View>
  );
};

export default PlaceAutocompleteInput;
