# Functional Document

## 26 Miles Mobile Application

**Version:** 1.0  
**Platform:** iOS and Android  
**Application Type:** Subscription-based rewards and vehicle registration mobile app  
**Technology Stack:** React Native 0.76.9, Expo SDK 52, Expo Router, TypeScript  
**Prepared For:** 26 Miles LLC  
**Prepared Date:** May 13, 2026

---

## 1. Purpose

This document describes the functional behavior of the 26 Miles mobile application. It is intended for product owners, business stakeholders, QA testers, developers, and support teams who need to understand what the app does, how users move through it, what data is collected, and what backend services are involved.

The document focuses on functional scope and implemented user-facing behavior. Technical implementation details are included only where they affect product behavior, integrations, or testing.

---

## 2. Product Overview

26 Miles is a mobile application where registered users purchase a subscription, submit vehicle license plate details, select a desired gift, and participate in reward or winning opportunities. The app also lets users manage their profile, subscriptions, language preference, theme preference, and view their vehicle submission or winnings history.

The app supports:

- Account registration and login
- Email OTP verification
- Forgot password and reset password
- Subscription purchase through Apple App Store or Google Play Billing
- Active subscription validation before access to core features
- Monthly vehicle registration checks
- Vehicle license plate submission
- Gift browsing, category filtering, and selection
- Winnings or vehicle registration history
- Profile editing and profile image update
- Email verification after profile email changes
- Language switching between English and Spanish
- Light and dark theme selection
- Logout and session handling
- Push notification permission initialization
- Force update checks

---

## 3. User Types

### 3.1 Guest User

A guest user has not logged in. Guest users can:

- Open the splash screen
- Navigate to login
- Create an account
- Start forgot password flow
- Open privacy policy and terms links from authentication screens

### 3.2 Registered Unverified User

A registered unverified user has created an account but has not completed email OTP verification. This user must verify their email before normal login and app access.

### 3.3 Registered Non-Subscriber

A registered non-subscriber has a verified account but no active subscription. This user is routed to the subscription purchase screen and cannot access the main app tabs until a subscription is active.

### 3.4 Active Subscriber

An active subscriber can access the main app, including:

- Home screen
- Vehicle registration
- Gift selection
- My winnings
- Profile and settings
- Subscription management

### 3.5 Basic Subscriber

A basic subscriber can submit vehicle registration, but the vehicle state may be locked to the user's registered state based on subscription product rules.

### 3.6 Higher-Tier Subscriber

A higher-tier subscriber can select a vehicle state during vehicle submission, subject to backend and product rules.

---

## 4. Application Navigation

The application uses Expo Router with a root stack and tab navigation.

### 4.1 Root Stack Screens

- Splash screen
- Login screen
- Signup screen
- Forgot password flow
- Subscription purchase screen
- Main tab navigator
- Profile edit screen
- Manage subscriptions screen
- Submit vehicle screen
- Gift selection screen
- My winnings screen

### 4.2 Main Tabs

The main authenticated area contains:

- Home
- Profile and Settings

The Home screen also embeds the My Winnings section.

---

## 5. Startup and Session Flow

### 5.1 App Launch

When the app launches:

1. Fonts are loaded.
2. Theme and preference providers are initialized.
3. Notification permissions are initialized.
4. A force update check is performed.
5. The app checks local storage for an access token.

### 5.2 Existing Session

If an access token exists:

1. The app calls the user profile API.
2. If the user has an active subscription, the app routes to the main tabs.
3. If the user does not have an active subscription, the app routes to the subscription purchase screen.

### 5.3 No Existing Session

If no access token exists, the app routes the user to the login screen after the splash delay.

### 5.4 Expired Session

If an authenticated API call returns unauthorized:

1. The app attempts to refresh the access token using the refresh token.
2. If refresh succeeds, the original request is retried.
3. If refresh fails, stored tokens are cleared and the user is redirected to login.

---

## 6. Authentication Functions

### 6.1 Signup

Users can create an account by entering:

- First name
- Last name
- Email address
- Initials
- Address
- City, populated through address selection where available
- State
- Phone number
- Password
- Confirm password

The signup screen also provides links to:

- Terms and Conditions
- Privacy Policy

After successful registration:

1. The backend sends an email OTP.
2. The user is shown the OTP verification screen.
3. After OTP verification, the user profile and tokens are stored.
4. The user is routed based on subscription status.

### 6.2 Login

