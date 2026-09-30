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
import ShareDialog from '../ui/modal/dialog-share'
import { sampleImages } from '@/content/site'
import SaveDialog from '../ui/modal/save-dialog'

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
                    <ShareDialog 
                        triggerBtn={
                            <button className='share-btn'>
                                <ExportCurve color='#888888' size={20}/>
                                Share
                            </button>
                        }
                        imageSrc={sampleImages[0]} 
                        title='Cozy 2BR Apartment in Ibadan' 
                        slug='cozy-2br-apartment-in-ibadan' 
                    />
                    <SaveDialog
                        triggerBtn={
                            <button className='share-btn'>
                                <Heart color='#888888' size={20}/>
                                Save
                            </button>
                        }
                        slug='cozy-2br-apartment-in-ibadan' 
                    />
                </div>
            </div>
        </Wrapper>
    )
}

export default Header