
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'

import React from 'react'

function Layout({children}:{children: React.ReactNode}) {
  return (
    <div>
        <Header className='max-md:hidden' />
        {children}
        <Footer className='max-md:hidden' />
    </div>
  )
}

export default Layout