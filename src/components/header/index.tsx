'use client'

import * as React from 'react'
import anime from 'animejs'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { useMeasure, useWindowScroll } from '@uidotdev/usehooks'

interface IHeaderProps {
  animate: boolean
}

const LINKS = [
  {
    label: 'Timeline',
    href: '#timeline',
  },
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Work',
    href: '#work',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
]

// million-ignore
const Header: React.FC<IHeaderProps> = ({ animate }) => {
  const headerRef = React.useRef<HTMLElement>(null) as React.MutableRefObject<HTMLElement | null>
  const [ref, { height }] = useMeasure()
  const [{ y }, scrollTo] = useWindowScroll()
  const [lastY, setLastY] = React.useState(0)
  const [direction, setDirection] = React.useState<'up' | 'down'>('down')

  React.useLayoutEffect(() => {
    setDirection(!!y && lastY > y ? 'up' : 'down')
    setLastY(y ?? window.scrollY)
  }, [y])

  React.useLayoutEffect(() => {
    if (animate && headerRef.current) {
      const timeline = anime.timeline({
        targets: headerRef.current,
        easing: 'easeInOutSine',
        complete: () => {
          headerRef.current?.style.removeProperty('opacity')
          headerRef.current?.style.removeProperty('transform')
        },
      })

      timeline.add({
        duration: 250,
        opacity: 1,
        translateY: '0%',
      })
    }
  }, [animate])

  return (
    <header
      ref={(el) => {
        ref(el)
        headerRef.current = el
      }}
      style={{ opacity: 0, transform: 'translateY(-100%)' }}
      className={cn(
        direction === 'down' && y! > height! && '-translate-y-full',
        y! > height! ? 'py-2' : 'pt-5',
        y! > height! && direction === 'up' && 'bg-base-100 bg-opacity-30',
        'fixed top-0 inset-x-0 transition-all ease-linear duration-300 backdrop-blur-sm',
      )}
    >
      <div className="container">
        <div className="navbar">
          <div className="flex-1">
            <a className="btn btn-link p-0">
              <Image src="/images/logo-white.svg" width={50} height={50} alt="D" />
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-4">
              {LINKS.map((link, key) => (
                <li key={key}>
                  <a className={cn(key === 0 && 'active')}>{link.label}</a>
                </li>
              ))}
            </ul>
            <button className="btn btn-outline">Resume</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
