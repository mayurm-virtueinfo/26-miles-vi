// hooks/useForceUpdateCheck.tsx
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { devLog } from '../shared/utils/helper';
import { useTextListOnFocus } from './useTextListOnFocus';

const useForceUpdateCheck = () => {
  const TextList = useTextListOnFocus();

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const res = await VersionCheck.needUpdate();

        if (res?.isNeeded) {
          Alert.alert(
            TextList.update_available,
            TextList.update_available_description,
            [
              {
                text: TextList.cancel, // <- Make sure this key exists in your text list
                style: 'cancel',
              },
              {
                text: TextList.update_now,
                onPress: () => {
                  if (res.storeUrl) {
                    Linking.openURL(res.storeUrl);
                  }
                },
              },
            ],
            { cancelable: true }
          );
        }
      } catch (error) {
        devLog('Version check failed:', error);
      }
    };

    checkUpdate();
  }, []);
};

export default useForceUpdateCheck;
