const Endpoints = () => {
  const authEndpoints = {
    register: () => `register`,
    login: () => `login`,
    send_otp_to_reset_password: () => `otp/password/send`,
    verify_otp_to_reset_passowrd: () => `otp/password/verify`,
    password_reset: () => `password/reset`,
    resend_otp_to_password_reset: () => `otp/password/send`,
    verify_email_otp: () => `otp/email/verify`,
    resend_email_otp: () => `otp/email/send`,
    refresh: () => `refresh`,
  };

  const userEndpoints = {
    get_user: () => `user/show`,
    update_user: () => `user/update`,
    verify_profile_email: () => `user/verify-email`,
    logout: () => `user/logout`,
    check_user_vehicle_registration:()=>`user/check-vehicle-registration`
  };

  const giftEndpoints = {
    get_all_gifts: () => `gifts`,
    submit_vehicle: () => `user/vehicle-registrations`,
    get_my_winnings:() => `user/winnings`,
    get_gifts_Types:()=>`gifts/types`
  };

  const subscriptionsEnpoint={
    getPackages:()=>`packages`,
    ios_subscription_purchased:()=>`subscriptions/ios`,
    chech_user_subscription_ios:()=>`subscriptions/ios/check-transaction-user`,
    current_subscriptions:()=>`subscriptions/current`,
    android_subscription_purchased:()=>`subscriptions/android`,
    chech_user_subscription_android:()=>`subscriptions/android/check-transaction-user`,


  }

  return {
    authEndpoints,
    userEndpoints,
    giftEndpoints,
    subscriptionsEnpoint
  };
};

export default Endpoints;
