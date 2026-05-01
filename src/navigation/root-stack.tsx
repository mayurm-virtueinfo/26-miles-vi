import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { createScreenHeaderOptions } from "../components/shared/ScreenHeader";
import { useSharedComponentStyles } from "../components/shared/sharedComponentsStyes/sharedComponentsStyes";
import Routes from "../constants/routes";
import { useTheme } from "../context/ThemeContext";
import { useTextListOnFocus } from "../hooks/useTextListOnFocus";

export default function RootStack() {
  const TextList = useTextListOnFocus();
  const { colors } = useTheme();

  const sharedComponentsStyes = useSharedComponentStyles();
  return (
    <View style={sharedComponentsStyes.screenContainer}>
      <Stack
        screenOptions={{
          navigationBarColor: colors.background,
          headerShown: false,
          navigationBarHidden:true
        }}
      >
        <Stack.Screen name={Routes.SPLASHSCREEN} options={{ navigationBarColor: colors.splashbackground}} />
        <Stack.Screen name={Routes.LOGIN} options={{ gestureEnabled: false }} />
        <Stack.Screen name={Routes.SIGNUP} />
        <Stack.Screen name={Routes.FORGOT} />
        <Stack.Screen name={Routes.SUBSCRIPTION} options={{ gestureEnabled: false }} />
        <Stack.Screen
          name={Routes.TABS}
          options={{
            gestureEnabled: false,
            navigationBarColor: colors.tabBarbackground,
          }}
        />
        <Stack.Screen
          name={Routes.PROFILE}//@ts-ignore
          options={{
            ...createScreenHeaderOptions({
              title: TextList.edit_profile,
              backIconShow: true,
            }),
            headerStyle: { backgroundColor: colors.background },
          }}
        />
        <Stack.Screen
          name={Routes.MANAGE_SUBSCRIPTIONS}//@ts-ignore
          options={{
            ...createScreenHeaderOptions({
              title: TextList.subcription_plans,
              backIconShow: true,
            }),
            headerStyle: { backgroundColor: colors.background },
          }}
        />
        <Stack.Screen
          name={Routes.SUBMIT_VEHICLE}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: colors.background },
          }}
        />
        <Stack.Screen
          name={Routes.GIFT}//@ts-ignore
          options={{
            ...createScreenHeaderOptions({
              backIconShow: true,
            }),
            headerStyle: { backgroundColor: colors.background },
            navigationBarColor: colors.giftsBackground
          }}
        />
        <Stack.Screen
          name={Routes.MY_WINNINGS}//@ts-ignore
          options={{
            ...createScreenHeaderOptions({
              backIconShow: true,
            }),
            headerStyle: { backgroundColor: colors.background },
          }}
        />
      </Stack>
    </View>
  );
}
