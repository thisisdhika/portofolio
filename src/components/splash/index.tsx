'use client'

import * as React from 'react'
import anime, { type AnimeCallBack } from 'animejs'

interface ISplashProps {
  onFinish: AnimeCallBack['complete']
}

const Splash: React.FC<ISplashProps> = ({ onFinish }) => {
  const svgRef = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (!!svgRef.current) {
      const timeline = anime.timeline({
        easing: 'easeInOutSine',
      })

      timeline
        .add({
          targets: svgRef.current.querySelectorAll('path'),
          duration: 2400,
          strokeDashoffset: [anime.setDashoffset, 1],
          stroke: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        })
        .add({
          targets: svgRef.current.querySelectorAll('path'),
          duration: 800,
          fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        })
        .add({
          targets: svgRef.current,
          duration: 800,
          scale: 1.2,
          strokeWidth: 0,
          strokeDashoffset: [0, anime.setDashoffset],
        })
        .add({
          targets: svgRef.current.querySelectorAll('path'),
          duration: 1400,
          strokeWidth: 15,
          complete: onFinish,
          strokeDashoffset: [anime.setDashoffset, 1],
          stroke: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
        })
        .add(
          {
            targets: svgRef.current.querySelectorAll('path'),
            duration: 1400,
            fill: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
          },
          4100,
        )
        .add(
          {
            easing: 'easeInOutQuart',
            targets: svgRef.current.parentNode,
            duration: 1800,
            scale: 10,
            opacity: [1, 0.75, 0.4, 0],
            // translateY: ['0%', '-60%', '-100%'],
          },
          4100,
        )
    }
  }, [])

  return (
    <div className="fixed bg-base-100 w-screen h-screen flex justify-center items-center z-50">
      <svg
        ref={svgRef}
        width="100"
        height="100"
        fill="none"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeWidth={10}
          d="M224.475 483.587L175.541 484.439L126.607 485.291L173.429 417.114L222.056 345.247L223.298 416.246C249.687 415.786 271.714 409.581 289.381 397.63C307.043 385.472 320.253 368.298 329.011 346.107C337.764 323.709 341.87 297.025 341.329 266.057L340.92 242.675C340.502 218.773 337.535 197.722 332.021 179.522C326.506 161.323 318.549 146.076 308.149 133.783C297.957 121.486 285.428 112.245 270.563 106.059C255.697 99.8726 238.706 96.9461 219.59 97.2791L117.981 99.0491L116.798 31.3965L218.406 29.6264C248.743 29.098 276.468 33.7087 301.581 43.4586C326.902 53.2049 348.872 67.4795 367.491 86.2825C386.315 104.874 400.841 127.283 411.069 153.508C421.504 179.731 427.008 209.157 427.578 241.789L427.976 264.547C428.543 296.971 424.073 326.571 414.564 353.349C405.26 379.915 391.526 402.816 373.364 422.052C355.41 441.284 333.846 456.213 308.674 466.839C283.502 477.465 255.436 483.047 224.475 483.587ZM166.667 30.5277L169.636 200.293L171.121 285.176L171.863 327.618L172.606 345.247L190.204 345.247L172.606 370.059L88.8937 485.948L80.9545 32.0209L166.667 30.5277Z"
        />
      </svg>
    </div>
  )
}

export default Splash
