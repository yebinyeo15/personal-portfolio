import { useEffect, useRef, useState } from 'react';
import './App.css';

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const Placeholder = ({ label, className = '' }) => (
    <div className={`placeholder ${className}`} role="img" aria-label={`${label} placeholder`}>
        <span>{label}</span>
    </div>
);

const EditorialProject = ({ number, projectNumber, name, tone, reverse = false }) => (
    <section className={`editorial-project editorial-project--${tone}`} id={name.toLowerCase()}>
        <div className="section editorial-project__intro">
            <div className={`section-index ${tone === 'dark' ? 'section-index--light' : ''}`}>
                <span>{number}</span>
                <span>Project {projectNumber}</span>
            </div>
            <div
                className={`editorial-project__title ${reverse ? 'editorial-project__title--reverse' : ''}`}
            >
                <div>
                    <p className="eyebrow">Personal project · Brand website renewal</p>
                    <h2>{name}</h2>
                </div>
                <p>개인 브랜드 웹사이트 리뉴얼 프로젝트</p>
            </div>
            <Placeholder
                label={`${name} · PROJECT KEY VISUAL`}
                className="editorial-project__visual"
            />
        </div>

        <div className="section editorial-project__overview">
            <div className="section-label">Overview</div>
            <div className="editorial-project__statement">
                <h3>
                    PROJECT
                    <br />
                    OVERVIEW
                </h3>
                <p>프로젝트의 배경과 리뉴얼 방향에 대한 실제 내용을 입력할 영역입니다.</p>
            </div>
            <div className="editorial-project__brief">
                <article>
                    <span>01</span>
                    <h4>Problem</h4>
                    <p>발견한 문제와 개선이 필요한 내용을 입력해 주세요.</p>
                </article>
                <article>
                    <span>02</span>
                    <h4>Goal</h4>
                    <p>프로젝트의 실제 목표와 방향을 입력해 주세요.</p>
                </article>
                <article>
                    <span>03</span>
                    <h4>Design Concept</h4>
                    <p>디자인 콘셉트와 시각적 기준을 입력해 주세요.</p>
                </article>
            </div>
        </div>

        <div className="section editorial-project__process">
            <div className="editorial-project__process-heading">
                <div>
                    <p className="eyebrow">Design process</p>
                    <h3>
                        THE MAKING
                        <br />
                        OF {name}
                    </h3>
                </div>
                <p>리서치부터 최종 디자인까지 실제 작업 과정을 순서대로 정리할 영역입니다.</p>
            </div>
            <div className="editorial-project__process-grid">
                <Placeholder
                    label="RESEARCH / MOODBOARD"
                    className="editorial-process-placeholder"
                />
                <Placeholder
                    label="WIREFRAME / STRUCTURE"
                    className="editorial-process-placeholder editorial-process-placeholder--tall"
                />
                <Placeholder label="DESIGN SYSTEM / UI" className="editorial-process-placeholder" />
            </div>
        </div>

        <div className="section editorial-project__result">
            <div className="editorial-project__result-heading">
                <div className="section-label">Final result</div>
                <h3>
                    FINAL
                    <br />
                    SCREENS
                </h3>
                <p>완성된 웹사이트 화면 이미지로 교체할 수 있는 갤러리입니다.</p>
            </div>
            <div
                className={`editorial-project__gallery ${reverse ? 'editorial-project__gallery--reverse' : ''}`}
            >
                <Placeholder
                    label={`${name} · MAIN PAGE`}
                    className="editorial-result-placeholder editorial-result-placeholder--main"
                />
                <Placeholder
                    label={`${name} · DETAIL 01`}
                    className="editorial-result-placeholder"
                />
                <Placeholder
                    label={`${name} · DETAIL 02`}
                    className="editorial-result-placeholder"
                />
            </div>
            <div className="editorial-project__cta">
                <p>Explore the live project</p>
                <button type="button" disabled>
                    VIEW WEBSITE <ArrowIcon />
                </button>
                <small>실제 사이트 URL을 입력한 후 활성화해 주세요.</small>
            </div>
        </div>
    </section>
);

const nintendoContributionItems = [
    {
        number: '01',
        label: 'Mario Subpage',
        title: '마리오 서브페이지 디자인과 구현',
        tags: ['UI Design', 'Interaction', 'Front-End'],
        description:
            '캐릭터 선택과 아이템 변화, 스크롤 인터랙션을 중심으로 마리오의 세계를 직접 경험할 수 있는 서브페이지를 디자인하고 구현했습니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo/mario-interaction.mp4',
            label: '마리오 서브페이지 인터랙션 시연 영상',
        },
        href: 'https://mbc-teamproject-red.vercel.app/ip/mario',
    },
    {
        number: '02',
        label: 'Main Landing Visual',
        title: '픽셀 그래픽 · 비주얼 디자인',
        tags: ['Visual Design', 'Image Making'],
        description:
            '메인 랜딩페이지에서 직접 참여한 픽셀 이미지 작업과 이미지 제작 및 배치 작업을 소개합니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo/nintendo-main.mp4',
            label: '닌텐도 리뉴얼 메인페이지 시연 영상',
        },
        href: 'https://mbc-teamproject-red.vercel.app/',
    },
    {
        number: '03',
        label: 'Community Page',
        title: '커뮤니티 페이지 디자인 및 구현',
        tags: ['UI Design', 'Page Development'],
        description:
            '사용자가 소통하고 콘텐츠를 탐색할 수 있는 커뮤니티 페이지 작업을 담당했습니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo/nintendo-community.mp4',
            label: '닌텐도 커뮤니티 페이지 시연 영상',
        },
        href: 'https://mbc-teamproject-red.vercel.app/community',
    },
    {
        number: '04',
        label: 'E-Shop Page',
        title: 'E-shop 페이지 공동 제작',
        tags: ['Collaboration', 'UI Design', 'Front-End'],
        description:
            '팀원과 협업하여 총 4개 페이지로 구성된 E-shop의 디자인 및 구현 작업에 참여했습니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo/nintendo-eshop.mp4',
            label: '닌텐도 E-shop 페이지 시연 영상',
        },
        href: 'https://mbc-teamproject-red.vercel.app/store',
    },
];

