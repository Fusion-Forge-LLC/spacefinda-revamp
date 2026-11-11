"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/components/authentication/auth-provider"

export function AvatarDropdown() {
  const { user, logout } = useAuth()
  const name = user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || ""
  const initials = name.split(/[\s@]/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={name || "Account"} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild><Link href="/dashboard/profile">Profile</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/dashboard/payments">Payments</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/dashboard/account-settings">Settings</Link></DropdownMenuItem>
          {user?.roles?.includes("vendor") && (
            <DropdownMenuItem asChild><Link href="/host">Host dashboard</Link></DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onSelect={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
