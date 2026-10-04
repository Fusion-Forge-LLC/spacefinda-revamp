import Header from '@/components/header/header'
import { Toaster } from 'sonner'

import React from 'react'

function Layout({children}:{children: React.ReactNode}) {
  return (
    <div className='flex flex-col flex-1'>
        <Header authenticated className='print:hidden' />
        <main className='flex-1'>{children}</main>
        <Toaster
          position='bottom-center'
          style={{ '--width': '240px' } as React.CSSProperties}
          toastOptions={{ style: { background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '9999px', justifyContent: 'center' } }}
        />
    </div>
  )
}

export default Layout
