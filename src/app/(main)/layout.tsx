'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Splash from '@/components/splash'
import { useToggle } from '@uidotdev/usehooks'

const SocialMedia = dynamic(() => import('@/components/social-media'), {
  ssr: false,
})

const ContactEmail = dynamic(() => import('@/components/contact-email'), {
  ssr: false,
})

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, toggleLoading] = useToggle(true)

  return (
    <>
      {isLoading && <Splash onFinish={() => toggleLoading(false)} />}
      <main className="relative z-10">
        <Header animate={!isLoading} />
        <SocialMedia animate={!isLoading} />
        <ContactEmail animate={!isLoading} />
        {!isLoading && children}
      </main>
    </>
  )
}

export default MainLayout