Users log in with:

- Email address
- Password

After successful login:

1. The app stores the authenticated user data and tokens.
2. The app routes the user to either the main tabs or subscription screen depending on subscription status.

If login response indicates email verification is required:

1. The app displays the OTP verification screen.
2. The user verifies the email OTP.
3. The app continues the login flow.

### 6.3 Email OTP Verification

The OTP flow supports:

- Four-digit OTP entry
- Email verification after registration
- Email verification after login when required
- Email verification after profile email update
- OTP resend where supported by the API

### 6.4 Forgot Password

Forgot password is a three-step flow:

1. User enters email address.
2. User verifies OTP sent to email.
3. User enters and confirms a new password.

After successful password reset, the user is returned to login.

### 6.5 Logout

Users can log out from Settings. On logout:

1. The app calls the logout API.
2. Local access and refresh tokens are removed.
3. The user is routed to login.

---

## 7. Subscription Functions

### 7.1 Subscription Purchase

Users without an active subscription are routed to the subscription screen. The screen:

- Loads available packages from the backend
- Displays package name, description, price, duration, and popular indicator
- Lets the user choose a package
- Starts native in-app purchase through Apple or Google based on platform

After native purchase:

- iOS sends product ID, transaction ID, original transaction ID, transaction date, transaction receipt, and platform to the backend.
- Android sends product ID, transaction ID, purchase token, package name, and platform to the backend.

When backend validation succeeds, the user's subscription is stored in app state and the user is routed to the main tabs.

### 7.2 Existing Store Purchase Restriction

Before purchasing, the app checks available native purchases on the device. If the latest purchase is already associated with another user, the app blocks the purchase and shows an error message.

### 7.3 Manage Subscriptions

Active subscribers can open Manage Subscriptions from Settings. This screen displays:

- Current plan
- Current plan price
- Package name
- Next billing date
- Package description or benefits
- Available packages for upgrade or downgrade

### 7.4 Upgrade and Downgrade

Users can select available packages to upgrade or downgrade. The app uses the same native purchase process and backend validation flow as the initial subscription purchase.

If the user's active subscription platform does not match the current device platform, upgrade and downgrade actions are locked. For example, an iOS subscription cannot be changed from Android.

### 7.5 Cancel Subscription

Cancellation is handled through Apple or Google subscription settings. The app provides a cancel subscription action that redirects the user to the relevant platform subscription management area.

---

## 8. Home Functions

The Home screen is available to active subscribers. It displays:

- Personalized greeting using the user's first name
- Promotional reward banner
- License plate slider visual
- Monthly reward messaging
- Try Now or Offer Closed button
- My Winnings section

### 8.1 Monthly Registration Check

When the Home screen is focused, the app calls the backend to check whether the user has already registered a vehicle for the current month.

If the user has already registered:

- The action button displays Offer Closed.
- The button is disabled.

If the user has not registered:

- The action button displays Try Now.
- The user can continue to vehicle registration.

---

## 9. Vehicle Registration Functions

Users submit vehicle details before selecting a gift.

### 9.1 Vehicle Registration Fields

The app collects:

- License plate number
- Vehicle color
- Vehicle make
- Vehicle state

### 9.2 License Plate Formatting

The license plate input:

- Allows letters, numbers, and dash
- Converts letters to uppercase
- Allows up to four leading letters
- Formats entries as letters followed by dash and numbers
- Validates against the pattern: one to four letters, dash, then one or more digits

Example valid format:

```text
ABCD-1234
```

### 9.3 Vehicle Color

Users select a vehicle color from a predefined list. The dropdown supports an Other option where enabled.

### 9.4 Vehicle Make

Users select vehicle make from a predefined list. The dropdown supports an Other option where enabled.

### 9.5 Vehicle State Rules

For basic subscription products:

- Android product ID: `com.android.monthly.basic`
- iOS product ID: `com.monthly.basic`

The state field is prefilled from the user's registered state and disabled.

For other subscription products, the user can select from the US state list.

### 9.6 Vehicle Data Handoff

After validation, vehicle data is passed to the Gift screen. The vehicle is not submitted until the user selects a gift and confirms submission.

---

## 10. Gift Functions

### 10.1 Gift Listing

The Gift screen loads:

- Gift categories/types
- Gift list

Each gift displays:

- Gift image
- Gift name
- Selection state

### 10.2 Gift Category Filtering

