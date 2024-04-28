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
    id: 'timeline',
  },
  {
    label: 'About',
    id: 'about',
  },
  {
    label: 'Work',
    id: 'work',
  },
  {
    label: 'Contact',
    id: 'contact',
  },
]

// million-ignore
const Header: React.FC<IHeaderProps> = ({ animate }) => {
  const headerRef = React.useRef<HTMLElement>(null) as React.MutableRefObject<HTMLElement | null>
  const [ref, { height }] = useMeasure()
  const [{ y }, scrollTo] = useWindowScroll()
  const [lastY, setLastY] = React.useState(0)
  const [direction, setDirection] = React.useState<'up' | 'down'>('down')
  const [activeSection, setActiveSection] = React.useState<string>('intro')

  const navigateScroll = React.useCallback(
    (id: string): React.MouseEventHandler<HTMLAnchorElement> =>
      (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        const elem = document.getElementById(id)

        if (elem) {
          scrollTo({ left: 0, top: elem.offsetTop, behavior: 'smooth' })
        }
      },
    [animate],
  )

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

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.65,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, observerOptions)

    LINKS.concat([{ id: 'intro' } as never])
      .map((link) => document.getElementById(link.id))
      .forEach((section) => {
        section && observer.observe(section)
      })

    return () => {
      LINKS.concat([{ id: 'intro' } as never])
        .map((link) => document.getElementById(link.id))
        .forEach((section) => {
          section && observer.observe(section)
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
        'z-50 fixed top-0 inset-x-0 transition-all ease-linear duration-300 backdrop-blur-sm',
      )}
    >
      <div className="w-full px-2 md:px-6 lg:px-10">
        <div className="relative navbar">
          <div className="flex-1">
            <a className="btn p-0" onClick={navigateScroll('intro')}>
              <Image src="/images/logo-white.svg" width={36.5} height={48} alt="D" />
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 mr-4">
              {LINKS.map((link, key) => (
                <li key={key}>
                  <a onClick={navigateScroll(link.id)} className={cn(activeSection === link.id && 'active')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button className="btn btn-outline" onClick={() => window.open('/docs/resume.pdf', '_blank')}>Resume</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
