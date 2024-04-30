'use client'

import * as React from 'react'
import anime from 'animejs'
import Image from 'next/image'
import { breakWord } from '@/utils/breakWord'
import { useIntersectionObserver, useToggle } from '@uidotdev/usehooks'

export const Work: React.FC = () => {
    const ref = React.useRef<HTMLElement>(null)
    const [isAnimated, toggleAnimated] = useToggle(false)
    const [intersectionRef, entry] = useIntersectionObserver({
        threshold: 0.35,
    })

    React.useLayoutEffect(() => {
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
                .add(
                    {
                        targets: ref.current.querySelectorAll('span.word'),
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: 'easeOutExpo',
                        duration: 650,
                        delay: (_, i) => 80 * i,
                    },
                    1000,
                )
        }
    }, [entry?.isIntersecting])

    return (
        <section ref={ref} id="work" className="flex items-center pt-24 pb-10">
            <div className="container">
                <div ref={intersectionRef}>
                    <span className="block font-serif text-white text-opacity-20">
                        {breakWord('<section>', 'span', 'word opacity-0')}
                    </span>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('<h1>', 'span', 'word opacity-0')}
                    </span>
                    <h1 className="text-5xl font-extrabold text-shadow-1 shadow-slate-400 ml-8">Work</h1>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('</h1>', 'span', 'word opacity-0')}
                    </span>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('<p>', 'span', 'word opacity-0')}
                    </span>
                    <p className="ml-8">
                        Some selected works from 2017 until now of my career are listed below.
                    </p>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('</p>', 'span', 'word opacity-0')}
                    </span>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('<iframe>', 'span', 'word opacity-0')}
                    </span>
                    <div className="px-8 py-2">
                        <iframe className="w-full border border-white aspect-[1280 / 749]" src="https://docs.google.com/presentation/d/e/2PACX-1vQPLh_r7uTP6-InCnVAaxZSwB6vVYUSLaUVy-vq7YDeUOqNRy8nPA8vfrc6Hr7UJGOxoVRU2qiCEGxQ/embed?start=false&loop=true&delayms=1000"
                            frameBorder="0" width="1280" height="749" allowFullScreen />
                    </div>
                    <span className="block font-serif text-white text-opacity-20 ml-4">
                        {breakWord('</iframe>', 'span', 'word opacity-0')}
                    </span>
                    <span className="block font-serif text-white text-opacity-20">
                        {breakWord('</section>', 'span', 'word opacity-0')}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default Work