const nintendoDocumentationArchives = [
    {
        key: 'figma',
        label: 'Figma Archive',
        title: 'Visual Meeting Archive',
        description: '날짜별 회의 내용을 시각적으로 정리한 팀 기록',
        images: [
            {
                src: '/images/nintendo/nintendo-figma-calendar-web.png',
                alt: 'Figma에 달력 형태로 정리한 팀 회의 기록',
            },
            {
                src: '/images/nintendo/nintendo-figma-minutes.png',
                alt: 'Figma에 정리한 개별 회의록',
            },
            {
                src: '/images/nintendo/nintendo-figma-minutes-02.png',
                alt: 'Figma에 정리한 두 번째 개별 회의록',
            },
        ],
    },
    {
        key: 'notion',
        label: 'Notion Archive',
        title: 'Documentation & Workflow',
        description: '매일의 회의 내용과 역할 분담, 피드백을 기록·공유',
        images: [
            {
                src: '/images/nintendo/nintendo-notion-board.png',
                alt: 'Notion에 정리한 프로젝트 전체 보드',
            },
            {
                src: '/images/nintendo/nintendo-notion-detail-01.png',
                alt: 'Notion 주차별 상세 회의 기록 첫 번째 화면',
            },
            {
                src: '/images/nintendo/nintendo-notion-detail-02.png',
                alt: 'Notion 주차별 상세 회의 기록 두 번째 화면',
            },
        ],
    },
];

