import { useTheme } from "@/src/context/ThemeContext";
import { useTextListOnFocus } from "@/src/hooks/useTextListOnFocus";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomText } from "./CustomText";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  isPopular?: boolean;
  showPopularTag?: boolean;
  showBorder?: boolean;
  onPress?: ()=>void;
  duration?:string

}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  isPopular = false,
  showPopularTag = false,
  showBorder=false,
  onPress,
  duration
}) => {
  const { colors } = useTheme();
  const globalStyles = useGlobalStyles();
  const sharedStyles = useSharedComponentStyles();
  const TextList = useTextListOnFocus();
  const Wrapper = isPopular ? LinearGradient : View;
  const wrapperProps = isPopular
    ? {
        colors: [colors.proSubacriptionGardient, colors.signupGradient2],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }
    : {};

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      {/* @ts-ignore */}
      <Wrapper
        {...wrapperProps}
        style={[
          sharedStyles.PricingCard,
          isPopular ? null : sharedStyles.PricingCardnonPopularBackground,
          isPopular && sharedStyles.PricingCardpopularCard,
          showBorder && {borderColor:colors.signupGradient2}
        ]}
      >
        {showPopularTag && (
          <LinearGradient
            colors={[
              colors.signupGradient2,
              colors.proSubacriptionGardient,
              colors.signupGradient2,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={sharedStyles.PricingCardpopularBadge}
          >
            <CustomText style={sharedStyles.PricingCardpopularText}>
              {TextList.mostpopular}
            </CustomText>
          </LinearGradient>
        )}
        <View
          style={[
            sharedStyles.PricingCardTextContainer,
            showPopularTag && globalStyles.mt10,
          ]}
        >
          <View>
            <CustomText style={sharedStyles.PricingCardtitle}>
              {title}
            </CustomText>
            <CustomText style={sharedStyles.PricingCardsubtitle}>
              {subtitle}
            </CustomText>
          </View>
          <View>
            <CustomText
              style={[
                sharedStyles.PricingCardtitle,
                globalStyles.textALignRight,
              ]}
            >
              ${price}
            </CustomText>
            <CustomText
              style={[
                sharedStyles.PricingCardsubtitle,
                globalStyles.textALignRight,
              ]}
            >
              {duration}
            </CustomText>
          </View>
        </View>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default PricingCard;
