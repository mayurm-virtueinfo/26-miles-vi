// components/TabBarIcon.tsx

import { useSharedComponentStyles } from "@/src/components/shared/sharedComponentsStyes/sharedComponentsStyes";
import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { View, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

interface TabBarIconProps {
  focused: boolean;
  activeIcon: string;
  inactiveIcon: string;
  containerStyle?: ViewStyle;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  activeIcon,
  inactiveIcon,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const sharedComponentStyles = useSharedComponentStyles();
  return (
    <View style={[sharedComponentStyles.tabBarIconContainer, containerStyle]}>
      <SvgXml xml={focused ? activeIcon : inactiveIcon} />
      <View
        style={[
          sharedComponentStyles.tabBarIconActive,
          {
            backgroundColor: focused ? colors.tabBarIconActive : "transparent",
          },
        ]}
      />
    </View>
  );
};

export default TabBarIcon;
