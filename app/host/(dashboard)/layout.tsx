import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import HostSidebar from '@/components/host/sidebar'
import HostTopbar from '@/components/host/topbar'

import React from 'react'

export const metadata: Metadata = {
  title: 'Host dashboard | Spacefinda',
}

function Layout({children}:{children: React.ReactNode}) {
  return (
    <div className='flex h-dvh bg-[#FEFEFE]'>
        <HostSidebar className='max-md:hidden' />
        <div className='flex min-w-0 flex-1 flex-col overflow-y-auto'>
          <HostTopbar />
          <main className='flex-1 px-4 py-6 md:px-6 md:py-8'>{children}</main>
        </div>
        <Toaster
          position='bottom-center'
          style={{ '--width': '480px' } as React.CSSProperties}
          // Size each pill to its message (up to 480px) and keep it centred, as in the designs
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#111111',
              border: '1px solid #EAEAEA',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              borderRadius: '9999px',
              justifyContent: 'center',
              width: 'fit-content',
              maxWidth: '100%',
              left: 0,
              right: 0,
              marginInline: 'auto',
              padding: '10px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
            },
          }}
        />
    </div>
  )
}

export default Layout
