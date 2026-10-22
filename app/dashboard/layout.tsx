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
          toastOptions={{ style: { background: '#FFFFFF', color: '#111111', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)', borderRadius: '9999px', justifyContent: 'center' } }}
        />
    </div>
  )
}

export default Layout
