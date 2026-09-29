"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./dialog"
import { X } from "lucide-react"
import { ReactNode } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../field"
import { Input } from "../input"
 
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 3 characters.")
    .max(32, "Title must be at most 32 characters.")
})

export default function SaveDialog({
    slug,
    triggerBtn,
}:{
    slug: string;
    triggerBtn: ReactNode
}) {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerBtn}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-md px-4">
        <DialogHeader className="relative">
            <DialogTrigger className="text-Text-dark  font-semibold text-lg">Create Wishlist</DialogTrigger>
            <DialogClose asChild className="absolute right-0 top-1/2 -translate-1/2">
                <button type="button" className="h-8 w-8 rounded-full grid place-content-center bg-text-Grey-Muted">
                    <X color="#616161" size={18} />
                </button>
            </DialogClose>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title" className="text-Text-dark leading-[150%]">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Name"
                                autoComplete="off"
                                className="h-14"
                            />
                            <span className="text-[#A7A7A7] text-[13px] block -mt-2">Not more than 50 characters</span>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex items-center justify-between pt-5 border-t border-t-text-Grey-Muted mt-8">
                <DialogClose asChild>
                    <Button type="button" variant={"outline"} className="h-12">Cancel</Button>
                </DialogClose>

                <Button type="button" variant={"secondary"} disabled className="h-12">Create</Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}