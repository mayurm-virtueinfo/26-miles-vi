# Expo Removal Analysis

## 26 Miles Mobile Application

**Prepared Date:** May 13, 2026  
**Project:** 26 Miles React Native Mobile App  
**Current Stack:** Expo SDK 52, React Native 0.76.9, Expo Router, native iOS/Android projects

---

## 1. Executive Summary

After reviewing the current project, there is no immediate technical requirement to remove Expo completely from this application.

The app is already using a native/prebuild-style Expo setup, not a simple Expo Go-only setup. The repository contains both `ios/` and `android/` native folders, uses `expo-dev-client`, includes native modules such as `react-native-iap`, and has Expo config plugins configured in `app.json`.

For the current feature set, Expo is still compatible with the application:

- Authentication and API flows work normally in Expo.
- In-app purchases are already integrated through `react-native-iap`.
- Notifications are handled by `expo-notifications`.
- Image picker, fonts, localization, splash screen, gradients, and image rendering are Expo-supported.
- Native projects already exist for customization when needed.

However, there may be business, maintenance, or native-control reasons to remove Expo in the future. The decision should be based on whether the team needs deeper native ownership, a non-Expo build pipeline, unsupported native SDKs, or reduced dependency on Expo release cycles.

Recommended position:

> Do not remove Expo immediately unless there is a specific native SDK, build pipeline, compliance, or long-term maintenance requirement that Expo cannot satisfy.

---

## 2. Current Expo Usage in This Project

### 2.1 Expo Runtime and Tooling

The app currently depends on:

```json
"expo": "~52.0.46"
```

The entry point is:

```json
"main": "expo-router/entry"
```

Development/build scripts are Expo-based:

```json
"start": "expo start"
"android": "expo run:android"
"ios": "expo run:ios"
"web": "expo start --web"
"lint": "expo lint"
```

### 2.2 Expo Modules Used

The app uses the following Expo packages:

| Package | Current Purpose |
| --- | --- |
| `expo-router` | File-based routing and navigation entry |
| `expo-dev-client` | Custom development client |
| `expo-notifications` | Notification permissions, handler, Android channel |
| `expo-device` | Physical device detection for notifications/responsive utility |
| `expo-font` | Custom font loading |
| `expo-image` | Optimized image rendering |
| `expo-image-picker` | Camera and gallery image selection |
| `expo-linear-gradient` | Gradient UI elements |
| `expo-localization` | Device locale detection |
| `expo-splash-screen` | Native splash screen |
| `expo-status-bar` | Status bar handling |
| `expo-blur` | Blur UI for image preview |
| `expo-linking` | External URL/deep link support |
| `expo-web-browser` | Browser support |
| `expo-system-ui` | System UI support |
| `@expo/vector-icons` | UI icons |

### 2.3 Native Project Status

The repository contains:

```text
ios/
android/
```

This means the app is already beyond a purely managed Expo Go workflow. Native iOS and Android files are present and can be customized.

Examples of native Expo integration:

- `ios/Podfile` uses `use_expo_modules!`.
- `android/settings.gradle` uses `useExpoModules()`.
- `android/app/build.gradle` resolves Expo app entry through Expo scripts.
- iOS and Android native files include Expo splash/module setup.

---

## 3. What “Remove Expo” Can Mean

There are two different meanings:

### 3.1 Remove Expo Managed Workflow Only

This means keeping Expo modules but using native iOS/Android projects directly.

Current project status:

- This has effectively already happened.
- The app has native folders.
- The app uses `expo run:ios` and `expo run:android`.
- Native modules like `react-native-iap` are supported through prebuild/native project setup.

### 3.2 Remove Expo Completely

This means removing:

- `expo`
- `expo-router`
- All Expo modules
- Expo config plugins
- Expo build tooling
- Expo app entry
- Expo native autolinking

This would convert the app into a plain React Native CLI app.

This is a larger migration and would require replacing many working modules.

