import React from 'react';
import anime from 'animejs';
import { cn } from '@/utils/cn';

interface TypingProps {
    start: boolean,
    texts: string[];
    className?: string;
    delayStart?: number;
}

const Typing: React.FC<TypingProps> = ({ start, texts, delayStart, className }) => {
    const textRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (start) {
            let currentIndex = 0;

            const animateText = () => {
                const currentText = texts[currentIndex];
                if (textRef.current) {
                    textRef.current.innerHTML = currentText;

                    const letters = Array.from(textRef.current.querySelectorAll("*:not(style)"));
                    letters.forEach((el) => {
                        const text = el.textContent || "";
                        el.innerHTML = text
                            .split("")
                            .map((char) =>
                                char.trim() === ""
                                    ? "&nbsp;" // Preserve spaces
                                    : `<span class="letter">${char}</span>`
                            )
                            .join("");
                    });

                    anime
                        .timeline({ easing: 'easeOutExpo', loop: false })
                        .add({
                            targets: '.letter',
                            opacity: [0, 1],
                            duration: 100,
                            delay: anime.stagger(50),
                        })
                        .add({
                            targets: [...textRef.current.querySelectorAll('.letter') as never].reverse(),
                            opacity: [1, 0],
                            duration: 100,
                            delay: anime.stagger(50, { start: 4000 }),
                        })
                        .finished.then(() => {
                            currentIndex = (currentIndex + 1) % texts.length;
                            animateText();
                        });
                }
            };

            setTimeout(() => animateText(), delayStart ?? 0)
        }
    }, [start]);

    return (
        <span
            ref={textRef}
            className={cn(className)}
        ></span>
    );
};

export default Typing;
