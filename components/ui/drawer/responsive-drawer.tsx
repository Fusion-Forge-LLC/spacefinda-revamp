"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../modal/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { useIsMobile } from "@/hooks/use-media-query"
import { Close } from "@/components/icons/icons"

interface Props {
    triggerBtn: React.ReactNode;
    title: string;
    subtitle: React.ReactNode;
    children: React.ReactNode
}

export function DrawerDialog({
    triggerBtn,
    title,
    subtitle,
    children
}:Props) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = !useIsMobile()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {triggerBtn}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader className="border-b border-b-text-Grey-Muted px-4 pb-4">
            <DialogTitle className="text-left">{title}</DialogTitle>
            <DialogDescription className="text-left">
              {subtitle}
            </DialogDescription>
          </DialogHeader>
            <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-4">
                {children}
            </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {triggerBtn}
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[75vh]">
        <DrawerHeader className="text-left border-b border-b-text-Grey-Muted relative">
          <DrawerTitle className="text-left text-xl font-medium">{title}</DrawerTitle>
          <DrawerDescription className="text-left">
            {subtitle}
          </DrawerDescription>
          <DrawerClose asChild className="absolute right-0 top-1/2 -translate-1/2">
            <Button variant="ghost"><Close /></Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
            {children}
        </div>
        <DrawerFooter className="">
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
