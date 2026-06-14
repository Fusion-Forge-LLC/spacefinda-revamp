import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SearchIcon } from "../icons/icons"

export function MobileSearch() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button data-property-1="search" className="w-full p-3 bg-Grey-Off-White rounded-md outline-1 -outline-offset-1 outline-Border-Light inline-flex justify-center items-center gap-2">
            <span className="size- flex justify-start items-center gap-1">
                <SearchIcon />
                <span className="justify-start text-Text-Body-Text text-sm font-normal font-['Geist'] leading-5">Start your search</span>
            </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
