import React, { useState } from 'react'
import ModalWrapper from '../ui/modal/dialog-wrapper'
import { Email } from '../icons/icons'
import { Button } from '../ui/button'
import { authflow, AuthModal } from '@/@types/types'

function CheckEmail({
    isOpen, 
    setStep,
    setIsModalOpen
}: AuthModal) {

    return (
        <ModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
                <div className='size-20 grid place-content-center rounded-full bg-primary mx-auto mb-4'>
                    <Email />
                </div>
            
                <div className='py-4'>
                    <h3 className="text-Text-dark text-2xl font-bold" >Check your email</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">We've sent a link to reset your password.</p>
                </div>
                    
                <div className='flex flex-col gap-1'>
                    <Button onClick={() => setStep("verify-email")} size={"lg"} type="submit" className=" py-3 px-4 mt-3">
                        Continue
                    </Button>
                    <Button variant={"link"} size={"lg"} type="submit" onClick={() => setStep("signIn")} className=" py-3 px-4 mt-3">
                        Back to Sign In
                    </Button>
                </div>
            
        </ModalWrapper>
    )
}

export default CheckEmail