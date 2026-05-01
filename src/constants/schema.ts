import * as Yup from "yup";
import { getTextList } from "../language-config/TextList";

export const getSignUpValidationSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().firstNameRequired),
    state: Yup.object()
      .shape({
        name: Yup.string().required(getTextList().stateRequired),
        code: Yup.string().required(),
      })
      .nullable()
      .required(getTextList().stateRequired),
    lastName: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().lastNameRequired),
    address: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().address_required),
    email: Yup.string()
      .transform((value) => value.trim())
      .email(getTextList().invalidEmail)
      .required(getTextList().emailRequired),
    initials: Yup.string()
      .transform((value) => value.trim())
      .max(4, getTextList().initialsMaxLength) // e.g., "Initials can be at most 4 characters"
      .matches(/^\S*$/, getTextList().initialsNoSpaces) // e.g., "Initials must not contain spaces"
      .required(getTextList().initialsRequired),
    phone: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().phoneRequired)
      .test(
        "is-valid-phone",
        getTextList().invalidPhoneNumber,
        function (value) {
          // Must start with + and include at least 8 digits after it (adjust as needed)
          return !!value && /^\+\d{10,15}$/.test(value);
        }
      ),
    password: Yup.string()
      .transform((value) => value.trim())
      .min(8, getTextList().passwordMinLength)
      .matches(/^\S*$/, getTextList().passwordNoSpaces)
      .required(getTextList().passwordRequired),
    confirmPassword: Yup.string()
      .transform((value) => value.trim())
      .oneOf([Yup.ref("password")], getTextList().passwordsMustMatch)
      .matches(/^\S*$/, getTextList().passwordNoSpaces)
      .required(getTextList().confirmPasswordRequired),
  });
};
export const getUpdateValidationSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().firstNameRequired),
    lastName: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().lastNameRequired),
    email: Yup.string()
      .transform((value) => value.trim())
      .email(getTextList().invalidEmail)
      .required(getTextList().emailRequired),
    phone: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().phoneRequired)
      .test(
        "is-valid-phone",
        getTextList().invalidPhoneNumber,
        function (value) {
          // Must start with + and include at least 8 digits after it (adjust as needed)
          return !!value && /^\+\d{10,15}$/.test(value);
        }
      ),
  });
};

//login schema
export const getLoginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .transform((value) => value.trim())
      .email(getTextList().invalidEmail)
      .required(getTextList().emailRequired),
    password: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().passwordRequired),
  });
};

export const getForgotPasswordValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .transform((value) => value.trim())
      .email(getTextList().invalidEmail)
      .required(getTextList().emailRequired),
  });

export const getOTPValidationSchema = () => {
  return Yup.object().shape({
    otp1: Yup.string().length(1, "").required(""),
    otp2: Yup.string().length(1, "").required(""),
    otp3: Yup.string().length(1, "").required(""),
    otp4: Yup.string().length(1, "").required(""),
  });
};

export const getResetPasswordValidationSchema = () => {
  return Yup.object().shape({
    password: Yup.string()
      .transform((value) => value.trim())
      .min(8, getTextList().passwordMinLength)
      .matches(/^\S*$/, getTextList().passwordNoSpaces)
      .required(getTextList().passwordRequired),
    confirmPassword: Yup.string()
      .transform((value) => value.trim())
      .oneOf([Yup.ref("password")], getTextList().passwordsMustMatch)
      .matches(/^\S*$/, getTextList().passwordNoSpaces)
      .required(getTextList().confirmPasswordRequired),
  });
};

export const getVehicleFormValidationSchema = () => {
  return Yup.object().shape({
    licensePlate: Yup.string()
      .transform((value) => value.trim())
      .matches(/^[A-Za-z]{1,4}-\d+$/, getTextList().licensePlateInvalid)
      .required(getTextList().licensePlateRequired),
    vehicleMake: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().vehicleMakeRequired),
    vehicleColor: Yup.string()
      .transform((value) => value.trim())
      .required(getTextList().vehicleColorRequired),
    state: Yup.object().shape({
      name: Yup.string().required(getTextList().stateRequired),
      code: Yup.string().required(),
    }),
  });
};
