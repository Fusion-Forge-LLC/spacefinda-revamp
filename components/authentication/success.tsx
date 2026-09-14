import ModalWrapper from '../ui/modal/dialog-wrapper'
import { Checkmark, Email } from '../icons/icons'
import { Button } from '../ui/button'
import { AuthModal } from '@/@types/types'

function SuccessMessage({
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
                    <Checkmark />
                </div>
            
                <div className='py-4'>
                    <h3 className="text-Text-dark text-2xl font-bold" >Password updated successfully</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">You can now sign in with your new password.</p>
                </div>
                    
                <div className='flex flex-col gap-1'>
                    <Button  size={"lg"} type="submit" onClick={() => setStep("signIn")} className=" py-3 px-4 mt-3">
                        Sign In
                    </Button>
                </div>
            
        </ModalWrapper>
    )
}

export default SuccessMessage