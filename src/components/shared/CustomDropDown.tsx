import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { useKeyboard } from "@/src/hooks/useKeyboard";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { CustomText } from "../shared/CustomText";
import { useSharedComponentStyles } from "../shared/sharedComponentsStyes/sharedComponentsStyes";
import { CustomButton } from "./CustomButton";
import CustomImage from "./CustomImage";
import { CustomInput } from "./CustomInput";

type DropdownOption = {
  label: string;
  value: string;
  image?: string;
  color?: string;
};

type CustomDropdownModalProps = {
  value: string | null;
  onChange: (value: string | null) => void;
  items: DropdownOption[];
  label?: string;
  error?: string;
  placeholder?: string;

  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  imageContentFit?:
    | "none"
    | "contain"
    | "center"
    | "fill"
    | "cover"
    | "scale-down"
    | undefined;
  enableOtherOption?: boolean;
  disabled?: boolean;
};

const CustomDropdown = ({
  value,
  onChange,
  items,
  label,
  placeholder,
  containerStyle,
  dropdownStyle,
  placeholderStyle,
  iconColor,
  imageContentFit = "contain",
  enableOtherOption = false,
  disabled = false,
}: CustomDropdownModalProps) => {
  const { colors } = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useSharedComponentStyles();
  const TextList = useTextListOnFocus();
  const { keyboardVisible, keyboardHeight } = useKeyboard();

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<DropdownOption[]>([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customOtherValue, setCustomOtherValue] = useState("");

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const baseFiltered = search.trim().length
      ? items.filter((item) => item.label.toLowerCase().includes(lowerSearch))
      : items;

    const extended = enableOtherOption
      ? [...baseFiltered, { label: "Other", value: "__other__" }]
      : baseFiltered;

    setFilteredItems(extended);
  }, [search, items, enableOtherOption]);

  const selectedItem = items.find((item) => item.value === value);
  const selectedLabel =
    selectedItem?.label || value || placeholder || TextList.selectOption;

  return (
    // Inside component return:
    <>
      <View style={[dropdownStyle, containerStyle]}>
        {label && (
          <CustomText style={styles.CustomInputLabel}>{label}</CustomText>
        )}

        <TouchableOpacity
          onPress={() => {
            if(keyboardVisible){
              Keyboard.dismiss()
            }
            setModalVisible(true)}}
          disabled={disabled}
          style={[styles.StateDropdowndropDownStyle, dropdownStyle]}
        >
          <View style={styles.row}>
            {selectedItem?.image && (
              <CustomImage
                imageUri={selectedItem.image}
                style={[styles.vehicleMake, styles.customDropDownFlag]}
                contentFit={imageContentFit}
              />
            )}
            {selectedItem?.color && (
              <View
                style={[
                  styles.vehicleMake,
                  styles.customDropDownFlag,
                  { backgroundColor: selectedItem.color },
                ]}
              />
            )}
            <View style={globalStyles.verticalAlignment}>
              <CustomText
                style={[
                  styles.StateDropdowntextStyle,
                  { color: value ? colors.text : colors.inputPlaceholderColor },
                  placeholderStyle,
                ]}
              >
                {selectedLabel}
              </CustomText>
            </View>
          </View>
          <MaterialIcons
            name={disabled ? "lock" : "keyboard-arrow-down"}
            size={Utility.SP_24}
            color={iconColor || colors.inputPlaceholderColor}
          />
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.screenContainer}>
            <View style={[styles.CustomDropdownmodalContent]}>
              <View style={styles.CustomDropdownheader}>
                <CustomText style={styles.CustomDropdownmodalTitle}>
                  {label}
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setSearch("");
                  }}
                >
                  <MaterialIcons
                    name="close"
                    size={Utility.SP_24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>

              <CustomInput
                placeholder={TextList.search}
                value={search}
                onChangeText={setSearch}
                containerStyle={[globalStyles.mb10]}
              />

              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.CustomDropdownitem}
                    onPress={() => {
                      if (item.value === "__other__") {
                        setModalVisible(false);
                        setIsOtherSelected(true);
                      } else {
                        onChange(item.value);
                        setModalVisible(false);
                        setSearch("");
                      }
                    }}
                  >
                    {item?.image && (
                      <CustomImage
                        imageUri={item.image}
                        style={styles.vehicleMake}
                        contentFit={imageContentFit}
                      />
                    )}
                    {item?.color && (
                      <View
                        style={[
                          styles.vehicleMake,
                          { backgroundColor: item?.color },
                        ]}
                      />
                    )}
                    {item?.label == "Other" && (
                      <View
                        style={[
                          styles.vehicleMake,
                          { backgroundColor: "transparent" },
                        ]}
                      />
                    )}
                    <View style={[globalStyles.verticalAlignment]}>
                      <CustomText style={styles.customDropDownLabel}>
                        {item.label}
                      </CustomText>
                    </View>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <CustomText
                    style={[
                      styles.CustomDropdownnoResultText,
                      { display: isOtherSelected ? "none" : "flex" },
                    ]}
                  >
                    {TextList.no_options_found}
                  </CustomText>
                }
                contentContainerStyle={globalStyles.pb50}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </View>
        </Modal>
      </View>

      {/* Separate Modal outside the dropdown modal */}
      <Modal
        visible={isOtherSelected}
        animationType="slide"
        transparent
        onRequestClose={() => setIsOtherSelected(false)}
      >
        <Pressable
          style={styles.customDropDownOtherInputModal}
          onPress={() => {
            if (keyboardVisible) {
              Keyboard.dismiss();
            } else {
              setIsOtherSelected(false);
            }
          }}
        >
          <View
            style={[
              styles.customDropDownOtherInputContainer,
              keyboardVisible && Platform.OS === "ios" && { height: keyboardHeight + Utility.SP_150 },
            ]}
          >
            <CustomInput
              placeholder={`${TextList.type_here}...`}
              value={customOtherValue}
              onChangeText={setCustomOtherValue}
              containerStyle={globalStyles.mb10}
            />

            <CustomButton
              buttonStyle={styles.confirmOtherButton}
              onPress={() => {
                if (customOtherValue.trim()) {
                  onChange(customOtherValue.trim());
                  setIsOtherSelected(false);
                  setModalVisible(false);
                  setCustomOtherValue("");
                  setSearch("");
                }
              }}
              textStyle={{ color: colors.white }}
              title={TextList.continue}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default CustomDropdown;
