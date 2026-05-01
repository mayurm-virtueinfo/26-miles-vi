import { ImageUrls } from "@/src/constants/urls";
import { BaseToastProps } from "react-native-toast-message";
import { CustomToast } from "./CustomToast";
export interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: (props: CustomToastProps) => (
    <CustomToast {...props} iconXml={ImageUrls.error} />
  ),
  success: (props: CustomToastProps) => (
    <CustomToast {...props} iconXml={ImageUrls.success} />
  ),
};

export default toastConfig;
