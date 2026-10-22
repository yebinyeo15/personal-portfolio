import { useEffect, useRef, useState } from 'react';
import './personalProjectsIntro.css';

function ProjectTeaser({ name, number, src, alt, className, href }) {
    return (
        <figure className={`personal-projects-intro__card ${className}`}>
            <div className="personal-projects-intro__teaser-inner">
                <a className="personal-projects-intro__card-link" href={href}>
                    <div className="personal-projects-intro__frame">
                        <div className="personal-projects-intro__frame-meta" aria-hidden="true">
                            <span>FRAME / {number}</span>
                            <span>IMAGE STUDY</span>
                        </div>
                        <div className="personal-projects-intro__image-wrap">
                            <img className="personal-projects-intro__image" src={src} alt={alt} />
                            <span className="personal-projects-intro__card-overlay" aria-hidden="true">
                                EXPLORE {name} ↗
                            </span>
                        </div>
                    </div>
                    <figcaption>
                        <span>{name} ↗</span>
                        <span>PERSONAL / 2026</span>
                    </figcaption>
                </a>
            </div>
        </figure>
    );
}

export default function PersonalProjectsIntro() {
    const [isChromeTitleUnavailable, setIsChromeTitleUnavailable] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        if (!('IntersectionObserver' in window)) {
            const frameId = window.requestAnimationFrame(() => setHasEntered(true));
            return () => window.cancelAnimationFrame(frameId);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setHasEntered(true);
                observer.disconnect();
            },
            {
                threshold: 0.18,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`personal-projects-intro${hasEntered ? ' is-visible' : ''}`}
            aria-labelledby="personal-projects-intro-title"
        >
            <div className="personal-projects-intro__inner">
                <header className="personal-projects-intro__meta">
                    <span>02 / INDEPENDENT WORK</span>
                    <span>2026 · CREATIVE ARCHIVE</span>
                </header>

                <div className="personal-projects-intro__canvas">
                    <h2 id="personal-projects-intro-title">
                        <span className="personal-projects-intro__chrome-title">
                            {isChromeTitleUnavailable ? (
                                <span>PERSONAL</span>
                            ) : (
                                <img
                                    src="/personal-chrome.png"
                                    alt="PERSONAL"
                                    onError={() => setIsChromeTitleUnavailable(true)}
                                />
                            )}
                        </span>
                        <span className="personal-projects-intro__projects-lockup">
                            <em>Projects.</em>
                            <small>VOL. 02 / INDEPENDENT CREATIONS</small>
                        </span>
                    </h2>

                    <ProjectTeaser
                        name="DIPTYQUE"
                        number="01"
                        src="/images/personal-diptyque.png"
                        alt="물결치는 빛 속 딥티크 향수 보틀"
                        className="personal-projects-intro__card--diptyque"
                        href="#diptyque-project-01"
                    />
                    <ProjectTeaser
                        name="SWAROVSKI"
                        number="02"
                        src="/images/personal-swarovski.png"
                        alt="스와로브스키 귀걸이와 목걸이를 착용한 모델"
                        className="personal-projects-intro__card--swarovski"
                        href="#swarovski-project-01"
                    />
                </div>

                <footer className="personal-projects-intro__footer">
                    <span>DIPTYQUE / SWAROVSKI</span>
                    <span>SCROLL TO DISCOVER ↓</span>
                </footer>
            </div>
        </section>
    );
}
