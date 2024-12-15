'use client'

import * as React from 'react'
import anime from 'animejs'
import Image from 'next/image'
import { breakWord } from '@/utils/breakWord'
import { useIntersectionObserver, useMediaQuery, useToggle, useWindowScroll } from '@uidotdev/usehooks'

export const Timeline: React.FC = () => {
  const [{ y }] = useWindowScroll()
  const ref = React.useRef<HTMLElement>(null)
  const isTablet = useMediaQuery(
    'screen and (min-width: 768px) and (max-width: 1024px) and (min-height: 1024px)',
  )
  const [isQuoteAnimated, toggleQuoteAnimated] = useToggle(false)
  const [isLastJobAnimated, toggleLastJobAnimated] = useToggle(false)
  const [isRecentWorkAnimated, toggleRecentWorkAnimated] = useToggle(false)
  const [quoteIntRef, quoteEntry] = useIntersectionObserver({
    threshold: 0.15,
  })
  const [recentWorkIntRef, recentWorkEntry] = useIntersectionObserver({
    threshold: 0.0,
  })
  const [lastJobIntRef, lastJobEntry] = useIntersectionObserver({
    threshold: 0.0,
  })

  React.useLayoutEffect(() => {
    if (ref.current && quoteEntry?.isIntersecting && !isQuoteAnimated) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
        complete: () => toggleQuoteAnimated(true),
      })

      timeline
        .add({
          targets: ref.current.querySelectorAll('.quote span.word'),
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 600,
          delay: (_, i) => 50 * i,
        })
        .add(
          {
            targets: ref.current.querySelectorAll('.quote path'),
            duration: 1800,
            strokeDashoffset: [anime.setDashoffset, 1],
          },
          2400,
        )
        .add(
          {
            targets: ref.current.querySelectorAll('.quote path'),
            duration: 800,
            fill: '#11405A',
          },
          3400,
        )
    }
  }, [quoteEntry?.isIntersecting])

  React.useLayoutEffect(() => {
    if (ref.current && recentWorkEntry?.isIntersecting && !isRecentWorkAnimated) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
        complete: () => toggleRecentWorkAnimated(true),
      })

      timeline
        .add({
          targets: ref.current.querySelectorAll('.recent-work span.word'),
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 1000,
          delay: (_, i) => 80 * i,
        })
        .add({
          targets: ref.current.querySelectorAll('.recent-work .featured-img'),
          easing: 'easeInOutElastic',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 1500,
        })
    }
  }, [recentWorkEntry?.isIntersecting])

  React.useLayoutEffect(() => {
    if (ref.current && lastJobEntry?.isIntersecting && !isLastJobAnimated) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
        complete: () => toggleLastJobAnimated(true),
      })

      timeline
        .add({
          targets: ref.current.querySelectorAll('.last-job span.word'),
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 1000,
          delay: (_, i) => 80 * i,
        })
        .add({
          targets: ref.current.querySelectorAll('.last-job .featured-img'),
          easing: 'easeInOutElastic',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 1500,
        })
    }
  }, [lastJobEntry?.isIntersecting])

  React.useLayoutEffect(() => {
    if (ref.current) {
      const pathAnim = anime({
        targets: ref.current.querySelectorAll('#path path'),
        elasticity: 200,
        autoplay: false,
        easing: 'easeInOutSine',
        strokeDashoffset: [anime.setDashoffset, 1],
        duration: window.outerHeight,
      })

      const topCircleAnim = anime({
        targets: ref.current.querySelectorAll('#path circle.origin-top'),
        duration: 200,
        autoplay: false,
        easing: 'easeInOutSine',
        scale: [0, 1],
        opacity: [0, 1],
      })

      const bottomCircleAnim = anime({
        targets: ref.current.querySelectorAll('#path circle.origin-bottom'),
        duration: 200,
        autoplay: false,
        easing: 'easeInOutSine',
        scale: [0, 1],
        opacity: [0, 1],
      })

      const top = y! + (isTablet ? window.innerHeight / 2 : 50)

      topCircleAnim.seek(top)
      pathAnim.seek(top - topCircleAnim.duration)
      bottomCircleAnim.seek(top - topCircleAnim.duration - pathAnim.duration)
    }
  }, [y, isTablet])

  return (
    <section ref={ref} id="timeline" className="relative">
      <div className="container py-20">
        <div ref={quoteIntRef} className="quote relative z-10 text-center">
          <h6 className="font-semibold text-base">{breakWord('QUOTE', 'span', 'word opacity-0')}</h6>
          <h1 className="text-3xl font-bold my-16">
            <span className="word opacity-0">I belive nothing impossible in any things that live in Internet. </span>
            <br className="hidden xl:block" />
            <span className="word opacity-0"><span className="text-blue-500">But, I can craft it better</span> <small>[Terms and Condition applied]</small>.</span>
          </h1>
          <h5 className="font-semibold text-lg font-serif">
            {breakWord('Dhika P Ardana', 'span', 'word opacity-0')}
          </h5>
          <svg
            width="135"
            height="82"
            viewBox="0 0 135 82"
            fill="none"
            className="absolute bottom-[65%] left-0 -z-10"
          >
            <path
              opacity="0.45"
              stroke="#11405A"
              d="M33.221 64.5376L30.4702 57.1317V37.6646H16.9279V53.5345L26.2382 64.5376H33.221ZM20.9483 76.3871L5.28997 58.1897V25.815H42.1081V54.5925L51.2069 76.3871H20.9483ZM89.5063 64.5376L86.3323 57.1317V37.6646H72.79V53.5345L82.1003 64.5376H89.5063ZM76.8103 76.3871L61.152 58.1897V25.815H97.9702V54.5925L107.069 76.3871H76.8103ZM114.898 81.6771L135 59.8824L123.785 32.7978V0H77.6567L67.9232 9.73354V0H21.7947L0 20.5251V60.094L18.6207 81.6771H59.036L66.442 72.3668L74.4828 81.6771H114.898Z"
            />
          </svg>
          <svg
            width="135"
            height="82"
            viewBox="0 0 135 82"
            fill="none"
            className="absolute top-[65%] right-0 -z-10"
          >
            <path
              opacity="0.45"
              stroke="#11405A"
              d="M101.779 64.7021L104.53 57.2772V37.7606H118.072V53.6709L108.762 64.7021H101.779ZM114.052 76.5818L129.71 58.3379V25.8808H92.8919V54.7316L83.7931 76.5818H114.052ZM45.4937 64.7021L48.6677 57.2772V37.7606H62.21V53.6709L52.8997 64.7021H45.4937ZM58.1897 76.5818L73.848 58.3379V25.8808H37.0298V54.7316L27.931 76.5818H58.1897ZM20.1019 81.8852L0 60.035L11.2147 32.8814V0H57.3433L67.0768 9.75834V0H113.205L135 20.5774V60.2472L116.379 81.8852H75.964L68.558 72.5512L60.5172 81.8852H20.1019Z"
            />
          </svg>
        </div>
        <div ref={recentWorkIntRef} className="recent-work relative z-10 my-16 lg:my-24">
          <h6 className="font-semibold text-base text-center">
            {breakWord('RECENT WORK', 'span', 'word opacity-0')}
          </h6>
          <div className="grid grid-cols-12 gap-4 items-center my-8 lg:my-14">
            <div className="col-span-6 lg:col-span-5">
              <span className="block font-serif text-white text-opacity-20">
                {breakWord('<p>', 'span', 'word opacity-0')}
              </span>
              <p className="ml-4">
                I was worked as a Software Engineer to develop the Live-Streaming Platform for uses by The
                Polices in Indonesia. Being challenged and joy to contribute as a part of a Security
                Improvement on the Country is an honor to me.
              </p>
              <p className="ml-4 mt-4">
                My role are handled Cross-Platform Dashboard, Bodycam (End-User) App which developed uniquely
                for 1 type of android device that made by china, and also Managed the Server as DevOps
                Engineer.
              </p>
              <span className="block font-serif text-white text-opacity-20">
                {breakWord('</p>', 'span', 'word opacity-0')}
              </span>
            </div>
            <div className="pl-4 lg:pl-0 col-start-7 lg:col-start-8 col-span-6 lg:col-span-5">
              <Image
                width={390}
                height={298.67}
                loading="lazy"
                alt="PJR & WAL Korlantas"
                src="/images/pjrstream.png"
                className="featured-img scale-0 opacity-0 origin-center"
              />
            </div>
          </div>
        </div>
        <div ref={lastJobIntRef} className="last-job relative z-10 mt-16 mb-4 lg:mb-16 lg:mt-24">
          <h6 className="font-semibold text-base text-center">
            {breakWord('LAST JOB', 'span', 'word opacity-0')}
          </h6>
          <div className="grid grid-cols-12 gap-4 items-center my-8 lg:my-14">
            <div className="pr-4 lg:pr-0 col-span-6 lg:col-span-5">
              <Image
                width={490}
                height={188.46}
                loading="lazy"
                alt="Software Seni"
                src="/images/SS.png"
                className="featured-img scale-0 opacity-0 origin-center"
              />
            </div>
            <div className="col-start-7 lg:col-start-8 col-span-6 lg:col-span-5">
              <span className="block font-serif text-white text-opacity-20">
                {breakWord('<p>', 'span', 'word opacity-0')}
              </span>
              <p className="ml-4">
                Working as a React.js Developer at <b>SoftwareSeni</b>, handling the product that live in UK
                and AU for our client <b>AgentPoint</b>, and also a partner of <b>Reapit</b> for the UK app.
              </p>
              <p className="ml-4 mt-4">
                Developing the large-scale of Progressive Web Application (PWA) build with React.js on the
                Front side and Laravel on the Back side. The app which run in a digital property platform in
                UK and AU. I’ve responsibilities to Create the{' '}
                <b>pixel-perfect UI and attention-to-detail </b>
                according to the Figma design and{' '}
                <b>Write Clean, High-Quality, and Scalable Code Structure</b>.
              </p>
              <span className="block font-serif text-white text-opacity-20">
                {breakWord('</p>', 'span', 'word opacity-0')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <svg
        id="path"
        width="112"
        fill="none"
        height="1450"
        viewBox="0 0 112 1450"
        className="absolute mx-auto top-0 inset-x-0"
      >
        <path
          opacity="0.35"
          stroke="#11405A"
          strokeWidth="4"
          d="M57.0004 10C57.0004 10 57.0004 44.5877 57.0004 66.75C57.0004 88.9123 44.5004 111 57.0004 123.5C69.5004 136 169.5 237 57.0004 237C-55.4992 237 39.5008 333 57.0004 350.5C74.5001 368 57.0004 385.088 57.0004 407.25C57.0004 429.412 57.0004 464 57.0004 464L57.0004 1439.5"
        />
        <circle
          cx="57"
          cy="10"
          r="10"
          fill="#11405A"
          className="shadow-xl shadow-accent origin-top opacity-0 scale-0"
        />
        <circle cx="57" cy="1440" r="10" fill="#11405A" className="shadow-xl shadow-accent origin-bottom" />
      </svg>
    </section>
  )
}

export default Timeline
