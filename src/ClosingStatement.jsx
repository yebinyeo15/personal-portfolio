import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './closingStatement.css';

// Interaction structure adapted from Codrops ImageExpansionTypography (MIT).
// https://github.com/codrops/ImageExpansionTypography
gsap.registerPlugin(ScrollTrigger);

const CLOSING_IMAGE_A = '/images/about/closing-workspace.png';
const CLOSING_IMAGE_B = '/images/about/about-profile.png';

const ClosingStatement = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const quickQA = section?.previousElementSibling;
        if (!section || !quickQA?.classList.contains('quick-qa')) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const context = gsap.context(() => {
            const primaryImage = section.querySelector('.closing-statement__image--primary');
            const secondaryImage = section.querySelector('.closing-statement__image--secondary');
            const secondaryVisual = secondaryImage.querySelector('img');
            const leftWords = section.querySelectorAll('.closing-statement__word--left');
            const rightWords = section.querySelectorAll('.closing-statement__word--right');
            const pledge = section.querySelector('.closing-statement__pledge');

            gsap.fromTo(
                quickQA,
                { backgroundColor: '#1c2538' },
                {
                    backgroundColor: '#17191f',
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: quickQA,
                        start: () => {
                            const sectionTop = quickQA.getBoundingClientRect().top + window.scrollY;
                            const scrollRange = Math.max(
                                quickQA.offsetHeight - window.innerHeight,
                                1
                            );
                            return sectionTop + scrollRange * 0.3;
                        },
                        end: () => {
                            const sectionTop = quickQA.getBoundingClientRect().top + window.scrollY;
                            const scrollRange = Math.max(
                                quickQA.offsetHeight - window.innerHeight,
                                1
                            );
                            return sectionTop + scrollRange;
                        },
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            const imageSize = () => {
                const isMobile = window.innerWidth <= 768;
                return Math.min(520, window.innerWidth * (isMobile ? 0.72 : 0.7));
            };

            if (reducedMotion.matches) {
                gsap.set(primaryImage, { width: imageSize(), top: '50%', left: '50%' });
                gsap.set(secondaryImage, { autoAlpha: 0 });
                gsap.set([leftWords, rightWords], { autoAlpha: 0 });
                gsap.set(pledge, { autoAlpha: 1, y: 0 });
                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            timeline
                .to(
                    primaryImage,
                    {
                        width: imageSize,
                        top: '50%',
                        left: '50%',
                        borderRadius: 0,
                        ease: 'power1.inOut',
                    },
                    0
                )
                .fromTo(
                    secondaryImage,
                    { autoAlpha: 1 },
                    {
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: 'power1.inOut',
                    },
                    0.05
                )
                .to(
                    secondaryVisual,
                    { scale: 0.78, y: 30, duration: 0.4, ease: 'power1.inOut' },
                    0.05
                )
                .set(secondaryImage, { autoAlpha: 0, pointerEvents: 'none' }, 0.4)
                .to(
                    leftWords,
                    { xPercent: -62, autoAlpha: 0, duration: 0.72, ease: 'power1.inOut' },
                    0
                )
                .to(
                    rightWords,
                    { xPercent: 62, autoAlpha: 0, duration: 0.72, ease: 'power1.inOut' },
                    0
                )
                .fromTo(
                    pledge,
                    { autoAlpha: 0, y: 24 },
                    { autoAlpha: 1, y: 0, duration: 0.18, ease: 'sine.out' },
                    0.72
                )
                .set(pledge, { autoAlpha: 1, y: 0 }, 0.9);
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section
            className="closing-statement"
            ref={sectionRef}
            aria-labelledby="closing-statement-title"
        >
            <div className="closing-statement__stage">
                <h2 className="closing-statement__type" id="closing-statement-title">
                    <span className="closing-statement__line">
                        <span className="closing-statement__word closing-statement__word--left">
                            STILL
                        </span>
                        <span className="closing-statement__word closing-statement__word--right">
                            LEARNING.
                        </span>
                    </span>
                    <span className="closing-statement__line closing-statement__line--serif">
                        <span className="closing-statement__word closing-statement__word--left">
                            always
                        </span>
                        <span className="closing-statement__word closing-statement__word--right">
                            growing.
                        </span>
                    </span>
                </h2>

                <figure className="closing-statement__image closing-statement__image--primary">
                    <img src={CLOSING_IMAGE_A} alt="웹 디자이너 여예빈의 프로필" />
                </figure>

                <figure
                    className="closing-statement__image closing-statement__image--secondary"
                    aria-hidden="true"
                >
                    <img src={CLOSING_IMAGE_B} alt="" />
                </figure>

                <p className="closing-statement__pledge">
                    끊임없이 배우고 도전하며, 저만의 가능성을 넓혀가는 디자이너가 되겠습니다.
                </p>
            </div>
        </section>
    );
};

export default ClosingStatement;