---

## 4. Reasons Someone May Want to Remove Expo

### 4.1 Full Native Control

Expo abstracts and generates parts of native configuration. If the team needs complete manual control of:

- `AppDelegate`
- `MainApplication`
- Gradle setup
- Podfile setup
- Build phases
- Entitlements
- Notification extensions
- StoreKit-specific native behavior
- Android billing service customization

then a plain React Native setup can be easier to reason about.

Current relevance to this app:

- Medium.
- The app uses native in-app purchases and notifications, but the current setup already supports them.
- Removal is only justified if upcoming native customization exceeds Expo config plugin support.

### 4.2 Unsupported Native SDKs

If the app needs third-party native SDKs that do not work cleanly with Expo config plugins or Expo modules, removing Expo may reduce friction.

Possible future examples:

- Advanced fraud detection SDKs
- Custom analytics SDKs requiring native build-phase changes
- Native subscription SDKs beyond `react-native-iap`
- Custom push notification service extensions
- App Clip or advanced iOS extension targets
- Deep native background processing

Current relevance to this app:

- Low to medium.
- No reviewed code currently shows an unsupported native SDK requirement.

### 4.3 Build Pipeline Independence

Expo apps often use Expo CLI and optionally EAS Build. If the organization wants a fully custom build/release process in Xcode, Android Studio, Fastlane, Bitrise, Jenkins, GitHub Actions, or another CI system without Expo dependency, removal may be considered.

Current relevance to this app:

- Medium.
- The app has `eas.json` and Expo scripts.
- If the team does not want EAS or Expo CLI in the build chain, this is a valid reason.

### 4.4 Dependency and Version Control

Expo SDK pins compatible versions of React Native and many native modules. This is helpful, but it also means upgrades follow Expo SDK release cycles.

Removing Expo gives the team more direct control over:

- React Native version upgrades
- Native dependency versions
- Gradle and CocoaPods changes
- New architecture rollout
- Native patching

Current relevance to this app:

- Medium.
- The project uses React Native `0.76.9` through Expo SDK 52 and has `newArchEnabled: true`.
- If the team needs to upgrade React Native faster than Expo supports, removal may help.

### 4.5 App Size and Native Module Footprint

Expo modules add native dependencies. The current iOS Podfile lock includes many Expo pods, including modules that come through Expo infrastructure.

Removing unused Expo modules may reduce:

- Native dependency count
- Build time
- App binary size
- Native initialization surface area

Current relevance to this app:

- Medium.
- The app uses many Expo modules directly, so removal would require replacements.
- A lighter first step would be auditing and removing unused Expo packages rather than removing Expo completely.

### 4.6 Debugging Native Issues

Expo layers can make some native errors harder to trace, especially around:

- iOS CocoaPods
- Android Gradle
- Native module autolinking
- Config plugins
- Prebuild-generated files

Plain React Native may be more familiar to teams with strong native expertise.

Current relevance to this app:

- Medium.
- The project already includes native folders, so native debugging is possible.
- Complete Expo removal is not required just to debug native code.

### 4.7 Compliance and Security Review Preferences

Some organizations prefer minimizing abstraction layers for security/compliance review, especially when the app handles:

- Payments
- Account tokens
- Push notifications
- User identity data

Current relevance to this app:

- Medium.
- The app handles subscriptions and auth tokens.
- However, the more urgent security concern is not Expo; it is that token helper functions named “SecureStorage” currently use AsyncStorage.

Recommended first security fix:

```text
Migrate @access_token and @refresh_token from AsyncStorage to Expo SecureStore or native keychain/keystore storage.
```

---

## 5. Reasons Not to Remove Expo Right Now

### 5.1 Existing Features Depend Heavily on Expo

The app currently uses Expo in many core areas:

- Routing
- App entry
- Notifications
- Font loading
- Images
- Image picker
- Localization
- Splash screen
- Status bar
- Gradients
- Blur views
- Linking
- Icons

