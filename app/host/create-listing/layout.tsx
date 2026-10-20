import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import React from 'react'

export const metadata: Metadata = {
  title: 'List your space | Spacefinda',
}

function Layout({children}:{children: React.ReactNode}) {
  return (
    <>
        {children}
        <Toaster
          position='bottom-center'
          style={{ '--width': '240px' } as React.CSSProperties}
          toastOptions={{ style: { background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '9999px', justifyContent: 'center' } }}
        />
    </>
  )
}

export default Layout
