import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { ScreenHeaderOptions } from "@/src/shared/interface/screenHeader.interface";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { CustomText } from "./CustomText";
import { HeaderLeft } from "./HeaderLeft";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

export function createScreenHeaderOptions({
  title,
  backIconShow = true,
  bottomTabHeader = false,
}: ScreenHeaderOptions) {
  const sharedComponentStyles = useSharedComponentStyles();
  const globalStyles = useGlobalStyles();
  const { colors } = useTheme();

  return {
    headerShown: true,
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerLeft: () =>
      !backIconShow ? (
        <View
          style={[bottomTabHeader && sharedComponentStyles.screenheaderLeft]}
        >
          <HeaderLeft title={title} />
        </View>
      ) : !bottomTabHeader ? (
        <TouchableOpacity
          style={globalStyles.headerBackIconContainer}
          onPress={() => router.back()}
        >
          <AntDesign
            name="left"
            size={Utility.SP_16}
            color={colors.backButtonIconColor}
          />
        </TouchableOpacity>
      ) : null,
    headerTitle: () =>
      backIconShow ? (
          <CustomText style={globalStyles.headerTitleText}>{title}</CustomText>
      ) : null,
    title: "",
  };
}
