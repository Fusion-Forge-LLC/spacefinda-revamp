import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./dialog"
import { Message, Sms } from "iconsax-reactjs"

export function DialogMessage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='flex items-center justify-center max-md:h-12 max-md:w-full gap-2 bg-primary-containers hover:bg-[#D6E3FF] text-primary text-sm sm:text-base font-["Geist"] font-medium px-4 py-2 rounded-lg'>
            <Sms color='#205BF3' variant="Linear" size={20}/>
            <span className='text-wrap-none'>Message host</span>
        </button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-md px-2.5">
        <div className="text-center space-y-5">
          <div className="p-3.5 bg-primary-containers h-fit w-fit mx-auto rounded-md">
            <Message color="#205BF3" size={24}/>
          </div>
          <article className="space-y-2">
            <h4 className="text-Text-dark text-lg font-medium">Messaging is available after booking</h4>
            <p className="text-Body-Text">To keep things safe and in context, you can message Taiwo directly once your booking is confirmed. All conversations are tied to a specific booking.</p>
          </article>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="h-12 w-full">Got it, book first</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
