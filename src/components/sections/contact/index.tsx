'use client'

import * as React from 'react'
import anime from 'animejs'
import Image from 'next/image'
import { breakWord } from '@/utils/breakWord'
import { useIntersectionObserver, useToggle } from '@uidotdev/usehooks'

export const Contact: React.FC = () => {
  const ref = React.useRef<HTMLElement>(null)
  const [isAnimated, toggleAnimated] = useToggle(false)
  const [intersectionRef, entry] = useIntersectionObserver({
    threshold: 0,
  })

  React.useLayoutEffect(() => {
    if (ref.current && entry?.isIntersecting && !isAnimated) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
        complete: () => toggleAnimated(true),
      })

      timeline
        .add({
          targets: ref.current.querySelectorAll('span.main-word'),
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 700,
          delay: (_, i) => 60 * i,
        })
        .add(
          {
            targets: ref.current.querySelectorAll('span.word'),
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
            duration: 650,
            delay: (_, i) => 60 * i,
          },
          3000,
        )
    }
  }, [entry?.isIntersecting])

  return (
    <section ref={ref} id="contact" className="footer-bg flex items-center pb-6 lg:pb-10 xl:pb-20 pt-14 xl:pt-32">
      <div className="container">
        <div ref={intersectionRef} className="text-center">
          <div className="relative md:w-max mx-auto mt-8">
            <span className="absolute top-[-2ch] left-0 -translate-x-1/2 font-serif text-white text-opacity-20">
              {breakWord('<h1>', 'span', 'word opacity-0')}
            </span>
            <h1 className="text-5xl font-extrabold text-shadow-1 shadow-slate-400">
              {breakWord('Get In Touch', 'span', 'main-word opacity-0')}
            </h1>
            <span className="absolute top-[-2ch] right-0 translate-x-1/2 font-serif text-white text-opacity-20">
              {breakWord('</h1>', 'span', 'word opacity-0')}
            </span>
          </div>
          <div className="relative md:w-max mt-6 mb-20 mx-auto">
            <span className="absolute top-[-2ch] left-0 -translate-x-1/2 font-serif text-white text-opacity-20">
              {breakWord('<p>', 'span', 'word opacity-0')}
            </span>
            <p>
              {breakWord('My inbox is always open. Feel free to talk everything and every chance,', 'span', 'main-word opacity-0')}
              <br />
              {breakWord('I’ll try my best to get back to you!', 'span', 'main-word opacity-0')}
            </p>
            <span className="absolute top-[-2ch] right-0 translate-x-1/2 font-serif text-white text-opacity-20">
              {breakWord('</p>', 'span', 'word opacity-0')}
            </span>
          </div>
          <span className="font-serif block text-xs word opacity-0">Designed & Build by Dhika P Ardana</span>
          <span className="font-serif block text-xs word opacity-0">
            Copyright 2024 <strong>ELKA</strong>
          </span>
        </div>
      </div>
    </section>
  )
}
