import { FC } from 'react';
import { IconProps } from 'iconsax-reactjs';

export type authflow = "signIn" | "forgetPassword" | "checkEmail" | "resetPassword" | "success" | "verify-email" | "sign-up" | "verify-email-success" | "verify-email-failed" | "reset-password-success" | "reset-password-failed";
// Data carried between auth steps (e.g. the email an OTP was sent to)
export interface AuthFlowData {
    email: string;
    otp: string;
    // "signup" verifies the email and signs in; "reset" collects the code for a password reset
    purpose: "signup" | "reset";
}

export interface AuthModal {
    isOpen: boolean; 
    setStep: (step: authflow) => void; 
    setIsModalOpen: (open: boolean) => void;
    flow: AuthFlowData;
    setFlow: (patch: Partial<AuthFlowData>) => void;
}

export interface AmenityItem {
  id: string;
  label: string;
  icon: FC<IconProps>;
}