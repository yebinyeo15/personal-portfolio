import { useEffect, useRef } from 'react';
import './otherWorks.css';

const otherWorksProjects = [
    {
        id: '01',
        slug: 'mmca',
        title: 'MMCA REDESIGN',
        label: 'WEB DESIGN & PUBLISHING',
        category: 'MUSEUM WEBSITE REDESIGN',
        description:
            '국립현대미술관의 전시와 소장품을 더욱 직관적으로 탐색할 수 있도록 정보 구조를 재정비하고, 전시 콘텐츠 중심의 시각적 경험을 강화한 웹사이트 리디자인 프로젝트입니다.',
        primaryImage: '/images/other-works/mmca-thumbnail.png',
        primaryAlt: '국립현대미술관 웹사이트 리디자인',
        imageLink: 'https://mmca-redesign.vercel.app',
        imageLinkLabel: 'MMCA REDESIGN 웹사이트 방문',
        imageLinkPrompt: 'VIEW WEBSITE',
        links: [],
    },
    {
        id: '02',
        slug: 'yupdduk',
        alignment: 'right',
        title: 'YUPDDUK REDESIGN',
        label: 'WEB DESIGN & PUBLISHING',
        category: 'FOOD BRAND WEBSITE',
        description:
            '기존 웹사이트 실습 구조를 바탕으로 엽기떡볶이 브랜드에 맞게 콘텐츠와 비주얼을 재구성했습니다. 스타일 가이드와 컴포넌트를 체계적으로 정리하고, 인터랙션과 웹 퍼블리싱을 함께 연습한 프로젝트입니다.',
        primaryImage: '/images/other-works/yeopddeok-main.png',
        primaryAlt: '엽기떡볶이 웹사이트 메인 페이지 디자인',
        secondaryImage: '/images/other-works/yeopddeok-design-system.png',
        secondaryAlt: '엽기떡볶이 웹사이트 스타일 가이드와 컴포넌트',
        imageLink: 'https://yebinyeo15.github.io/YUBDDUK-web-pracrice/',
        imageLinkLabel: 'YUPDDUK 웹사이트 방문',
        imageLinkPrompt: 'VIEW WEBSITE',
        links: [],
    },
    {
        id: '03',
        slug: 'fan-community',
        title: 'FAN COMMUNITY',
        label: 'MOBILE UI/UX DESIGN',
        category: 'FAN COMMUNITY APP',
        description:
            '팬 커뮤니티 서비스를 주제로 기존 모바일 UI 디자인을 분석하고, 컬러와 콘텐츠, 화면 구성을 재해석한 디자인 실습 프로젝트입니다. 커뮤니티, 아티스트 선택, 채팅, 음악 플레이어 등 다양한 화면을 일관된 UI로 구성했습니다.',
        primaryImage: '/images/other-works/fan-community-mockup.png',
        primaryAlt: '팬 커뮤니티 모바일 UI를 보여주는 네 개의 아이폰 목업',
        imageLink:
            'https://www.figma.com/proto/qM6U31T5Q9AFtVMJmQ9GUk/FAN-COMMUNITY-%7C-Mobile-UI-Design?node-id=13-2438&viewport=5575%2C2178%2C1.27&t=IBOfiP4e89eSkinI-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1',
        imageLinkLabel: 'FAN COMMUNITY 피그마 디자인 보기',
        imageLinkPrompt: 'VIEW DESIGN',
        links: [],
    },
    {
        id: '04',
        slug: 'modern-house',
        alignment: 'right',
        title: 'MODERN HOUSE REDESIGN',
        label: 'WEB DESIGN & PUBLISHING',
        category: 'E-COMMERCE WEBSITE REDESIGN',
        description:
            '모던하우스의 감각적인 라이프스타일을 중심으로 상품 탐색 구조와 쇼핑 경험을 재구성하고, 브랜드의 분위기를 시각적으로 전달하는 이커머스 웹사이트 리디자인 프로젝트입니다.',
        primaryImage: '/images/other-works/modernhouse-thumbnail.png',
        primaryAlt: '모던하우스 이커머스 웹사이트 리디자인',
        imageLink: 'https://modernhouse-redesign.vercel.app',
        imageLinkLabel: 'MODERN HOUSE REDESIGN 웹사이트 방문',
        imageLinkPrompt: 'VIEW WEBSITE',
        links: [],
    },
    {
        id: '05',
        slug: 'cj-group',
        title: 'CJ GROUP REDESIGN',
        label: 'WEB DESIGN & PUBLISHING',
        category: 'CORPORATE WEBSITE REDESIGN',
        description:
            'CJ그룹의 브랜드 가치와 다양한 사업 영역을 효과적으로 전달하기 위해 콘텐츠 구조를 재정비하고, 기업 아이덴티티를 반영한 시각적 구성으로 개선한 웹사이트 리디자인 프로젝트입니다.',
        primaryImage: '/images/other-works/cj-thumbnail.png',
        primaryAlt: 'CJ그룹 기업 웹사이트 리디자인',
        imageLink: 'https://cj-group-redesign.vercel.app',
        imageLinkLabel: 'CJ GROUP REDESIGN 웹사이트 방문',
        imageLinkPrompt: 'VIEW WEBSITE',
        links: [],
    },
];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smoothstep = (value) => {
    const bounded = clamp(value);
    return bounded * bounded * (3 - 2 * bounded);
};

