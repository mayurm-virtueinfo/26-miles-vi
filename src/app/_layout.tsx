import { useFonts } from "expo-font";
import * as Notifications from 'expo-notifications';
import { StatusBar } from "expo-status-bar";
import 'react-native-get-random-values';
import "react-native-reanimated";
import Toast from 'react-native-toast-message';
import toastConfig from "../components/shared/Toast/toastConfig";
import { FontUrls } from "../constants/urls";
import { PreferencesProvider } from "../context/PreferencesContext";
import { ThemeProvider } from "../context/ThemeContext";
import useForceUpdateCheck from "../hooks/useForceUpdateCheck";
import "../language-config/i18n"; // important: import before components
import RootStack from "../navigation/root-stack";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useForceUpdateCheck();
  const [loaded] = useFonts({
    SpaceMono: FontUrls.SpaceMono,
    TheBoldFont: FontUrls.TheBoldFont,
    BrushScriptStd: FontUrls.BrushScriptStd,

  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <PreferencesProvider>
        <RootStack />
        <StatusBar style="auto" />
        <Toast config={toastConfig}/>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
