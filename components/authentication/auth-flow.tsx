import React, { useEffect } from 'react'
import SignIn from './sign-in'
import ForgetPassword from './forget-password'
import { authflow } from '@/@types/types';
import CheckEmail from './check-email';
import VerifyEmail from './verify-email';
import ResetPassword from './reset-password';
import SuccessMessage from './success';
import SignUp from './sign-up';

function AuthFlow({showModal, setShowModal}: {showModal: boolean; setShowModal: (showModal: boolean) => void}) {
    const [step, setStep] = React.useState<authflow>("signIn");

    useEffect(() => {
        if (!showModal) {
            setStep("signIn");
        }
    }, [showModal]);

    return (
        <>
            {showModal && 
                <>
                    {step === "signIn" ? (
                        <SignIn 
                            isOpen={showModal && step === "signIn"} 
                            setStep={setStep}
                            setIsModalOpen={setShowModal}
                        /> ): step === "forgetPassword" ? (
                            <ForgetPassword 
                                isOpen={showModal && step === "forgetPassword"} 
                                setStep={setStep}
                                setIsModalOpen={setShowModal}
                            /> ): step === "checkEmail" ? (
                            <CheckEmail 
                                isOpen={showModal && step === "checkEmail"} 
                                setStep={setStep}
                                setIsModalOpen={setShowModal}
                            /> ) : step === "verify-email" ? (
                                <VerifyEmail 
                                    isOpen={showModal && step === "verify-email"} 
                                    setStep={setStep}
                                    setIsModalOpen={setShowModal}
                                />) : step === "resetPassword" ? (
                                    <ResetPassword
                                        isOpen={showModal && step === "resetPassword"}
                                        setStep={setStep}
                                        setIsModalOpen={setShowModal}
                                    />
                                ) : step === "success" ? ( 
                                    <SuccessMessage 
                                        isOpen={showModal && step === "success"}
                                        setStep={setStep}
                                        setIsModalOpen={setShowModal}
                                    />
                                ): step === "sign-up" ? (
                                    <SignUp 
                                        isOpen={showModal && step === "sign-up"}
                                        setStep={setStep}
                                        setIsModalOpen={setShowModal}
                                    />
                                ) : null
                        }
                </>
            }
        </>
    )
}

export default AuthFlow