const ProjectVisual = ({ project }) => {
    if (!project.primaryImage) {
        return (
            <div className="other-works-placeholder" aria-label="다음 프로젝트 준비 중">
                <span>{project.id}</span>
                <strong>NEXT<br />EXPERIENCE</strong>
                <small>IN PROGRESS · 2026</small>
            </div>
        );
    }

    const visual = (
        <div className={`other-works-card__visual-inner is-${project.slug}`}>
            <img
                className="other-works-card__primary-image"
                src={project.primaryImage}
                alt={project.primaryAlt}
            />
            {project.secondaryImage && (
                <img
                    className="other-works-card__secondary-image"
                    src={project.secondaryImage}
                    alt={project.secondaryAlt}
                />
            )}
            <span className="other-works-card__overlay" aria-hidden="true" />
            <span className="other-works-card__view" aria-hidden="true">
                <i>↗</i>
                <strong>{project.imageLinkPrompt}</strong>
            </span>
        </div>
    );

    return (
        <a
            className="other-works-card__visual-link"
            href={project.imageLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.imageLinkLabel}
        >
            {visual}
        </a>
    );
};

const OtherWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktop = window.matchMedia('(min-width: 901px)');
        const cards = Array.from(section.querySelectorAll('.other-works-card'));
        let frame = 0;

        const clearMotion = () => {
            cards.forEach((card) => {
                card.style.removeProperty('--other-card-opacity');
                card.style.removeProperty('--other-card-y');
                card.classList.remove('is-motion-active');
            });
        };

        const render = () => {
            frame = 0;
            if (!desktop.matches || reducedMotion.matches) {
                clearMotion();
                return;
            }

            const rect = section.getBoundingClientRect();
            const travel = Math.max(1, rect.height - window.innerHeight);
            const progress = clamp(-rect.top / travel);
            const originalTravel = 6.6;
            const extendedTravel = originalTravel + 2 * 0.29 * originalTravel;
            const progressScale = originalTravel / extendedTravel;
            const starts = [0.08, 0.37, 0.66, 0.95, 1.24].map((start) => start * progressScale);
            const cardInterval = 0.29 * progressScale;

            cards.forEach((card, index) => {
                const start = starts[index];
                const timeline = clamp((progress - start) / cardInterval, -0.12, 1.2);
                const enter = smoothstep(timeline / 0.14);
                const exit = smoothstep((timeline - 0.78) / 0.22);
                const opacity = enter * (1 - exit);
                const cardHeight = card.offsetHeight;
                const startY = window.innerHeight + 72;
                const endY = -cardHeight * 0.5;
                const y = startY + (endY - startY) * timeline;
                card.style.setProperty('--other-card-opacity', opacity.toFixed(4));
                card.style.setProperty('--other-card-y', `${y.toFixed(2)}px`);
                card.classList.toggle('is-motion-active', opacity > 0.05);
            });
        };

        const requestRender = () => {
            if (!frame) frame = window.requestAnimationFrame(render);
        };

        render();
        window.addEventListener('scroll', requestRender, { passive: true });
        window.addEventListener('resize', requestRender);
        desktop.addEventListener('change', requestRender);
        reducedMotion.addEventListener('change', requestRender);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestRender);
            window.removeEventListener('resize', requestRender);
            desktop.removeEventListener('change', requestRender);
            reducedMotion.removeEventListener('change', requestRender);
            clearMotion();
        };
    }, []);

    return (
        <section className="other-works" id="other-works" ref={sectionRef}>
            <div className="other-works__sticky">
                <header className="other-works__title">
                    <img
                        src="/images/other-works/other-works-chrome-title.png"
                        alt="OTHER WORKS"
                        width="2172"
                        height="724"
                        decoding="async"
                    />
                    <em>Selected Practice.</em>
                    <p>디자인부터 구현까지, 다양한 시도를 통해 완성한 작업들입니다.</p>
                    <span>WEB DESIGN · UI DESIGN · CREATIVE PRACTICE</span>
                </header>

                <div className="other-works__cards">
                    {otherWorksProjects.map((project) => (
                        <article
                            className={`other-works-card is-${project.slug}${project.alignment ? ` is-${project.alignment}` : ''}`}
                            key={project.id}
                        >
                            <ProjectVisual project={project} />
                            <div className="other-works-card__content">
                                <div className="other-works-card__meta">
                                    <span>{project.id} / {project.label}</span>
                                    <span>{project.category}</span>
                                </div>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                {project.links.length > 0 && (
                                    <div className="other-works-card__links">
                                        {project.links.map((link) => (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={link.label}
                                            >
                                                {link.label} <span aria-hidden="true">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherWorks;
