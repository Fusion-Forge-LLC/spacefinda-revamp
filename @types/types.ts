export type authflow = "signIn" | "forgetPassword" | "checkEmail" | "resetPassword" | "success" | "verify-email"
export interface AuthModal {
    isOpen: boolean; 
    setStep: (step: authflow) => void; 
    setIsModalOpen: (open: boolean) => void;
}