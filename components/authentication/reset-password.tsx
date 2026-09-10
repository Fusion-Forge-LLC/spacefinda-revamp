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
import { Padlock } from '../icons/icons'
import { Button } from '../ui/button'
import { AuthModal } from '@/@types/types'
import PasswordInput from './password-input'
import { PasswordChecklist } from './password-checklist'
import { passwordSchema } from '@/lib/utils'



const forgetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

function ResetPassword({
    isOpen, 
    setStep,
    setIsModalOpen
}: AuthModal) {
    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const password = form.watch("newPassword") || "";

  function onSubmit(data: z.infer<typeof forgetPasswordSchema>) {
        setStep("success");
    }

    return (
        <ModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
        >
            <div className='size-20 grid place-content-center rounded-full bg-primary mx-auto mb-4'>
                <Padlock />
            </div>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <h3 className="text-Text-dark text-2xl font-bold" >Forgot Your Password?</h3>
                    <p className="text-Text-body-text font-['Geist'] leading-6">Enter your email address and we'll send a reset link.</p>
                </div>
                <FieldGroup>
                    <Controller
                        name="newPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="relative group/password">
                                <FieldLabel htmlFor="newPassword">Password</FieldLabel>
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
                        name="confirmNewPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="confirmNewPassword">Confirm Password</FieldLabel>
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
                            Save new password
                        </Button>
                    </FieldContent>
                </Field>
            </form>
        </ModalWrapper>
    )
}

export default ResetPassword