function App() {
    const aboutRef = useRef(null);
    const headerRef = useRef(null);
    const heroRef = useRef(null);
    const selectedWorksRef = useRef(null);
    const selectedWorksTitleRef = useRef(null);
    const navHideTimerRef = useRef(null);
    const isPointerOverNavRef = useRef(false);
    const [isAboutHeadlineActive, setIsAboutHeadlineActive] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(true);
    const [isNavOnDark, setIsNavOnDark] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
    const [isSelectedWorksTitleVisible, setIsSelectedWorksTitleVisible] = useState(false);
    const [nintendoComparePosition, setNintendoComparePosition] = useState(50);
    const [documentPreview, setDocumentPreview] = useState(null);

    useEffect(() => {
        if (!documentPreview) return undefined;

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setDocumentPreview(null);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [documentPreview]);

    useEffect(() => {
        const aboutSection = aboutRef.current;

        if (!aboutSection) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAboutHeadlineActive(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.05 }
        );

        observer.observe(aboutSection);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let scrollDistance = 0;
        let animationFrame = null;

        const clearNavigationTimer = () => {
            if (navHideTimerRef.current !== null) {
                window.clearTimeout(navHideTimerRef.current);
                navHideTimerRef.current = null;
            }
        };

        const scheduleNavigationHide = () => {
            clearNavigationTimer();

            const heroBottom = heroRef.current
                ? heroRef.current.offsetTop + heroRef.current.offsetHeight
                : window.innerHeight;

            if (window.scrollY < heroBottom - 80 || isPointerOverNavRef.current) return;

            navHideTimerRef.current = window.setTimeout(() => {
                if (!isPointerOverNavRef.current) setIsNavHidden(true);
                navHideTimerRef.current = null;
            }, 2000);
        };

        const updateNavigation = () => {
            const currentScrollY = window.scrollY;
            const heroBottom = heroRef.current
                ? heroRef.current.offsetTop + heroRef.current.offsetHeight
                : window.innerHeight;
            const delta = currentScrollY - lastScrollY;

            if (currentScrollY < heroBottom - 80) {
                setIsNavExpanded(true);
                setIsNavHidden(false);
                scrollDistance = 0;
            } else if (Math.abs(delta) > 1) {
                if (Math.sign(delta) !== Math.sign(scrollDistance)) scrollDistance = 0;
                scrollDistance += delta;

                if (scrollDistance > 18) {
                    setIsNavExpanded(false);
                    scrollDistance = 0;
                } else if (scrollDistance < -18) {
                    setIsNavExpanded(true);
                    scrollDistance = 0;
                }
            }

            const header = headerRef.current;

            if (header) {
                const sampleY = Math.min(header.offsetHeight / 2, window.innerHeight - 1);
                const backgroundLayer = document
                    .elementsFromPoint(window.innerWidth / 2, sampleY)
                    .find((element) => {
                        if (header.contains(element)) return false;

                        const color = window.getComputedStyle(element).backgroundColor;
                        const channels = color.match(/[\d.]+/g)?.map(Number);

                        return channels && channels.length >= 3 && (channels[3] ?? 1) > 0;
                    });

                if (backgroundLayer) {
                    const channels = window
                        .getComputedStyle(backgroundLayer)
                        .backgroundColor.match(/[\d.]+/g)
                        ?.map(Number);

                    if (channels) {
                        const [red, green, blue] = channels;
                        const luminance = (red * 299 + green * 587 + blue * 114) / 255000;
                        setIsNavOnDark(luminance < 0.5);
                    }
                }
            }

            lastScrollY = currentScrollY;
            animationFrame = null;
            scheduleNavigationHide();
        };

        const handleScroll = () => {
            clearNavigationTimer();
            setIsNavHidden(false);

            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateNavigation);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        updateNavigation();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            clearNavigationTimer();
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    useEffect(() => {
        const hero = heroRef.current;

        if (!hero) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => setIsTopButtonVisible(!entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(hero);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const selectedWorks = selectedWorksRef.current;
        const selectedWorksTitle = selectedWorksTitleRef.current;

        if (!selectedWorks || !selectedWorksTitle) return undefined;
        if (!('IntersectionObserver' in window)) return undefined;

        selectedWorks.classList.add('is-animation-ready');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio >= 0.75) {
                    setIsSelectedWorksTitleVisible(true);
                } else if (!entry.isIntersecting) {
                    setIsSelectedWorksTitleVisible(false);
                }
            },
            { threshold: [0, 0.75] }
        );

        observer.observe(selectedWorksTitle);

        return () => observer.disconnect();
    }, []);

    const showNavigation = () => {
        isPointerOverNavRef.current = true;
        if (navHideTimerRef.current !== null) {
            window.clearTimeout(navHideTimerRef.current);
            navHideTimerRef.current = null;
        }
        setIsNavHidden(false);
    };

    const releaseNavigation = () => {
        isPointerOverNavRef.current = false;

        if (navHideTimerRef.current !== null) {
            window.clearTimeout(navHideTimerRef.current);
            navHideTimerRef.current = null;
        }

        const heroBottom = heroRef.current
            ? heroRef.current.offsetTop + heroRef.current.offsetHeight
            : window.innerHeight;

        if (window.scrollY < heroBottom - 80) return;

        navHideTimerRef.current = window.setTimeout(() => {
            if (!isPointerOverNavRef.current) setIsNavHidden(true);
            navHideTimerRef.current = null;
        }, 2000);
    };

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <div className="site-shell">
            <button
                className="nav-reveal-zone"
                type="button"
                aria-label="네비게이션 표시"
                onMouseEnter={showNavigation}
                onMouseLeave={releaseNavigation}
                onFocus={showNavigation}
                onBlur={releaseNavigation}
            />
            <header
                ref={headerRef}
                className={`site-header ${isNavExpanded ? 'is-expanded' : 'is-collapsed'}${isNavOnDark ? ' is-on-dark' : ''}${isNavHidden ? ' is-auto-hidden' : ''}`}
                aria-hidden={isNavHidden}
                onMouseEnter={showNavigation}
                onMouseLeave={releaseNavigation}
                onFocus={showNavigation}
                onBlur={releaseNavigation}
            >
                <nav
                    className="site-nav site-nav--left"
                    aria-label="왼쪽 주요 메뉴"
                    aria-hidden={!isNavExpanded}
                >
                    <a href="#about" tabIndex={isNavExpanded && !isNavHidden ? 0 : -1}>
                        About
                    </a>
                    <a href="#work" tabIndex={isNavExpanded && !isNavHidden ? 0 : -1}>
                        Works
                    </a>
                </nav>
                <a
                    className="logo"
                    href="#home"
                    aria-label="페이지 맨 위로 이동"
                    tabIndex={isNavHidden ? -1 : 0}
                >
                    <img src="/images/yeoyebin-logo.png" alt="Yeo Yebin" />
                </a>
                <nav
                    className="site-nav site-nav--right"
                    aria-label="오른쪽 주요 메뉴"
                    aria-hidden={!isNavExpanded}
                >
                    <a href="#skills" tabIndex={isNavExpanded && !isNavHidden ? 0 : -1}>
                        Skills
                    </a>
                    <a href="#contact" tabIndex={isNavExpanded && !isNavHidden ? 0 : -1}>
                        Contact
                    </a>
                </nav>
            </header>

            <main>
                <section className="hero" id="home" ref={heroRef}>
                    <div className="hero-topline">
                        <p>Selected works</p>
                        <p>Seoul, Korea</p>
                        <p>Available for opportunities</p>
                    </div>
                    <div className="hero-title" aria-label="Design in progress">
                        <span className="hero-title__primary">DESIGN</span>
                        <span className="hero-title__outline">IN PROGRESS</span>
                        <span className="hero-title__year">2026</span>
                        <img
                            className="hero-keyring"
                            src="/keyring/assets/keyring.png"
                            alt=""
                            decoding="async"
                            draggable="false"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="hero-footer">
                        <p className="hero-role">
                            WEB DESIGN
                            <br />
                            &amp; PUBLISHING
                        </p>
                        <p className="hero-intro">
                            밝은 에너지로 소통하고, 아이디어를 직접
                            <br />
                            디자인하고 구현하는 웹 디자이너{' '}
                            <span className="hero-intro__name">여예빈</span>입니다.
                        </p>
                    </div>
                </section>

                <section className="about section" id="about" ref={aboutRef}>
                    <div className="section-index">
                        <span>01</span>
                        <span>About me</span>
                    </div>
                    <div className="about-grid">
                        <div className="about-heading">
                            <p className="eyebrow">Hello, I&apos;m</p>
                            <h2>
                                여예빈
                                <br />
                                <span>YEO YEBIN</span>
                            </h2>
                            <p className="about-profile-keywords">ESTP · POSITIVE ENERGY</p>
                            <img
                                className="about-sparkle"
                                src="/images/lavender-sparkle.png"
                                alt=""
                                aria-hidden="true"
                            />
                        </div>
                        <div className="about-profile-visual">
                            <Placeholder label="PROFILE IMAGE" className="profile-placeholder" />
                            <img
                                className="about-chrome-star"
                                src="/images/chrome-star.png"
                                alt=""
                                aria-hidden="true"
                            />
                        </div>
                        <div className="about-copy">
                            <p
                                className={`about-lead${isAboutHeadlineActive ? ' is-highlighted' : ''}`}
                            >
                                <span className="about-highlight" data-text="밝은">
                                    밝은
                                </span>{' '}
                                에너지로{' '}
                                <span className="about-highlight" data-text="소통">
                                    소통
                                </span>
                                하고,
                                <br />
                                아이디어를{' '}
                                <span className="about-highlight" data-text="디자인">
                                    디자인
                                </span>
                                으로 연결합니다.
                            </p>
                            <div className="body-copy about-body-copy">
                                <p>
                                    긍정적인 태도와 적극적인 소통을 바탕으로 새로운 아이디어를
                                    발견하고,
                                    <br />
                                    직접 실행하는 과정을 즐깁니다.
                                </p>
                                <p>
                                    사람들과 의견을 나누며 다양한 관점을 배우고, 피드백을 통해
                                    디자인을 발전시키는 것을 중요하게 생각합니다.
                                </p>
                                <p>
                                    브랜드의 개성을 이해하는 기획부터 UI 디자인과 웹 퍼블리싱까지,
                                    아이디어를 실제 웹 경험으로 연결하는 디자이너로 성장하고
                                    있습니다.
                                </p>
                            </div>
                            <p className="about-copy-keywords">
                                POSITIVE ENERGY · COMMUNICATION · EXECUTION
                            </p>
                        </div>
                    </div>
                </section>

                <section className="project" id="work">
                    <div
                        className={`selected-works-heading section${isSelectedWorksTitleVisible ? ' is-visible' : ''}`}
                        ref={selectedWorksRef}
                    >
                        <div className="section-index section-index--light">
                            <span>02</span>
                            <span>Selected works</span>
                        </div>
                        <div className="selected-works-layout">
                            <h2 ref={selectedWorksTitleRef}>
                                <span className="selected-works-title-primary">SELECTED</span>
                                <span className="selected-works-title-serif">WORKS</span>
                            </h2>
                            <div className="selected-works-intro">
                                <p className="selected-works-intro__lead">
                                    아이디어를 실제 웹 경험으로 연결한 프로젝트들.
                                </p>
                                <p className="selected-works-intro__meta">
                                    UI DESIGN · WEB PUBLISHING
                                </p>
                                <div className="selected-works-intro__line" />
                                <ol className="selected-works-intro__list">
                                    <li>
                                        <a href="#nintendo">
                                            <span>01</span>
                                            <span>Nintendo</span>
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#diptyque">
                                            <span>02</span>
                                            <span>Diptyque</span>
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#swarovski">
                                            <span>03</span>
                                            <span>Swarovski</span>
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="project-hero section" id="nintendo">
                        <div className="section-index section-index--light">
                            <span>01</span>
                            <span>Team Project</span>
                        </div>
                        <div className="nintendo-intro">
                            <div className="nintendo-intro__visual">
                                <span className="nintendo-intro__orbit" aria-hidden="true" />
                                <span className="nintendo-intro__sparkle" aria-hidden="true">
                                    ✦
                                </span>
                                <img
                                    src="/images/nintendo/nintendo-macbook.png"
                                    alt="닌텐도 리뉴얼 메인 페이지가 표시된 맥북 목업"
                                />
                            </div>
                            <div className="nintendo-intro__content">
                                <div className="nintendo-intro__title">
                                    <p className="eyebrow">01 / Team Project</p>
                                    <h2>NINTENDO</h2>
                                    <p>Website Renewal</p>
                                </div>

                                <div className="nintendo-intro__block">
                                    <h3>Project Brief</h3>
                                    <p>
                                        닌텐도의 다양한 캐릭터 IP를 중심으로 브랜드 경험을 강화하고,
                                        게임 탐색 구조와 인터랙션을 개선한 웹사이트 리뉴얼
                                        프로젝트입니다.
                                    </p>
                                </div>

                                <div className="nintendo-intro__block">
                                    <h3>Project Information</h3>
                                    <dl className="nintendo-info-list">
                                        <div>
                                            <dt>Type</dt>
                                            <dd>Team Project</dd>
                                        </div>
                                        <div>
                                            <dt>Period</dt>
                                            <dd>2026.09.02 – 2026.09.30 · 4 Weeks</dd>
                                        </div>
                                        <div>
                                            <dt>Role</dt>
                                            <dd>
                                                UI/UX Design · Frontend Development · Team
                                                Collaboration
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="nintendo-intro__block">
                                    <h3>Project Keywords</h3>
                                    <ul className="nintendo-keyword-list">
                                        <li>Character IP</li>
                                        <li>Game Discovery</li>
                                        <li>Interactive Experience</li>
                                    </ul>
                                </div>

                                <div className="nintendo-intro__actions">
                                    <a
                                        href="https://mbc-teamproject-red.vercel.app/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Website <span aria-hidden="true">↗</span>
                                    </a>
                                    <button type="button" disabled title="추후 연결 예정">
                                        Proposal <span aria-hidden="true">↗</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nintendo-experience section">
                        <div className="nintendo-experience__visual">
                            <div className="nintendo-experience__backdrops" aria-hidden="true">
                                <img
                                    className="nintendo-experience__backdrop nintendo-experience__backdrop--one"
                                    src="/images/nintendo/nintendo-amiibo.png"
                                    alt=""
                                />
                                <img
                                    className="nintendo-experience__backdrop nintendo-experience__backdrop--two"
                                    src="/images/nintendo/nintendo-game.png"
                                    alt=""
                                />
                            </div>
                            <div className="nintendo-video-mockup">
                                <div className="nintendo-video-mockup__screen">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label="닌텐도 리뉴얼 웹사이트 메인 페이지 시연 영상"
                                    >
                                        <source
                                            src="/videos/nintendo/nintendo-main.mp4"
                                            type="video/mp4"
                                        />
                                        브라우저에서 영상을 재생할 수 없습니다.
                                    </video>
                                </div>
                                <img
                                    className="nintendo-video-mockup__frame"
                                    src="/images/nintendo/nintendo-macbook-frame.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        <div className="nintendo-experience__copy">
                            <p className="eyebrow">02 / Design Experience</p>
                            <h3>
                                <span className="nintendo-experience__title-primary">
                                    PLAYFUL WORLDS,
                                </span>
                                <span className="nintendo-experience__title-serif">
                                    Reimagined.
                                </span>
                            </h3>
                            <p className="nintendo-experience__lead">
                                게임을 탐색하는 순간부터 시작되는 즐거움.
                            </p>
                            <p className="nintendo-experience__description">
                                캐릭터 IP를 중심으로 콘텐츠를 재구성하고, 게임 탐색부터 다양한
                                인터랙션까지 닌텐도만의 즐거움을 웹 경험 전반에 담아냈습니다.
                            </p>
                        </div>
                    </div>

                    <div className="nintendo-character section">
                        <div className="nintendo-character__inner">
                            <div className="nintendo-character__copy">
                                <p className="eyebrow">03 / Character Interaction</p>
                                <h3>
                                    <span className="nintendo-character__title-primary">
                                        CHARACTER
                                    </span>
                                    <span className="nintendo-character__title-serif">
                                        interaction.
                                    </span>
                                </h3>
                                <p className="nintendo-character__lead">
                                    캐릭터를 선택하는 순간,
                                    <br className="nintendo-character__lead-break" /> 새로운
                                    플레이가 시작됩니다.
                                </p>
                                <p className="nintendo-character__description">
                                    마리오와 친구들을 직접 선택하고, 아이템에 따라 변화하는 캐릭터를
                                    경험할 수 있도록 구성했습니다. 스크롤과 선택 인터랙션을 통해
                                    게임 속 플레이의 즐거움을 웹에서도 느낄 수 있도록 설계했습니다.
                                </p>
                            </div>

                            <div className="nintendo-character__visual">
                                <div className="nintendo-character__imac">
                                    <div className="nintendo-character__imac-screen">
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            aria-label="마리오 서브페이지 캐릭터 인터랙션 시연 영상"
                                        >
                                            <source
                                                src="/videos/nintendo/mario-interaction.mp4"
                                                type="video/mp4"
                                            />
                                            브라우저에서 영상을 재생할 수 없습니다.
                                        </video>
                                    </div>
                                    <img
                                        className="nintendo-character__imac-frame"
                                        src="/images/nintendo/nintendo-imac-frame.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>
                                <ul
                                    className="nintendo-character__keywords"
                                    aria-label="캐릭터 인터랙션 키워드"
                                >
                                    <li>Character Select</li>
                                    <li>Power-Up</li>
                                    <li>Scroll Interaction</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="nintendo-comparison section">
                        <div className="nintendo-comparison__main">
                            <div className="nintendo-comparison__header">
                                <p className="eyebrow">04 / Before &amp; After</p>
                                <h3>
                                    <span className="nintendo-comparison__title-primary">
                                        BEFORE &amp;
                                    </span>
                                    <span className="nintendo-comparison__title-serif">After.</span>
                                </h3>
                                <div className="nintendo-comparison__copy">
                                    <p>정보를 전달하는 웹에서, 캐릭터를 경험하는 웹으로.</p>
                                    <p>
                                        기존 닌텐도 웹사이트의 게임별 배너와 소식 중심 구성을 캐릭터
                                        IP 중심의 경험으로 재구성했습니다. 직관적인 게임 탐색과
                                        스크롤 인터랙션을 더해, 정보를 확인하는 과정을 브랜드를 직접
                                        경험하는 순간으로 확장했습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="nintendo-comparison__visual">
                                <div
                                    className="nintendo-comparison__frame"
                                    style={{
                                        '--comparison-position': `${nintendoComparePosition}%`,
                                    }}
                                >
                                    <img
                                        className="nintendo-comparison__image nintendo-comparison__image--before"
                                        src="/images/nintendo/nintendo-before.png"
                                        alt="리뉴얼 이전 닌텐도 웹사이트"
                                        draggable="false"
                                    />
                                    <img
                                        className="nintendo-comparison__image nintendo-comparison__image--after"
                                        src="/images/nintendo/nintendo-after.png"
                                        alt="리뉴얼 이후 닌텐도 웹사이트"
                                        draggable="false"
                                    />
                                    <span className="nintendo-comparison__label nintendo-comparison__label--before">
                                        Before
                                    </span>
                                    <span className="nintendo-comparison__label nintendo-comparison__label--after">
                                        After
                                    </span>
                                    <div
                                        className="nintendo-comparison__divider"
                                        aria-hidden="true"
                                    >
                                        <span>↔</span>
                                    </div>
                                    <input
                                        className="nintendo-comparison__range"
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={nintendoComparePosition}
                                        onChange={(event) =>
                                            setNintendoComparePosition(Number(event.target.value))
                                        }
                                        aria-label="Before와 After 이미지 비교 위치"
                                    />
                                </div>
                                <p className="nintendo-comparison__hint">
                                    Drag to compare <span aria-hidden="true">↔</span>
                                </p>
                            </div>
                        </div>

                        <ol className="nintendo-comparison__points">
                            <li>
                                <span>01</span>
                                <div>
                                    <strong>Character IP</strong>
                                    <h4>캐릭터 중심의 브랜드 경험</h4>
                                    <p>
                                        게임별 정보 중심에서 벗어나, 닌텐도의 캐릭터를 전면에 배치해
                                        브랜드의 개성을 강화했습니다.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <span>02</span>
                                <div>
                                    <strong>Game Discovery</strong>
                                    <h4>더 직관적인 게임 탐색</h4>
                                    <p>
                                        게임을 시각적으로 탐색할 수 있도록 콘텐츠를 재구성해 원하는
                                        게임을 발견하는 과정을 개선했습니다.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <span>03</span>
                                <div>
                                    <strong>Interactive Experience</strong>
                                    <h4>스크롤로 이어지는 플레이 경험</h4>
                                    <p>
                                        스크롤에 반응하는 캐릭터와 콘텐츠 연출을 통해 탐색 과정에도
                                        즐거움을 더했습니다.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="nintendo-contribution section">
                        <header className="nintendo-contribution__header">
                            <p className="eyebrow">05 / My Contribution</p>
                            <div className="nintendo-contribution__heading">
                                <h3>
                                    <span>WHAT I</span> <em>did.</em>
                                </h3>
                                <p>프로젝트 속에서 직접 참여한 디자인과 구현 작업</p>
                            </div>
                        </header>

                        <div className="nintendo-contribution__content">
                            <article className="nintendo-contribution__featured">
                                <div className="nintendo-contribution__featured-media">
                                    <a
                                        className="nintendo-contribution__media-link nintendo-contribution__media-link--featured"
                                        href={nintendoContributionItems[0].href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="마리오 서브페이지 새 탭에서 보기"
                                    >
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            aria-label={nintendoContributionItems[0].media.label}
                                        >
                                            <source
                                                src={nintendoContributionItems[0].media.src}
                                                type="video/mp4"
                                            />
                                            브라우저에서 영상을 재생할 수 없습니다.
                                        </video>
                                        <span className="nintendo-contribution__view-project">
                                            View Project ↗
                                        </span>
                                    </a>
                                </div>
                                <div className="nintendo-contribution__featured-copy">
                                    <p className="nintendo-contribution__index">
                                        {nintendoContributionItems[0].number} /{' '}
                                        {nintendoContributionItems[0].label}
                                    </p>
                                    <h4>{nintendoContributionItems[0].title}</h4>
                                    <ul className="nintendo-contribution__tags">
                                        {nintendoContributionItems[0].tags.map((tag) => (
                                            <li key={tag}>{tag}</li>
                                        ))}
                                    </ul>
                                    <p className="nintendo-contribution__description">
                                        {nintendoContributionItems[0].description}
                                    </p>
                                </div>
                            </article>

                            <div className="nintendo-contribution__details">
                                {nintendoContributionItems.slice(1).map((item) => (
                                    <article
                                        className="nintendo-contribution__detail"
                                        key={item.label}
                                    >
                                        <div className="nintendo-contribution__detail-media">
                                            {item.media ? (
                                                <a
                                                    className="nintendo-contribution__media-link"
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${item.title} 새 탭에서 보기`}
                                                >
                                                    {item.media.type === 'video' ? (
                                                        <video
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            preload="metadata"
                                                            aria-label={item.media.label}
                                                        >
                                                            <source src={item.media.src} type="video/mp4" />
                                                            브라우저에서 영상을 재생할 수 없습니다.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={item.media.src}
                                                            alt={item.media.label}
                                                        />
                                                    )}
                                                    <span className="nintendo-contribution__view-project">
                                                        View Project ↗
                                                    </span>
                                                </a>
                                            ) : (
                                                <span>Image Slot</span>
                                            )}
                                        </div>
                                        <div className="nintendo-contribution__detail-copy">
                                            <p className="nintendo-contribution__index">
                                                {item.number} / {item.label}
                                            </p>
                                            <h4>{item.title}</h4>
                                            {item.tags.length > 0 && (
                                                <ul className="nintendo-contribution__tags">
                                                    {item.tags.map((tag) => (
                                                        <li key={tag}>{tag}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            <p className="nintendo-contribution__description">
                                                {item.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="nintendo-collaboration section">
                        <header className="nintendo-collaboration__header">
                            <p className="eyebrow">06 / Team Collaboration</p>
                            <div className="nintendo-collaboration__heading">
                                <h3>
                                    <span className="nintendo-collaboration__title-primary">
                                        BETTER
                                    </span>
                                    <span className="nintendo-collaboration__title-serif">
                                        Together.
                                    </span>
                                </h3>
                                <div className="nintendo-collaboration__copy">
                                    <p>서로의 아이디어를 연결해 하나의 경험을 완성하다.</p>
                                    <p>
                                        팀원들과 디자인 방향을 논의하고, 작업 과정을 공유하며
                                        피드백을 반영했습니다.
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="nintendo-collaboration__gallery">
                            <figure className="nintendo-collaboration__photo nintendo-collaboration__photo--main">
                                <div className="nintendo-collaboration__photo-frame">
                                    <div className="nintendo-collaboration__photo-image">
                                        <img
                                            src="/images/nintendo/nintendo-team-01.jpg"
                                            alt="팀원들이 노트북 화면을 보며 프로젝트를 논의하는 모습"
                                        />
                                    </div>
                                    <figcaption>
                                        <span>01 / Team Discussion</span>
                                        <p>함께 논의하며 디자인 방향을 구체화했습니다.</p>
                                    </figcaption>
                                </div>
                            </figure>
                            <figure className="nintendo-collaboration__photo nintendo-collaboration__photo--ideas">
                                <div className="nintendo-collaboration__photo-frame">
                                    <div className="nintendo-collaboration__photo-image">
                                        <img
                                            src="/images/nintendo/nintendo-team-02.jpg"
                                            alt="팀원들이 아이디어를 함께 확인하는 모습"
                                        />
                                    </div>
                                    <figcaption>
                                        <span>02 / Sharing Ideas</span>
                                        <p>서로의 의견을 공유하고 작업 방향을 조율했습니다.</p>
                                    </figcaption>
                                </div>
                            </figure>
                            <figure className="nintendo-collaboration__photo nintendo-collaboration__photo--review">
                                <div className="nintendo-collaboration__photo-frame">
                                    <div className="nintendo-collaboration__photo-image">
                                        <img
                                            src="/images/nintendo/nintendo-team-03.jpg"
                                            alt="노트북을 중심으로 결과물을 검토하고 피드백하는 모습"
                                        />
                                    </div>
                                    <figcaption>
                                        <span>03 / Review &amp; Feedback</span>
                                        <p>결과물을 함께 검토하며 개선점을 찾아갔습니다.</p>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>

                        <p className="nintendo-collaboration__keywords">
                            Discuss <span>/</span> Share <span>/</span> Refine
                        </p>
                    </div>

                    <div className="nintendo-documentation section">
                        <header className="nintendo-documentation__header">
                            <p className="eyebrow">07 / Team Documentation</p>
                            <div className="nintendo-documentation__heading">
                                <h3>
                                    <span className="nintendo-documentation__title-primary">
                                        IDEAS INTO
                                    </span>
                                    <span className="nintendo-documentation__title-serif">
                                        Records.
                                    </span>
                                </h3>
                                <div className="nintendo-documentation__copy">
                                    <p className="nintendo-documentation__role">
                                        <span>MY ROLE</span> / TEAM SECRETARY · DOCUMENTATION
                                    </p>
                                    <p className="nintendo-documentation__copy-lead">
                                        아이디어를 기록하고, 팀의 작업을 연결하다.
                                    </p>
                                    <p className="nintendo-documentation__copy-body">
                                        팀 프로젝트의 서기를 맡아 매일 회의 내용을 기록하고, 팀원별 역할
                                        분담과 아이디어, 피드백을 체계적으로 정리해 공유했습니다.
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="nintendo-documentation__archives">
                            {nintendoDocumentationArchives.map((archive) => (
                                <article
                                    className={`nintendo-documentation__archive nintendo-documentation__archive--${archive.key}`}
                                    key={archive.key}
                                >
                                    <div className="nintendo-documentation__archive-heading">
                                        <p>{archive.label}</p>
                                        <h4>{archive.title}</h4>
                                        <span>{archive.description}</span>
                                    </div>
                                    <div className="nintendo-documentation__media">
                                        {archive.images.map((item, index) => (
                                            <button
                                                className={`nintendo-documentation__image${index === 0 ? ' nintendo-documentation__image--main' : ' nintendo-documentation__image--detail'}`}
                                                type="button"
                                                key={item.src}
                                                onClick={() =>
                                                    setDocumentPreview({
                                                        ...item,
                                                        isDetail: index > 0,
                                                    })
                                                }
                                                aria-label={`${item.alt} 확대 보기`}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={item.alt}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                {index > 0 && (
                                                    <span className="nintendo-documentation__preview-label">
                                                        <span>Document {String(index).padStart(2, '0')}</span>
                                                        <strong>Open ↗</strong>
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="overview section">
                        <div className="section-label">Overview</div>
                        <div className="overview-intro">
                            <h3>
                                즐거움은 유지하고,
                                <br />
                                정보는 더 명확하게.
                            </h3>
                            <p>
                                프로젝트의 배경과 목표를 설명하는 영역입니다. 실제 프로젝트 정보를
                                바탕으로 브랜드 분석, 사용자 요구, 개선 방향을 입력할 수 있습니다.
                            </p>
                        </div>
                        <div className="problem-grid">
                            <article>
                                <span>01</span>
                                <h4>Problem</h4>
                                <p>
                                    기존 사이트에서 발견한 문제와 개선이 필요한 사용자 경험을 입력해
                                    주세요.
                                </p>
                            </article>
                            <article>
                                <span>02</span>
                                <h4>Direction</h4>
                                <p>
                                    프로젝트가 해결하고자 한 방향과 핵심 디자인 전략을 입력해
                                    주세요.
                                </p>
                            </article>
                            <article>
                                <span>03</span>
                                <h4>Goal</h4>
                                <p>프로젝트의 실제 목표와 기대하는 사용자 경험을 입력해 주세요.</p>
                            </article>
                        </div>
                    </div>

                    <div className="process section">
                        <div className="process-heading">
                            <div className="section-label">Design process</div>
                            <h3>
                                FROM IDEA
                                <br />
                                TO SCREEN
                            </h3>
                        </div>
                        <div className="process-board">
                            <Placeholder
                                label="RESEARCH / WIREFRAME"
                                className="process-placeholder process-placeholder--wide"
                            />
                            <Placeholder label="DESIGN SYSTEM" className="process-placeholder" />
                            <Placeholder label="UI COMPONENTS" className="process-placeholder" />
                        </div>
                        <div className="contribution">
                            <div>
                                <span className="eyebrow">My contribution</span>
                                <h3>
                                    ROLE &amp;
                                    <br />
                                    RESPONSIBILITY
                                </h3>
                            </div>
                            <p>
                                프로젝트에서 담당한 역할과 실제 기여 내용을 입력하는 영역입니다.
                                기획, 디자인, 퍼블리싱 등 수행 범위를 사실에 맞게 정리해 주세요.
                            </p>
                            <div className="contribution-list">
                                <span>Planning</span>
                                <span>UI Design</span>
                                <span>Publishing</span>
                            </div>
                        </div>
                    </div>

                    <div className="results section">
                        <div className="results-heading">
                            <div className="section-label">Final result</div>
                            <h3>
                                SCREENS
                                <br />
                                IN ACTION
                            </h3>
                            <p>최종 웹사이트의 주요 페이지 이미지를 순서대로 전시합니다.</p>
                        </div>
                        <div className="screen-gallery">
                            <Placeholder
                                label="MAIN PAGE"
                                className="screen-placeholder screen-placeholder--large"
                            />
                            <Placeholder label="SUB PAGE 01" className="screen-placeholder" />
                            <Placeholder label="SUB PAGE 02" className="screen-placeholder" />
                        </div>
                        <div className="project-cta" id="nintendo-cta">
                            <p>Explore the live project</p>
                            <a href="#work" aria-label="실제 사이트 링크를 입력해 주세요">
                                VIEW WEBSITE <ArrowIcon />
                            </a>
                            <small>실제 사이트 URL로 교체해 주세요.</small>
                        </div>
                    </div>
                </section>

                <EditorialProject number="03" projectNumber="02" name="DIPTYQUE" tone="light" />
                <EditorialProject
                    number="04"
                    projectNumber="03"
                    name="SWAROVSKI"
                    tone="dark"
                    reverse
                />

                <section className="archive section" id="archive">
                    <div className="section-index">
                        <span>05</span>
                        <span>Creative archive</span>
                    </div>
                    <div className="archive-heading">
                        <h2>
                            CREATIVE
                            <br />
                            ARCHIVE
                        </h2>
                        <div>
                            <p className="eyebrow">Content · Practice · Study</p>
                            <p>실제 작업물을 추후 추가할 수 있도록 구성한 아카이브 영역입니다.</p>
                        </div>
                    </div>
                    <div className="archive-grid">
                        <article className="archive-card">
                            <Placeholder label="VIDEO CONTENT" className="archive-placeholder" />
                            <div className="archive-card__meta">
                                <span>01 / Content</span>
                                <h3>영상 콘텐츠 작업</h3>
                                <p>작업물을 추가해 주세요.</p>
                            </div>
                        </article>
                        <article className="archive-card archive-card--offset">
                            <Placeholder
                                label="WEB LAYOUT / PUBLISHING"
                                className="archive-placeholder"
                            />
                            <div className="archive-card__meta">
                                <span>02 / Practice</span>
                                <h3>웹 레이아웃 및 퍼블리싱</h3>
                                <p>연습 작업을 추가해 주세요.</p>
                            </div>
                        </article>
                        <article className="archive-card">
                            <Placeholder label="MOBILE UI STUDY" className="archive-placeholder" />
                            <div className="archive-card__meta">
                                <span>03 / Study</span>
                                <h3>모바일 UI 디자인 스터디</h3>
                                <p>스터디 작업을 추가해 주세요.</p>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="skills section" id="skills">
                    <div className="section-index section-index--light">
                        <span>06</span>
                        <span>Skills &amp; Tools</span>
                    </div>
                    <div className="skills-heading">
                        <p className="eyebrow">What I work with</p>
                        <h2>
                            TOOLS FOR
                            <br />
                            MAKING IDEAS
                            <br />
                            <span>VISIBLE.</span>
                        </h2>
                    </div>
                    <div className="skills-list">
                        <div>
                            <span>01</span>
                            <h3>Design</h3>
                            <p>사용하는 디자인 도구를 입력해 주세요.</p>
                        </div>
                        <div>
                            <span>02</span>
                            <h3>Publishing</h3>
                            <p>사용하는 퍼블리싱 기술을 입력해 주세요.</p>
                        </div>
                        <div>
                            <span>03</span>
                            <h3>Workflow</h3>
                            <p>협업 및 작업 도구를 입력해 주세요.</p>
                        </div>
                    </div>
                </section>

                <section className="more-about section" aria-labelledby="more-about-title">
                    <div className="more-about-heading">
                        <p className="more-about-label">More About Me</p>
                        <h2 id="more-about-title">Beyond the Design.</h2>
                    </div>
                    <div className="more-about-cards">
                        <article className="more-about-card">
                            <span className="detail-number">01</span>
                            <h3>Design Journey</h3>
                            <span className="more-about-card__arrow" aria-hidden="true">
                                ↗
                            </span>
                            <ul className="detail-title-list" hidden>
                                <li>
                                    <strong>전문대학 졸업</strong>
                                    <small>2023.03 – 2025.02</small>
                                </li>
                                <li>
                                    <strong>Web Design &amp; Publishing</strong>
                                    <small>
                                        2026.04 – 2026.10
                                        <br />
                                        K-Digital Training 웹디자인·웹 퍼블리싱 과정
                                    </small>
                                </li>
                            </ul>
                            <div className="detail-line" />
                        </article>
                        <article className="more-about-card">
                            <span className="detail-number">02</span>
                            <h3>Project Experience</h3>
                            <span className="more-about-card__arrow" aria-hidden="true">
                                ↗
                            </span>
                            <ul className="detail-title-list" hidden>
                                <li>
                                    <strong>Nintendo</strong>
                                    <small>Team Project · UI Design &amp; Web Publishing</small>
                                </li>
                                <li>
                                    <strong>Diptyque</strong>
                                    <small>Personal Project · UI Design &amp; Web Publishing</small>
                                </li>
                                <li>
                                    <strong>Swarovski</strong>
                                    <small>Personal Project · UI Design &amp; Web Publishing</small>
                                </li>
                            </ul>
                            <div className="detail-line" />
                        </article>
                        <article className="more-about-card">
                            <span className="detail-number">03</span>
                            <h3>My Strengths</h3>
                            <span className="more-about-card__arrow" aria-hidden="true">
                                ↗
                            </span>
                            <ul className="strength-list" hidden>
                                <li>
                                    <strong>Positive Energy</strong>
                                    <small>긍정적인 태도로 새로운 도전과 변화를 즐깁니다.</small>
                                </li>
                                <li>
                                    <strong>Communication</strong>
                                    <small>
                                        적극적인 소통과 피드백으로 더 나은 결과를 만들어갑니다.
                                    </small>
                                </li>
                                <li>
                                    <strong>Action-Oriented</strong>
                                    <small>아이디어를 디자인과 코드로 직접 구현합니다.</small>
                                </li>
                            </ul>
                            <div className="detail-line" />
                        </article>
                    </div>
                </section>

                <section className="contact section" id="contact">
                    <div className="section-index">
                        <span>07</span>
                        <span>Contact</span>
                    </div>
                    <div className="contact-copy">
                        <p className="eyebrow">Let&apos;s make something meaningful</p>
                        <h2>
                            LET&apos;S
                            <br />
                            <span>CONNECT.</span>
                        </h2>
                    </div>
                    <div className="contact-links">
                        <div>
                            <span>Email</span>
                            <p>이메일 주소를 입력해 주세요.</p>
                        </div>
                        <div>
                            <span>GitHub</span>
                            <p>GitHub 주소를 입력해 주세요.</p>
                        </div>
                    </div>
                    <a className="contact-top" href="#home">
                        Back to top ↑
                    </a>
                </section>
            </main>
            <footer className="site-footer">
                <p>YEO YEBIN</p>
                <p>WEB DESIGN &amp; PUBLISHING PORTFOLIO</p>
                <p>© 2026</p>
            </footer>
            {documentPreview && (
                <div
                    className="document-preview"
                    role="dialog"
                    aria-modal="true"
                    aria-label="문서 이미지 확대 보기"
                    onClick={() => setDocumentPreview(null)}
                >
                    <div
                        className={`document-preview__content${documentPreview.isDetail ? ' document-preview__content--scrollable' : ''}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="document-preview__close"
                            type="button"
                            aria-label="닫기"
                            onClick={() => setDocumentPreview(null)}
                            autoFocus
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <img src={documentPreview.src} alt={documentPreview.alt} />
                    </div>
                </div>
            )}
            <button
                className={`top-button${isTopButtonVisible ? ' is-visible' : ''}`}
                type="button"
                aria-label="맨 위로 이동"
                aria-hidden={!isTopButtonVisible}
                tabIndex={isTopButtonVisible ? 0 : -1}
                disabled={!isTopButtonVisible}
                onClick={scrollToTop}
            >
                <img src="/images/top-button.png" alt="" aria-hidden="true" />
            </button>
        </div>
    );
}

export default App;
