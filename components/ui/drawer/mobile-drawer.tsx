import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer"
import { X } from "lucide-react"
import React from "react"

interface props {
    triggerBtn: React.ReactNode, 
    children: React.ReactNode,
    title: string,
    subtitle?: React.ReactNode,
    footerBtn?: React.ReactNode
}

export function MobileDrawer({triggerBtn, children, title, subtitle, footerBtn}: props) {
  return (
        <Drawer
          direction={"bottom"}
        >
            <DrawerTrigger asChild>
                {triggerBtn}
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[75vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                        <span>{title}</span>
                        <DrawerClose asChild>
                            <Button variant="ghost">
                                <X size={12} color="#888888" />
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription>
                        {subtitle}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="no-scrollbar overflow-y-auto px-4">
                    {children}
                </div>
                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
  )
}
