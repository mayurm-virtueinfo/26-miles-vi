export interface ForgotPasswordFormProps {
  onSubmit: (values: { email: string }) => void;
  onPressLoading: boolean;
  backOnPress?: () => void;
}

export interface OTPFormProps {
  onSubmit: (data:any) => void;
  previousEmail?:string;
  previousPassword?:string;
  isEmailVerify?:boolean;
  isProfileEmailUpdate?:boolean;
  backOnPress?: () => void;
}

export interface ResetPasswordFormProps {
  onSubmit: (values: { password: string; confirmPassword: string }) => void;
  onPressLoading: boolean;
  backOnPress?: () => void;
}

export interface ForgotHeaderProps {
  backOnPress?: () => void | any;
  lottieSource: any; // Replace 'any' with a more specific type if desired
}