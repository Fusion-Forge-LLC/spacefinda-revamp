export type authflow = "signIn" | "forgetPassword" | "checkEmail" | "resetPassword" | "success" | "verify-email" | "sign-up" | "verify-email-success" | "verify-email-failed" | "reset-password-success" | "reset-password-failed";
export interface AuthModal {
    isOpen: boolean; 
    setStep: (step: authflow) => void; 
    setIsModalOpen: (open: boolean) => void;
}