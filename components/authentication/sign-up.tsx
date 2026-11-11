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
import { PasswordChecklist } from './password-checklist'
import { applyServerErrors, passwordSchema } from '@/lib/utils'
import { register, sendOtp } from '@/lib/auth/actions'

const signUpSchema = z.object({
    firstName: z.string().trim().min(1, "Enter your first name"),
    lastName: z.string().trim().min(1, "Enter your last name"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SERVER_FIELDS = ["firstName", "lastName", "email", "password"] as const;

function SignUp({
    isOpen,
    setStep,
    setIsModalOpen,
    setFlow,
}: AuthModal ) {
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const password = form.watch("password") || "";

    async function onSubmit({ firstName, lastName, email, password }: SignUpValues) {
        const data = { firstName, lastName, email, password };
        const res = await register(data);

        if (!res.ok) {
            // The spec says 409, but the live API answers 400 "User already exists"
            if (res.status === 409 || /already exists/i.test(res.message)) {
                form.setError("email", { type: "server", message: "An account with this email already exists" });
            } else {
                applyServerErrors(form.setError, SERVER_FIELDS, res);
            }
            return;
        }

        // The account exists now; the user signs in by verifying the code we email them
        const otp = await sendOtp(data.email);
        if (!otp.ok) toast.error(otp.message);
        setFlow({ email: data.email, purpose: "signup" });
        setStep("verify-email");
    }

    const submitting = form.formState.isSubmitting;

    return (
        <ModalWrapper
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Join Spacefinda</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Discover shortlets and workspaces that fit your needs.</p>
                </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {(["firstName", "lastName"] as const).map((name) => (
                            <FieldGroup key={name}>
                                <Controller
                                    name={name}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={name}>{name === "firstName" ? "First name" : "Last name"}</FieldLabel>
                                            <Input
                                                {...field}
                                                id={name}
                                                autoComplete={name === "firstName" ? "given-name" : "family-name"}
                                                placeholder={name === "firstName" ? "First name" : "Last name"}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        ))}
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
                                <Field data-invalid={fieldState.invalid} className="relative group/password">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <PasswordInput field={field} />
                                    <PasswordChecklist
                                        password={password}
                                        className="absolute top-full left-0 mt-2 w-full hidden group-focus-within/password:block"
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
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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
                        <Button size={"lg"} type="submit" disabled={submitting} className=" py-3 px-4 mt-3">
                            {submitting ? "Creating account..." : "Sign Up"}
                        </Button>
                    </FieldContent>
                </Field>
            </form>
            <p className='py-5'>
                <span>Already have an account?</span>
                <Button
                    variant={"link"} className="text-sm text-blue hover:text-Text-dark transition-colors self-end"
                    onClick={()=> setStep("signIn")}
                >
                    Sign In
                </Button>
            </p>

            <div className='flex items-center gap-3'>
                <div className='h-px flex-1 bg-text-Grey-Muted' />
                <span className='px-3 text-Text-body-text'>Or</span>
                <div className='h-px flex-1 bg-text-Grey-Muted' />
            </div>

            <Button variant={"outline"} size={"lg"} className="w-full py-3 px-4 mt-5 font-medium font-['Geist'] text-Text-dark flex items-center justify-center gap-3">
                <GoogleIcon />
                Sign up with Google
            </Button>
        </ModalWrapper>
    )
}

export default SignUp
