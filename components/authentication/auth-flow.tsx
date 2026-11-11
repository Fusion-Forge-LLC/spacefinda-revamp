import React, { useCallback, useState } from 'react'
import SignIn from './sign-in'
import ForgetPassword from './forget-password'
import { AuthFlowData, authflow, AuthModal } from '@/@types/types';
import CheckEmail from './check-email';
import VerifyEmail from './verify-email';
import ResetPassword from './reset-password';
import SuccessMessage from './success';
import SignUp from './sign-up';

const INITIAL_FLOW: AuthFlowData = { email: "", otp: "", purpose: "signup" };

const STEPS: Partial<Record<authflow, React.ComponentType<AuthModal>>> = {
    signIn: SignIn,
    forgetPassword: ForgetPassword,
    checkEmail: CheckEmail,
    "verify-email": VerifyEmail,
    resetPassword: ResetPassword,
    success: SuccessMessage,
    "sign-up": SignUp,
};

interface AuthFlowProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    initialStep?: authflow;
}

// Only mounted while the modal is open, so step and flow data start fresh on every open
function AuthFlowSteps({setShowModal, initialStep = "signIn"}: Omit<AuthFlowProps, "showModal">) {
    const [step, setStep] = useState<authflow>(initialStep);
    const [flow, setFlowState] = useState<AuthFlowData>(INITIAL_FLOW);

    const setFlow = useCallback((patch: Partial<AuthFlowData>) => setFlowState((prev) => ({ ...prev, ...patch })), []);

    const Step = STEPS[step];
    if (!Step) return null;

    return (
        <Step
            isOpen
            setStep={setStep}
            setIsModalOpen={setShowModal}
            flow={flow}
            setFlow={setFlow}
        />
    )
}

function AuthFlow({showModal, ...props}: AuthFlowProps) {
    return showModal ? <AuthFlowSteps {...props} /> : null;
}

export default AuthFlow
