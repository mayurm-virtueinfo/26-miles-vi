import { Utility } from "@/src/constants/utility";
import { useTheme } from "@/src/context/ThemeContext";
import { useAuthScreenStyles } from "@/src/styles/AuthScreen/AuthScreenStyles";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import NumberPlateView from "./NumberPlateView";

interface GradientHeaderProps {
  title: string;
  stateName?: string;
  initials?: string;
  gradientColors?: string[];
  containerStyle?: object;
  titleStyle?: object;
  backOnPress?: () => void;
}

const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  stateName,
  initials,
  gradientColors,
  containerStyle = {},
  titleStyle = {},
  backOnPress,
}) => {
  const { colors } = useTheme();
  const authScreenStyles = useAuthScreenStyles();
  // Use fallback colors from theme if not passed in props
  const resolvedGradientColors = gradientColors ?? [
    colors.signupGradient,
    colors.signupGradient2,
  ];

  return (
    <LinearGradient
      //@ts-ignore
      colors={resolvedGradientColors}
      style={[authScreenStyles.signUpGradientContainer, containerStyle]}
    >
      {backOnPress && (
        <TouchableOpacity
          onPress={backOnPress}
          style={[authScreenStyles.backButtonContainer, authScreenStyles.top50]}
        >
          <AntDesign
            name="left"
            size={Utility.SP_16}
            color={colors.backButtonIconColor}
          />
        </TouchableOpacity>
      )}
      <CustomText style={[authScreenStyles.signUpheaderText, titleStyle]}>
        {title}
      </CustomText>
      <NumberPlateView stateName={stateName} initials={initials} />
    </LinearGradient>
  );
};

export default GradientHeader;
