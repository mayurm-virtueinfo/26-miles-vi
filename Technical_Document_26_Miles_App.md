# Technical Document

## 26 Miles Mobile Application

**Version:** 1.0  
**Platform:** iOS and Android  
**Framework:** React Native with Expo  
**Prepared Date:** May 13, 2026

---

## 1. Purpose

This technical document describes the implementation structure of the 26 Miles mobile application. It covers project architecture, dependency usage, runtime flows, API communication, storage, navigation, native integrations, configuration, and build information.

This document is intended for developers, technical leads, QA engineers, DevOps/build engineers, and maintainers.

---

## 2. Technology Summary

| Area | Technology |
| --- | --- |
| Mobile framework | React Native `0.76.9` |
| Expo SDK | Expo `~52.0.46` |
| Routing | Expo Router `~4.0.21` |
| Language | TypeScript `~5.8.3` |
| UI runtime | React `18.3.1` |
| API client | Axios `^1.9.0` |
| Forms | Formik `^2.4.6` |
| Validation | Yup `^1.6.1` |
| Localization | i18next, react-i18next, expo-localization |
| Native subscription billing | react-native-iap |
| Notifications | expo-notifications |
| Images | expo-image, expo-image-picker |
| Navigation primitives | Expo Router, React Navigation tabs/native |
| Animations | Lottie, React Native Reanimated |
| Storage | AsyncStorage through local helper functions |
| Build service | EAS Build |

---

## 3. Project Structure

```text
26-miles-main/
├── android/
├── ios/
├── assets/
│   ├── fonts/
│   ├── lottie/
│   └── svgs/
├── scripts/
├── src/
│   ├── app/
│   │   ├── (auth-stack-screens)/
│   │   ├── (gift-stack-screen)/
│   │   ├── (settings-stack-screens)/
│   │   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── language-config/
│   ├── navigation/
│   ├── services/
│   ├── shared/
│   └── styles/
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
└── yarn.lock
```

### 3.1 Key Directories

| Directory | Responsibility |
| --- | --- |
| `src/app` | Expo Router screens and route groups |
| `src/navigation` | Root stack configuration |
| `src/components` | Reusable UI and feature components |
| `src/context` | Theme and preference/user context providers |
| `src/hooks` | Shared behavior hooks for API calls, IAP, image picker, update checks, etc. |
| `src/services` | Axios configuration and API wrapper hooks |
| `src/constants` | Routes, endpoints, colors, schemas, URLs, static lists |
| `src/language-config` | i18n setup and translation JSON files |
| `src/shared` | Interfaces and utility helpers |
| `src/styles` | Screen-specific and global style factories |
| `assets` | Fonts, Lottie animations, images, and SVG resources |

---

## 4. Runtime Entry Flow

### 4.1 App Entry

The app entry point is configured in `package.json`:

```json
"main": "expo-router/entry"
```

Expo Router loads `src/app/_layout.tsx`, which performs the top-level setup:

1. Imports i18n configuration.
2. Registers the Expo notification handler.
3. Runs the force update check hook.
4. Loads custom fonts.
5. Wraps the app with `ThemeProvider`.
6. Wraps the app with `PreferencesProvider`.
7. Renders `RootStack`.
8. Renders global `Toast`.

### 4.2 Startup Flow

```text
App starts
  ↓
src/app/_layout.tsx
  ↓
Load fonts and initialize providers
  ↓
PreferencesProvider runs
  ↓
Initialize notifications
  ↓
Read @access_token and @language from AsyncStorage
  ↓
If token exists → call user/show
  ↓
If user has subscription → route to /(tabs)
If user has no subscription → route to subscriptions-screen
If no token → route to login-screen
```

---

## 5. Navigation Architecture

The app uses Expo Router with route groups and an explicit root stack.

### 5.1 Route Constants

Route names are centralized in:

```text
src/constants/routes.ts
```

### 5.2 Root Stack

Configured in:

```text
src/navigation/root-stack.tsx
```

Root stack screens:

| Route | Screen |
| --- | --- |
| `index` | Splash screen |
| `(auth-stack-screens)/login-screen` | Login |
| `(auth-stack-screens)/signup-screen` | Signup |
| `(auth-stack-screens)/forgot-password` | Forgot password |
| `(auth-stack-screens)/subscriptions-screen` | Subscription purchase |
| `(tabs)` | Main authenticated tabs |
| `(settings-stack-screens)/profile-screen` | Edit profile |
| `(settings-stack-screens)/manage-subscriptions` | Manage subscriptions |
| `(gift-stack-screen)/submit-vehicle-screen` | Vehicle registration |
| `(gift-stack-screen)/gift-screen` | Gift selection |
| `(gift-stack-screen)/my-winnings` | My winnings |

### 5.3 Tab Navigator

Configured in:

```text
src/app/(tabs)/_layout.tsx
```

Tabs:

- Home: `src/app/(tabs)/index.tsx`
- Settings: `src/app/(tabs)/settings-screen.tsx`

---

## 6. Context and State Management

### 6.1 PreferencesContext

File:

```text
src/context/PreferencesContext.tsx
```

Responsibilities:

- Holds authenticated user object.
- Exposes `setUser`.
- Tracks `getUserLoading`.
- Checks existing login session on app startup.
- Loads saved language.
- Initializes notifications.
- Routes users based on authentication and subscription state.

Important state:

```ts
user: User | null
setUser: (user) => void
getUserLoading: boolean
```

### 6.2 ThemeContext

File:

```text
src/context/ThemeContext.tsx
```

Responsibilities:

- Stores selected theme.
- Defaults to dark mode.
- Loads saved theme from storage key `APP_THEME`.
- Persists theme changes.
- Provides light or dark color palette.

---

## 7. Storage Architecture

The app uses `@react-native-async-storage/async-storage`.

Storage helper functions are located in:

```text
src/shared/utils/helper.tsx
```

### 7.1 Storage Keys

| Key | Purpose |
| --- | --- |
| `@access_token` | Backend access token |
| `@refresh_token` | Backend refresh token |
| `@language` | Selected app language |
| `APP_THEME` | Selected app theme |

### 7.2 Important Note

Helper functions are named `saveToSecureStorage`, `getFromSecureStorage`, and `removeKeysFromSecureStorage`, but the current implementation uses AsyncStorage, not encrypted secure storage. If token encryption is required, these helpers should be migrated to `expo-secure-store` or another secure keychain/keystore-backed storage solution.

---

## 8. API Architecture

### 8.1 Axios Client

File:

```text
src/services/axiosConfig.tsx
```

The Axios instance is named `dataServer`.

Base URL:

```text
process.env.EXPO_PUBLIC_PROD_URL
```

Timeout:

```text
100000 ms
```

### 8.2 Request Interceptor

Before each request:

1. Network connectivity is checked through `@react-native-community/netinfo`.
2. Request content type is set:
   - `multipart/form-data` for `FormData`
   - `application/json` otherwise
3. Access token is read from local storage.
4. Bearer token is added for non-public routes.

Public routes are derived from auth endpoints:

- `register`
- `login`
- Password OTP routes
- Email OTP routes
- `refresh`

### 8.3 Response Interceptor

The response interceptor:

- Returns `response.data` directly for successful responses.
- Shows offline/network retry alert for network failures.
- Handles `401` on protected routes by calling refresh token API.
- Retries the original request after successful refresh.
- Clears tokens and redirects to login if refresh fails.

### 8.4 API Wrapper Hooks

GET APIs:

```text
src/services/ApiHooks/getApis.tsx
```

POST APIs:

```text
src/services/ApiHooks/postApis.tsx
```

PUT APIs:

```text
src/services/ApiHooks/putApis.tsx
```

Endpoint constants:

```text
src/constants/endpoints.ts
```

---

## 9. API Endpoint Inventory

### 9.1 Authentication

| Function | Method | Endpoint |
| --- | --- | --- |
| Register | POST | `register` |
| Login | POST | `login` |
| Send password reset OTP | POST | `otp/password/send` |
| Verify password reset OTP | POST | `otp/password/verify` |
| Reset password | POST | `password/reset` |
| Resend password reset OTP | POST | `otp/password/send` |
| Verify email OTP | POST | `otp/email/verify` |
| Resend email OTP | POST | `otp/email/send` |
| Refresh token | POST | `refresh` |

### 9.2 User

| Function | Method | Endpoint |
| --- | --- | --- |
| Get user | GET | `user/show` |
| Update user | POST | `user/update` |
| Verify profile email | POST | `user/verify-email` |
| Logout | POST | `user/logout` |
| Check current month vehicle registration | GET | `user/check-vehicle-registration` |

