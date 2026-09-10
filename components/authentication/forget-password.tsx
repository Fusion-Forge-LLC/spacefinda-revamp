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
import { Input } from '../ui/input'
import { Padlock } from '../icons/icons'
import { Button } from '../ui/button'
import { authflow, AuthModal } from '@/@types/types'

const forgetPasswordSchema  = z.object({
  email: z.string().email("Invalid email address"),
});

function ForgetPassword({
    isOpen, 
    setStep,
    setIsModalOpen
}: AuthModal) {
    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  function onSubmit(data: z.infer<typeof forgetPasswordSchema>) {
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
        setStep("checkEmail");
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
                <Field>
                    <FieldContent>
                        <Button size={"lg"} type="submit" className=" py-3 px-4 mt-3">
                            Send Reset Link
                        </Button>
                        <Button variant={"link"} size={"lg"} type="submit" onClick={() => setStep("signIn")} className=" py-3 px-4 mt-3">
                            Back to Sign In
                        </Button>
                    </FieldContent>
                </Field>
            </form>
        </ModalWrapper>
    )
}

export default ForgetPassword