import React, { useEffect } from 'react'
import SignIn from './sign-in'
import ForgetPassword from './forget-password'
import { authflow } from '@/@types/types';
import CheckEmail from './check-email';
import VerifyEmail from './verify-email';

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
                                />) : ""
                            
                        }
                </>
            }
        </>
    )
}

export default AuthFlow