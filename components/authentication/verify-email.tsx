import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ui/modal/dialog-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Email } from '../icons/icons'
import { Button } from '../ui/button'
import { AuthModal } from '@/@types/types'
import { maskEmail } from '@/lib/utils'
import { resendOtp, verifyOtp } from '@/lib/auth/actions'
import { useAuth } from './auth-provider'

const RESEND_COOLDOWN = 45; // seconds

const otpSchema  = z.object({
  // Sign-up codes are 6 digits, but the backend's login currently emails 4-digit ones
  otp: z.string().regex(/^\d{4,6}$/, "Enter the code from your email"),
});

type OtpValues = z.infer<typeof otpSchema>;

function VerifyEmail({
    isOpen,
    setStep,
    setIsModalOpen,
    flow,
    setFlow,
}: AuthModal) {
    const { setUser } = useAuth();
    const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
    const [resending, setResending] = useState(false);
    const isReset = flow.purpose === "reset";

    const form = useForm<OtpValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: flow.otp,
        },
    })

    useEffect(() => {
        if (cooldown <= 0) return;
        const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(id);
    }, [cooldown]);

    async function onSubmit({ otp }: OtpValues) {
        // /auth/reset checks the code itself, so for a reset we only hold on to it
        if (isReset) {
            setFlow({ otp });
            setStep("resetPassword");
            return;
        }

        const res = await verifyOtp({ email: flow.email, otpCode: otp });
        if (!res.ok) {
            form.setError("otp", { type: "server", message: res.status === 400 ? "That code is invalid or has expired" : res.message });
            return;
        }
        setUser(res.data);
        setIsModalOpen(false);
        toast.success("Email verified. You're signed in!");
    }

    async function onResend() {
        setResending(true);
        const res = await resendOtp(flow.email);
        setResending(false);
        if (!res.ok) {
            toast.error(res.status === 429 ? "Too many requests. Please wait a bit and try again." : res.message);
            return;
        }
        form.reset({ otp: "" });
        setCooldown(RESEND_COOLDOWN);
        toast.success("A new code is on its way");
    }

    const submitting = form.formState.isSubmitting;

    return (
        <ModalWrapper
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <div className='size-20 grid place-content-center rounded-full bg-primary mx-auto mb-4'>
                <Email />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >{isReset ? "Enter your reset code" : "Verify your email"}</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Enter the six-digit code (OTP) sent to {maskEmail(flow.email)}</p>
                </div>
                <FieldGroup>
                    <Controller
                        name="otp"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <InputOTP maxLength={6} id="otp-verification" inputMode="numeric" autoComplete="one-time-code" {...field}>
                                    <InputOTPGroup className="gap-2 w-full *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Field>
                    <FieldContent>
                        <p className='text-Text-body-text'>
                            {cooldown > 0 ? (
                                <>Didn&apos;t get the code? Resend in <span>{cooldown} seconds</span></>
                            ) : resending ? (
                                "Sending a new code..."
                            ) : (
                                <>
                                    Didn&apos;t get the code?{" "}
                                    <button
                                        type='button'
                                        onClick={onResend}
                                        className='cursor-pointer text-blue hover:underline'
                                    >
                                        Resend code
                                    </button>
                                </>
                            )}
                        </p>
                        <Button size={"lg"} type="submit" disabled={submitting} className=" py-3 px-4 mt-3">
                            {submitting ? "Verifying..." : isReset ? "Continue" : "Verify Email"}
                        </Button>
                    </FieldContent>
                </Field>
            </form>
        </ModalWrapper>
    )
}

export default VerifyEmail
