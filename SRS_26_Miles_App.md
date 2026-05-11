# Software Requirements Specification (SRS)

## 26 Miles App

**Version:** 1.0  
**Platform:** iOS and Android  
**Technology Stack:** React Native 0.76.9, Expo SDK 52, Expo Router  
**Prepared For:** 26 Miles LLC  

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification defines the functional, non-functional, interface, architecture, data, and use case requirements for the 26 Miles mobile application. The document is intended for stakeholders, product owners, developers, QA teams, and client representatives involved in planning, validating, maintaining, or extending the application.

### 1.2 Scope

The 26 Miles App is a subscription-based mobile application that allows users to register, verify their email, purchase or manage subscriptions, submit vehicle license plate information, select desired gifts/rewards, and track their winnings or vehicle registration submissions.

The app supports:

- User registration and login
- Email OTP verification
- Password recovery
- Subscription purchase through Apple App Store and Google Play Billing
- Vehicle registration for reward participation
- Gift browsing and selection
- Winnings/submission history
- Profile management
- Language preferences
- Light/dark theme preferences
- Push notification permission handling
- Force update checks

### 1.3 Definitions

- **User:** A registered mobile app user.
- **Subscriber:** A user with an active subscription.
- **OTP:** One-time password used for email verification and password reset.
- **Gift:** A reward item available for selection during vehicle registration.
- **Winning:** A submitted vehicle registration entry with an associated status.
- **Subscription Package:** A paid plan available through in-app purchase.
- **IAP:** In-app purchase through Apple or Google billing systems.
- **API:** Backend service endpoint consumed by the mobile app.

---

## 2. Overall Description

### 2.1 Product Perspective

The 26 Miles App is a cross-platform mobile application built with Expo and React Native. It acts as the mobile client for a backend service that manages authentication, users, subscriptions, gifts, vehicle registrations, and winnings. The app uses Expo Router for screen navigation and integrates with native device services such as notifications, image selection, and in-app purchases.

### 2.2 Product Functions

The application provides the following primary functions:

- Account creation with personal, address, phone, state, and initials information
- Login and secure session persistence
- Email verification using OTP
- Forgot password and reset password workflow
- Subscription package listing and purchase
- Current subscription viewing, upgrade, downgrade, and cancellation redirection
- Vehicle registration submission for monthly reward participation
- Gift listing, category filtering, and gift selection
- Display of user winnings/submission history
- Profile editing, including profile image update
- Language switching between English and Spanish
- Theme switching between light and dark mode
- Logout and account deletion placeholder behavior
- Push notification permission initialization
- App version update prompt

### 2.3 User Classes and Characteristics

- **Guest User:** Can view login, signup, forgot password, and legal links.
- **Registered Unverified User:** Must complete OTP verification before full access.
- **Registered Non-Subscriber:** Must purchase a subscription before accessing core app features.
- **Active Subscriber:** Can access home, vehicle registration, gift selection, winnings, profile, and settings.
- **Basic Subscriber:** Vehicle registration state may be locked to the user's registered state.
- **Premium/Higher-Tier Subscriber:** May be allowed broader vehicle state selection based on subscription rules.
- **Administrator/Backend Operator:** Not directly represented in the mobile app, but assumed to manage gifts, packages, subscriptions, and winning statuses through backend systems.

### 2.4 Assumptions and Constraints

- The backend API is available and exposes authentication, user, gift, vehicle registration, and subscription endpoints.
- Users must have internet access for login, registration, subscriptions, gift loading, and submissions.
- Apple and Google subscription products must be configured correctly in their respective stores.
- Vehicle registration participation is limited to once per month based on backend validation.
- The app is designed primarily for portrait orientation.
- English and Spanish are the supported languages.
- iOS and Android platform policies govern payment cancellation and subscription management.
- Sensitive user and payment validation logic is handled by the backend and app store billing systems.

---

## 3. Functional Requirements

### Authentication and Account Management

- **FR1:** The system shall allow new users to register using first name, last name, email, phone number, initials, address, city, state, password, and password confirmation.
- **FR2:** The system shall validate required registration fields before submission.
- **FR3:** The system shall validate email format during registration and login.
- **FR4:** The system shall require passwords to meet minimum validation rules, including minimum length and confirmation match.
- **FR5:** The system shall allow users to open Terms and Conditions and Privacy Policy links during signup.
- **FR6:** The system shall send an OTP to the user's email after registration.
- **FR7:** The system shall allow users to verify their email using a 4-digit OTP.
- **FR8:** The system shall allow OTP resend for email verification.
- **FR9:** The system shall allow verified users to log in using email and password.
- **FR10:** The system shall detect when login requires email verification and redirect the user to OTP verification.
- **FR11:** The system shall store access and refresh tokens after successful authentication.
- **FR12:** The system shall automatically fetch the authenticated user profile on app launch when a valid token exists.
- **FR13:** The system shall route users with active subscriptions to the main app.
- **FR14:** The system shall route users without active subscriptions to the subscription screen.
- **FR15:** The system shall allow users to log out and clear stored authentication tokens.

