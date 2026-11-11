import React from 'react'
import ModalWrapper from '../ui/modal/dialog-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from '../ui/input'
import { Padlock } from '../icons/icons'
import { Button } from '../ui/button'
import { AuthModal } from '@/@types/types'
import { sendOtp } from '@/lib/auth/actions'
import { applyServerErrors } from '@/lib/utils'

const forgetPasswordSchema  = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>;

function ForgetPassword({
    isOpen,
    setStep,
    setIsModalOpen,
    setFlow,
}: AuthModal) {
    const form = useForm<ForgetPasswordValues>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit({ email }: ForgetPasswordValues) {
        const res = await sendOtp(email);
        if (!res.ok) {
            if (res.status === 404) {
                form.setError("email", { type: "server", message: "We couldn't find an account with this email" });
            } else {
                applyServerErrors(form.setError, ["email"], res);
            }
            return;
        }
        setFlow({ email, otp: "", purpose: "reset" });
        setStep("checkEmail");
    }

    const submitting = form.formState.isSubmitting;

    return (
        <ModalWrapper
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <div className='size-20 grid place-content-center rounded-full bg-primary mx-auto mb-4'>
                <Padlock />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Forgot Your Password?</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Enter your email address and we&apos;ll send you a code to reset it.</p>
                </div>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter your email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                <Field>
                    <FieldContent>
                        <Button size={"lg"} type="submit" disabled={submitting} className=" py-3 px-4 mt-3">
                            {submitting ? "Sending..." : "Send Reset Code"}
                        </Button>
                        <Button variant={"link"} size={"lg"} type="button" onClick={() => setStep("signIn")} className=" py-3 px-4 mt-3">
                            Back to Sign In
                        </Button>
                    </FieldContent>
                </Field>
            </form>
        </ModalWrapper>
    )
}

export default ForgetPassword
