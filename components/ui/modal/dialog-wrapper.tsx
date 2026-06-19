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

function ModalWrapper({
  trigger,
  title,
  children,
}: {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="z-5000">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center px-6">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              {title}
            </DialogTitle>
          <DialogDescription className="pt-5 px-6 border-t border-t-text-Grey-Muted">{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalWrapper;
