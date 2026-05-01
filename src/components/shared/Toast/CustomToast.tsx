import { Utility } from "@/src/constants/utility";
import { useGlobalStyles } from "@/src/styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { CustomText } from "../CustomText";
import { useSharedComponentStyles } from "../sharedComponentsStyes/sharedComponentsStyes";

interface CustomToastProps extends BaseToastProps {
  iconXml: string;
}

export const CustomToast = ({ text1, text2, iconXml }: CustomToastProps) => {
  const styles = useSharedComponentStyles();
  const globalStyles = useGlobalStyles();

  return (
    <View style={[styles.toastContainer]}>
      <View style={[globalStyles.verticalAlignment, globalStyles.h100Per]}>
        <LottieView
          source={iconXml}
          resizeMode="contain"
          autoPlay
          style={styles.toastLottieFile}
        />
      </View>
      <View style={styles.toastTextContainer}>
        {text1 && <CustomText style={styles.toastTitle}>{text1}</CustomText>}
        {text2 && <CustomText style={styles.toastSubtitle}>{text2}</CustomText>}
      </View>
      <TouchableOpacity
        onPress={() => Toast.hide()}
        style={[globalStyles.verticalAlignment, globalStyles.h100Per]}
      >
        <AntDesign name="close" size={Utility.SP_18} />
      </TouchableOpacity>
    </View>
  );
};