Removing Expo would touch a large part of the app.

### 5.2 Current Native Requirements Are Already Supported

The most native-heavy feature is subscription purchase. The app already uses:

```text
react-native-iap
```

It is configured in Expo plugins:

```json
[
  "react-native-iap"
]
```

Since native folders already exist, the app can support custom native work without removing Expo completely.

### 5.3 Migration Risk Is High

Removing Expo would require replacing multiple stable modules. This creates risk around:

- Navigation regressions
- Asset loading issues
- Splash screen behavior
- Notification permission changes
- Image picker differences
- Deep link differences
- Build failures on iOS/Android
- App Store and Play Store release delays

### 5.4 No Clear Blocking Issue Found

Based on the current codebase, there is no obvious feature that cannot be built with the current Expo prebuild/dev-client setup.

---

## 6. Practical Need Assessment

| Question | Current Answer |
| --- | --- |
| Is the app limited to Expo Go? | No |
| Does the repo have native iOS/Android projects? | Yes |
| Does the app use native IAP? | Yes |
| Is native IAP blocked by Expo? | No, current setup supports it |
| Are push notifications blocked by Expo? | No |
| Is routing tied to Expo? | Yes, through Expo Router |
| Would complete Expo removal be simple? | No |
| Is complete Expo removal required today? | No clear evidence |

---

## 7. If Expo Is Removed, What Must Be Replaced

### 7.1 Routing

Current:

```text
expo-router
```

Replacement:

```text
@react-navigation/native
@react-navigation/native-stack
@react-navigation/bottom-tabs
```

Required work:

- Replace file-based routing with explicit navigator definitions.
- Replace `router.push`, `router.navigate`, `router.back`.
- Replace route groups such as `(tabs)` and `(auth-stack-screens)`.

### 7.2 Images

Current:

```text
expo-image
```

Replacement options:

- React Native `Image`
- `react-native-fast-image`, if compatible and maintained for target RN version

Required work:

- Replace `Image` and `ImageBackground` imports.
- Recheck caching and content fit behavior.

### 7.3 Image Picker

Current:

```text
expo-image-picker
```

Replacement:

```text
react-native-image-picker
```

Required work:

- Update permission flows.
- Update returned image object shape.
- Re-test profile image upload form data.

### 7.4 Notifications

Current:

```text
expo-notifications
expo-device
```

Replacement options:

- `@react-native-firebase/messaging`
- `notifee`
- Native APNs/FCM integration

Required work:

- Configure APNs/FCM.
- Configure Android notification channels.
- Replace notification permission and scheduling APIs.
- Rework notification handler behavior.

### 7.5 Fonts

Current:

```text
expo-font
```

Replacement:

- Native font linking through React Native assets
- iOS Info.plist font configuration
- Android asset font configuration

Required work:

- Link custom fonts manually.
- Replace runtime font loading logic.

### 7.6 Splash Screen

Current:

```text
expo-splash-screen
```

Replacement:

- Native iOS storyboard launch screen
- Android launch theme/drawable setup

Required work:

- Configure splash assets manually.
- Validate dark/light splash behavior.

### 7.7 Localization

Current:

```text
expo-localization
```

Replacement:

```text
react-native-localize
```

Required work:

- Replace locale detection.
- Keep i18next and react-i18next.

### 7.8 Gradients and Blur

Current:

```text
expo-linear-gradient
expo-blur
```

Replacement:

```text
react-native-linear-gradient
@react-native-community/blur
```

Required work:

- Replace imports and props.
- Re-test UI screens using gradients/blur.

### 7.9 Linking and Web Browser

Current:

```text
expo-linking
expo-web-browser
```

Replacement:

- React Native `Linking`
- `react-native-inappbrowser-reborn`, if in-app browser behavior is needed

### 7.10 Status Bar and System UI

Current:

```text
expo-status-bar
expo-system-ui
```

