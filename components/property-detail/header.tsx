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
import SaveDialog from '../ui/modal/save-dialog'

function Header({ title, city, image, id }: { title: string; city?: string; image: string; id: string }) {
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
                            <BreadcrumbLink href={city ? `/listings?city=${encodeURIComponent(city)}` : "/listings"}>{city ? `Shortlet in ${city}` : "Shortlets"}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='flex justify-between items-center mt-12'>
                <h2 className='font-semibold tracking-[-3px] text-5xl text-Text-dark'>{title}</h2>
                <div className = "flex items-center gap-2">
                    <ShareDialog 
                        triggerBtn={
                            <button className='share-btn'>
                                <ExportCurve color='#888888' size={20}/>
                                Share
                            </button>
                        }
                        imageSrc={image} 
                        title={title} 
                        slug={id} 
                    />
                    <SaveDialog
                        triggerBtn={
                            <button className='share-btn'>
                                <Heart color='#888888' size={20}/>
                                Save
                            </button>
                        }
                        slug={id} 
                    />
                </div>
            </div>
        </Wrapper>
    )
}

export default Header