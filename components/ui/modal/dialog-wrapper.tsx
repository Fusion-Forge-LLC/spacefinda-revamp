import React, {ReactNode} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import Image from "next/image";
import { Close } from "@/components/icons/icons";

interface ModalWrapperProps {
  trigger?: ReactNode;
  title?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void; 
  children: ReactNode;
}

function ModalWrapper({
  trigger,
  title,
  isOpen,
  children,
  setIsOpen
}: ModalWrapperProps) {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="z-5000" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center px-6">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              {title}
              <button onClick={() => setIsOpen(false)} className="ml-auto cursor-pointer hover:scale-105 transition-all"><Close /></button>
            </DialogTitle>
          <DialogDescription className="pt-5 px-6 border-t border-t-text-Grey-Muted">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalWrapper;
