import { countries } from "@/src/constants/constantsArray";
import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomText } from "./CustomText";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

interface Props extends Omit<TextInputProps, "onChangeText"> {
  value: string;
  onChangeText: (text: string) => void;
  error: string;
  label?: string;
}

const PhoneNumberInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  error,
  label,
  ...rest
}) => {
  //States
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [localNumber, setLocalNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  //Hooks
  const sharedStyles = useSharedComponentStyles();
  const globalStyles = useGlobalStyles();
  const { colors } = useTheme();  
  const TextList = useTextListOnFocus();

  

  // Set selected country on mount based on value's dial_code
  useEffect(() => {
    const matchedCountry = countries.find((country) =>
      value.startsWith(country.dial_code)
    );
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
      setLocalNumber(value.slice(matchedCountry.dial_code.length));
    } else {
      setLocalNumber(value);
    }
  }, [value]);

  const handleSelectCountry = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    const newFullNumber = country.dial_code + localNumber;
    onChangeText(newFullNumber);
    setModalVisible(false);
  };

  const handleLocalNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setLocalNumber(cleaned);
    onChangeText(selectedCountry.dial_code + cleaned);
  };

  return (
    <View style={[sharedStyles.CustomInputContainer]}>
      {label && (
        <CustomText style={sharedStyles.CustomInputLabel}>{label}</CustomText>
      )}

      <View style={[sharedStyles.PhoneNumberInputinputContainer]}>
        <TouchableOpacity
          style={sharedStyles.PhoneNumberInputflagContainer}
          disabled={true}
          onPress={() => setModalVisible(true)}
        >
          <CustomText style={sharedStyles.PhoneNumberInputflag}>
            {selectedCountry.emoji}
          </CustomText>
          <CustomText style={sharedStyles.PhoneNumberInputcode}>
            {selectedCountry.dial_code}
          </CustomText>
        </TouchableOpacity>

        <TextInput
          value={localNumber}
          onChangeText={handleLocalNumberChange}
          placeholder={placeholder || TextList.phoneNumber}
          keyboardType="number-pad"
          placeholderTextColor={colors.inputPlaceholderColor}
          style={sharedStyles.PhoneNumberInputtextInput}
          selectionColor={colors.text}
          maxLength={13}
          {...rest}
        />
      </View>

      {error && (
        <CustomText style={sharedStyles.CustomInputErrorText}>
          {error}
        </CustomText>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={sharedStyles.PhoneNumberInputmodalBackdrop}>
          <View style={sharedStyles.PhoneNumberInputmodalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={sharedStyles.PhoneNumberInputcountryItem}
                  onPress={() => handleSelectCountry(item)}
                >
                  <CustomText style={sharedStyles.PhoneNumberInputflag}>
                    {item.emoji}
                  </CustomText>
                  <CustomText
                    style={[
                      sharedStyles.PhoneNumberInputcode,
                      { color: colors.black, width: Utility.SP_60 },
                    ]}
                  >
                    {item.dial_code}
                  </CustomText>
                  <CustomText style={sharedStyles.PhoneNumberInputname}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PhoneNumberInput;
