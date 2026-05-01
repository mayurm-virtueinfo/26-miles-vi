import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, Platform } from 'react-native';

const useDisableBack = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();  // app close karo
        return true;             // event handled hai
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }

      const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();     // default back navigation rok do
        BackHandler.exitApp();  // app close karo
      });

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
        beforeRemoveListener();
      };
    }, [navigation])
  );
};

export default useDisableBack;
