import React from 'react'
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
  FieldLabel,
} from "@/components/ui/field"
import { Input } from '../ui/input'
import { GoogleIcon } from '../icons/icons'
import { Button } from '../ui/button'
import { AuthModal } from '@/@types/types'
import PasswordInput from './password-input'
import { login, sendOtp } from '@/lib/auth/actions'
import { useAuth } from './auth-provider'
import { applyServerErrors } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

function SignIn({
    isOpen,
    setStep,
    setIsModalOpen,
    setFlow,
}: AuthModal ) {
    const { setUser } = useAuth();
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginValues) {
        const res = await login(data);

        if (res.ok) {
            setUser(res.data);
            setIsModalOpen(false);
            toast.success("Welcome back!");
            return;
        }

        // The live API answers 401 for both "Account not found" and "Incorrect password"
        if (res.status === 401) {
            form.setError("password", { type: "server", message: "Invalid email or password" });
            return;
        }

        // Login already emailed a code for unverified accounts, so go straight to the code screen
        if (res.code === "unverified") {
            setFlow({ email: data.email, purpose: "signup" });
            toast("Verify your email to continue", { description: "We've sent a code to your inbox." });
            setStep("verify-email");
            return;
        }

        // Any other 403 is either an unverified email (send them a code) or a suspended account
        if (res.status === 403 && !/suspend/i.test(res.message)) {
            const otp = await sendOtp(data.email);
            if (!otp.ok) {
                toast.error(otp.message);
                return;
            }
            setFlow({ email: data.email, purpose: "signup" });
            toast("Verify your email to continue", { description: "We've sent a 6-digit code to your inbox." });
            setStep("verify-email");
            return;
        }

        applyServerErrors(form.setError, ["email", "password"], res);
    }

    const submitting = form.formState.isSubmitting;

    return (
        <ModalWrapper
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Welcome Back</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Sign in to continue booking or managing your spaces.</p>
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
                    <FieldGroup>
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='relative'>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <PasswordInput field={field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                <Field>
                    <FieldContent>
                        <Button
                            type="button"
                            variant={"link"} className="text-sm text-blue hover:text-Text-dark transition-colors self-end"
                            onClick={()=> setStep("forgetPassword")}
                        >
                            Forgot password?
                        </Button>
                        <Button size={"lg"} type="submit" disabled={submitting} className=" py-3 px-4 mt-3">
                            {submitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </FieldContent>
                </Field>
            </form>
            <p className='py-5 flex items-center text-Text-body-text font-["Geist"]'>
                <span>Don&apos;t have an account?</span>
                <Button
                    variant={"link"} className="text-sm text-blue hover:text-Text-dark transition-colors self-end"
                    onClick={()=> setStep("sign-up")}
                >
                    Sign Up
                </Button>
            </p>

            <div className='flex items-center gap-3'>
                <div className='h-px flex-1 bg-text-Grey-Muted' />
                <span className='px-3 text-Text-body-text'>Or</span>
                <div className='h-px flex-1 bg-text-Grey-Muted' />
            </div>

            <Button variant={"outline"} size={"lg"} className="w-full py-3 px-4 mt-5 font-medium font-['Geist'] text-Text-dark flex items-center justify-center gap-3">
                <GoogleIcon />
                Sign in with Google
            </Button>
        </ModalWrapper>
    )
}

export default SignIn
