import { useTheme } from '@/src/context/ThemeContext';
import { LoaderProps } from '@/src/shared/interface/loader.interface';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { CustomText } from './CustomText';

const Loader: React.FC<LoaderProps> = ({
  message,
  style,
  color,
  size = 'large',
}) => {
  const {colors} = useTheme(); // ✅ use hook to access Theme
  return (
    <View>
      <ActivityIndicator
        size={size}
        color={color || colors.text}
        style={style}
      />
      {message && <CustomText>{message}</CustomText>}
    </View>
  );
};

export default Loader;
