import { useEffect, useRef, useState } from 'react';
import ProjectWebsiteButton from './ProjectWebsiteButton';
import './diptyqueProjectIntro.css';

export default function DiptyqueProjectIntro() {
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
            { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`diptyque-project-intro${hasEntered ? ' is-visible' : ''}`}
            id="diptyque-project-01"
            aria-labelledby="diptyque-project-intro-title"
        >
            <div className="diptyque-project-intro__inner">
                <div className="diptyque-project-intro__visual">
                    <div className="diptyque-project-intro__visual-index" aria-hidden="true">
                        <span>VISUAL STUDY / 01</span>
                        <span>PARIS · DIGITAL</span>
                    </div>

                    <figure className="diptyque-project-intro__mockup">
                        <img
                            src="/images/diptyque-mockup.png"
                            alt="딥티크 웹사이트 리뉴얼 화면이 표시된 맥북 목업"
                        />
                        <figcaption>MAIN EXPERIENCE / DESKTOP VIEW</figcaption>
                    </figure>
                </div>

                <div className="diptyque-project-intro__content">
                    <header className="diptyque-project-intro__heading">
                        <p>01 / PERSONAL PROJECT</p>
                        <h2 id="diptyque-project-intro-title">DIPTYQUE</h2>
                        <em>Web Renewal.</em>
                    </header>

                    <p className="diptyque-project-intro__description">
                        프랑스 니치 향수 브랜드 딥디크의 감성을 디지털 경험으로 재해석한 웹사이트
                        리뉴얼 프로젝트입니다. 향수 컬렉션과 브랜드 스토리를 중심으로 감각적인
                        레이아웃과 스크롤 인터랙션을 구현했습니다.
                    </p>

                    <div className="diptyque-project-intro__details">
                        <section aria-labelledby="diptyque-overview-title">
                            <h3 id="diptyque-overview-title">PROJECT OVERVIEW</h3>
                            <dl>
                                <div>
                                    <dt>TYPE</dt>
                                    <dd>Personal Project</dd>
                                </div>
                                <div>
                                    <dt>SCOPE</dt>
                                    <dd>Main + 6 Detail Pages</dd>
                                </div>
                                <div>
                                    <dt>TOOLS</dt>
                                    <dd>Figma · React · CSS</dd>
                                </div>
                            </dl>
                        </section>

                        <section aria-labelledby="diptyque-role-title">
                            <h3 id="diptyque-role-title">MY ROLE</h3>
                            <ul className="diptyque-project-intro__role-list">
                                <li>UI Design</li>
                                <li>Web Publishing</li>
                                <li>Scroll Interaction</li>
                                <li>Responsive Layout</li>
                            </ul>
                        </section>
                    </div>

                    <div className="diptyque-project-intro__action">
                        <ProjectWebsiteButton href="https://diptyque-portfolio.vercel.app/" />
                    </div>
                </div>
            </div>
        </section>
    );
}
