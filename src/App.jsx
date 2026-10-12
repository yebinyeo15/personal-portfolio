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

function App() {
    return (
        <div className="site-shell">
            <header className="site-header">
                <a className="logo" href="#home" aria-label="페이지 맨 위로 이동">
                    <img src="/images/yeoyebin-logo.png" alt="Yeo Yebin" />
                </a>
                <nav aria-label="주요 메뉴">
                    <a href="#work">Work</a>
                    <a href="#skills">Skill</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
                <p className="header-meta">Web Designer · Publisher</p>
            </header>

            <main>
                <section className="hero" id="home">
                    <div className="hero-topline">
                        <p>Selected works</p>
                        <p>Seoul, Korea</p>
                        <p>Available for opportunities</p>
                    </div>
                    <div className="hero-title" aria-label="Design in progress">
                        <span className="hero-title__primary">DESIGN</span>
                        <span className="hero-title__outline">IN PROGRESS</span>
                        <span className="hero-title__year">2026</span>
                        <video
                            className="hero-keyring"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            aria-hidden="true"
                        >
                            <source src="/videos/hero-keyring-clean.webm" type="video/webm" />
                        </video>
                    </div>
                    <div className="hero-footer">
                        <p className="hero-role">
                            WEB DESIGN
                            <br />
                            &amp; PUBLISHING
                        </p>
                        <p className="hero-intro">
                            화면의 인상과 사용의 흐름을 함께 설계하는
                            <br />
                            웹디자이너 여예빈의 포트폴리오입니다.
                        </p>
                        <a className="scroll-link" href="#work">
                            Scroll to explore <span>↓</span>
                        </a>
                    </div>
                </section>

                <section className="project" id="work">
                    <div className="selected-works-heading section">
                        <div className="section-index section-index--light">
                            <span>01</span>
                            <span>Selected works</span>
                        </div>
                        <h2>SELECTED<br />WORKS</h2>
                    </div>
                    <div className="project-hero section">
                        <div className="section-index section-index--light">
                            <span>01</span>
                            <span>Project 01</span>
                        </div>
                        <div className="project-title-row">
                            <div>
                                <p className="eyebrow">Team project · Website redesign</p>
                                <h2>NINTENDO</h2>
                            </div>
                            <p className="project-summary">
                                브랜드의 즐거운 경험을 디지털 화면 위에서
                                <br />
                                선명하고 직관적으로 전달하는 웹 프로젝트
                            </p>
                        </div>
                        <Placeholder label="PROJECT KEY VISUAL · 16:9" className="key-visual" />
                        <div className="project-tags" aria-label="프로젝트 키워드">
                            <span>Web Design</span>
                            <span>UI / UX</span>
                            <span>Publishing</span>
                        </div>
                    </div>

                    <div className="showcase section">
                        <div className="showcase-copy">
                            <span className="eyebrow">Interactive showcase</span>
                            <h3>
                                PLAY THE
                                <br />
                                EXPERIENCE
                            </h3>
                            <p>
                                완성된 웹사이트의 주요 인터랙션과 화면 흐름을 보여주는 영상이 들어갈
                                영역입니다.
                            </p>
                        </div>
                        <div className="laptop" aria-label="맥북 영상 플레이스홀더">
                            <div className="laptop-screen">
                                <div className="video-placeholder">
                                    <button
                                        type="button"
                                        aria-label="영상 재생 - 현재는 플레이스홀더입니다"
                                    >
                                        <span>▶</span>
                                    </button>
                                    <p>WEBSITE VIDEO</p>
                                </div>
                            </div>
                            <div className="laptop-base">
                                <span />
                            </div>
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

                <EditorialProject number="02" projectNumber="02" name="DIPTYQUE" tone="light" />
                <EditorialProject
                    number="03"
                    projectNumber="03"
                    name="SWAROVSKI"
                    tone="dark"
                    reverse
                />

                <section className="archive section" id="archive">
                    <div className="section-index">
                        <span>02</span>
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
                            <Placeholder label="WEB LAYOUT / PUBLISHING" className="archive-placeholder" />
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
                        <span>03</span>
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

                <section className="about section" id="about">
                    <div className="section-index">
                        <span>04</span>
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
                        </div>
                        <Placeholder label="PROFILE IMAGE" className="profile-placeholder" />
                        <div className="about-copy">
                            <p className="about-lead">
                                디자인의 의도를
                                <br />
                                실제 웹 경험으로 연결합니다.
                            </p>
                            <p className="body-copy">
                                브랜드가 가진 개성과 분위기를 시각적으로 표현하는 일에 관심이
                                있습니다. 기획과 UI 디자인부터 웹 퍼블리싱까지, 하나의 아이디어가
                                실제 화면으로 구현되는 과정을 배우고 경험해 왔습니다.
                            </p>
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="detail-block">
                            <span className="detail-number">01</span>
                            <h3>Design Journey</h3>
                            <ul>
                                <li>초대졸 <small>최종 학력: 2023.03 ~ 2025.02</small></li>
                                <li>
                                    Web Design &amp; Publishing
                                    <small>2026.04 – 2026.10<br />K-Digital Training 웹디자인·퍼블리싱 교육 과정</small>
                                </li>
                            </ul>
                            <div className="detail-line" />
                        </div>
                        <div className="detail-block">
                            <span className="detail-number">02</span>
                            <h3>Project Experience</h3>
                            <ul>
                                <li>Nintendo <small>Team Project</small></li>
                                <li>Diptyque <small>Personal Renewal Project</small></li>
                                <li>Swarovski <small>Personal Renewal Project</small></li>
                            </ul>
                            <div className="detail-line" />
                        </div>
                        <div className="detail-block">
                            <span className="detail-number">03</span>
                            <h3>Working Approach</h3>
                            <ul>
                                <li>브랜드의 개성을 고려한 시각적 구성</li>
                                <li>기획과 디자인, 퍼블리싱을 연결하는 작업 방식</li>
                                <li>협업과 피드백을 통한 디자인 개선 경험</li>
                            </ul>
                            <div className="detail-line" />
                        </div>
                    </div>
                </section>

                <section className="contact section" id="contact">
                    <div className="section-index">
                        <span>05</span>
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
        </div>
    );
}

export default App;
