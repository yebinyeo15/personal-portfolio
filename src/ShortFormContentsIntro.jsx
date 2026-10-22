import { useEffect, useRef } from 'react';
import './shortFormContentsIntro.css';

const shortFormFrames = [
    { id: '01', title: 'EAU ROSE', src: null, className: 'is-featured' },
    { id: '02', title: 'FLORAL DETAIL', src: null, className: 'is-detail' },
    { id: '03', title: 'CAMPAIGN SCENE', src: null, className: 'is-campaign' },
    { id: '04', title: 'FINAL CUT', src: null, className: 'is-final' },
];

const ShortFormContentsIntro = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            section.classList.add('is-visible');
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                section.classList.add('is-visible');
                observer.disconnect();
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="short-form-contents-intro section"
            id="short-form-contents"
            data-short-form-panel="intro"
            aria-labelledby="short-form-contents-title"
            ref={sectionRef}
        >
            <div className="short-form-contents-intro__inner">
                <div
                    className="short-form-contents-intro__collage"
                    role="group"
                    aria-label="AI 숏폼 광고 프레임 미리보기"
                >
                    <div className="short-form-contents-intro__primary-frame">
                        {shortFormFrames.slice(0, 1).map((frame) => (
                            <figure
                                className={`short-form-contents-intro__frame ${frame.className}`}
                                key={frame.id}
                            >
                                {frame.src ? (
                                    <img src={frame.src} alt={`${frame.title} 광고 프레임`} />
                                ) : (
                                    <div className="short-form-contents-intro__placeholder">
                                        <span>MEDIA PLACEHOLDER</span>
                                    </div>
                                )}
                                <figcaption>FRAME {frame.id} / {frame.title}</figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="short-form-contents-intro__secondary-frames">
                        {shortFormFrames.slice(1).map((frame) => (
                            <figure
                                className={`short-form-contents-intro__frame ${frame.className}`}
                                key={frame.id}
                            >
                                {frame.src ? (
                                    <img src={frame.src} alt={`${frame.title} 광고 프레임`} />
                                ) : (
                                    <div className="short-form-contents-intro__placeholder">
                                        <span>MEDIA PLACEHOLDER</span>
                                    </div>
                                )}
                                <figcaption>FRAME {frame.id} / {frame.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>

                <div className="short-form-contents-intro__content">
                    <header>
                        <span>01 / AI MOTION WORK</span>
                        <span>SHORT-FORM CONTENTS · INTRO</span>
                    </header>

                    <div className="short-form-contents-intro__copy">
                        <h2 id="short-form-contents-title">
                            <img
                                className="short-form-contents-intro__chrome-title"
                                src="/images/short-form-chrome.png"
                                alt="SHORT-FORM"
                            />
                            <em>CONTENTS.</em>
                        </h2>
                        <p className="short-form-contents-intro__subtitle">
                            AI VISUAL &amp; MOTION DESIGN
                        </p>
                        <p className="short-form-contents-intro__description">
                            AI 이미지 생성부터 영상 연출과 편집까지,
                            <br />
                            아이디어를 짧은 영상 콘텐츠로 구현했습니다.
                            <br />
                            브랜드의 분위기와 메시지를 감각적인 숏폼 광고로 전달합니다.
                        </p>
                    </div>

                    <footer>
                        <p>AI VISUAL · VIDEO GENERATION · MOTION EDITING</p>
                        <span>SELECTED FRAMES FROM AI-GENERATED FILMS</span>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default ShortFormContentsIntro;
