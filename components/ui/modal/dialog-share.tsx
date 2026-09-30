import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./dialog"
import { Copy, ExportCurve, Message, Sms } from "iconsax-reactjs"
import { X } from "lucide-react"
import Image from "next/image"
import { FacebookIcon, FacebookSmall, InstagramSmall, TiktokSmall, WhatsappSmall, XSmall } from "@/components/icons/icons"
import { ReactNode } from "react"

export default function ShareDialog({
    imageSrc, 
    title, 
    slug,
    triggerBtn,
}:{
    imageSrc: string; 
    title: string; 
    slug: string;
    triggerBtn: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerBtn}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-md px-4">
        <div className="space-y-5">
          <DialogClose asChild>
            <button type="button" className="h-8 w-8 rounded-full grid place-content-center bg-text-Grey-Muted">
                <X color="#616161" size={18} />
            </button>
          </DialogClose>
          <article className="space-y-3 mb-4">
            <h4 className="text-Text-dark text-lg font-medium">Share this place</h4>
            <div className="flex items-center gap-2 text-Body-Text text-sm">
                <div className="h-6 w-6 rounded relative overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt="Property image"
                        fill
                    />
                </div>
                <span>{title}</span>
            </div>
            
          </article>

          <div className="grid grid-cols-2 gap-4">
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <Copy size={20} color="#616161" />
                Copy
            </Button>
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <FacebookSmall />
                Facebook
            </Button>
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <InstagramSmall />
                Instagram
            </Button>
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <WhatsappSmall />
                Whatsapp
            </Button>
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <XSmall />
                Twitter
            </Button>
            <Button variant={"outline"} className="text-Body-Text h-12 rounded font-medium border-text-Grey-Muted">
                <TiktokSmall />
                Tiktok
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
