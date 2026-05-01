import { Utility } from '@/src/constants/utility';
import { useTheme } from '@/src/context/ThemeContext';
import { useAuthScreenStyles } from '@/src/styles/AuthScreen/AuthScreenStyles';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ForgotHeaderProps } from './interfaces/auth.interface';

const ForgotHeader: React.FC<ForgotHeaderProps> = ({ backOnPress, lottieSource }) => {
  const { colors } = useTheme();
  const authScreenStyles = useAuthScreenStyles();

  return (
    <View style={authScreenStyles.otpHeaderContainer}>
      <TouchableOpacity
        onPress={backOnPress}
        style={authScreenStyles.backButtonContainer}
      >
        <AntDesign
          name="left"
          size={Utility.SP_16}
          color={colors.backButtonIconColor}
        />
      </TouchableOpacity>
      <LottieView
        source={lottieSource}
        autoPlay
        loop
        style={authScreenStyles.headerAnimation}
      />
    </View>
  );
};

export default ForgotHeader;
