import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Building2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Wrapper from '@/components/wrapper/wrapper'
import Logo from '@/public/icons/logo.svg'

export const metadata: Metadata = {
  title: 'Host dashboard | Spacefinda',
}

// TODO: placeholder until the host dashboard is designed and there's a listings API
export default function Page() {
  return (
    <div className="min-h-dvh bg-[#FEFEFE]">
      <header className="border-b border-gray-100 py-4 md:py-6">
        <Wrapper className="max-md:px-4">
          <Link href="/" aria-label="SpaceFinda home">
            <Image src={Logo} alt="SpaceFinda" className="w-10 md:w-12 h-auto" />
          </Link>
        </Wrapper>
      </header>

      <main className="mx-auto flex w-full max-w-163 flex-col items-center px-4 py-16 md:py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-containers">
          <Building2 className="size-7 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-xl md:text-2xl font-semibold text-Text-dark">Your listings</h1>
        <p className="mt-2 max-w-100 text-sm text-Text-body-text leading-6">
          Your host dashboard is coming soon. Listings you submit will appear here, along with their review status and
          bookings.
        </p>
        <Button asChild className="mt-8 h-12 rounded-lg px-6 text-sm md:text-base font-medium">
          <Link href="/host/create-listing">
            <Plus className="size-4" />
            Create a listing
          </Link>
        </Button>
      </main>
    </div>
  )
}