### 9.3 Gifts and Vehicle Registration

| Function | Method | Endpoint |
| --- | --- | --- |
| Get gifts | GET | `gifts` |
| Get gift types | GET | `gifts/types` |
| Submit vehicle registration | POST | `user/vehicle-registrations` |
| Get winnings | GET | `user/winnings` |

### 9.4 Subscriptions

| Function | Method | Endpoint |
| --- | --- | --- |
| Get packages | GET | `packages` |
| Submit iOS purchase | POST | `subscriptions/ios` |
| Check iOS transaction user | POST | `subscriptions/ios/check-transaction-user` |
| Get current subscription | GET | `subscriptions/current` |
| Submit Android purchase | POST | `subscriptions/android` |
| Check Android transaction user | POST | `subscriptions/android/check-transaction-user` |

---

## 10. Data Flow Details

### 10.1 Login Flow

```text
User submits email/password
  ↓
loginApi()
  ↓
POST /login
  ↓
If verification_required = true
  → show OTPForm
  → verify email OTP
  → update user and tokens
Else
  → save @access_token and @refresh_token
  → set user in PreferencesContext
  → route to /(tabs) if subscribed
  → route to subscriptions-screen if not subscribed
```

### 10.2 Signup Flow

```text
User submits signup form
  ↓
registerApi()
  ↓
POST /register
  ↓
Show email OTP screen
  ↓
Verify OTP
  ↓
Save tokens and user
  ↓
Route by subscription state
```

### 10.3 Forgot Password Flow

```text
Step 0: Enter email
  ↓
POST /otp/password/send
  ↓
Step 1: Enter OTP
  ↓
POST /otp/password/verify
  ↓
Store reset_token in component state
  ↓
Step 2: Enter new password and confirmation
  ↓
POST /password/reset
  ↓
Return to login
```

### 10.4 Subscription Purchase Flow

```text
Load packages
  ↓
GET /packages
  ↓
User selects package
  ↓
useInAppPurchase.handlePurchase(productId)
  ↓
initConnection()
  ↓
getAvailablePurchases()
  ↓
Check if latest native purchase belongs to another user
  ↓
If restricted → show error and stop
If allowed → requestSubscription()
  ↓
iOS → POST /subscriptions/ios
Android → POST /subscriptions/android
  ↓
Backend validates purchase
  ↓
Update user.subscription
  ↓
Route to /(tabs) or refresh subscription screen
```

### 10.5 Vehicle and Gift Submission Flow

```text
Home screen focused
  ↓
GET /user/check-vehicle-registration
  ↓
If already registered → disable Try Now
If eligible → allow Submit Vehicle flow
  ↓
User enters plate, make, color, state
  ↓
Yup validation
  ↓
Navigate to Gift screen with vehicleData route param
  ↓
Load gifts and gift types
  ↓
GET /gifts/types
GET /gifts?type=<selectedCategory>
  ↓
User selects gift
  ↓
Confirmation modal
  ↓
POST /user/vehicle-registrations as FormData
  ↓
Show success toast and confetti
  ↓
Route back to /(tabs)
```

### 10.6 Profile Update Flow

```text
User edits profile
  ↓
Optional image selected from camera or library
  ↓
Build FormData
  ↓
POST /user/update
  ↓
Update user in PreferencesContext
  ↓
If requires_verification = true
  → show OTPForm
  → POST /user/verify-email
  → update user after verification
```

### 10.7 Token Refresh Flow

```text
Protected request returns 401
  ↓
Read @refresh_token
  ↓
POST /refresh
  ↓
If success:
  → save new access and refresh tokens
  → retry original request
If failure:
  → remove @access_token and @refresh_token
  → show session expired toast
  → route to login
```

---

## 11. Dependency Inventory

### 11.1 Runtime Dependencies

