import React from 'react'
import ModalWrapper from '../ui/modal/dialog-wrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from '../ui/input'
import { Eyes, GoogleIcon } from '../icons/icons'
import Link from 'next/link'
import { Button } from '../ui/button'
import ForgetPassword from './forget-password'
import { authflow, AuthModal } from '@/@types/types'
import PasswordInput from './password-input'

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().default(false).optional(),
});

function SignIn({
    isOpen,
    setStep,
    setIsModalOpen,
}: AuthModal ) {
    const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const openModal = (step: authflow) => {
    setStep(step);
  }

  function onSubmit(data: z.infer<typeof loginSchema>) {
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
    }

    return (
        <ModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Welcome Back, Odujebe</h3>
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
                                        placeholder="Enter your email"
                                    />
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
                                </Field>
                            )}
                        />
                    </FieldGroup>
                <Field>
                    <FieldContent>
                        <Button 
                            variant={"link"} className="text-sm text-blue hover:text-Text-dark transition-colors self-end" 
                            onClick={()=> openModal("forgetPassword")}
                        >
                            Forgot password?
                        </Button>
                        <Button size={"lg"} type="submit" className=" py-3 px-4 mt-3">
                            Sign In
                        </Button>
                    </FieldContent>
                </Field>
            </form>
            <p className='py-5 flex items-center text-Text-body-text font-["Geist"]'>
                <span>Don't have an account?</span> 
                <Button 
                    variant={"link"} className="text-sm text-blue hover:text-Text-dark transition-colors self-end" 
                    onClick={()=> openModal("sign-up")}
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