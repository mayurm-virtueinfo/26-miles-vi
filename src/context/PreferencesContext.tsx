import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Routes from "../constants/routes";
import useCallApiWhenRequired from "../hooks/useCallApiWhenRequired";
import i18n from "../language-config/i18n";
import useGetApi from "../services/ApiHooks/getApis";
import {
  defaultContext,
  PreferencesContextType,
  User,
} from "../shared/interface/preferenceContext.interface";
import {
  getFromSecureStorage,
  initializeNotifications,
} from "../shared/utils/helper";

// Context
const PreferencesContext =
  createContext<PreferencesContextType>(defaultContext);

// Provider
export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { getUserApi } = useGetApi();
  const { loading: getUserLoading, callApi: callGetUserApi } =
    useCallApiWhenRequired(getUserApi, async (data) => {
      setUser(data?.data?.user);
      if (data?.data?.user?.subscription) {
        router.push(`/${Routes.TABS}`);
      } else {
        router.push(`/${Routes.SUBSCRIPTION}`);
      }
    });

  const checkUserIsAlreadyLoggedIN = async () => {
    const AccessTokken = await getFromSecureStorage("@access_token");
    const langauage = await getFromSecureStorage("@language");
    //@ts-ignore
    i18n.changeLanguage(langauage);

    if (AccessTokken) {
      callGetUserApi();
    } else {
      setTimeout(() => {
        router.push(`/${Routes.LOGIN}`);
      }, 1000);
    }
  };
  useEffect(() => {
    initializeNotifications();
    checkUserIsAlreadyLoggedIN();
  }, []);
  return (
    <PreferencesContext.Provider
      value={{
        user,
        setUser,
        getUserLoading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

// Hook
export const usePreferences = () => useContext(PreferencesContext);