| Dependency | Version | Purpose in Project |
| --- | --- | --- |
| `@expo/vector-icons` | `^14.1.0` | Icon set for UI elements |
| `@react-native-async-storage/async-storage` | `1.23.1` | Local persistence for tokens, language, theme |
| `@react-native-community/netinfo` | `^11.4.1` | Network connectivity checks before API requests |
| `@react-native-masked-view/masked-view` | `^0.3.2` | Masked view support, often required by navigation/visual effects |
| `@react-navigation/bottom-tabs` | `^7.2.0` | Bottom tab navigation used with Expo Router |
| `@react-navigation/elements` | `^2.3.8` | Navigation UI elements |
| `@react-navigation/native` | `^7.0.14` | Core React Navigation primitives |
| `axios` | `^1.9.0` | Backend HTTP client |
| `expo` | `~52.0.46` | Expo SDK/runtime |
| `expo-blur` | `~14.0.3` | Blur UI support |
| `expo-constants` | `~17.0.8` | App/device constants |
| `expo-dev-client` | `~5.0.20` | Custom development client support |
| `expo-device` | `~7.0.3` | Physical device detection for notifications |
| `expo-font` | `~13.0.4` | Custom font loading |
| `expo-haptics` | `~14.0.1` | Haptic feedback support |
| `expo-image` | `~2.0.7` | Optimized image rendering |
| `expo-image-picker` | `~16.0.6` | Camera and gallery image selection |
| `expo-linear-gradient` | `~14.0.2` | Gradient backgrounds/overlays |
| `expo-linking` | `~7.0.5` | External URL and deep link handling |
| `expo-localization` | `^55.0.13` | Device locale detection |
| `expo-notifications` | `~0.29.14` | Push/local notification permissions and channels |
| `expo-router` | `~4.0.21` | File-based routing |
| `expo-splash-screen` | `~0.29.24` | Splash screen integration |
| `expo-status-bar` | `~2.0.1` | Status bar styling |
| `expo-symbols` | `~0.2.2` | Symbol support |
| `expo-system-ui` | `~4.0.9` | System UI controls |
| `expo-web-browser` | `~14.0.2` | Web browser support for external pages |
| `formik` | `^2.4.6` | Form state management |
| `i18next` | `^25.1.2` | Translation engine |
| `lottie-react-native` | `7.1.0` | JSON animation rendering |
| `moment` | `^2.30.1` | Date formatting and date filtering |
| `react` | `18.3.1` | React runtime |
| `react-dom` | `18.3.1` | React DOM for web target |
| `react-i18next` | `^15.5.1` | React bindings for i18next |
| `react-native` | `0.76.9` | Native mobile framework |
| `react-native-dropdown-picker` | `^5.4.6` | Dropdown controls for state, make, color |
| `react-native-gesture-handler` | `~2.20.2` | Gesture handling for navigation and UI |
| `react-native-get-random-values` | `^1.11.0` | Random values polyfill |
| `react-native-google-places-autocomplete` | `^2.5.7` | Address autocomplete input |
| `react-native-iap` | `^12.16.2` | Apple and Google subscription purchases |
| `react-native-otp-entry` | `^1.8.4` | OTP input UI |
| `react-native-reanimated` | `~3.16.1` | Native animations |
| `react-native-safe-area-context` | `4.12.0` | Safe area layout handling |
| `react-native-screens` | `~4.4.0` | Native screen primitives for navigation |
| `react-native-shimmer-placeholder` | `^2.0.9` | Loading shimmer placeholders |
| `react-native-svg` | `15.8.0` | SVG rendering |
| `react-native-toast-message` | `^2.3.0` | Success/error toast messages |
| `react-native-version-check` | `^3.5.0` | Store version update checks |
| `react-native-web` | `~0.19.13` | Web target support |
| `react-native-webview` | `13.12.5` | WebView support |
| `yup` | `^1.6.1` | Schema validation |

### 11.2 Development Dependencies

| Dependency | Version | Purpose |
| --- | --- | --- |
| `@babel/core` | `^7.25.2` | Babel compiler core |
| `@types/react` | `~18.3.12` | React TypeScript types |
| `@types/react-native-version-check` | `^3.4.8` | Type definitions for version check package |
| `eslint` | `^9.25.0` | Linting |
| `eslint-config-expo` | `~8.0.1` | Expo ESLint configuration |
| `typescript` | `~5.8.3` | TypeScript compiler |

---

## 12. Forms and Validation

Forms are built with Formik. Validation schemas are centralized in:

```text
src/constants/schema.ts
```

Schemas:

- `getSignUpValidationSchema`
- `getUpdateValidationSchema`
- `getLoginValidationSchema`
- `getForgotPasswordValidationSchema`
- `getOTPValidationSchema`
- `getResetPasswordValidationSchema`
- `getVehicleFormValidationSchema`