Replacement:

- React Native `StatusBar`
- Native Android/iOS system UI configuration

---

## 8. Migration Complexity

### 8.1 Estimated Complexity

Complete Expo removal complexity: **High**

Reasons:

- Expo Router is central to navigation.
- Many screens use `router` directly.
- Many UI components import Expo packages.
- Native iOS/Android files contain Expo-generated setup.
- Build scripts and app entry are Expo-based.
- Notification, splash, image, font, and localization behavior would need replacement and re-testing.

### 8.2 Suggested Migration Phases

If the team decides to remove Expo, do it in phases.

#### Phase 1: Decision and Audit

- Confirm exact reason for removal.
- List native SDKs or constraints causing the need.
- Identify all Expo imports.
- Decide whether to remove Expo completely or only reduce Expo usage.

#### Phase 2: Replace App Entry and Navigation

- Replace `expo-router/entry`.
- Build explicit React Navigation root stack and tab navigators.
- Replace route group navigation.
- Re-test auth, subscription, vehicle, gift, and settings routes.

#### Phase 3: Replace Expo UI/Device Modules

- Replace `expo-image`.
- Replace `expo-image-picker`.
- Replace `expo-linear-gradient`.
- Replace `expo-blur`.
- Replace `expo-font`.
- Replace `expo-localization`.
- Replace `expo-status-bar`.

#### Phase 4: Replace Notifications and Splash

- Implement native notification stack.
- Implement native splash behavior.
- Re-test permission prompts and notification channel setup.

#### Phase 5: Remove Expo Native Integration

- Remove Expo packages from `package.json`.
- Remove `use_expo_modules!` from iOS Podfile.
- Remove Expo autolinking from Android settings.
- Clean iOS Pods and Android Gradle setup.
- Rebuild both platforms.

#### Phase 6: Release Validation

- Test iOS simulator and physical device.
- Test Android emulator and physical device.
- Validate IAP sandbox purchases.
- Validate notifications.
- Validate profile image upload.
- Validate app startup and session restore.
- Validate App Store and Play Store release builds.

---

## 9. Recommended Approach

### 9.1 Short-Term Recommendation

Do not remove Expo immediately.

The current app can continue using Expo because:

- It already has native folders.
- It already supports native IAP.
- It already supports notifications, image picking, fonts, and localization.
- Expo is not currently blocking the reviewed feature set.

### 9.2 Better Immediate Actions

Instead of removing Expo, prioritize:

1. Migrate auth token storage from AsyncStorage to secure storage.
2. Remove unused Expo packages if any are confirmed unused.
3. Keep native folders committed and maintain them carefully.
4. Document EAS and environment variables.
5. Test subscription flows on real iOS and Android devices.
6. Fix duplicated `remote-notification` entry in `app.json`.

### 9.3 When Removal Becomes Justified

Expo removal becomes reasonable if one or more of these becomes true:

- A required native SDK does not work with Expo modules/config plugins.
- The team must fully own native Gradle/CocoaPods setup without Expo scripts.
- EAS/Expo CLI cannot be used in the release pipeline.
- React Native upgrades must happen faster than Expo SDK support allows.
- App Store/Play Store compliance requires native implementation details that Expo cannot support.
- Expo module overhead becomes a proven performance, size, or build-time problem.

---

## 10. Final Conclusion

There is not a strong current technical need to remove Expo from the 26 Miles application.

The app is already in a native-capable Expo setup and can support the current product requirements, including subscriptions, notifications, images, localization, and native builds.

Removing Expo completely would be a high-effort migration with significant regression risk. It should only be done if there is a clearly identified blocker, such as unsupported native SDK requirements, strict build pipeline independence, or native compliance needs that cannot be solved inside the current Expo prebuild/dev-client architecture.

For now, the best engineering path is to keep Expo, harden security/storage, clean native configuration, and only revisit Expo removal if a concrete platform requirement appears.