### Password Recovery

- **FR16:** The system shall allow users to initiate password reset using their email address.
- **FR17:** The system shall send a password reset OTP to the user's email.
- **FR18:** The system shall allow users to verify the reset OTP.
- **FR19:** The system shall allow users to set a new password after OTP verification.
- **FR20:** The system shall validate password and confirmation password before reset submission.

### Subscription Management

- **FR21:** The system shall display available subscription packages retrieved from the backend.
- **FR22:** The system shall show package name, description, price, duration, and popularity indicator when available.
- **FR23:** The system shall allow users to select a subscription package.
- **FR24:** The system shall initiate Apple in-app purchase on iOS.
- **FR25:** The system shall initiate Google Play subscription purchase on Android.
- **FR26:** The system shall send successful purchase transaction details to the backend for validation and subscription activation.
- **FR27:** The system shall check whether an existing app store subscription is already associated with another user before allowing purchase.
- **FR28:** The system shall display the user's current subscription package.
- **FR29:** The system shall display next billing date for the active subscription.
- **FR30:** The system shall display available upgrade or downgrade plans.
- **FR31:** The system shall prevent subscription change actions when the active subscription platform differs from the current device platform.
- **FR32:** The system shall redirect users to Apple or Google subscription settings for cancellation.

### Home and Vehicle Registration

- **FR33:** The system shall display a personalized greeting using the user's first name.
- **FR34:** The system shall display promotional content for monthly rewards.
- **FR35:** The system shall check whether the user has already registered a vehicle for the current month.
- **FR36:** The system shall disable monthly registration when the user has already submitted a vehicle for the month.
- **FR37:** The system shall allow eligible users to start vehicle registration.
- **FR38:** The system shall collect license plate number, vehicle make, vehicle color, and vehicle state.
- **FR39:** The system shall enforce license plate format validation.
- **FR40:** The system shall allow vehicle make and vehicle color selection from predefined lists and other options where supported.
- **FR41:** The system shall preselect or lock state for basic subscription users based on business rules.
- **FR42:** The system shall navigate users to gift selection after vehicle data validation.

### Gifts and Winnings

- **FR43:** The system shall retrieve available gift categories from the backend.
- **FR44:** The system shall retrieve available gifts from the backend.
- **FR45:** The system shall allow users to filter gifts by category.
- **FR46:** The system shall display gift name and image.
- **FR47:** The system shall allow users to select a gift.
- **FR48:** The system shall require confirmation before submitting vehicle registration and selected gift.
- **FR49:** The system shall submit vehicle registration and selected gift to the backend.
- **FR50:** The system shall show success feedback after a successful submission.
- **FR51:** The system shall display celebratory animation after successful submission.
- **FR52:** The system shall display the user's winnings or vehicle registration history.
- **FR53:** The system shall show license plate, vehicle make, vehicle color, state, status, and updated date for each winning/submission record.
- **FR54:** The system shall show an empty state when no winnings are available.

### Profile and Settings

- **FR55:** The system shall display the user's profile information in settings.
- **FR56:** The system shall display the user's initials and registered state on a plate-style view.
- **FR57:** The system shall allow users to edit first name, last name, email, phone number, address, and city.
- **FR58:** The system shall allow users to update their profile photo using camera or photo library.
- **FR59:** The system shall submit profile updates to the backend.
- **FR60:** The system shall require OTP verification when profile email update requires verification.
- **FR61:** The system shall allow users to switch app language.
- **FR62:** The system shall persist selected language locally.
- **FR63:** The system shall allow users to switch between dark and light theme.
- **FR64:** The system shall persist selected theme locally.
- **FR65:** The system shall provide a delete account option and show user feedback after action completion.
- **FR66:** The system shall provide access to subscription management from settings.

### Notifications, Updates, and Error Handling

- **FR67:** The system shall request notification permission on supported physical devices.
- **FR68:** The system shall configure the Android notification channel.
- **FR69:** The system shall display toast messages for success and error states.
- **FR70:** The system shall detect network connectivity before API requests.
- **FR71:** The system shall prompt users to retry when network connectivity fails.
- **FR72:** The system shall refresh expired access tokens using refresh tokens.
- **FR73:** The system shall clear tokens and redirect to login when session refresh fails.
- **FR74:** The system shall check for app updates and prompt the user when an update is available.