The schemas use localized validation messages from `getTextList()`.

---

## 13. Localization

Localization files:

```text
src/language-config/i18n.ts
src/language-config/TextList.ts
src/language-config/locales/en.json
src/language-config/locales/es.json
```

Behavior:

- Initial language is derived from device locale.
- Fallback language is English.
- Users can switch between English and Spanish from Settings.
- Selected language is saved under `@language`.

---

## 14. Native Integrations

### 14.1 In-App Purchases

File:

```text
src/hooks/useInAppPurchase.tsx
```

Library:

```text
react-native-iap
```

Main native calls:

- `initConnection`
- `getProducts`
- `getSubscriptions`
- `getAvailablePurchases`
- `requestSubscription`
- `clearTransactionIOS`

Platform handling:

- iOS sends receipt and transaction identifiers.
- Android sends purchase token and package name.

### 14.2 Notifications

Files:

```text
src/app/_layout.tsx
src/shared/utils/helper.tsx
```

Behavior:

- Notification handler is registered at app root.
- Permission is requested on physical devices.
- Android channel named `default` is created with max importance.

### 14.3 Image Picker

File:

```text
src/hooks/useImagePicker.tsx
```

Behavior:

- Requests media library permission before selecting from gallery.
- Requests camera permission before taking photo.
- Returns image object with `uri`, `name`, and `type`.

### 14.4 Address Autocomplete

Component:

```text
src/components/shared/PlacesAutoComplete/PlaceAutocompleteInput.tsx
```

Library:

```text
react-native-google-places-autocomplete
```

Used by:

- Signup screen
- Profile screen

### 14.5 Force Update Check

File:

```text
src/hooks/useForceUpdateCheck.tsx
```

Library:

```text
react-native-version-check
```

Behavior:

- Checks whether a store update is needed.
- Shows an alert if update is available.
- Opens store URL when user selects update.

---

## 15. Expo and Native Configuration

Configuration file:

```text
app.json
```

### 15.1 Expo App Settings

| Setting | Value |
| --- | --- |
| App name | `26 Miles` |
| Slug | `26-miles-app` |
| Version | `1.0.0` |
| Orientation | `portrait` |
| Scheme | `twentysixmilesapp` |
| UI style | `automatic` |
| New Architecture | `true` |

### 15.2 iOS Settings

| Setting | Value |
| --- | --- |
| Bundle identifier | `com.jay26miles.x26milesapp` |
| Tablet support | `true` |
| Background modes | `remote-notification` |
| Non-exempt encryption | `false` |

iOS permissions/descriptions:

- Camera usage for profile pictures
- Photo library usage for profile pictures
- Tracking usage description

### 15.3 Android Settings

| Setting | Value |
| --- | --- |
| Package | `com.jay26miles.x26milesapp` |
| Adaptive icon | `./assets/images/adaptive-icon.png` |

Android permissions:

- `CAMERA`
- `READ_EXTERNAL_STORAGE`
- `WRITE_EXTERNAL_STORAGE`
- `NOTIFICATIONS`

### 15.4 Expo Plugins

Configured plugins:

- `expo-router`
- `expo-splash-screen`
- `expo-localization`
- `expo-font`
- `expo-notifications`
- `react-native-iap`

### 15.5 EAS Project

EAS project ID:

```text
f01f8e01-47f4-41ba-a788-c3384579ba3e
```

---

## 16. Build Configuration

Configuration file:

```text
eas.json
```

### 16.1 EAS CLI

```json
"version": ">= 16.6.2"
```

App version source:

```json
"appVersionSource": "remote"
```

### 16.2 Build Profiles

| Profile | Purpose |
| --- | --- |
| `development:simulator` | Internal development client for iOS simulator |
| `development` | Internal development client |
| `preview` | Internal preview distribution, Android APK |
| `production` | Production build with auto increment |

### 16.3 NPM/Yarn Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `start` | `expo start` | Start Expo dev server |
| `reset-project` | `node ./scripts/reset-project.js` | Reset starter project structure |
| `android` | `expo run:android` | Build/run Android locally |
| `ios` | `expo run:ios` | Build/run iOS locally |
| `web` | `expo start --web` | Run web target |
| `lint` | `expo lint` | Run Expo lint |

---

## 17. TypeScript and Linting

### 17.1 TypeScript

File:

```text
tsconfig.json
```

Key settings:

- Extends `expo/tsconfig.base`
- `strict: true`
- Path alias:

```json
"@/*": ["./*"]
```

### 17.2 ESLint

File:

```text
eslint.config.js
```

Uses:

```text
eslint-config-expo/flat
```

Ignores:

```text
dist/*
```

---

## 18. Asset Management

Asset constants are centralized in:

```text
src/constants/urls.ts
```

### 18.1 Fonts

Loaded in `src/app/_layout.tsx`:

- `SpaceMono-Regular.ttf`
- `THEBOLDFONT-FREEVERSION.ttf`
- `BrushScriptStd.otf`

### 18.2 Lottie Animations

Used for:

- Splash loading
- OTP
- Forgot password
- Reset password
- Reward animation
- Error animation
- Success animation
- Confetti

### 18.3 Images

Used for:

- Splash logo
- Login logo
- Subscription background
- License plate visuals
- Medal/reward imagery

---

## 19. Error Handling Strategy

Error handling is distributed across:

- Axios interceptors
- API wrapper hooks
- Toast helper functions
- Form validation schemas
- Offline retry alert

### 19.1 Toasts

Helpers:

- `showSuccess`
- `showError`

Library:

```text
react-native-toast-message
```

### 19.2 Offline Handling

If network is unavailable or request fails with network-like error:

1. Alert is shown with retry and cancel actions.
2. Retry replays the original request.
3. Cancel rejects the request.

---

## 20. Security Notes

Current implementation:

- Uses bearer tokens for authenticated API calls.
- Refreshes access tokens automatically.
- Removes tokens when session refresh fails.
- Does not store passwords locally.
- Sends subscription purchase data to backend for validation.

Security concern:

- Token storage uses AsyncStorage despite helper names suggesting secure storage. For production hardening, migrate token storage to encrypted storage such as Expo SecureStore or native keychain/keystore storage.

---

## 21. Known Technical Notes

1. `src/services/ApiHooks/putApis.tsx` exists but primary implemented write operations are currently in `postApis.tsx`.
2. `deleteAccount` in Settings is currently a UI-only delayed success behavior and does not call a backend endpoint.
3. `street` is hardcoded as `"2"` during signup and reused from existing user during profile update.
4. Android and iOS subscription product IDs are used to identify the basic plan:
   - Android: `com.android.monthly.basic`
   - iOS: `com.monthly.basic`
5. The app has native `android/` and `ios/` directories, indicating it is not a pure managed-only Expo project.
6. `app.json` contains duplicated `remote-notification` in iOS `UIBackgroundModes`.
7. The app uses `process.env.EXPO_PUBLIC_*` variables for API and OAuth-like auth client configuration.

---

## 22. Environment Variables

The code references the following public Expo environment variables:

| Variable | Purpose |
| --- | --- |
| `EXPO_PUBLIC_PROD_URL` | Backend API base URL |
| `EXPO_PUBLIC_AUTH_GRANT_TYPE` | Auth grant type for login/register |
| `EXPO_PUBLIC_AUTH_CLIENT_ID` | Auth client ID |
| `EXPO_PUBLIC_AUTH_CLIENT_SECRET` | Auth client secret |
| `EXPO_PUBLIC_AUTH_GRANT_TYPE_REFRESH` | Refresh-token grant type |

These variables must be configured for local development, EAS builds, and production deployments.

---

## 23. Developer Setup

### 23.1 Install Dependencies

```bash
yarn
```

or

```bash
npm install
```

### 23.2 Start Development Server

```bash
yarn start
```

or

```bash
npx expo start
```

### 23.3 Run Native Targets

```bash
yarn ios
yarn android
```

### 23.4 Lint

```bash
yarn lint
```

---

## 24. Maintenance Recommendations

1. Replace AsyncStorage token persistence with encrypted secure storage.
2. Add automated tests for auth routing, token refresh, subscription purchase callback handling, and vehicle submission validation.
3. Add a backend delete account endpoint integration or remove the visible action until backend support exists.
4. Keep subscription product IDs in configuration rather than hardcoding them in screen logic.
5. Document required EAS environment variables in the deployment pipeline.
6. Review `UIBackgroundModes` duplication in `app.json`.
7. Consider adding API response TypeScript interfaces for user, subscription, gift, and winnings models.
8. Consider centralizing route transitions after auth/subscription changes to reduce repeated navigation logic.

