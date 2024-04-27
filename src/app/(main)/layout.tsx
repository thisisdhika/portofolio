'use client'

import * as React from 'react'
import Header from '@/components/header'
import Splash from '@/components/splash'
import SocialMedia from '@/components/social-media'
import ContactEmail from '@/components/contact-email'
import { useToggle, useMediaQuery } from '@uidotdev/usehooks'

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
