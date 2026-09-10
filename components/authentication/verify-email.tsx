import React, { useState } from 'react'
import ModalWrapper from '../ui/modal/dialog-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Email, Padlock } from '../icons/icons'
import { Button } from '../ui/button'
import { authflow, AuthModal } from '@/@types/types'
import { maskEmail } from '@/lib/utils'

const otpSchema  = z.object({
  otp: z.string().max(6)
});

function VerifyEmail({
    isOpen, 
    setStep,
    setIsModalOpen
}: AuthModal) {

    const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })
  function onSubmit(data: z.infer<typeof otpSchema>) {
        alert(data.otp)
        toast("You submitted the following values:", {
        description: (
            <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
        position: "bottom-right",
        classNames: {
            content: "flex flex-col gap-2",
        },
        style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
        })
        setStep("resetPassword");
    }

    return (
        <ModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <div className='size-20 grid place-content-center rounded-full bg-primary mx-auto mb-4'>
                <Email />
            </div>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Verify your email</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Enter the six-digit code (OTP) sent to {maskEmail("odujebep@gmail.com")}</p>
                </div>
                <FieldGroup>
                    <Controller
                        name="otp"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <InputOTP maxLength={6} id="otp-verification" required {...field}>
                                    <InputOTPGroup className="gap-2 w-full *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Field>
                    <FieldContent>
                        <button type='button' className='text-left cursor-pointer'>
                            Didn't get the code? resend in <span>{45} seconds</span>
                        </button>
                        <Button size={"lg"} type="submit" className=" py-3 px-4 mt-3">
                            Verify Email
                        </Button>
                    </FieldContent>
                </Field>
            </form>
        </ModalWrapper>
    )
}

export default VerifyEmail