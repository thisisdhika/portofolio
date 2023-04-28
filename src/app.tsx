import Router from '@/router'
import { Analytics } from '@vercel/analytics/react'

export function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  )
}
