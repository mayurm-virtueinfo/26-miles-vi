const Routes = {
  SPLASHSCREEN: "index",
  LOGIN: "(auth-stack-screens)/login-screen",
  SIGNUP: "(auth-stack-screens)/signup-screen",
  FORGOT: "(auth-stack-screens)/forgot-password",
  SUBSCRIPTION: "(auth-stack-screens)/subscriptions-screen",
  TABS: "(tabs)",
  HOME:"index",
  SETTINGS:"settings-screen",
  PROFILE:"(settings-stack-screens)/profile-screen",
  MANAGE_SUBSCRIPTIONS:"(settings-stack-screens)/manage-subscriptions",
  SUBMIT_VEHICLE:"(gift-stack-screen)/submit-vehicle-screen",
  GIFT:"(gift-stack-screen)/gift-screen",
  MY_WINNINGS:"(gift-stack-screen)/my-winnings",
  // add more routes as needed
} as const;

export default Routes;
