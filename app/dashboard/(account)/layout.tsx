import Sidebar from '@/components/dashboard/sidebar'
import Wrapper from '@/components/wrapper/wrapper'

import React from 'react'

function Layout({children}:{children: React.ReactNode}) {
  return (
    <Wrapper className='flex max-md:flex-col max-md:px-4'>
        <Sidebar />
        <section className='flex-1 min-w-0 py-8 md:py-12 md:pl-14'>{children}</section>
    </Wrapper>
  )
}

export default Layout
