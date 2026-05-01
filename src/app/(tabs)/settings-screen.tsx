import CustomImage from "@/src/components/shared/CustomImage";
import { CustomText } from "@/src/components/shared/CustomText";
import NumberPlateView from "@/src/components/shared/NumberPlateView";
import { Screen } from "@/src/components/shared/Screen";
import Routes from "@/src/constants/routes";
import { Utility } from "@/src/constants/utility";
import { usePreferences } from "@/src/context/PreferencesContext";
import { useTheme } from "@/src/context/ThemeContext";
import useCallApiWhenRequired from "@/src/hooks/useCallApiWhenRequired";
import useDisableBack from "@/src/hooks/useDisableBack";
import usePostApi from "@/src/services/ApiHooks/postApis";
import { Ionicons } from "@expo/vector-icons";

import LanguageModal from "@/src/components/settings/LanguageModal";
import Loader from "@/src/components/shared/Loader";
import { colorSvgs } from "@/src/constants/svg";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import {
  removeKeysFromSecureStorage,
  showSuccess,
} from "@/src/shared/utils/helper";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { useSettingScreenStyles } from "@/src/styles/SettingsScreen/SettingScreensStyles";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Switch,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";

const SettingsScreen = () => {
  const { user } = usePreferences();
  const { colors, toggleTheme, theme } = useTheme();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const globalStyles = useGlobalStyles();
  const TextList = useTextListOnFocus();
  const settingStyles = useSettingScreenStyles();
  const svg = colorSvgs(colors);
  useDisableBack();
  const { logoutApi } = usePostApi();

  const { loading: logoutApiLoading, callApi: calllogoutApi } =
    useCallApiWhenRequired(logoutApi, async (data) => {
      await removeKeysFromSecureStorage(["@access_token", "@refresh_token"]);
      router.push(`/${Routes.LOGIN}`);
    });

  const deleteAccount = () => {
    setDeleteLoader(true);
    setTimeout(() => {
      setDeleteLoader(false);
      showSuccess(TextList.deleteAccountSuccessMessage);
    }, 2000);
  };

  const settings = [
    {
      id: "1",
      icon: svg.card,
      title: TextList.manageSubsciption,
      onPress: () => {
        router.push(`/${Routes.MANAGE_SUBSCRIPTIONS}`);
      },
    },
    {
      id: "2",
      icon: svg.languages,
      title: TextList.languages,
      onPress: () => {
        setShowLanguageOptions(true);
      },
    },
    {
      id: "3",
      icon: svg.deleteAccount,
      title: TextList.deleteAccount,
      onPress: () => {
        deleteAccount();
      },
    },
    {
      id: "4",
      icon: svg.darkMode,
      title: TextList.darkMode,
      isSwitch: true,
    },
    {
      id: "5",
      icon: svg.logOutSvg,
      title: TextList.logout,
      onPress: () => {
        calllogoutApi();
      },
    },
  ];
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={item.onPress}
      style={settingStyles.item}
      activeOpacity={1}
    >
      <View style={settingStyles.row}>
        <SvgXml xml={item.icon} />
        <CustomText style={settingStyles.text}>{item.title}</CustomText>
      </View>
      {item.isSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "#FBBF24" }}
          thumbColor={theme === "dark" ? "#000" : "#f4f3f4"}
          onValueChange={toggleTheme}
          value={theme == "dark" ? true : false}
        />
      ) : (deleteLoader && item.id === "3") ||
        (logoutApiLoading && item.id === "5") ? (
        <Loader size={"small"} color={colors.text} />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.settingTabsIcons}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <Screen withSafeArea={false} tabScreen={true} style={globalStyles.paddingHorizontal10}>
        <NumberPlateView
          stateName={user?.state}
          initials={user?.initials}
          showLeftOrRightPlate={false}
          containertStyle={globalStyles.mt20}
        />
        <TouchableOpacity
          onPress={() => {
            router.push(`/${Routes.PROFILE}`);
          }}
          style={settingStyles.profileSection}
        >
          <View style={settingStyles.profiLeImageAndText}>
            <CustomImage
              imageUri={
                user?.profile_photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  `${user?.first_name} ${user?.last_name}`
                )}`
              }
              style={settingStyles.profileImage}
              previewable
            />
            <View style={{ justifyContent: "center" }}>
              <CustomText style={settingStyles.profileName}>
                {user?.first_name} {user?.last_name}
              </CustomText>
              <CustomText style={settingStyles.initialAndState}>
                {user?.initials}, {user?.state}
              </CustomText>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            color={colors.settingTabsIcons}
            size={Utility.SP_20}
          />
        </TouchableOpacity>
        <CustomText style={settingStyles.otherSettingText}>
          {TextList.otherSettings}
        </CustomText>
        <View style={settingStyles.container}>
          <FlatList
            data={settings}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={settingStyles.separator} />
            )}
          />
        </View>
      <LanguageModal
        visible={showLanguageOptions}
        onClose={() => setShowLanguageOptions(false)}
        onDone={() => {
          setShowLanguageOptions(false);
        }}
      />
    </Screen>
  );
};

export default SettingsScreen;
