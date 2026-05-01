// import { simpleSvg } from "@/constants/svg";
// import i18n from "@/i18n";

import { TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";
import { colorSvgs } from "@/src/constants/svg";
import { useTheme } from "@/src/context/ThemeContext";
import { HeaderRightProps } from "@/src/shared/interface/headerRight.interface";
import { SvgXml } from "react-native-svg";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";
export function HeaderRight({ showSettings = false }: HeaderRightProps) {
  const sharedComponentStyles = useSharedComponentStyles();
  const { colors } = useTheme();
  const svg = colorSvgs(colors);
  return (
    <View style={sharedComponentStyles.section}>
      <View style={sharedComponentStyles.btnContainer}>
        {showSettings && (
          <TouchableOpacity>
            <SvgXml xml={svg.activeSettings} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
