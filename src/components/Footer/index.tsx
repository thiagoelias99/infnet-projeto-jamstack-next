import React from 'react'
import SignContainer from './sign-container'
import LinksContainer from './links-container'
import SubscriptionDialog from '@/components/Subscription-Dialog'

export default function Footer() {
    return (
        <footer className='bg-black min-h-[96px] p-4 mt-10 flex justify-center items-center'>
            <div className='h-full w-full flex flex-1 justify-start items-center'>
                <div className='flex md:flex-row flex-col max-w-[1024px] mx-auto h-full w-full md:justify-between justify-center items-center gap-4 md:gap-0'>
                    <SignContainer />
                    <SubscriptionDialog />
                    <LinksContainer />
                </div>
            </div>
        </footer>
    )
}
