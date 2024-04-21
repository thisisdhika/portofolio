import * as React from 'react'
import { cn } from '@/utils/cn'
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'

import './globals.scss'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fira = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira',
})

export const metadata: Metadata = {
  title: 'Thisisdhika',
  description: 'Dhika P Ardana Portfolio',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="elka" className={cn(inter.variable, fira.variable)}>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