---

## 4. Non-Functional Requirements

### 4.1 Performance

- The app should launch to the splash screen within an acceptable mobile startup time.
- API calls should display loading states or shimmer placeholders during data retrieval.
- Screens should avoid blocking UI interactions while network requests are pending.
- Image and animation assets should be optimized for mobile performance.
- API timeout handling should prevent indefinite loading states.

### 4.2 Security

- Authentication shall use backend-issued access and refresh tokens.
- Protected API requests shall include bearer token authorization.
- Expired access tokens shall be refreshed using refresh tokens.
- Users shall be logged out if token refresh fails.
- Passwords shall never be stored locally by the application.
- Payment validation shall be performed through app store transaction data and backend verification.
- Profile image uploads and form-data submissions shall be sent through authenticated API calls.
- Sensitive backend credentials shall be provided through environment configuration, not hardcoded in the app source.

### 4.3 Usability

- The app shall provide clear validation messages for form errors.
- The app shall provide visual loading feedback during authentication, subscription, profile, gift, and winnings operations.
- The app shall support dark and light themes.
- The app shall support English and Spanish localization.
- Navigation shall prevent users from bypassing required login, verification, or subscription flows.
- The app shall use confirmation modals for important submission actions.

### 4.4 Reliability

- The app shall handle offline conditions gracefully.
- The app shall allow users to retry failed network requests.
- The app shall preserve authentication state between sessions.
- The app shall recover from expired tokens when refresh is possible.
- The app shall display empty states when no list data is available.

### 4.5 Scalability

- The app shall support additional subscription packages returned from the backend.
- The gift listing shall support backend-driven categories and gifts.
- Localization shall be extendable to additional languages.
- The Expo Router structure shall allow new screens to be added with minimal navigation changes.
- Shared components shall support reuse across future modules.

---

## 5. External Interface Requirements

### 5.1 User Interface

The mobile UI shall include:

- Splash screen with branding and loading animation
- Login, signup, OTP verification, forgot password, and reset password screens
- Subscription purchase screen
- Home screen with promotional reward banner
- Vehicle registration form
- Gift selection screen with category filters
- Winnings/submission history list
- Settings screen
- Profile edit screen
- Manage subscription screen
- Language selection modal
- Confirmation modal for submission
- Toast notifications and loading overlays

### 5.2 API Interfaces

The app shall communicate with backend services using HTTPS API calls. Key API groups include:

**Authentication APIs**

- Register
- Login
- Send password reset OTP
- Verify password reset OTP
- Reset password
- Verify email OTP
- Resend email OTP
- Refresh token

**User APIs**

- Get current user
- Update user profile
- Verify profile email
- Logout
- Check monthly vehicle registration eligibility

**Gift APIs**

- Get all gifts
- Get gift types/categories
- Submit vehicle registration
- Get my winnings

**Subscription APIs**

- Get subscription packages
- Submit iOS subscription purchase
- Check iOS subscription transaction ownership
- Submit Android subscription purchase
- Check Android subscription transaction ownership
- Get current subscription

### 5.3 Device Permissions

The app may request or use the following permissions:

- Camera access for profile photo capture
- Photo library access for profile photo selection
- Push notification permission
- Android notification permission
- Internet/network access
- App store billing capability through Apple and Google subscription systems

---

## 6. System Architecture Overview

The 26 Miles App follows a client-side mobile architecture built around Expo Router and reusable React Native components.

- **Routing Layer:** Expo Router manages file-based navigation for authentication, tabs, settings, gifts, and subscription screens.
- **Presentation Layer:** Screens and shared components render forms, cards, buttons, modals, loaders, images, and animations.
- **State and Context Layer:** Preference and theme contexts manage current user state, theme selection, and app-level preferences.
- **API Layer:** Axios-based service hooks perform GET and POST requests to backend endpoints.
- **Authentication Layer:** Access and refresh tokens are stored locally and attached to protected requests.
- **IAP Layer:** React Native IAP handles Apple and Google subscription purchase flows.
- **Localization Layer:** i18next and Expo Localization provide English and Spanish language support.
- **Device Integration Layer:** Expo Notifications, Image Picker, Linking, and Version Check provide native platform integrations.

---

## 7. Data Requirements

### Key Data Entities

**User**

- ID
- First name
- Last name
- Email
- Phone
- Initials
- Address
- City
- State
- Zip code
- Street
- Profile photo
- Subscription status

**Authentication Token**

- Access token
- Refresh token
- Token expiry behavior handled by backend

**Subscription Package**

