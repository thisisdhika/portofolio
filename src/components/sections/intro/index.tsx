'use client'

import * as React from 'react'
import anime from 'animejs'
import Image from 'next/image'
import { breakWord } from '@/utils/breakWord'
import { useIntersectionObserver, useToggle } from '@uidotdev/usehooks'

// million-ignore
export const Intro: React.FC = () => {
  const ref = React.useRef<HTMLElement>(null)
  const [isAnimated, toggleAnimated] = useToggle(false)
  const [intersectionRef, entry] = useIntersectionObserver({
    threshold: 0,
  })

  React.useEffect(() => {
    if (ref.current && entry?.isIntersecting && !isAnimated) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
        complete: () => toggleAnimated(true),
      })

      timeline
        .add({
          easing: 'easeInOutElastic',
          targets: ref.current.querySelectorAll('.featured-img'),
          scale: [0, 1],
          opacity: [0, 1],
          duration: 1200,
        })
        .add({
          targets: ref.current.querySelectorAll('span.intro-word'),
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 1000,
          delay: (_, i) => 100 * i,
        })
        .add(
          {
            targets: ref.current.querySelectorAll('span.word'),
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
            duration: 650,
            delay: (_, i) => 80 * i,
          },
          2000,
        )
    }
  }, [entry?.isIntersecting])

  return (
    <section ref={ref} id="intro" className="flex items-center h-[95vh]">
      <div className="container">
        <div ref={intersectionRef} className="flex items-center">
          <div className="flex-1">
            <span className="block font-serif text-white text-opacity-20">
              {breakWord('<main>', 'span', 'word opacity-0')}
            </span>
            <span className="block font-serif text-white text-opacity-20 ml-4">
              {breakWord('<h1>', 'span', 'word opacity-0')}
            </span>
            <h3 className="text-6xl font-semibold ml-8">
              {breakWord('Hi!', 'span', 'intro-word opacity-0')}
              <span className="text-base font-normal font-serif text-white text-opacity-20">
                {breakWord('<br/>', 'span', 'word opacity-0')}
              </span>
            </h3>
            <h1 className="text-7xl font-extrabold ml-8">
              {breakWord("I'm ", 'span', 'intro-word opacity-0')}
              <span className="intro-word text-shadow-1 shadow-slate-400 opacity-0">D</span>
              {breakWord('hika', 'span', 'intro-word opacity-0')}
              <span className="text-base font-normal font-serif text-white text-opacity-20">
                {breakWord('<br/>', 'span', 'word opacity-0')}
              </span>
            </h1>
            <h2 className="text-6xl font-bold ml-8">
              {breakWord('a Front-end Engineer', 'span', 'intro-word opacity-0')}
              <span className="text-base font-normal font-serif text-white text-opacity-20">
                {breakWord('<br/>', 'span', 'word opacity-0')}
              </span>
            </h2>
            <h6 className="text-1xl text-[#12597e] font-bold ml-8">
              <span className="intro-word opacity-0">Based in West Java, Indonesia.</span>
            </h6>
            <span className="block font-serif text-white text-opacity-20 ml-4">
              {breakWord('</h1>', 'span', 'word opacity-0')}
            </span>
            <span className="block font-serif text-white text-opacity-20">
              {breakWord('</main>', 'span', 'word opacity-0')}
            </span>
          </div>
          <div className="px-10 w-80 2xl:w-96">
            <Image
              priority
              width={317}
              height={326}
              alt="Hello"
              src="/images/memoji-waves.png"
              className="featured-img opacity-0 origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
