/* eslint-disable comma-dangle */
import * as React from 'react'
import { css, cx } from '@emotion/css'
import type { ISplashProps } from './type'
import { motion, AnimatePresence } from 'framer-motion'

const Splash = React.forwardRef<HTMLDivElement, ISplashProps>(({ onDone, ...restProps }, ref) => {
  const interval = React.useRef<null | NodeJS.Timer>(null)
  const [progress, setProgress] = React.useState(0)
  const [isStarting, setStarting] = React.useState(true)
  const [progressLabel, setProgressLabel] = React.useState('Initializing...')

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setStarting(false)
    }, 3500)
  }, [])

  React.useEffect(() => {
    if (!isStarting) {
      interval.current = setInterval(() => setProgress((prev) => prev + 1), 50)

      return () => {
        clearInterval(interval.current as NodeJS.Timer)
      }
    }
  }, [isStarting])

  React.useEffect(() => {
    if (progress >= 100) {
      setProgressLabel('Ready!')
      clearInterval(interval.current as NodeJS.Timer)
      setTimeout(() => onDone(), 1500)
    } else if (progress >= 80) {
      clearInterval(interval.current as NodeJS.Timer)
      interval.current = setInterval(() => setProgress((prev) => prev + 1), 350)
      setProgressLabel('Finalizing...')
    } else if (progress >= 30) setProgressLabel('Loading...')
  }, [onDone, progress])

  return (
    <div ref={ref} className="tid-splash" {...restProps}>
      <div className="tid-splash__content">
        <AnimatePresence mode="wait">
          {isStarting || progress >= 100 ? (
            <motion.h1
              key={progress}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className={cx('tid-splash__logo', progress >= 100 && '-welcome')}
            >
              {isStarting ? 'D' : 'Hello World'}
            </motion.h1>
          ) : (
            <motion.div
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              data-label={progressLabel}
              className={cx(
                'tid-splash__loader',
                progress >= 100 && '-done',
                css({ '--progress': `${progress}%` })
              )}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})

Splash.defaultProps = {}

export default Splash