- ID
- Name
- Description
- Price
- Duration
- Popular flag
- Apple product ID
- Google product ID

**User Subscription**

- Package name
- Package description
- Product ID
- Platform
- Price
- Start date
- End date / next billing date
- Popular flag

**Vehicle Registration**

- ID
- Gift ID
- Vehicle license plate
- Vehicle make
- Vehicle color
- State
- Status
- Created date
- Updated date

**Gift**

- ID
- Name
- Image
- Type/category

**Gift Category**

- Key/name
- Display label

**User Preferences**

- Selected language
- Selected theme

---

## 8. Use Cases

### UC1: User Registration and Email Verification

**Actor:** Guest User  
**Precondition:** User does not have an account.

**Steps:**

1. User opens the app and navigates to signup.
2. User enters personal, contact, address, state, initials, and password details.
3. User accepts or reviews legal links.
4. User submits the registration form.
5. System validates the form and sends registration data to the backend.
6. Backend sends OTP to the user's email.
7. User enters OTP.
8. System verifies OTP and authenticates the user.
9. User is routed to subscription purchase if no subscription exists.

**Postcondition:** User account is created and email is verified.

### UC2: Login Existing User

**Actor:** Registered User  
**Precondition:** User has an account.

**Steps:**

1. User opens login screen.
2. User enters email and password.
3. System validates credentials.
4. System stores authentication tokens after successful login.
5. System retrieves the user profile.
6. System routes subscribed users to home or non-subscribed users to subscriptions.

**Postcondition:** User is authenticated and routed appropriately.

### UC3: Purchase Subscription

**Actor:** Registered Non-Subscriber  
**Precondition:** User is authenticated and has no active subscription.

**Steps:**

1. System displays available subscription packages.
2. User selects a package.
3. User taps continue.
4. System initiates Apple or Google in-app purchase.
5. User completes purchase through platform billing.
6. System sends transaction details to backend.
7. Backend validates purchase and activates subscription.
8. System routes user to the main app.

**Postcondition:** User has an active subscription.

### UC4: Submit Vehicle Registration and Gift

**Actor:** Active Subscriber  
**Precondition:** User is logged in, subscribed, and eligible for monthly submission.

**Steps:**

1. User opens the home screen.
2. System checks monthly registration eligibility.
3. User taps Try Now.
4. User enters license plate, vehicle make, vehicle color, and state.
5. System validates vehicle information.
6. User selects a gift from available gifts.
7. User confirms submission.
8. System submits vehicle and gift data to backend.
9. System shows success feedback and returns user to main app.

**Postcondition:** Vehicle registration is submitted for reward participation.

### UC5: View Winnings

**Actor:** Active Subscriber  
**Precondition:** User has access to the main app.

**Steps:**

1. User opens the home screen.
2. System retrieves winnings/submission history.
3. System displays each record with vehicle details, status, and updated date.
4. If no records exist, system displays an empty state.

**Postcondition:** User can review current and historical submissions.

### UC6: Update Profile

**Actor:** Active Subscriber  
**Precondition:** User is logged in.

**Steps:**

1. User opens Settings.
2. User selects profile section.
3. User edits personal information or selects a new profile image.
4. User submits updates.
5. System sends updated data to backend.
6. If email verification is required, system prompts OTP verification.
7. User verifies OTP if required.
8. System updates local user profile.

**Postcondition:** User profile information is updated.

### UC7: Manage Subscription

**Actor:** Active Subscriber  
**Precondition:** User has an active subscription.

**Steps:**

1. User opens Settings.
2. User selects Manage Subscription.
3. System displays current plan and next billing date.
4. System displays available upgrade/downgrade plans.
5. User selects a plan change, if supported on current platform.
6. System initiates platform-specific subscription purchase/update flow.
7. Backend validates updated transaction.
8. System refreshes current subscription data.

**Postcondition:** Subscription status is updated or user is redirected to platform settings for cancellation.

---

## 9. Future Enhancements

- Add full account deletion API integration instead of placeholder success feedback.
- Add push notification campaigns for reward updates, subscription reminders, and winning announcements.
- Add detailed winnings filters by status and date range.
- Add reward detail pages with eligibility rules, images, and terms.
- Add referral or invite-a-friend functionality.
- Add biometric login support.
- Add secure storage replacement for tokens using platform keychain/keystore.
- Add admin-configurable feature flags.
- Add accessibility improvements, including screen reader labels and dynamic font support.
- Add deep links for subscription, reward, and notification-driven flows.
- Add analytics for registration, subscription conversion, gift selection, and submission completion.
- Add offline-friendly cached display for profile and previous winnings.
- Add multi-language support beyond English and Spanish.
