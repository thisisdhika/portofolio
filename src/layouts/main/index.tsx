import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Splash as OrigSplash } from '@/components'
import { motion, AnimatePresence } from 'framer-motion'

const Splash = motion(OrigSplash)

const Main: React.FC = () => {
  const [isReady, setReady] = React.useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!isReady && (
          <Splash
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            onDone={() => setReady(true)}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ y: { duration: 2.5 } }}
          />
        )}
      </AnimatePresence>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  )
}

export default Main
