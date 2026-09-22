import React from 'react'
import Wrapper from '../wrapper/wrapper'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ExportCurve, Heart } from 'iconsax-reactjs'

function Header() {
    return (
        <Wrapper className='py-10 max-md:hidden'>
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Shortlet in Ibadan</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Cozy 2BR Apartment</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='flex justify-between items-center mt-12'>
                <h2 className='font-semibold tracking-[-3px] text-5xl text-Text-dark'>Cozy 2BR Apartment</h2>
                <div className = "flex items-center gap-2">
                    <button className='share-btn'>
                        <ExportCurve color='#888888' size={20}/>
                        Share
                    </button>
                    <button className='share-btn'>
                        <Heart color='#888888' size={20}/>
                        Share
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Header