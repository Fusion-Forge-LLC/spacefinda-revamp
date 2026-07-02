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
import { AuthModal } from '@/@types/types'
import PasswordInput from './password-input'
import { PasswordChecklist } from './password-checklist'
import { passwordSchema } from '@/lib/utils'

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
});

function SignUp({
    isOpen,
    setStep,
    setIsModalOpen,
}: AuthModal ) {
    const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = form.watch("password") || "";

  function onSubmit(data: z.infer<typeof loginSchema>) {
       
    }

    return (
        <ModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Join Spacefinda</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Discover shortlets and workspaces that fit your needs.</p>
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
                        
                        <Button size={"lg"} type="submit" className=" py-3 px-4 mt-3">
                            Sign Up
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