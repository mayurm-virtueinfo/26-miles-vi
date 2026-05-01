import Endpoints from "@/src/constants/endpoints";
import { devLog, showError } from "@/src/shared/utils/helper";
import { dataServer } from "../axiosConfig";

const usePostApi = () => {
  const { authEndpoints, userEndpoints, giftEndpoints, subscriptionsEnpoint } = Endpoints();

  //Register api
  const registerApi = async (data: any) => {
    try {
      const response = await dataServer.post(authEndpoints.register(), data);
      return response;
    } catch (err: any) {
      devLog("registerApi error", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  //login api
  const loginApi = async (data: any) => {
    try {
      const response = await dataServer.post(authEndpoints.login(), data);
      return response;
    } catch (err: any) {
      devLog("loginApi error", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
      if (err?.response?.data?.data?.verification_required) {
        return {
          verification_required:
            err?.response?.data?.data?.verification_required,
        };
      }
    }
  };

  //send otp to email api to reset password
  const sendOtpApiResetPassword = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.send_otp_to_reset_password(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("sendOtpApiResetPassword", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const verifyOtpApitoResetPassword = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.verify_otp_to_reset_passowrd(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("verifyOtpApitoResetPassword", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const passwordResetApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.password_reset(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("passwordResetApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const otpResendToResetPassword = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.resend_otp_to_password_reset(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("otpResendToResetPassword", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const emailVerifyApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.verify_email_otp(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("emailVerifyApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const resendEmailVerifyApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        authEndpoints.resend_email_otp(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("resendEmailVerifyApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const updateUserApi = async (data: any) => {
    try {
      const response = await dataServer.post(userEndpoints.update_user(), data);
      return response;
    } catch (err: any) {
      devLog("updateUserApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const verifyUserEmailApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        userEndpoints.verify_profile_email(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("verifyUserEmailApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const logoutApi = async (data: any) => {
    try {
      const response = await dataServer.post(userEndpoints.logout(), data);
      return response;
    } catch (err: any) {
      devLog("logoutApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const submitVehicleApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        giftEndpoints.submit_vehicle(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("submitVehicleApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const subscribeAppleApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        subscriptionsEnpoint.ios_subscription_purchased(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("subscribeAppleApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };
  const checksubscriptionAppleApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        subscriptionsEnpoint.chech_user_subscription_ios(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("checksubscriptionAppleApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const subscribeGoogleApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        subscriptionsEnpoint.android_subscription_purchased(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("subscribeGoogleApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  const checksubscriptionAndroidApi = async (data: any) => {
    try {
      const response = await dataServer.post(
        subscriptionsEnpoint.chech_user_subscription_android(),
        data
      );
      return response;
    } catch (err: any) {
      devLog("checksubscriptionAndroidApi", err?.response);
      if (err?.response) {
        showError(err?.response?.data?.details || err?.response?.data?.message);
      }
    }
  };

  return {
    registerApi,
    loginApi,
    sendOtpApiResetPassword,
    verifyOtpApitoResetPassword,
    passwordResetApi,
    otpResendToResetPassword,
    emailVerifyApi,
    resendEmailVerifyApi,
    updateUserApi,
    verifyUserEmailApi,
    logoutApi,
    submitVehicleApi,
    subscribeAppleApi,
    checksubscriptionAppleApi,
    subscribeGoogleApi,
    checksubscriptionAndroidApi
  };
};

export default usePostApi;