Users can filter gifts by category. Selecting a category reloads the gift list using the selected type as a query parameter.

### 10.3 Gift Selection

When the user taps a gift:

1. The gift is selected.
2. A confirmation modal is displayed.
3. The user can confirm or cancel.

### 10.4 Final Submission

When confirmed, the app submits:

- Gift ID
- Vehicle license plate
- Vehicle make
- Vehicle color
- State

The app sends the data as form data to the backend.

After successful submission:

- A success toast is shown.
- Confetti animation is displayed.
- The user is routed back to the main tabs.

---

## 11. My Winnings Functions

The My Winnings section displays the user's vehicle registration or winnings history.

Each record displays:

- Vehicle license plate
- Vehicle color
- Vehicle make
- Vehicle state
- Status badge
- Updated date and time

If no records are available, the app displays an empty state message.

The component contains support for time-based filtering by:

- Last 1 day
- Last 7 days
- Last 1 month
- Last 3 months

The current visible UI primarily renders the list and empty/loading states.

---

## 12. Profile and Settings Functions

### 12.1 Settings Screen

The Settings screen displays:

- User number plate style view with initials and state
- Profile summary with name, initials, state, and profile image
- Manage Subscription option
- Language option
- Delete Account option
- Dark Mode switch
- Logout option

### 12.2 Profile Edit

Users can edit:

- First name
- Last name
- Email address
- Address
- City through address selection where available
- Phone number
- Profile image

Profile image can be selected through the image picker modal, using supported camera or gallery flows.

Profile updates are submitted as form data. If backend response indicates the email change requires verification, the app opens the OTP verification flow.

### 12.3 Language

The app supports:

- English
- Spanish

Users can open the language modal from Settings, select a language, and save it. The selected language is stored locally and applied through i18n.

### 12.4 Theme

The app supports:

- Dark theme
- Light theme

The default theme is dark. The selected theme is saved locally and reused on future launches.

### 12.5 Delete Account

The Settings screen includes a Delete Account action. Current app behavior shows a loading state and success message. Backend account deletion is not represented in the current implementation.

---

## 13. Validation Rules

### 13.1 Signup Validation

- First name is required.
- Last name is required.
- Email is required and must be valid.
- Initials are required, cannot contain spaces, and can be at most four characters.
- Address is required.
- State is required.
- Phone is required and must match international format with `+` and 10 to 15 digits.
- Password is required, must be at least eight characters, and cannot contain spaces.
- Confirm password is required, cannot contain spaces, and must match password.

### 13.2 Login Validation

- Email is required and must be valid.
- Password is required.

### 13.3 Forgot Password Validation

- Email is required and must be valid.
- OTP requires four single-digit entries.
- New password must be at least eight characters and cannot contain spaces.
- Confirm password must match new password.

### 13.4 Profile Update Validation

- First name is required.
- Last name is required.
- Email is required and must be valid.
- Phone is required and must match international format with `+` and 10 to 15 digits.

### 13.5 Vehicle Registration Validation

- License plate is required and must match `^[A-Za-z]{1,4}-\d+$`.
- Vehicle make is required.
- Vehicle color is required.
- State is required.

---

## 14. Backend API Usage

The app communicates with a backend API using Axios. The base URL is configured by environment variable:

```text
EXPO_PUBLIC_PROD_URL
```

### 14.1 Authentication Endpoints

| Function | Endpoint |
| --- | --- |
| Register | `register` |
| Login | `login` |
| Send password reset OTP | `otp/password/send` |
| Verify password reset OTP | `otp/password/verify` |
| Reset password | `password/reset` |
| Verify email OTP | `otp/email/verify` |
| Resend email OTP | `otp/email/send` |
| Refresh token | `refresh` |

### 14.2 User Endpoints

| Function | Endpoint |
| --- | --- |
| Get authenticated user | `user/show` |
| Update user | `user/update` |
| Verify profile email | `user/verify-email` |
| Logout | `user/logout` |
| Check current vehicle registration | `user/check-vehicle-registration` |

### 14.3 Gift and Vehicle Endpoints

| Function | Endpoint |
| --- | --- |
| Get all gifts | `gifts` |
| Get gift types | `gifts/types` |
| Submit vehicle registration | `user/vehicle-registrations` |
| Get my winnings | `user/winnings` |

### 14.4 Subscription Endpoints

