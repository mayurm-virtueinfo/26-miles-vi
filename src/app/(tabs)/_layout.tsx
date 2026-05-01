import { createScreenHeaderOptions } from "@/src/components/shared/ScreenHeader";
import TabBarIcon from "@/src/components/shared/TabBarIcon";
import Routes from "@/src/constants/routes";
import { colorSvgs } from "@/src/constants/svg";
import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { colors } = useTheme();
  const TextList = useTextListOnFocus();
  const svg = colorSvgs(colors);
  const globalStyles = useGlobalStyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        headerStyle: globalStyles.headerBackgroundColor,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: globalStyles.tabBarBackgroundIOS,
          default: globalStyles.tabBarBackgroundDefault,
        }),
      }}
    >
      <Tabs.Screen
        name={Routes.HOME}//@ts-ignore
        options={{
          ...createScreenHeaderOptions({
            title: TextList.appname,
            backIconShow: false,
            bottomTabHeader: true,
          }),
          tabBarLabel:'',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={svg.activeHome}
              inactiveIcon={svg.inActiveHome}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={Routes.SETTINGS}//@ts-ignore
        options={{
          ...createScreenHeaderOptions({
            title:TextList.profileAndSettings,
            backIconShow: true,
            bottomTabHeader: true,
          }),
          tabBarLabel:'',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={svg.activeProfile}
              inactiveIcon={svg.inActiveProfile}
            />
          ),
        }}
      />
    </Tabs>
  );
}
