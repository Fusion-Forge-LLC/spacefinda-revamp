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
          toastOptions={{ style: { background: '#FFFFFF', color: '#111111', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)', borderRadius: '9999px', justifyContent: 'center' } }}
        />
    </>
  )
}

export default Layout
