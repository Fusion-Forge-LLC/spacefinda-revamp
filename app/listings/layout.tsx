
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { Toaster } from 'sonner'

import React from 'react'

function Layout({children}:{children: React.ReactNode}) {
  return (
    <div>
        <Header className='max-md:hidden' />
        {children}
        <Footer className='max-md:hidden' />
        <Toaster position='bottom-right' />
    </div>
  )
}

export default Layout