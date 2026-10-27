import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './moreAboutRotatingGallery.css';

// Adapted from Codrops RotatingOnScrollAnimations, Variation 01 (MIT License).
// https://github.com/codrops/RotatingOnScrollAnimations
gsap.registerPlugin(ScrollTrigger);

const galleryImageSources = [
    '/images/about/venice.jpg',
    '/images/about/paris-view.jpg',
    '/images/about/paris-louvre.jpg',
    '/images/about/paris-eiffel.jpg',
    '/images/about/music-reference.png',
    '/images/about/las-vegas.jpg',
    '/images/about/gallery-07.jpg',
    '/images/about/gallery-08.jpg',
    '/images/about/gallery-09.jpg',
    '/images/about/gallery-10.jpg',
    '/images/about/gallery-11.jpg',
    '/images/about/gallery-12.jpg',
    '/images/about/gallery-13.jpg',
    '/images/about/gallery-14.jpg',
    '/images/about/gallery-15.jpg',
    '/images/about/gallery-16.jpg',
    '/images/about/gallery-17.jpg',
    '/images/about/gallery-18.jpg',
    '/images/about/gallery-19.jpg',
    '/images/about/gallery-20.jpg',
];

const marqueeItems = [
    {
        sans: 'WHAT',
        serif: 'shapes',
        suffix: 'ME.',
        description: '일상에서 마주한 장면과 경험을 나만의 디자인 시선으로 연결합니다.',
    },
    {
        sans: 'LOOK',
        serif: 'closer.',
        description: '익숙한 화면에서도 작은 차이를 발견하고, 사용자의 입장에서 다시 살펴봅니다.',
    },
    {
        sans: 'THINK.',
        serif: 'make.',
        suffix: 'REPEAT.',
        description: '아이디어를 직접 구현하고 수정하며 더 나은 방향을 찾아갑니다.',
    },
    {
        sans: 'FIND',
        serif: 'the order.',
        description: '복잡한 정보를 정리하고 중요한 내용이 자연스럽게 전달되도록 구성합니다.',
    },
    {
        sans: 'KEEP',
        serif: 'evolving.',
        description: '직접 만들고 배우는 과정을 반복하며 새로운 표현 방법을 익혀갑니다.',
    },
];

const preloadImages = (sources) =>
    Promise.all(
        sources.map((source) => {
            const image = new Image();
            image.src = source;
            return image.decode().catch(() => undefined);
        })
    );