| Function | Endpoint |
| --- | --- |
| Get packages | `packages` |
| Submit iOS subscription purchase | `subscriptions/ios` |
| Check iOS transaction user | `subscriptions/ios/check-transaction-user` |
| Get current subscription | `subscriptions/current` |
| Submit Android subscription purchase | `subscriptions/android` |
| Check Android transaction user | `subscriptions/android/check-transaction-user` |

---

## 15. External Integrations

### 15.1 Apple App Store and Google Play Billing

The app uses native in-app purchase functionality for subscriptions. Purchase validation and subscription activation are completed by the backend after the app sends transaction details.

### 15.2 Push Notifications

The app initializes notification permissions and configures notification handling. Android notification channel setup is handled in utility logic.

### 15.3 Address Autocomplete

Signup and profile screens use a place autocomplete input for address entry.

### 15.4 Image Picker

The profile screen uses an image picker modal to update the user's profile photo.

### 15.5 Localization

The app uses i18n translation files for English and Spanish.

---

## 16. Error Handling and Loading States

The app provides:

- Toast messages for success and error feedback
- Form-level validation messages
- Loading buttons during API calls
- Shimmer placeholders for list and subscription loading states
- Full-screen submitting overlay during vehicle submission
- Network retry alert when offline or when network requests fail

If there is no internet connection, the app prompts the user to retry or cancel the request.

---

## 17. Security and Session Handling

- Access tokens and refresh tokens are stored locally through secure storage helper functions.
- Authenticated API requests include a bearer token.
- Public routes do not require bearer token attachment.
- Expired access tokens are refreshed automatically when possible.
- Tokens are removed on logout or failed refresh.
- Passwords are not stored in app state or local storage.
- Subscription purchases are validated by backend services.

---

## 18. Business Rules

1. Users must be authenticated before accessing the main app.
2. Users must have an active subscription before accessing Home and Settings tabs.
3. Users who require email verification must complete OTP verification.
4. Users can submit vehicle registration only when the backend reports that they have not registered for the current month.
5. Basic subscription users are restricted to their registered state during vehicle submission.
6. Vehicle data must be paired with a selected gift before final submission.
7. Subscription changes are restricted when the subscription platform does not match the current device platform.
8. Subscription cancellation is handled outside the app through Apple or Google subscription settings.
9. Language and theme preferences persist locally.
10. Offline API calls must show retry handling.

---

## 19. Functional Test Scenarios

### 19.1 Authentication

- Register with valid data and verify OTP.
- Attempt signup with invalid email, phone, initials, or password confirmation.
- Login with valid credentials.
- Login with an account that still requires email verification.
- Complete forgot password flow with OTP and new password.
- Logout and verify tokens are cleared.

### 19.2 Subscription

- Load package list successfully.
- Purchase subscription on iOS.
- Purchase subscription on Android.
- Handle failed or cancelled purchase.
- Verify restricted existing purchase handling.
- Open Manage Subscriptions as active subscriber.
- Attempt plan change from mismatched platform and confirm action is locked.
- Open external subscription cancellation settings.

### 19.3 Vehicle and Gift Submission

- Confirm Try Now is enabled when monthly registration is open.
- Confirm Offer Closed is disabled when user already registered this month.
- Submit vehicle form with valid plate format.
- Confirm invalid plate format is rejected.
- Verify basic plan locks state to user state.
- Verify higher-tier plan allows state selection.
- Select gift category and confirm gifts reload.
- Select gift, cancel confirmation, and remain on gift screen.
- Select gift, confirm submission, and verify success feedback and navigation.

### 19.4 Profile and Settings

- Update profile text fields successfully.
- Update profile photo successfully.
- Change email and complete required OTP verification.
- Switch language to Spanish and confirm visible text changes.
- Switch theme between dark and light.
- Trigger delete account action and verify current success feedback.

### 19.5 Error and Offline Handling

- Disable network and confirm retry alert appears.
- Simulate expired access token and confirm refresh flow.
- Simulate failed refresh and confirm redirect to login.
- Verify loading states appear during slow API calls.

---

## 20. Functional Scope Notes

- The mobile app does not include an admin panel.
- Gift inventory, package configuration, winning status, subscription validation, and monthly registration eligibility are controlled by backend services.
- Account deletion currently behaves as a local UI feedback action and does not show a backend deletion API call in the current implementation.
- Payment cancellation is not performed directly inside the app; users are redirected to platform subscription settings.
- The current README contains generic Expo setup instructions; this functional document should be used as the product behavior reference.

