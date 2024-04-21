'use client'

import * as React from 'react'
import anime from 'animejs'

interface IContactEmailProps {
  animate: boolean
}

const ContactEmail: React.FC<IContactEmailProps> = ({ animate }) => {
  const navRef = React.useRef<HTMLElement>(null)

  React.useLayoutEffect(() => {
    if (animate && navRef.current) {
      const timeline = anime.timeline({
        targets: navRef.current,
        easing: 'easeInOutSine',
      })

      timeline
        .add({
          targets: navRef.current.querySelectorAll('.line'),
          duration: 200,
          scaleY: [0, 1],
        })
        .add({
          duration: 350,
          targets: navRef.current.querySelectorAll('ul > li'),
          opacity: [0, 1],
          scale: [0.75, 1],
          translateY: ['10%', '0%'],
        })
    }
  }, [animate])

  return (
    <nav ref={navRef} className="fixed bottom-0 right-16">
      <div className="flex flex-col items-center gap-y-3 translate-x-1/2">
        <ul className="flex flex-col gap-y-2">
          <li className="opacity-0">
            <a
              className="duration-150 text-white text-opacity-50 hover:text-opacity-100 [writing-mode:vertical-lr]"
              href="mailto:talkwithdhika@gmail.com"
            >
              talkwithdhika@gmail.com
            </a>
          </li>
        </ul>
        <div className="line w-[3px] h-[100px] bg-white bg-opacity-50 origin-bottom scale-y-0"></div>
      </div>
    </nav>
  )
}

export default ContactEmail