const MoreAboutRotatingGallery = () => {
    const sectionRef = useRef(null);
    const activeCaptionRef = useRef(0);
    const [activeCaption, setActiveCaption] = useState(0);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let disposed = false;
        let context;
        let removeResizeListener = () => {};

        const initGallery = () => {
            if (disposed) return;

            context = gsap.context(() => {
                const gallery = section.querySelector('.more-rotating-gallery__track');
                const mark = section.querySelector('.more-rotating-gallery__mark');
                const caption = section.querySelector('.more-rotating-gallery__caption');
                const marqueeInner = mark.querySelector('.more-rotating-gallery__mark-inner');
                const phrases = gsap.utils.toArray('.more-rotating-gallery__phrase');
                const wraps = gsap.utils.toArray('.more-rotating-gallery__item-wrap');
                const items = gsap.utils.toArray('.more-rotating-gallery__item');

                const updateCaption = () => {
                    const viewportCenter = window.innerWidth / 2;
                    let closestIndex = 0;
                    let closestDistance = Number.POSITIVE_INFINITY;

                    phrases.forEach((phrase, index) => {
                        const rect = phrase.getBoundingClientRect();
                        const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestIndex = index;
                        }
                    });

                    if (closestIndex !== activeCaptionRef.current) {
                        activeCaptionRef.current = closestIndex;
                        setActiveCaption(closestIndex);
                    }
                };

                const positionGalleryItems = () => {
                    const freeSpace = (window.innerWidth - wraps[0].offsetWidth) / 2;
                    const amplitude = Math.min(window.innerWidth * 0.2, freeSpace);

                    wraps.forEach((wrap, index) => {
                        gsap.set(wrap, {
                            x: Math.sin(index * 0.45) * amplitude,
                        });
                    });
                };

                positionGalleryItems();
                window.addEventListener('resize', positionGalleryItems);
                removeResizeListener = () =>
                    window.removeEventListener('resize', positionGalleryItems);

                const markVisibility = ScrollTrigger.create({
                    trigger: section,
                    start: 'top top-=6%',
                    end: 'bottom bottom+=6%',
                    onToggle: ({ isActive }) => {
                        gsap.to([mark, caption], {
                            autoAlpha: isActive ? 1 : 0,
                            duration: isActive ? 0.25 : 0.18,
                            ease: 'power1.out',
                            overwrite: true,
                        });
                    },
                });

                gsap.fromTo(
                    section,
                    { backgroundColor: '#eaf0f6' },
                    {
                        backgroundColor: '#1c2538',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: '65% top',
                            end: 'bottom bottom',
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                if (reducedMotion.matches) {
                    gsap.set([mark, caption], { autoAlpha: 1 });
                    markVisibility.kill();
                    return;
                }

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gallery,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.0,
                        invalidateOnRefresh: true,
                    },
                }).fromTo(
                    marqueeInner,
                    { x: '100vw' },
                    {
                        x: '-100%',
                        ease: 'none',
                        onUpdate: updateCaption,
                    }
                );

                items.forEach((item) => {
                    const rotationX = gsap.utils.random(70, 120);
                    const rotationY = gsap.utils.random(-20, 20);
                    const rotationZ = gsap.utils.random(-20, 20);
                    const setZ = gsap.quickSetter(item, 'z', 'px');

                    gsap.fromTo(
                        item,
                        { rotationX, rotationY, rotationZ },
                        {
                            rotationX: -rotationX,
                            rotationY: -rotationY,
                            rotationZ: -rotationZ,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top bottom+=20%',
                                end: 'bottom top-=20%',
                                scrub: 1.0,
                                invalidateOnRefresh: true,
                                onUpdate: (self) => {
                                    const z = Math.sin(self.progress * Math.PI) * -50;
                                    setZ(z);
                                },
                            },
                        }
                    );
                });

                ScrollTrigger.refresh();
            }, section);
        };

        preloadImages(galleryImageSources).then(initGallery);

        return () => {
            disposed = true;
            removeResizeListener();
            gsap.killTweensOf(section.querySelectorAll(
                '.more-rotating-gallery__mark, .more-rotating-gallery__caption'
            ));
            context?.revert();
        };
    }, []);

    return (
        <section
            className="more-rotating-gallery"
            id="more-about-gallery"
            ref={sectionRef}
            aria-label="More about me image gallery"
        >
            <div className="more-rotating-gallery__track">
                {galleryImageSources.map((source, index) => (
                    <div className="more-rotating-gallery__item-wrap" key={`${source}-${index}`}>
                        <div
                            className="more-rotating-gallery__item"
                            role="img"
                            aria-label={`More about me gallery image ${index + 1}`}
                            style={{ backgroundImage: `url('${source}')` }}
                        />
                    </div>
                ))}
            </div>

            <div className="more-rotating-gallery__mark" aria-hidden="true">
                <div className="more-rotating-gallery__mark-inner">
                    {marqueeItems.map((item) => (
                        <div className="more-rotating-gallery__phrase" key={item.sans}>
                            <strong>{item.sans}</strong>
                            <em>{item.serif}</em>
                            {item.suffix && <strong>{item.suffix}</strong>}
                        </div>
                    )).reduce((items, item, index) => [
                        ...items,
                        item,
                        ...(index < marqueeItems.length - 1
                            ? [
                                  <span
                                      className="more-rotating-gallery__separator"
                                      key={`separator-${index}`}
                                  >
                                      <img
                                          src="/images/about/chrome-star.png"
                                          alt=""
                                          width="48"
                                          height="48"
                                      />
                                  </span>,
                              ]
                            : []),
                    ], [])}
                </div>
            </div>

            <div className="more-rotating-gallery__caption" aria-live="polite">
                <p key={activeCaption}>
                    {marqueeItems[activeCaption].description}
                </p>
            </div>
        </section>
    );
};

export default MoreAboutRotatingGallery;
