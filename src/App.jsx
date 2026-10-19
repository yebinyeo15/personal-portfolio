import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import './nintendoResearch.css';
import './userInterview.css';
import './userPersona.css';
import './journeyStrategy.css';
import './uxArchitecture.css';
import './designDevelopment.css';
import './finalOutcome.css';

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const personalityReactions = {
    curious: 'ALWAYS EXPLORING',
    action: 'MAKE IT HAPPEN',
    connection: 'BETTER TOGETHER',
    positive: 'GOOD VIBES ONLY',
};

const uxArchitectureArtifacts = [
    {
        key: 'ia',
        number: '01',
        title: 'INFORMATION ARCHITECTURE',
        description:
            'IP 중심으로 콘텐츠를 분류하고, 사용자가 원하는 정보를 직관적으로 탐색할 수 있도록 구조를 설계했습니다.',
        keywords: 'IP STRUCTURE / CONTENT HIERARCHY / NAVIGATION',
        src: '/images/nintendo/research/nintendo-ia.png',
        previewSrc: '/images/nintendo/research/nintendo-ia-preview.png',
        alt: '닌텐도 콘텐츠 정보 구조도',
    },
    {
        key: 'mindmap',
        number: '02',
        title: 'MIND MAP',
        description:
            '닌텐도의 IP, 게임, 역사, 감성 키워드를 연결하여 브랜드 콘셉트와 디자인 방향성을 도출했습니다.',
        keywords: 'BRAND IDENTITY / KEYWORDS / CONCEPT',
        src: '/images/nintendo/research/nintendo-mindmap.png',
        previewSrc: '/images/nintendo/research/nintendo-mindmap-preview.png',
        alt: '닌텐도 브랜드 마인드맵',
    },
    {
        key: 'flow',
        number: '03',
        title: 'USER FLOW CHART',
        description:
            '캐릭터와 게임 탐색부터 상세페이지, 장바구니, 결제까지 이어지는 사용자 행동 흐름을 정리했습니다.',
        keywords: 'USER JOURNEY / NAVIGATION / PURCHASE FLOW',
        src: '/images/nintendo/research/nintendo-flowchart.png',
        previewSrc: '/images/nintendo/research/nintendo-flowchart-preview.png',
        alt: '닌텐도 웹사이트 사용자 플로우차트',
    },
];

const designDevelopmentArtifacts = [
    {
        key: 'wireframe',
        number: '01',
        title: 'WIREFRAME',
        description:
            '핵심 콘텐츠의 우선순위와 탐색 흐름을 정리하고, 주요 페이지의 구조와 인터랙션을 구체화했습니다.',
        keywords: 'PAGE STRUCTURE / USER FLOW / INTERACTION',
        previewSrc: '/images/nintendo/research/nintendo-wireframe-preview.png',
        alt: 'Nintendo 웹사이트 와이어프레임 미리보기',
        modalImages: [
            {
                key: 'main',
                label: 'MAIN PAGE',
                src: '/images/nintendo/research/nintendo-wireframe-main.png',
                alt: 'Nintendo 메인 페이지 전체 와이어프레임',
            },
            {
                key: 'mario',
                label: 'SUPER MARIO',
                src: '/images/nintendo/research/nintendo-wireframe-mario.png',
                alt: 'Super Mario 상세 페이지 전체 와이어프레임',
            },
        ],
    },
    {
        key: 'moodboard',
        number: '02',
        title: 'MOODBOARD',
        description:
            '닌텐도의 밝은 에너지와 캐릭터 중심 경험을 시각 언어로 정리해 디자인의 분위기와 방향을 설정했습니다.',
        keywords: 'VISUAL DIRECTION / BRAND MOOD / IMAGERY',
        previewSrc: '/images/nintendo/research/nintendo-moodboard.png',
        alt: 'Nintendo 브랜드 디자인 무드보드',
        modalImages: [
            {
                key: 'moodboard',
                label: 'MOODBOARD',
                src: '/images/nintendo/research/nintendo-moodboard.png',
                alt: 'Nintendo 브랜드 디자인 무드보드 원본',
            },
        ],
    },
    {
        key: 'style-guide',
        number: '03',
        title: 'STYLE GUIDE',
        description:
            '타이포그래피, 컬러, UI 컴포넌트와 캐릭터 표현 원칙을 하나의 일관된 디자인 시스템으로 구축했습니다.',
        keywords: 'TYPOGRAPHY / COLOR / UI SYSTEM / CHARACTER',
        previewSrc: '/images/nintendo/research/nintendo-style-guide.png',
        alt: 'Nintendo 웹사이트 스타일 가이드 미리보기',
        modalImages: [
            {
                key: 'typography',
                label: 'TYPOGRAPHY & VISUAL CONCEPT',
                src: '/images/nintendo/research/nintendo-style-typography.png',
                alt: 'Nintendo 타이포그래피와 비주얼 콘셉트 가이드',
            },
            {
                key: 'colors',
                label: 'COLOR SYSTEM',
                src: '/images/nintendo/research/nintendo-style-colors.png',
                alt: 'Nintendo 컬러 시스템 가이드',
            },
            {
                key: 'components',
                label: 'UI COMPONENTS',
                src: '/images/nintendo/research/nintendo-style-components.png',
                alt: 'Nintendo UI 컴포넌트 가이드',
            },
            {
                key: 'characters',
                label: 'CHARACTER DESIGN SYSTEM',
                src: '/images/nintendo/research/nintendo-style-character-system.png',
                alt: 'Nintendo 캐릭터 디자인 시스템 가이드',
            },
        ],
    },
];

const finalOutcomeViews = [
    {
        key: 'desktop',
        number: '01',
        label: 'DESKTOP',
        src: '/images/nintendo/research/nintendo-final-desktop.png',
        alt: 'Nintendo 리뉴얼 웹사이트 데스크톱 목업',
        description:
            '캐릭터 중심의 비주얼과 게임 탐색 경험을 데스크톱 환경에 구현했습니다.',
    },
    {
        key: 'mobile',
        number: '02',
        label: 'MOBILE',
        src: '/images/nintendo/research/nintendo-final-mobile.png',
        alt: 'Nintendo 리뉴얼 웹사이트 모바일 목업 세 대',
        description:
            '모바일 환경에서도 콘텐츠의 흐름과 캐릭터 중심의 탐색 경험이 자연스럽게 이어지도록 구성했습니다.',
    },
];

const loveCategories = {
    travel: {
        number: '01',
        label: 'TRAVEL',
        headline: 'Collecting moments, not miles.',
        description:
            '낯선 도시를 걸으며 새로운 풍경과 분위기를 발견하는 순간을 좋아합니다. 여행에서 마주한 장면들은 저만의 취향과 시각을 넓혀 줍니다.',
    },
    fashion: {
        number: '02',
        label: 'FASHION',
        headline: 'My style, my mood.',
        description:
            '패션은 저만의 분위기와 취향을 표현하는 방법입니다. 다양한 스타일을 시도하며 새로운 조합을 발견하는 과정을 즐깁니다.',
    },
    music: {
        number: '03',
        label: 'MUSIC',
        headline: 'The soundtrack of my days.',
        description:
            '음악은 일상의 분위기를 바꾸고 순간을 더 오래 기억하게 만드는 요소입니다. 그날의 기분에 어울리는 음악을 찾는 것을 좋아합니다.',
    },
    cafe: {
        number: '04',
        label: 'CAFE',
        headline: 'Little pauses, big inspiration.',
        description:
            '좋아하는 공간에서 여유를 즐기고 작은 디테일을 발견하는 시간을 좋아합니다. 카페마다 다른 분위기와 감각을 경험하는 것도 즐거움 중 하나입니다.',
    },
};

const travelArchive = [
    {
        src: '/images/about/paris-view.jpg',
        city: 'PARIS',
        label: 'CITY VIEW',
        number: 'A-001',
        alt: '파리 전망대에서 바라본 도시 풍경',
        position: '61% 52%',
    },
    {
        src: '/images/about/paris-eiffel.jpg',
        city: 'PARIS',
        label: 'EIFFEL',
        number: 'A-002',
        alt: '에펠탑과 파리 여행 풍경',
        position: '50% 45%',
    },
    {
        src: '/images/about/paris-louvre.jpg',
        city: 'PARIS',
        label: 'LOUVRE',
        number: 'A-003',
        alt: '루브르 박물관 앞 여행 기록',
        position: '58% 53%',
    },
    {
        src: '/images/about/venice.jpg',
        city: 'VENICE',
        label: 'CANAL WALK',
        number: 'A-004',
        alt: '베네치아 운하 옆 여행 기록',
        position: '63% 50%',
    },
    {
        src: '/images/about/las-vegas.jpg',
        city: 'LAS VEGAS',
        label: 'NEON CITY',
        number: 'A-005',
        alt: '라스베이거스 여행 풍경',
        position: '59% 55%',
    },
];

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

const nintendoResearchInsights = [
    {
        key: 'brand',
        label: 'Brand Experience',
        title: '캐릭터보다 정보가 먼저 보이는 메인',
        description:
            '게임과 제품 정보 중심의 구성으로 캐릭터 IP의 개성과 세계관을 충분히 경험하기 어려웠습니다.',
        direction: '캐릭터 중심의 몰입형 브랜드 경험 강화',
        image: '/images/nintendo/research/nintendo-home.png',
        alt: '기존 닌텐도 공식 사이트 메인 화면',
    },
    {
        key: 'discovery',
        label: 'Game Discovery',
        title: '취향에 따른 게임 탐색의 한계',
        description:
            '게임 정보는 풍부하지만 관심사와 플레이 방식에 따라 게임을 발견할 수 있는 탐색 경로가 제한적이었습니다.',
        direction: '관심사와 플레이 스타일에 따른 탐색 구조 개선',
        image: '/images/nintendo/research/nintendo-store.png',
        alt: '기존 닌텐도 스토어 화면',
    },
    {
        key: 'interaction',
        label: 'Interactive Experience',
        title: '참여보다 탐색에 집중된 경험',
        description:
            '캐릭터와 게임을 소개하는 콘텐츠는 있지만, 사용자가 직접 반응하고 참여할 수 있는 인터랙션은 제한적이었습니다.',
        direction: '캐릭터 IP를 활용한 참여형 인터랙션 강화',
        image: '/images/nintendo/research/nintendo-character.png',
        alt: '기존 닌텐도 공식 사이트 캐릭터 메뉴 화면',
    },
];

const competitorResearch = [
    {
        key: 'playstation',
        label: 'PlayStation',
        image: '/images/nintendo/research/PlayStation.png',
        alt: 'PlayStation 공식 사이트 화면',
        feature: '게임 비주얼과 프로모션의 강한 시각적 전달',
        implication: '게임과 캐릭터 IP의 매력을 시각적으로 드러내는 구성',
    },
    {
        key: 'xbox',
        label: 'Xbox',
        image: '/images/nintendo/research/Xbox.png',
        alt: 'Xbox 공식 사이트 화면',
        feature: 'Game Pass 중심의 게임 탐색과 검색·필터 기능',
        implication: '관심사와 플레이 방식에 따른 게임 탐색 경로 강화',
    },
    {
        key: 'steamdeck',
        label: 'Steam Deck',
        image: '/images/nintendo/research/Steam Deck.png',
        alt: 'Steam Deck 공식 사이트 화면',
        feature: '제품의 특성과 플레이 경험을 명확히 소개하는 구성',
        implication: '콘텐츠의 특징을 이해하기 쉬운 정보 구조',
    },
];

const userInterviews = [
    {
        key: 'user-01',
        number: '01',
        profile: '24세 대학생',
        focus: '취향별 게임 탐색',
        summary: '취향에 맞는 게임과 신작 외 인기 게임을 발견하기 어렵다.',
        finding:
            '혼자 하기 좋은 게임, 아기자기한 게임처럼 취향과 플레이 맥락을 반영한 분류가 필요합니다.',
        response: '취향·캐릭터·시리즈를 교차하는 탐색 필터와 메인 캐릭터 경험을 강화합니다.',
        pdf: '/images/nintendo/research/pdf/interview-01.pdf',
    },
    {
        key: 'user-02',
        number: '02',
        profile: '31세 자영업자',
        focus: '캐릭터 접근성',
        summary: '동물의 숲 캐릭터 정보를 찾는 과정이 복잡하고 콘텐츠를 읽기 어렵다.',
        finding:
            '캐릭터의 개성과 일러스트를 더 선명하게 보여주고 정보의 가독성을 높일 필요가 있습니다.',
        response:
            '캐릭터 중심 진입점과 짧은 영상 콘텐츠를 결합해 탐색 단계와 읽기 부담을 줄입니다.',
        pdf: '/images/nintendo/research/pdf/interview-02.pdf',
    },
    {
        key: 'user-03',
        number: '03',
        profile: '45세 직장인',
        focus: '시리즈 중심 탐색',
        summary: '젤다처럼 익숙한 시리즈와 관련 작품을 한 번에 찾기 어렵다.',
        finding: '캐릭터·시리즈 중심 분류와 장르·플레이 방식별 세분화가 함께 필요합니다.',
        response:
            '시리즈 역사와 라인업, 실제 플레이 영상을 연결해 작품 간 관계와 특징을 빠르게 이해하게 합니다.',
        pdf: '/images/nintendo/research/pdf/interview-03.pdf',
    },
];

const userPersonas = [
    {
        number: '01',
        name: '정원희',
        profile: '24세 / 대학생',
        type: '탐색 효율형',
        characteristic: '게임 리뷰를 참고하며 취향에 맞는 게임을 효율적으로 찾고자 함',
        goal: '신작과 기존 인기 게임을 빠르게 발견',
        painPoint: '신작 중심 구조로 기존 인기 게임 탐색이 어려움',
        need: '장르·취향·플레이 방식별 게임 탐색',
        image: '/images/nintendo/research/persona-01.jpg',
        avatar: '/images/nintendo/research/persona-avatar-01.png',
    },
    {
        number: '02',
        name: '김희선',
        profile: '31세 / 자영업자',
        type: '캐릭터 중심형',
        characteristic: '캐릭터의 외형과 콘셉트를 중요하게 생각함',
        goal: '좋아하는 캐릭터와 관련 콘텐츠를 빠르게 발견',
        painPoint: '캐릭터 상세 정보까지 여러 단계의 탐색이 필요함',
        need: '캐릭터별 설정, 일러스트, 직관적인 콘텐츠 탐색',
        image: '/images/nintendo/research/persona-02.jpg',
        avatar: '/images/nintendo/research/persona-avatar-02.png',
    },
    {
        number: '03',
        name: '최현석',
        profile: '45세 / 직장인',
        type: '시리즈 몰입형',
        characteristic: '기존 게임 시리즈와 캐릭터에 대한 애정이 높음',
        goal: '익숙한 시리즈의 정보와 라인업을 쉽게 탐색',
        painPoint: '시리즈별 정보가 눈에 잘 띄지 않고 플레이 영상 접근이 어려움',
        need: '시리즈별 탐색, 역사·라인업, 플레이 영상',
        image: '/images/nintendo/research/persona-03.png',
        avatar: '/images/nintendo/research/persona-avatar-03.png',
    },
];

const journeyResearch = [
    {
        key: 'wonhee',
        number: '01',
        name: '정원희',
        profile: '24세 / 대학생',
        type: '탐색 효율형',
        scores: [3, 2, 1, 4, 5, 3],
        pain: '원하는 게임과 캐릭터를 찾는 과정이 복잡함',
        response: '장르·취향·플레이 방식별 탐색 구조, 캐릭터 태그와 필터',
        journey: '/images/nintendo/research/journey-02.png',
        canvas: '/images/nintendo/research/lean-canvas-02.png',
    },
    {
        key: 'heeseon',
        number: '02',
        name: '김희선',
        profile: '31세 / 자영업자',
        type: '캐릭터 중심형',
        scores: [3, 2, 2, 3, 2, 3],
        pain: '캐릭터 콘텐츠와 브랜드 경험이 부족함',
        response: '캐릭터 IP 중심의 인터랙티브 콘텐츠, 캐릭터별 게임 연결',
        journey: '/images/nintendo/research/journey-01.png',
        canvas: '/images/nintendo/research/lean-canvas-01.png',
    },
    {
        key: 'hyunseok',
        number: '03',
        name: '최현석',
        profile: '45세 / 직장인',
        type: '시리즈 몰입형',
        scores: [4, 3, 1, 5, 2, 4],
        pain: '시리즈의 역사와 캐릭터 관계를 이해하기 어려움',
        response: '시리즈 히스토리, 브랜드 아카이브, 스토리텔링 콘텐츠',
        journey: '/images/nintendo/research/journey-03.png',
        canvas: '/images/nintendo/research/lean-canvas-03.png',
    },
];

const journeyStages = ['유입', '탐색', '경험', '게임 선택', '상세 탐색', '구매 고려'];

const emotionScale = {
    1: '매우 낮음',
    2: '낮음',
    3: '보통',
    4: '높음',
    5: '매우 높음',
};

const ResearchMedia = ({ src, alt, label }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="nintendo-research__placeholder" role="img" aria-label={alt}>
                <span>IMAGE PENDING</span>
                <strong>{label}</strong>
            </div>
        );
    }

    return <img src={src} alt={alt} onError={() => setHasError(true)} />;
};

function App() {
    const aboutRef = useRef(null);
    const moreAboutRef = useRef(null);
    const headerRef = useRef(null);
    const heroRef = useRef(null);
    const selectedWorksRef = useRef(null);
    const selectedWorksTitleRef = useRef(null);
    const nintendoOverviewRef = useRef(null);
    const uxArchitectureRef = useRef(null);
    const designDevelopmentRef = useRef(null);
    const architectureDragRef = useRef(null);
    const architectureViewportRef = useRef(null);
    const architectureDialogRef = useRef(null);
    const architectureZoomRef = useRef(1);
    const developmentDragRef = useRef(null);
    const developmentViewportRef = useRef(null);
    const developmentDialogRef = useRef(null);
    const developmentZoomRef = useRef(1);
    const developmentImageKeyRef = useRef('main');
    const navHideTimerRef = useRef(null);
    const isPointerOverNavRef = useRef(false);
    const previewTriggerRef = useRef(null);
    const previewDialogRef = useRef(null);
    const [isAboutHeadlineActive, setIsAboutHeadlineActive] = useState(false);
    const [activeMoreAboutPanel, setActiveMoreAboutPanel] = useState(0);
    const [visibleMoreAboutCards, setVisibleMoreAboutCards] = useState(0);
    const [moreAboutPosition, setMoreAboutPosition] = useState('before');
    const [isNavExpanded, setIsNavExpanded] = useState(true);
    const [isNavOnDark, setIsNavOnDark] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
    const [isSelectedWorksTitleVisible, setIsSelectedWorksTitleVisible] = useState(false);
    const [nintendoComparePosition, setNintendoComparePosition] = useState(50);
    const [visibleNintendoOverviewCards, setVisibleNintendoOverviewCards] = useState(0);
    const [documentPreview, setDocumentPreview] = useState(null);
    const [architecturePreview, setArchitecturePreview] = useState(null);
    const [architectureZoom, setArchitectureZoom] = useState(1);
    const [architectureFitZoom, setArchitectureFitZoom] = useState(1);
    const [architectureImageSize, setArchitectureImageSize] = useState({ width: 0, height: 0 });
    const [architectureViewMode, setArchitectureViewMode] = useState('fit');
    const [activeArchitecture, setActiveArchitecture] = useState('ia');
    const [isArchitectureVisible, setIsArchitectureVisible] = useState(false);
    const [activeDevelopment, setActiveDevelopment] = useState('wireframe');
    const [developmentPreview, setDevelopmentPreview] = useState(null);
    const [activeDevelopmentImage, setActiveDevelopmentImage] = useState('main');
    const [developmentZoom, setDevelopmentZoom] = useState(1);
    const [developmentFitZoom, setDevelopmentFitZoom] = useState(1);
    const [developmentImageSize, setDevelopmentImageSize] = useState({ width: 0, height: 0 });
    const [developmentViewMode, setDevelopmentViewMode] = useState('fit');
    const [isDevelopmentImageReady, setIsDevelopmentImageReady] = useState(false);
    const [isDevelopmentVisible, setIsDevelopmentVisible] = useState(false);
    const [activeFinalOutcome, setActiveFinalOutcome] = useState('desktop');
    const [activeNintendoResearch, setActiveNintendoResearch] = useState('brand');
    const [activeCompetitorResearch, setActiveCompetitorResearch] = useState('playstation');
    const [activeUserInterview, setActiveUserInterview] = useState('user-01');
    const [activeJourneyResearch, setActiveJourneyResearch] = useState('wonhee');
    const [activeJourneyPoint, setActiveJourneyPoint] = useState(null);
    const [selectedPersonalityTrait, setSelectedPersonalityTrait] = useState('curious');
    const [previewPersonalityTrait, setPreviewPersonalityTrait] = useState(null);
    const [activeLoveCategory, setActiveLoveCategory] = useState('travel');
    const [selectedTravelIndex, setSelectedTravelIndex] = useState(0);

    useEffect(() => {
        architectureZoomRef.current = architectureZoom;
    }, [architectureZoom]);

    useEffect(() => {
        developmentZoomRef.current = developmentZoom;
    }, [developmentZoom]);

    const openDocumentPreview = (preview, event) => {
        previewTriggerRef.current = event.currentTarget;
        setDocumentPreview(preview);
    };

    const closeDocumentPreview = () => setDocumentPreview(null);

    const openArchitecturePreview = (item, event) => {
        previewTriggerRef.current = event.currentTarget;
        setArchitectureZoom(1);
        setArchitectureFitZoom(1);
        setArchitectureImageSize({ width: 0, height: 0 });
        setArchitectureViewMode('fit');
        setArchitecturePreview(item);
    };

    const closeArchitecturePreview = () => setArchitecturePreview(null);

    const centerArchitectureViewport = () => {
        window.requestAnimationFrame(() => {
            const viewport = architectureViewportRef.current;
            if (!viewport) return;
            viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
            viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
        });
    };

    const updateArchitectureZoom = (nextZoom, mode = 'custom') => {
        const viewport = architectureViewportRef.current;
        const previousWidth = viewport?.scrollWidth || 1;
        const previousHeight = viewport?.scrollHeight || 1;
        const centerX = viewport
            ? (viewport.scrollLeft + viewport.clientWidth / 2) / previousWidth
            : 0.5;
        const centerY = viewport
            ? (viewport.scrollTop + viewport.clientHeight / 2) / previousHeight
            : 0.5;
        const zoom = Math.min(3, Math.max(0.05, Number(nextZoom.toFixed(3))));
        setArchitectureViewMode(mode);
        setArchitectureZoom(zoom);
        window.requestAnimationFrame(() =>
            window.requestAnimationFrame(() => {
                const nextViewport = architectureViewportRef.current;
                if (!nextViewport) return;
                nextViewport.scrollLeft =
                    centerX * nextViewport.scrollWidth - nextViewport.clientWidth / 2;
                nextViewport.scrollTop =
                    centerY * nextViewport.scrollHeight - nextViewport.clientHeight / 2;
            })
        );
    };

    const fitArchitectureImage = (
        width = architectureImageSize.width,
        height = architectureImageSize.height
    ) => {
        const viewport = architectureViewportRef.current;
        if (!viewport || !width || !height) return;
        const fit = Math.min(
            (viewport.clientWidth - 32) / width,
            (viewport.clientHeight - 32) / height,
            1
        );
        setArchitectureFitZoom(fit);
        setArchitectureViewMode('fit');
        setArchitectureZoom(fit);
        centerArchitectureViewport();
    };

    const handleArchitecturePointerDown = (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        if (
            event.currentTarget.scrollWidth <= event.currentTarget.clientWidth &&
            event.currentTarget.scrollHeight <= event.currentTarget.clientHeight
        )
            return;
        event.currentTarget.setPointerCapture(event.pointerId);
        architectureDragRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            scrollLeft: event.currentTarget.scrollLeft,
            scrollTop: event.currentTarget.scrollTop,
        };
    };

    const handleArchitecturePointerMove = (event) => {
        const drag = architectureDragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
        event.currentTarget.scrollTop = drag.scrollTop - (event.clientY - drag.y);
    };

    const handleArchitecturePointerUp = (event) => {
        if (architectureDragRef.current?.pointerId === event.pointerId) {
            architectureDragRef.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const centerDevelopmentViewport = () => {
        window.requestAnimationFrame(() => {
            const viewport = developmentViewportRef.current;
            if (!viewport) return;
            viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
            viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
        });
    };

    const updateDevelopmentZoom = (nextZoom, mode = 'custom') => {
        const viewport = developmentViewportRef.current;
        const previousWidth = viewport?.scrollWidth || 1;
        const previousHeight = viewport?.scrollHeight || 1;
        const centerX = viewport
            ? (viewport.scrollLeft + viewport.clientWidth / 2) / previousWidth
            : 0.5;
        const centerY = viewport
            ? (viewport.scrollTop + viewport.clientHeight / 2) / previousHeight
            : 0.5;
        const zoom = Math.min(3, Math.max(0.05, Number(nextZoom.toFixed(3))));
        setDevelopmentViewMode(mode);
        setDevelopmentZoom(zoom);
        window.requestAnimationFrame(() =>
            window.requestAnimationFrame(() => {
                const nextViewport = developmentViewportRef.current;
                if (!nextViewport) return;
                nextViewport.scrollLeft =
                    centerX * nextViewport.scrollWidth - nextViewport.clientWidth / 2;
                nextViewport.scrollTop =
                    centerY * nextViewport.scrollHeight - nextViewport.clientHeight / 2;
            })
        );
    };

    const fitDevelopmentImage = (
        width = developmentImageSize.width,
        height = developmentImageSize.height
    ) => {
        const viewport = developmentViewportRef.current;
        if (!viewport || !width || !height) return;
        const fit = Math.min(
            (viewport.clientWidth - 32) / width,
            (viewport.clientHeight - 32) / height,
            1
        );
        setDevelopmentFitZoom(fit);
        setDevelopmentViewMode('fit');
        setDevelopmentZoom(fit);
        centerDevelopmentViewport();
    };

    const prepareDevelopmentImage = (key, width, height) => {
        const viewport = developmentViewportRef.current;
        if (!viewport || !width || !height || developmentImageKeyRef.current !== key) return;
        const fit = Math.min(
            (viewport.clientWidth - 32) / width,
            (viewport.clientHeight - 32) / height,
            1
        );
        setDevelopmentImageSize({ width, height });
        setDevelopmentFitZoom(fit);
        setDevelopmentViewMode('fit');
        setDevelopmentZoom(fit);
        window.requestAnimationFrame(() =>
            window.requestAnimationFrame(() => {
                if (developmentImageKeyRef.current !== key) return;
                centerDevelopmentViewport();
                setIsDevelopmentImageReady(true);
            })
        );
    };

    const selectDevelopmentModalImage = (key) => {
        developmentImageKeyRef.current = key;
        setIsDevelopmentImageReady(false);
        setActiveDevelopmentImage(key);
        setDevelopmentZoom(1);
        setDevelopmentFitZoom(1);
        setDevelopmentImageSize({ width: 0, height: 0 });
        setDevelopmentViewMode('fit');
    };

    const openDevelopmentPreview = (item, event) => {
        previewTriggerRef.current = event.currentTarget;
        setDevelopmentPreview(item);
        selectDevelopmentModalImage(item.modalImages[0].key);
    };

    const closeDevelopmentPreview = () => setDevelopmentPreview(null);

    const handleDevelopmentPointerDown = (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        if (
            event.currentTarget.scrollWidth <= event.currentTarget.clientWidth &&
            event.currentTarget.scrollHeight <= event.currentTarget.clientHeight
        )
            return;
        event.currentTarget.setPointerCapture(event.pointerId);
        developmentDragRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            scrollLeft: event.currentTarget.scrollLeft,
            scrollTop: event.currentTarget.scrollTop,
        };
    };

    const handleDevelopmentPointerMove = (event) => {
        const drag = developmentDragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.x);
        event.currentTarget.scrollTop = drag.scrollTop - (event.clientY - drag.y);
    };

    const handleDevelopmentPointerUp = (event) => {
        if (developmentDragRef.current?.pointerId === event.pointerId) {
            developmentDragRef.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleResearchTabKeyDown = (event, items, activeKey, setActiveKey) => {
        const currentIndex = items.findIndex((item) => item.key === activeKey);
        let nextIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % items.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + items.length) % items.length;
        } else if (event.key === 'Home') {
            nextIndex = 0;
        } else if (event.key === 'End') {
            nextIndex = items.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        setActiveKey(items[nextIndex].key);
        const tabs = event.currentTarget.parentElement?.querySelectorAll('[role="tab"]');
        tabs?.[nextIndex]?.focus();
    };

    useEffect(() => {
        if (!documentPreview) return undefined;

        const previousOverflow = document.body.style.overflow;
        const handlePreviewKeys = (event) => {
            if (event.key === 'Escape') {
                setDocumentPreview(null);
                return;
            }
            if (event.key === 'Tab') {
                const focusable = previewDialogRef.current?.querySelectorAll(
                    "button, [href], [tabindex]:not([tabindex='-1'])"
                );
                if (focusable?.length === 1) {
                    event.preventDefault();
                    focusable[0].focus();
                }
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handlePreviewKeys);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handlePreviewKeys);
            previewTriggerRef.current?.focus();
        };
    }, [documentPreview]);

    useEffect(() => {
        if (!architecturePreview) return undefined;
        const previousOverflow = document.body.style.overflow;
        const handlePreviewKeys = (event) => {
            if (event.key === 'Escape') closeArchitecturePreview();
            if (event.key === '+' || event.key === '=') {
                event.preventDefault();
                const zoom = architectureZoomRef.current;
                updateArchitectureZoom(zoom + Math.max(0.1, zoom * 0.25));
            }
            if (event.key === '-') {
                event.preventDefault();
                const zoom = architectureZoomRef.current;
                updateArchitectureZoom(zoom - Math.max(0.1, zoom * 0.2));
            }
            if (event.key === 'Tab') {
                const focusable = architectureDialogRef.current?.querySelectorAll(
                    "button:not(:disabled), [tabindex]:not([tabindex='-1'])"
                );
                if (!focusable?.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handlePreviewKeys);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handlePreviewKeys);
            previewTriggerRef.current?.focus();
        };
    }, [architecturePreview]);

    useEffect(() => {
        if (!architecturePreview || architectureViewMode !== 'fit') return undefined;
        const handleResize = () => {
            const viewport = architectureViewportRef.current;
            if (!viewport || !architectureImageSize.width || !architectureImageSize.height) return;
            const fit = Math.min(
                (viewport.clientWidth - 32) / architectureImageSize.width,
                (viewport.clientHeight - 32) / architectureImageSize.height,
                1
            );
            setArchitectureFitZoom(fit);
            setArchitectureZoom(fit);
            centerArchitectureViewport();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [architecturePreview, architectureViewMode, architectureImageSize]);

    useEffect(() => {
        if (!developmentPreview) return undefined;
        const previousOverflow = document.body.style.overflow;
        const handlePreviewKeys = (event) => {
            if (event.key === 'Escape') closeDevelopmentPreview();
            if (event.key === '+' || event.key === '=') {
                event.preventDefault();
                const zoom = developmentZoomRef.current;
                updateDevelopmentZoom(zoom + Math.max(0.1, zoom * 0.25));
            }
            if (event.key === '-') {
                event.preventDefault();
                const zoom = developmentZoomRef.current;
                updateDevelopmentZoom(zoom - Math.max(0.1, zoom * 0.2));
            }
            if (event.key === 'Tab') {
                const focusable = developmentDialogRef.current?.querySelectorAll(
                    "button:not(:disabled), [tabindex]:not([tabindex='-1'])"
                );
                if (!focusable?.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handlePreviewKeys);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handlePreviewKeys);
            previewTriggerRef.current?.focus();
        };
    }, [developmentPreview]);

    useEffect(() => {
        if (!developmentPreview || developmentViewMode !== 'fit') return undefined;
        const handleResize = () => {
            const viewport = developmentViewportRef.current;
            if (!viewport || !developmentImageSize.width || !developmentImageSize.height) return;
            const fit = Math.min(
                (viewport.clientWidth - 32) / developmentImageSize.width,
                (viewport.clientHeight - 32) / developmentImageSize.height,
                1
            );
            setDevelopmentFitZoom(fit);
            setDevelopmentZoom(fit);
            centerDevelopmentViewport();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [developmentPreview, developmentViewMode, developmentImageSize]);

    useEffect(() => {
        const section = uxArchitectureRef.current;
        if (!section) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsArchitectureVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const section = designDevelopmentRef.current;
        if (!section) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsDevelopmentVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

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
        const section = moreAboutRef.current;

        if (!section) return undefined;

        let animationFrame = null;

        const updateMoreAboutPanel = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
            const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
            const nextPanel =
                progress < 0.3 ? 0 : Math.min(3, Math.floor((progress - 0.3) / 0.2334) + 1);
            const nextVisibleCards =
                progress < 0.04 ? 0 : progress < 0.12 ? 1 : progress < 0.2 ? 2 : 3;
            const nextPosition =
                rect.top > 0 ? 'before' : rect.bottom <= window.innerHeight ? 'after' : 'pinned';

            setActiveMoreAboutPanel((currentPanel) =>
                currentPanel === nextPanel ? currentPanel : nextPanel
            );
            setVisibleMoreAboutCards((currentCount) =>
                currentCount === nextVisibleCards ? currentCount : nextVisibleCards
            );
            setMoreAboutPosition((currentPosition) =>
                currentPosition === nextPosition ? currentPosition : nextPosition
            );
            animationFrame = null;
        };

        const handleScroll = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateMoreAboutPanel);
            }
        };

        updateMoreAboutPanel();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
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

    useEffect(() => {
        const section = nintendoOverviewRef.current;

        if (!section) return undefined;

        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let animationFrame = null;

        const updateOverviewCards = () => {
            if (reducedMotionQuery.matches) {
                setVisibleNintendoOverviewCards(2);
                animationFrame = null;
                return;
            }

            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
            const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
            const nextVisibleCards = progress < 0.1 ? 0 : progress < 0.45 ? 1 : 2;

            setVisibleNintendoOverviewCards((currentCount) =>
                currentCount === nextVisibleCards ? currentCount : nextVisibleCards
            );
            animationFrame = null;
        };

        const scheduleUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateOverviewCards);
            }
        };

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        reducedMotionQuery.addEventListener('change', scheduleUpdate);
        updateOverviewCards();

        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            reducedMotionQuery.removeEventListener('change', scheduleUpdate);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
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

    const openMoreAboutPanel = (panel) => {
        const section = moreAboutRef.current;
        if (!section) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
        const panelProgress = [0, 0.34, 0.57, 0.8][panel];

        window.scrollTo({
            top: section.offsetTop + scrollRange * panelProgress,
            behavior: reduceMotion ? 'auto' : 'smooth',
        });
    };

    const activePersonalityTrait = previewPersonalityTrait || selectedPersonalityTrait;
    const activeLove = loveCategories[activeLoveCategory];
    const activeTravelImage = travelArchive[selectedTravelIndex];

    const selectedNintendoResearch = nintendoResearchInsights.find(
        (item) => item.key === activeNintendoResearch
    );
    const selectedCompetitorResearch = competitorResearch.find(
        (item) => item.key === activeCompetitorResearch
    );
    const selectedUserInterview = userInterviews.find((item) => item.key === activeUserInterview);
    const selectedJourneyResearch = journeyResearch.find(
        (item) => item.key === activeJourneyResearch
    );
    const selectedArchitecture = uxArchitectureArtifacts.find(
        (item) => item.key === activeArchitecture
    );
    const selectedDevelopment = designDevelopmentArtifacts.find(
        (item) => item.key === activeDevelopment
    );
    const selectedDevelopmentImage = developmentPreview?.modalImages.find(
        (item) => item.key === activeDevelopmentImage
    );
    const selectedFinalOutcome = finalOutcomeViews.find(
        (item) => item.key === activeFinalOutcome
    );

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
                                                            <source
                                                                src={item.media.src}
                                                                type="video/mp4"
                                                            />
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
                                        팀 프로젝트의 서기를 맡아 매일 회의 내용을 기록하고, 팀원별
                                        역할 분담과 아이디어, 피드백을 체계적으로 정리해
                                        공유했습니다.
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
                                                onClick={(event) =>
                                                    openDocumentPreview(
                                                        {
                                                            ...item,
                                                            isDetail: index > 0,
                                                        },
                                                        event
                                                    )
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
                                                        <span>
                                                            Document{' '}
                                                            {String(index).padStart(2, '0')}
                                                        </span>
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

                    <section
                        className="nintendo-planning-intro section"
                        aria-labelledby="nintendo-planning-title"
                    >
                        <div className="nintendo-planning-intro__grid" aria-hidden="true" />
                        <div className="nintendo-planning-intro__orbit" aria-hidden="true">
                            <span />
                        </div>
                        <span
                            className="nintendo-planning-intro__spark nintendo-planning-intro__spark--large"
                            aria-hidden="true"
                        >
                            ✦
                        </span>
                        <span
                            className="nintendo-planning-intro__spark nintendo-planning-intro__spark--small"
                            aria-hidden="true"
                        >
                            ✦
                        </span>

                        <div className="nintendo-planning-intro__content">
                            <p className="nintendo-planning-intro__label">08 / PLANNING PROCESS</p>

                            <div className="nintendo-planning-intro__title-wrap">
                                <span
                                    className="nintendo-planning-intro__system"
                                    aria-hidden="true"
                                >
                                    NEXT CHAPTER · RESEARCH MODE
                                </span>
                                <h3 id="nintendo-planning-title">
                                    <span>BEHIND THE</span>
                                    <em>Experience.</em>
                                </h3>
                            </div>

                            <div className="nintendo-planning-intro__footer">
                                <p>즐거운 경험은 어떤 고민에서 시작되었을까?</p>
                                <div className="nintendo-planning-intro__keywords">
                                    <span>RESEARCH</span>
                                    <i aria-hidden="true" />
                                    <span>INSIGHT</span>
                                    <i aria-hidden="true" />
                                    <span>STRATEGY</span>
                                </div>
                            </div>
                        </div>

                        <div className="nintendo-planning-intro__scroll" aria-hidden="true">
                            <span>SCROLL TO EXPLORE</span>
                            <i />
                        </div>
                    </section>

                    <section
                        className="nintendo-project-overview section is-reveal-ready"
                        aria-labelledby="nintendo-overview-title"
                        ref={nintendoOverviewRef}
                    >
                        <div className="nintendo-project-overview__stage">
                            <header className="nintendo-project-overview__header">
                                <p className="nintendo-project-overview__label">
                                    09 / PROJECT OVERVIEW
                                </p>
                                <p>NINTENDO RESEARCH ARCHIVE</p>
                                <p className="nintendo-project-overview__status">
                                    <span aria-hidden="true" /> SYSTEM ONLINE
                                </p>
                            </header>

                            <div className="nintendo-project-overview__workspace">
                                <div className="nintendo-project-overview__title-block">
                                    <p aria-hidden="true">FILE 09 — PROJECT DEFINITION</p>
                                    <h3 id="nintendo-overview-title">
                                        <span>FROM INFORMATION</span>
                                        <em>to Experience.</em>
                                    </h3>
                                    <div
                                        className="nintendo-project-overview__title-rule"
                                        aria-hidden="true"
                                    >
                                        <span>WEB RENEWAL</span>
                                        <i />
                                        <span>4 WEEKS</span>
                                    </div>
                                </div>

                                <div className="nintendo-project-overview__briefs">
                                    <article
                                        className={`nintendo-project-overview__card nintendo-project-overview__card--background${visibleNintendoOverviewCards >= 1 ? ' is-visible' : ''}`}
                                    >
                                        <div className="nintendo-project-overview__window-bar">
                                            <div aria-hidden="true">
                                                <i />
                                                <i />
                                                <i />
                                            </div>
                                            <span>BACKGROUND.TXT</span>
                                            <span>01</span>
                                        </div>
                                        <div className="nintendo-project-overview__card-body">
                                            <div className="nintendo-project-overview__card-index">
                                                <span>01</span>
                                                <p>BACKGROUND</p>
                                            </div>
                                            <p className="nintendo-project-overview__brief-copy">
                                                기존 닌텐도 웹사이트는 게임 및 제품 정보를
                                                제공하지만, 캐릭터 IP를 중심으로 브랜드의 개성을
                                                경험하거나 원하는 게임을 직관적으로 탐색하는 데
                                                아쉬움이 있었습니다.
                                            </p>
                                        </div>
                                        <p
                                            className="nintendo-project-overview__file-status"
                                            aria-hidden="true"
                                        >
                                            READ ONLY <span>●</span> ARCHIVE 01/02
                                        </p>
                                    </article>

                                    <article
                                        className={`nintendo-project-overview__card nintendo-project-overview__card--objective${visibleNintendoOverviewCards >= 2 ? ' is-visible' : ''}`}
                                    >
                                        <div className="nintendo-project-overview__window-bar">
                                            <div aria-hidden="true">
                                                <i />
                                                <i />
                                                <i />
                                            </div>
                                            <span>OBJECTIVE.TXT</span>
                                            <span>02</span>
                                        </div>
                                        <div className="nintendo-project-overview__card-body">
                                            <div className="nintendo-project-overview__card-index">
                                                <span>02</span>
                                                <p>OBJECTIVE</p>
                                            </div>
                                            <p className="nintendo-project-overview__brief-copy">
                                                캐릭터 IP 중심으로 브랜드 경험을 강화하고, 게임 탐색
                                                구조와 인터랙션을 개선하여 정보 탐색 자체가 즐거운
                                                경험이 되는 웹사이트를 제안합니다.
                                            </p>
                                        </div>
                                        <p
                                            className="nintendo-project-overview__file-status"
                                            aria-hidden="true"
                                        >
                                            ACTIVE FILE <span>●</span> ARCHIVE 02/02
                                        </p>
                                    </article>
                                </div>

                                <footer className="nintendo-project-overview__keywords">
                                    <span>CORE KEYWORDS</span>
                                    <ul>
                                        <li>
                                            <span>01</span> CHARACTER IP
                                        </li>
                                        <li>
                                            <span>02</span> GAME DISCOVERY
                                        </li>
                                        <li>
                                            <span>03</span> INTERACTIVE EXPERIENCE
                                        </li>
                                    </ul>
                                    <span aria-hidden="true">END OF FILE ↵</span>
                                </footer>
                            </div>
                        </div>
                    </section>

                    <section
                        className="nintendo-analysis section"
                        aria-labelledby="nintendo-analysis-title"
                    >
                        <header className="research-section-header">
                            <div className="research-section-header__meta">
                                <span>10 / NINTENDO ANALYSIS</span>
                                <span>OFFICIAL SITE · ANALYSIS LOG</span>
                            </div>
                            <div className="research-section-header__title">
                                <h3 id="nintendo-analysis-title">
                                    BEYOND THE <em>Screen.</em>
                                </h3>
                                <p>기존 닌텐도 사이트의 강점과 개선 가능성을 분석하다.</p>
                            </div>
                        </header>
                        <div className="nintendo-analysis__editorial">
                            <div
                                className="nintendo-analysis__viewer"
                                id="nintendo-analysis-viewer"
                                role="tabpanel"
                            >
                                <figure key={selectedNintendoResearch.key}>
                                    <ResearchMedia
                                        src={selectedNintendoResearch.image}
                                        alt={selectedNintendoResearch.alt}
                                        label={selectedNintendoResearch.label}
                                    />
                                </figure>
                                <article key={'copy-' + selectedNintendoResearch.key}>
                                    <span>ANALYSIS / {selectedNintendoResearch.label}</span>
                                    <h4>{selectedNintendoResearch.title}</h4>
                                    <p>{selectedNintendoResearch.description}</p>
                                    <div>
                                        <span>DESIGN DIRECTION</span>
                                        <strong>{selectedNintendoResearch.direction}</strong>
                                    </div>
                                </article>
                            </div>
                            <p className="research-selector-label">CLICK TO EXPLORE ↓</p>
                            <div
                                className="nintendo-analysis__tabs"
                                role="tablist"
                                aria-label="닌텐도 사이트 분석 화면 선택"
                            >
                                {nintendoResearchInsights.map((item, index) => (
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-controls="nintendo-analysis-viewer"
                                        aria-selected={activeNintendoResearch === item.key}
                                        tabIndex={activeNintendoResearch === item.key ? 0 : -1}
                                        className={
                                            activeNintendoResearch === item.key ? 'is-active' : ''
                                        }
                                        key={item.key}
                                        onClick={() => setActiveNintendoResearch(item.key)}
                                        onKeyDown={(event) =>
                                            handleResearchTabKeyDown(
                                                event,
                                                nintendoResearchInsights,
                                                activeNintendoResearch,
                                                setActiveNintendoResearch
                                            )
                                        }
                                    >
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        {index === 0 ? 'MAIN' : index === 1 ? 'STORE' : 'CHARACTER'}
                                        <i aria-hidden="true">↗</i>
                                    </button>
                                ))}
                            </div>
                            <button
                                className="research-source-link research-source-link--light"
                                type="button"
                                onClick={(event) =>
                                    openDocumentPreview(
                                        {
                                            src: '/images/nintendo/research/nintendo-analysis.png',
                                            alt: '닌텐도 공식 사이트의 여섯 가지 분석 기준을 정리한 원본 자료',
                                            isResearch: true,
                                        },
                                        event
                                    )
                                }
                            >
                                <span>SOURCE / ANALYSIS BOARD</span>
                                <strong>VIEW ORIGINAL RESEARCH ↗</strong>
                            </button>
                        </div>
                    </section>

                    <section
                        className="competitive-research section"
                        aria-labelledby="competitive-research-title"
                    >
                        <header className="research-section-header research-section-header--dark">
                            <div className="research-section-header__meta">
                                <span>11 / COMPETITIVE RESEARCH</span>
                                <span>03 PLATFORMS · COMPARATIVE VIEW</span>
                            </div>
                            <div className="research-section-header__title">
                                <h3 id="competitive-research-title">
                                    LOOKING BEYOND <em>Nintendo.</em>
                                </h3>
                                <p>세 가지 게임 플랫폼의 경험을 비교하다.</p>
                            </div>
                        </header>
                        <p className="research-selector-label research-selector-label--dark">
                            CLICK TO EXPLORE ↓
                        </p>
                        <div
                            className="competitive-research__tabs"
                            role="tablist"
                            aria-label="경쟁 플랫폼 선택"
                        >
                            {competitorResearch.map((item, index) => (
                                <button
                                    type="button"
                                    role="tab"
                                    aria-controls="competitive-research-viewer"
                                    aria-selected={activeCompetitorResearch === item.key}
                                    tabIndex={activeCompetitorResearch === item.key ? 0 : -1}
                                    className={
                                        activeCompetitorResearch === item.key ? 'is-active' : ''
                                    }
                                    key={item.key}
                                    onClick={() => setActiveCompetitorResearch(item.key)}
                                    onKeyDown={(event) =>
                                        handleResearchTabKeyDown(
                                            event,
                                            competitorResearch,
                                            activeCompetitorResearch,
                                            setActiveCompetitorResearch
                                        )
                                    }
                                >
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    {item.label}
                                    <i aria-hidden="true">↗</i>
                                </button>
                            ))}
                        </div>
                        <div
                            className="competitive-research__viewer"
                            id="competitive-research-viewer"
                            role="tabpanel"
                        >
                            <figure key={selectedCompetitorResearch.key}>
                                <ResearchMedia
                                    src={selectedCompetitorResearch.image}
                                    alt={selectedCompetitorResearch.alt}
                                    label={selectedCompetitorResearch.label}
                                />
                            </figure>
                            <article key={'competitor-' + selectedCompetitorResearch.key}>
                                <span>SELECTED PLATFORM / {selectedCompetitorResearch.label}</span>
                                <h4>{selectedCompetitorResearch.label}</h4>
                                <dl>
                                    <div>
                                        <dt>FEATURE</dt>
                                        <dd>{selectedCompetitorResearch.feature}</dd>
                                    </div>
                                    <div>
                                        <dt>INSIGHT</dt>
                                        <dd>{selectedCompetitorResearch.implication}</dd>
                                    </div>
                                </dl>
                            </article>
                        </div>
                        <div className="competitive-research__footer">
                            <aside className="competitive-research__takeaway">
                                <span>RESEARCH TAKEAWAY</span>
                                <p>
                                    브랜드의 개성을 전달하는 시각적 경험과 사용자가 원하는 게임을
                                    쉽게 발견할 수 있는 탐색 구조를 함께 강화하고자 했습니다.
                                </p>
                            </aside>
                            <button
                                className="research-source-link research-source-link--dark"
                                type="button"
                                onClick={(event) =>
                                    openDocumentPreview(
                                        {
                                            src: '/images/nintendo/research/competitive-research.png',
                                            alt: 'PlayStation, Xbox, Steam Deck의 화면과 특징을 비교한 경쟁사 리서치 원본 자료',
                                            isResearch: true,
                                        },
                                        event
                                    )
                                }
                                aria-label="경쟁사 리서치 원본 자료 확대 보기"
                            >
                                <span>SOURCE / COMPARISON BOARD</span>
                                <strong>VIEW ORIGINAL RESEARCH ↗</strong>
                            </button>
                        </div>
                    </section>

                    <section
                        className="user-interview section"
                        id="user-interview"
                        aria-labelledby="user-interview-title"
                    >
                        <header className="user-interview__header">
                            <div className="user-interview__meta">
                                <span>12 / USER INTERVIEW</span>
                                <span>QUALITATIVE RESEARCH / N=3</span>
                            </div>
                            <div className="user-interview__heading">
                                <h3 id="user-interview-title">
                                    BEYOND THE <em>Answers.</em>
                                </h3>
                                <p>
                                    실제 사용자 3명의 경험을 통해 닌텐도 웹사이트의 개선 방향을
                                    확인했습니다.
                                </p>
                            </div>
                        </header>

                        <div className="user-interview__explorer">
                            <div
                                className="user-interview__tabs"
                                role="tablist"
                                aria-label="인터뷰 응답자 선택"
                            >
                                <p>SELECT A USER ↓</p>
                                {userInterviews.map((interview) => (
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeUserInterview === interview.key}
                                        aria-controls="user-interview-panel"
                                        tabIndex={activeUserInterview === interview.key ? 0 : -1}
                                        className={
                                            activeUserInterview === interview.key ? 'is-active' : ''
                                        }
                                        key={interview.key}
                                        onClick={() => setActiveUserInterview(interview.key)}
                                        onKeyDown={(event) =>
                                            handleResearchTabKeyDown(
                                                event,
                                                userInterviews,
                                                activeUserInterview,
                                                setActiveUserInterview
                                            )
                                        }
                                    >
                                        <span>{interview.number}</span>
                                        <strong>USER {interview.number}</strong>
                                        <small>{interview.profile}</small>
                                        <i aria-hidden="true">↗</i>
                                    </button>
                                ))}
                            </div>

                            <article
                                className="user-interview__detail"
                                id="user-interview-panel"
                                role="tabpanel"
                                key={selectedUserInterview.key}
                            >
                                <div className="user-interview__detail-copy">
                                    <div className="user-interview__detail-topline">
                                        <span>USER {selectedUserInterview.number}</span>
                                        <span>{selectedUserInterview.profile}</span>
                                    </div>
                                    <p className="user-interview__focus">
                                        {selectedUserInterview.focus}
                                    </p>
                                    <div className="user-interview__summary">
                                        <span>RESPONSE SUMMARY</span>
                                        <p>{selectedUserInterview.summary}</p>
                                    </div>
                                    <dl>
                                        <div>
                                            <dt>KEY FINDING</dt>
                                            <dd>{selectedUserInterview.finding}</dd>
                                        </div>
                                        <div>
                                            <dt>DESIGN RESPONSE</dt>
                                            <dd>{selectedUserInterview.response}</dd>
                                        </div>
                                    </dl>
                                    <a
                                        href={selectedUserInterview.pdf}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        VIEW FULL INTERVIEW <span aria-hidden="true">↗</span>
                                    </a>
                                </div>
                            </article>
                        </div>

                        <footer className="user-interview__insights">
                            <p>COMMON INSIGHTS</p>
                            <ol>
                                <li>
                                    <span>01 / GAME DISCOVERY</span>
                                    <strong>취향·캐릭터·시리즈 중심 탐색 개선</strong>
                                </li>
                                <li>
                                    <span>02 / CHARACTER IP</span>
                                    <strong>캐릭터와 세계관을 활용한 브랜드 경험 강화</strong>
                                </li>
                                <li>
                                    <span>03 / CONTENT EXPERIENCE</span>
                                    <strong>영상·애니메이션을 활용한 게임 이해도 향상</strong>
                                </li>
                            </ol>
                        </footer>
                    </section>

                    <section
                        className="user-persona section"
                        id="user-persona"
                        aria-labelledby="user-persona-title"
                    >
                        <div className="user-persona__inner">
                            <header className="user-persona__header">
                                <div className="user-persona__meta">
                                    <span>13 / USER PERSONA</span>
                                    <span>BEHAVIORAL ARCHETYPES / N=3</span>
                                </div>
                                <div className="user-persona__heading">
                                    <h3 id="user-persona-title">
                                        DESIGNING FOR <em>People.</em>
                                    </h3>
                                    <p>
                                        사용자 조사에서 발견한 탐색 방식과 핵심 니즈를 세 가지 행동
                                        유형으로 정리했습니다.
                                    </p>
                                </div>
                            </header>

                            <div className="user-persona__grid">
                                {userPersonas.map((persona) => (
                                    <article className="user-persona__card" key={persona.number}>
                                        <div className="user-persona__identity">
                                            <span>PERSONA {persona.number}</span>
                                            <p>{persona.profile}</p>
                                        </div>
                                        <div className="user-persona__visual" aria-hidden="true">
                                            <img src={persona.avatar} alt="" />
                                        </div>
                                        <div className="user-persona__name">
                                            <h4>{persona.name}</h4>
                                            <strong>{persona.type}</strong>
                                        </div>
                                        <p className="user-persona__characteristic">
                                            {persona.characteristic}
                                        </p>
                                        <dl>
                                            <div>
                                                <dt>GOAL</dt>
                                                <dd>{persona.goal}</dd>
                                            </div>
                                            <div className="user-persona__pain">
                                                <dt>PAIN POINT</dt>
                                                <dd>{persona.painPoint}</dd>
                                            </div>
                                            <div>
                                                <dt>NEED</dt>
                                                <dd>{persona.need}</dd>
                                            </div>
                                        </dl>
                                        <div className="user-persona__button-area">
                                            <button
                                                type="button"
                                                onClick={(event) =>
                                                    openDocumentPreview(
                                                        {
                                                            src: persona.image,
                                                            alt: `${persona.name} 사용자 퍼소나 원본 자료`,
                                                        },
                                                        event
                                                    )
                                                }
                                                aria-label={`${persona.name} 사용자 퍼소나 원본 보기`}
                                            >
                                                VIEW ORIGINAL <span aria-hidden="true">↗</span>
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <footer className="user-persona__direction">
                                <span>DESIGN DIRECTION</span>
                                <p>
                                    취향으로 발견하고, 캐릭터로 연결되며, 시리즈의 세계로 몰입하는
                                    경험.
                                </p>
                            </footer>
                        </div>
                    </section>

                    <section
                        className="journey-strategy section"
                        id="journey-strategy"
                        aria-labelledby="journey-strategy-title"
                    >
                        <div className="journey-strategy__inner">
                            <header className="journey-strategy__header">
                                <div className="journey-strategy__meta">
                                    <span>14 / USER JOURNEY &amp; STRATEGY</span>
                                    <span>JOURNEY MAP · LEAN CANVAS</span>
                                </div>
                                <div className="journey-strategy__heading">
                                    <h3 id="journey-strategy-title">
                                        FROM <em>Friction.</em> TO DIRECTION.
                                    </h3>
                                    <p>
                                        탐색 과정의 감정 변화를 따라 핵심 마찰 지점을 발견하고,
                                        구체적인 디자인 방향으로 전환했습니다.
                                    </p>
                                </div>
                            </header>

                            <div
                                className="journey-strategy__tabs"
                                role="tablist"
                                aria-label="사용자 여정 선택"
                            >
                                {journeyResearch.map((research) => (
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeJourneyResearch === research.key}
                                        aria-controls="journey-strategy-panel"
                                        tabIndex={activeJourneyResearch === research.key ? 0 : -1}
                                        className={
                                            activeJourneyResearch === research.key
                                                ? 'is-active'
                                                : ''
                                        }
                                        key={research.key}
                                        onClick={() => {
                                            setActiveJourneyResearch(research.key);
                                            setActiveJourneyPoint(null);
                                        }}
                                        onKeyDown={(event) =>
                                            handleResearchTabKeyDown(
                                                event,
                                                journeyResearch,
                                                activeJourneyResearch,
                                                (key) => {
                                                    setActiveJourneyResearch(key);
                                                    setActiveJourneyPoint(null);
                                                }
                                            )
                                        }
                                    >
                                        <span>{research.number}</span>
                                        <strong>{research.name}</strong>
                                        <small>{research.type}</small>
                                    </button>
                                ))}
                            </div>

                            <article
                                className="journey-strategy__panel"
                                id="journey-strategy-panel"
                                role="tabpanel"
                                key={selectedJourneyResearch.key}
                            >
                                <div className="journey-strategy__chart-head">
                                    <div>
                                        <span>EMOTION JOURNEY / 6 STEPS</span>
                                        <strong>
                                            {selectedJourneyResearch.name} ·{' '}
                                            {selectedJourneyResearch.profile}
                                        </strong>
                                    </div>
                                    <p>SCORE 01—05 / ORIGINAL RESEARCH DATA</p>
                                </div>

                                <div className="journey-strategy__chart">
                                    <div className="journey-strategy__scale" aria-hidden="true">
                                        {[5, 4, 3, 2, 1].map((score) => (
                                            <span key={score}>
                                                {String(score).padStart(2, '0')}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="journey-strategy__plot">
                                        <div className="journey-strategy__canvas">
                                            <svg
                                                viewBox="0 0 1000 230"
                                                role="img"
                                                aria-label={`${selectedJourneyResearch.name}의 6단계 감정 점수: ${selectedJourneyResearch.scores.join(', ')}`}
                                                preserveAspectRatio="none"
                                            >
                                                {[35, 75, 115, 155, 195].map((y) => (
                                                    <line key={y} x1="0" y1={y} x2="1000" y2={y} />
                                                ))}
                                                <polygon
                                                    className="journey-strategy__area"
                                                    points={`83.333,230 ${selectedJourneyResearch.scores
                                                        .map(
                                                            (score, index) =>
                                                                `${83.333 + index * 166.667},${235 - score * 40}`
                                                        )
                                                        .join(' ')} 916.668,230`}
                                                />
                                                <polyline
                                                    className="journey-strategy__line"
                                                    points={selectedJourneyResearch.scores
                                                        .map(
                                                            (score, index) =>
                                                                `${83.333 + index * 166.667},${235 - score * 40}`
                                                        )
                                                        .join(' ')}
                                                />
                                            </svg>
                                            <div className="journey-strategy__points">
                                                {selectedJourneyResearch.scores.map(
                                                    (score, index) => (
                                                        <button
                                                            className={`journey-strategy__point${activeJourneyPoint === index ? ' is-active' : ''}`}
                                                            style={{
                                                                '--point-x': `${((index + 0.5) / 6) * 100}%`,
                                                                '--point-y': `${((235 - score * 40) / 230) * 100}%`,
                                                            }}
                                                            key={`${selectedJourneyResearch.key}-${journeyStages[index]}`}
                                                            type="button"
                                                            aria-label={`${journeyStages[index]} 단계, 감정 점수 ${score}점, ${emotionScale[score]}`}
                                                            onMouseEnter={() =>
                                                                setActiveJourneyPoint(index)
                                                            }
                                                            onMouseLeave={() =>
                                                                setActiveJourneyPoint(null)
                                                            }
                                                            onFocus={() =>
                                                                setActiveJourneyPoint(index)
                                                            }
                                                            onBlur={() =>
                                                                setActiveJourneyPoint(null)
                                                            }
                                                            onClick={() =>
                                                                setActiveJourneyPoint(index)
                                                            }
                                                        >
                                                            <span
                                                                className="journey-strategy__emotion"
                                                                aria-hidden="true"
                                                            >
                                                                {score}점 · {emotionScale[score]}
                                                            </span>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <ol>
                                            {journeyStages.map((stage, index) => (
                                                <li key={stage}>
                                                    <span>0{index + 1}</span>
                                                    <strong>{stage}</strong>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>

                                <div className="journey-strategy__response">
                                    <div>
                                        <span>PAIN POINT</span>
                                        <p>{selectedJourneyResearch.pain}</p>
                                    </div>
                                    <i aria-hidden="true">→</i>
                                    <div>
                                        <span>DESIGN RESPONSE</span>
                                        <p>{selectedJourneyResearch.response}</p>
                                    </div>
                                </div>

                                <div className="journey-strategy__sources">
                                    <button
                                        type="button"
                                        onClick={(event) =>
                                            openDocumentPreview(
                                                {
                                                    src: selectedJourneyResearch.journey,
                                                    alt: `${selectedJourneyResearch.name} 사용자 여정 지도 원본`,
                                                    isResearch: true,
                                                },
                                                event
                                            )
                                        }
                                    >
                                        VIEW JOURNEY MAP <span aria-hidden="true">↗</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(event) =>
                                            openDocumentPreview(
                                                {
                                                    src: selectedJourneyResearch.canvas,
                                                    alt: `${selectedJourneyResearch.name} 린 캔버스 원본`,
                                                    isResearch: true,
                                                },
                                                event
                                            )
                                        }
                                    >
                                        VIEW LEAN CANVAS <span aria-hidden="true">↗</span>
                                    </button>
                                </div>
                            </article>
                        </div>
                    </section>

                    <section
                        ref={uxArchitectureRef}
                        className={`ux-architecture section${isArchitectureVisible ? ' is-visible' : ''}`}
                        id="ux-architecture"
                        aria-labelledby="ux-architecture-title"
                    >
                        <div className="ux-architecture__inner">
                            <header className="ux-architecture__header">
                                <div
                                    className="ux-architecture__meta ux-architecture__reveal"
                                    style={{ '--delay': '0s' }}
                                >
                                    <span>15 / UX ARCHITECTURE</span>
                                    <span>INFORMATION DESIGN / NINTENDO</span>
                                </div>
                                <div className="ux-architecture__heading">
                                    <h3
                                        id="ux-architecture-title"
                                        className="ux-architecture__reveal"
                                        style={{ '--delay': '.08s' }}
                                    >
                                        <span>STRUCTURING THE</span>
                                        <em>Experience.</em>
                                    </h3>
                                    <p
                                        className="ux-architecture__reveal"
                                        style={{ '--delay': '.16s' }}
                                    >
                                        브랜드의 콘텐츠를 체계적으로 정리하고, 사용자의 탐색부터
                                        구매까지 자연스럽게 이어지는 경험을 설계했습니다.
                                    </p>
                                </div>
                            </header>

                            <div
                                className="ux-architecture__showcase ux-architecture__reveal"
                                style={{ '--delay': '.24s' }}
                            >
                                <button
                                    className="ux-architecture__preview"
                                    type="button"
                                    onClick={(event) =>
                                        openArchitecturePreview(selectedArchitecture, event)
                                    }
                                    aria-label={`${selectedArchitecture.title} 원본 이미지 확대 보기`}
                                >
                                    <img
                                        key={selectedArchitecture.key}
                                        src={selectedArchitecture.previewSrc}
                                        alt={selectedArchitecture.alt}
                                    />
                                    <span>
                                        VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                    </span>
                                </button>

                                <div className="ux-architecture__content">
                                    <div
                                        className="ux-architecture__artifact-copy"
                                        id="ux-architecture-panel"
                                        role="tabpanel"
                                        key={`copy-${selectedArchitecture.key}`}
                                    >
                                        <span>{selectedArchitecture.number} / DESIGN ARTIFACT</span>
                                        <h4>{selectedArchitecture.title}</h4>
                                        <p>{selectedArchitecture.description}</p>
                                        <small>{selectedArchitecture.keywords}</small>
                                    </div>

                                    <div
                                        className="ux-architecture__tabs"
                                        role="tablist"
                                        aria-label="UX 설계 산출물 선택"
                                    >
                                        {uxArchitectureArtifacts.map((item) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={activeArchitecture === item.key}
                                                aria-controls="ux-architecture-panel"
                                                tabIndex={activeArchitecture === item.key ? 0 : -1}
                                                className={
                                                    activeArchitecture === item.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={item.key}
                                                onClick={() => setActiveArchitecture(item.key)}
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        uxArchitectureArtifacts,
                                                        activeArchitecture,
                                                        setActiveArchitecture
                                                    )
                                                }
                                            >
                                                <span>{item.number}</span>
                                                <strong>{item.title}</strong>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        ref={designDevelopmentRef}
                        className={`design-development ux-architecture section${isDevelopmentVisible ? ' is-visible' : ''}`}
                        id="design-development"
                        aria-labelledby="design-development-title"
                    >
                        <div className="design-development__inner ux-architecture__inner">
                            <header className="design-development__header">
                                <div
                                    className="design-development__meta ux-architecture__meta ux-architecture__reveal"
                                    style={{ '--delay': '0s' }}
                                >
                                    <span>16 / DESIGN DEVELOPMENT</span>
                                    <span>VISUAL SYSTEM / NINTENDO</span>
                                </div>
                                <div className="design-development__heading ux-architecture__heading">
                                    <h3
                                        id="design-development-title"
                                        className="ux-architecture__reveal"
                                        style={{ '--delay': '.08s' }}
                                    >
                                        <span>
                                            FROM <em>Structure.</em>
                                        </span>
                                        <span>TO DESIGN.</span>
                                    </h3>
                                    <p
                                        className="ux-architecture__reveal"
                                        style={{ '--delay': '.16s' }}
                                    >
                                        와이어프레임부터 무드보드, 디자인 시스템까지 일관된 브랜드 경험을 설계했습니다.
                                    </p>
                                </div>
                            </header>

                            <div
                                className="design-development__showcase ux-architecture__showcase ux-architecture__reveal"
                                style={{ '--delay': '.24s' }}
                            >
                                <button
                                    className="design-development__preview ux-architecture__preview"
                                    type="button"
                                    onClick={(event) =>
                                        openDevelopmentPreview(selectedDevelopment, event)
                                    }
                                    aria-label={`${selectedDevelopment.title} 원본 이미지 크게 보기`}
                                >
                                    <img
                                        key={selectedDevelopment.key}
                                        src={selectedDevelopment.previewSrc}
                                        alt={selectedDevelopment.alt}
                                    />
                                    <span>
                                        VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                    </span>
                                </button>

                                <div className="design-development__content ux-architecture__content">
                                    <div
                                        className="design-development__copy ux-architecture__artifact-copy"
                                        id="design-development-panel"
                                        role="tabpanel"
                                        key={`development-copy-${selectedDevelopment.key}`}
                                    >
                                        <span>{selectedDevelopment.number} / DESIGN DEVELOPMENT</span>
                                        <h4>{selectedDevelopment.title}</h4>
                                        <p>{selectedDevelopment.description}</p>
                                        <small>{selectedDevelopment.keywords}</small>
                                    </div>

                                    <div
                                        className="design-development__tabs ux-architecture__tabs"
                                        role="tablist"
                                        aria-label="디자인 개발 산출물 선택"
                                    >
                                        {designDevelopmentArtifacts.map((item) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={activeDevelopment === item.key}
                                                aria-controls="design-development-panel"
                                                tabIndex={activeDevelopment === item.key ? 0 : -1}
                                                className={
                                                    activeDevelopment === item.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={item.key}
                                                onClick={() => setActiveDevelopment(item.key)}
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        designDevelopmentArtifacts,
                                                        activeDevelopment,
                                                        setActiveDevelopment
                                                    )
                                                }
                                            >
                                                <span>{item.number}</span>
                                                <strong>{item.title}</strong>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className="final-outcome section"
                        id="final-outcome"
                        aria-labelledby="final-outcome-title"
                    >
                        <div className="final-outcome__inner">
                            <header className="final-outcome__header">
                                <div className="final-outcome__meta">
                                    <span>17 / FINAL OUTCOME</span>
                                    <span>NINTENDO / RESPONSIVE WEBSITE</span>
                                </div>
                                <div className="final-outcome__heading">
                                    <h3 id="final-outcome-title">
                                        <span>THE FINAL</span>
                                        <em>Experience.</em>
                                    </h3>
                                    <p>
                                        기획부터 디자인, 인터랙션 구현까지. 디바이스에 맞춰 완성한 닌텐도 웹사이트 리뉴얼 프로젝트.
                                    </p>
                                </div>
                            </header>

                            <div
                                className="final-outcome__tabs"
                                role="tablist"
                                aria-label="최종 결과물 디바이스 선택"
                            >
                                {finalOutcomeViews.map((item) => (
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeFinalOutcome === item.key}
                                        aria-controls="final-outcome-panel"
                                        tabIndex={activeFinalOutcome === item.key ? 0 : -1}
                                        className={
                                            activeFinalOutcome === item.key ? 'is-active' : ''
                                        }
                                        key={item.key}
                                        onClick={() => setActiveFinalOutcome(item.key)}
                                        onKeyDown={(event) =>
                                            handleResearchTabKeyDown(
                                                event,
                                                finalOutcomeViews,
                                                activeFinalOutcome,
                                                setActiveFinalOutcome
                                            )
                                        }
                                    >
                                        <span>{item.number}</span>
                                        <strong>{item.label}</strong>
                                    </button>
                                ))}
                            </div>

                            <div
                                className={`final-outcome__panel final-outcome__panel--${selectedFinalOutcome.key}`}
                                id="final-outcome-panel"
                                role="tabpanel"
                                key={selectedFinalOutcome.key}
                            >
                                <div className="final-outcome__visual">
                                    <div className="final-outcome__media">
                                        <img
                                            src={selectedFinalOutcome.src}
                                            alt={selectedFinalOutcome.alt}
                                        />
                                    </div>
                                </div>
                            </div>

                            <footer className="final-outcome__footer">
                                <p key={`final-copy-${selectedFinalOutcome.key}`}>
                                    {selectedFinalOutcome.description}
                                </p>
                                <a
                                    href="https://mbc-teamproject-red.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    VISIT WEBSITE <span aria-hidden="true">↗</span>
                                </a>
                            </footer>
                        </div>
                    </section>

                    {/*
          <section
            className="nintendo-research section"
            aria-labelledby="nintendo-research-title"
          >
            <header className="nintendo-research__header">
              <div className="nintendo-research__meta">
                <span>10 / RESEARCH &amp; ANALYSIS</span>
                <span>FIELD NOTES · DIGITAL ARCHIVE</span>
              </div>
              <div className="nintendo-research__headline">
                <h3 id="nintendo-research-title">
                  BEYOND THE <em>SCREEN.</em>
                </h3>
                <p>브랜드 경험의 가능성을 발견하기 위한 두 가지 시선.</p>
              </div>
            </header>

            <div
              className="nintendo-research__track-tabs"
              role="tablist"
              aria-label="리서치 유형 선택"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeResearchTrack === "nintendo"}
                aria-controls="nintendo-analysis-panel"
                className={activeResearchTrack === "nintendo" ? "is-active" : ""}
                onClick={() => setActiveResearchTrack("nintendo")}
              >
                <span>01</span> NINTENDO ANALYSIS
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeResearchTrack === "competitive"}
                aria-controls="competitive-research-panel"
                className={activeResearchTrack === "competitive" ? "is-active" : ""}
                onClick={() => setActiveResearchTrack("competitive")}
              >
                <span>02</span> COMPETITIVE RESEARCH
              </button>
            </div>

            {activeResearchTrack === "nintendo" ? (
              <div
                className="nintendo-research__panel nintendo-research__panel--nintendo"
                id="nintendo-analysis-panel"
                role="tabpanel"
                key="nintendo-analysis"
              >
                <figure className="nintendo-research__visual">
                  <div className="nintendo-research__visual-frame">
                    <ResearchMedia
                      key={`${activeNintendoResearch.key}-${activeNintendoResearch.image}`}
                      src={activeNintendoResearch.image}
                      alt={activeNintendoResearch.alt}
                      label={activeNintendoResearch.label}
                    />
                    <span aria-hidden="true">SOURCE / OFFICIAL WEB</span>
                  </div>
                  <figcaption>
                    <span>ACTIVE VIEW</span>
                    <strong>{activeNintendoResearch.label}</strong>
                  </figcaption>
                </figure>

                <div className="nintendo-research__analysis">
                  <div className="nintendo-research__analysis-intro">
                    <span>01 / NINTENDO ANALYSIS</span>
                    <h4>기존 닌텐도 공식 사이트를 6개 기준으로 분석했습니다.</h4>
                  </div>

                  <div className="nintendo-research__criterion-layout">
                    <div
                      className="nintendo-research__criterion-tabs"
                      role="tablist"
                      aria-label="닌텐도 분석 기준 선택"
                    >
                      {nintendoResearchCriteria.map((item, index) => (
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeNintendoCriterion === item.key}
                          className={
                            activeNintendoCriterion === item.key ? "is-active" : ""
                          }
                          key={item.key}
                          onClick={() => setActiveNintendoCriterion(item.key)}
                        >
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <article
                      className="nintendo-research__insight"
                      key={activeNintendoResearch.key}
                    >
                      <span>KEY FINDING</span>
                      <h5>{activeNintendoResearch.label}</h5>
                      <p>{activeNintendoResearch.description}</p>
                      <div aria-hidden="true">
                        <i />
                        <span>ANALYSIS LOG / ACTIVE</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="nintendo-research__panel nintendo-research__panel--competitive"
                id="competitive-research-panel"
                role="tabpanel"
                key="competitive-research"
              >
                <div className="nintendo-research__competitive-visual">
                  <ResearchMedia
                    src="/images/nintendo/research/competitive-research.png"
                    alt="PlayStation, Xbox, Steam Deck 경쟁사 분석 자료"
                    label="COMPETITIVE RESEARCH"
                  />
                  <span aria-hidden="true">REFERENCE BOARD / 03 BRANDS</span>
                </div>

                <div className="nintendo-research__competitive-body">
                  <div className="nintendo-research__competitor-tabs" role="tablist">
                    {competitorResearch.map((item, index) => (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeCompetitor === item.key}
                        className={activeCompetitor === item.key ? "is-active" : ""}
                        key={item.key}
                        onClick={() => setActiveCompetitor(item.key)}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <article
                    className="nintendo-research__competitor-insight"
                    key={activeCompetitorResearch.key}
                  >
                    <div>
                      <span>02 / COMPETITIVE RESEARCH</span>
                      <h4>{activeCompetitorResearch.label}</h4>
                      <p>{activeCompetitorResearch.summary}</p>
                    </div>
                    <ul>
                      {activeCompetitorResearch.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </div>

                <div className="nintendo-research__comparison-index">
                  <span>COMPARISON INDEX</span>
                  <ol>
                    {researchComparisonCriteria.map((criterion, index) => (
                      <li key={criterion}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {criterion}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </section>
          */}

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

                <section
                    className="more-about"
                    id="more-about"
                    ref={moreAboutRef}
                    aria-labelledby="more-about-title"
                >
                    <div
                        className={`more-about-sticky section is-${moreAboutPosition}${activeMoreAboutPanel === 0 ? ' is-intro' : ''}`}
                    >
                        <div className="more-about-heading">
                            <p className="more-about-label">Personal Identity System</p>
                            <h2 id="more-about-title">Beyond the Design.</h2>
                            <p className="more-about-heading__copy">
                                디자인 너머의 취향과 태도, 생각을 기록한 개인 아카이브입니다.
                            </p>
                        </div>
                        <div
                            className={`more-about-intro${activeMoreAboutPanel === 0 ? ' is-active' : ''}`}
                            aria-hidden={activeMoreAboutPanel !== 0}
                        >
                            <div className="more-about-desktop" aria-label="Personal archive files">
                                <span className="more-about-desktop__path" aria-hidden="true">
                                    C:\PERSONAL\ARCHIVE\
                                </span>
                                <span className="more-about-desktop__system" aria-hidden="true">
                                    SYS / 2000 · ONLINE
                                </span>
                                <span className="more-about-desktop__sticker" aria-hidden="true">
                                    ✦
                                </span>

                                <button
                                    className={`identity-file identity-file--profile${visibleMoreAboutCards >= 1 ? ' is-visible' : ''}`}
                                    type="button"
                                    onClick={() => openMoreAboutPanel(1)}
                                    tabIndex={activeMoreAboutPanel === 0 ? 0 : -1}
                                >
                                    <span className="identity-file__bar">
                                        <span>PROFILE.EXE</span>
                                        <span aria-hidden="true">— □ ×</span>
                                    </span>
                                    <span className="identity-profile__body">
                                        <span className="identity-avatar" aria-hidden="true">
                                            <i />
                                            <i />
                                        </span>
                                        <span className="identity-profile__info">
                                            <small>01 / PERSONAL ID</small>
                                            <strong>WHO I AM</strong>
                                            <span className="identity-profile__keywords">
                                                <i>HONEST</i>
                                                <i>CURIOUS</i>
                                                <i>OUTGOING</i>
                                                <i>PLAYFUL</i>
                                            </span>
                                        </span>
                                        <span
                                            className="identity-profile__status"
                                            aria-hidden="true"
                                        >
                                            <span>
                                                <i>SOCIAL MODE</i>
                                                <b>ON</b>
                                            </span>
                                            <span>
                                                <i>CURIOSITY</i>
                                                <b>ACTIVE</b>
                                            </span>
                                            <span>
                                                <i>ENERGY</i>
                                                <b>HIGH</b>
                                            </span>
                                        </span>
                                        <span
                                            className="identity-profile__sparkles"
                                            aria-hidden="true"
                                        >
                                            ✦ ˚ ✧
                                        </span>
                                        <span
                                            className="identity-profile__sticker"
                                            aria-hidden="true"
                                        >
                                            BE
                                            <br />
                                            CURIOUS
                                        </span>
                                    </span>
                                    <span className="identity-file__footer">
                                        <span>STATUS: ONLINE</span>
                                        <span>OPEN ↗</span>
                                    </span>
                                </button>

                                <button
                                    className={`identity-file identity-file--favorites${visibleMoreAboutCards >= 2 ? ' is-visible' : ''}`}
                                    type="button"
                                    onClick={() => openMoreAboutPanel(2)}
                                    tabIndex={activeMoreAboutPanel === 0 ? 0 : -1}
                                >
                                    <span className="identity-file__bar">
                                        <span>FAVORITES.ZIP</span>
                                        <span aria-hidden="true">— □ ×</span>
                                    </span>
                                    <span className="favorites-window__grid" aria-hidden="true">
                                        <i>
                                            <b>✈</b>
                                            <span>
                                                <strong>TRAVEL</strong>
                                                <small>NEW PLACES</small>
                                            </span>
                                        </i>
                                        <i>
                                            <b>◇</b>
                                            <span>
                                                <strong>FASHION</strong>
                                                <small>PERSONAL STYLE</small>
                                            </span>
                                        </i>
                                        <i>
                                            <b>♫</b>
                                            <span>
                                                <strong>MUSIC</strong>
                                                <small>DAILY RHYTHM</small>
                                            </span>
                                        </i>
                                        <i>
                                            <b>☕</b>
                                            <span>
                                                <strong>CAFE</strong>
                                                <small>SLOW MOMENTS</small>
                                            </span>
                                        </i>
                                    </span>
                                    <span className="identity-file__title">
                                        <small>02 / MY ARCHIVE</small>
                                        <strong>WHAT I LOVE</strong>
                                        <span>4 THINGS I LOVE ♡</span>
                                    </span>
                                    <span className="identity-file__footer">
                                        <span>4 ITEMS</span>
                                        <span>OPEN ↗</span>
                                    </span>
                                </button>

                                <button
                                    className={`identity-file identity-file--mindset${visibleMoreAboutCards >= 3 ? ' is-visible' : ''}`}
                                    type="button"
                                    onClick={() => openMoreAboutPanel(3)}
                                    tabIndex={activeMoreAboutPanel === 0 ? 0 : -1}
                                >
                                    <span className="identity-file__bar">
                                        <span>MINDSET.TXT</span>
                                        <span aria-hidden="true">— □ ×</span>
                                    </span>
                                    <span className="mindset-note__copy">
                                        <small>03 / PERSONAL MEMO</small>
                                        <strong>HOW I THINK</strong>
                                        <span className="mindset-note__lead">
                                            TRY FIRST.<i aria-hidden="true">_</i>
                                        </span>
                                        <span className="mindset-note__steps">
                                            <b>01 / LEARN</b>
                                            <b>02 / GROW</b>
                                        </span>
                                        <span className="mindset-note__message">
                                            Progress over perfection.
                                        </span>
                                    </span>
                                    <span className="mindset-note__star" aria-hidden="true">
                                        ✦
                                    </span>
                                    <span className="identity-file__footer">
                                        <span>AUTO SAVED ·</span>
                                        <span>OPEN ↗</span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="more-about-panels">
                            <article
                                className={`more-about-panel${activeMoreAboutPanel === 1 ? ' is-active' : ''}`}
                                data-personality={activePersonalityTrait}
                            >
                                <div className="more-about-panel__copy">
                                    <div className="more-about-panel__meta">
                                        <span>01</span>
                                        <span>Personality</span>
                                    </div>
                                    <h3>
                                        Curious by nature.
                                        <br />
                                        Bold in action.
                                    </h3>
                                    <p className="personality-lead">
                                        새로운 것을 발견하는 호기심과, 생각을 행동으로 옮기는
                                        실행력을 가진 사람입니다.
                                    </p>
                                    <div className="personality-traits">
                                        <button
                                            className={`personality-trait personality-trait--curious${selectedPersonalityTrait === 'curious' ? ' is-selected' : ''}${activePersonalityTrait === 'curious' ? ' is-active' : ''}`}
                                            type="button"
                                            aria-pressed={selectedPersonalityTrait === 'curious'}
                                            onMouseEnter={() =>
                                                setPreviewPersonalityTrait('curious')
                                            }
                                            onMouseLeave={() => setPreviewPersonalityTrait(null)}
                                            onFocus={() => setPreviewPersonalityTrait('curious')}
                                            onBlur={() => setPreviewPersonalityTrait(null)}
                                            onClick={() => setSelectedPersonalityTrait('curious')}
                                        >
                                            <span>01</span>
                                            <strong>CURIOUS</strong>
                                            <p>
                                                익숙하지 않은 것에도 먼저 관심을 갖고, 새로운 시도를
                                                즐깁니다.
                                            </p>
                                            <i aria-hidden="true" />
                                        </button>
                                        <button
                                            className={`personality-trait personality-trait--action${selectedPersonalityTrait === 'action' ? ' is-selected' : ''}${activePersonalityTrait === 'action' ? ' is-active' : ''}`}
                                            type="button"
                                            aria-pressed={selectedPersonalityTrait === 'action'}
                                            onMouseEnter={() =>
                                                setPreviewPersonalityTrait('action')
                                            }
                                            onMouseLeave={() => setPreviewPersonalityTrait(null)}
                                            onFocus={() => setPreviewPersonalityTrait('action')}
                                            onBlur={() => setPreviewPersonalityTrait(null)}
                                            onClick={() => setSelectedPersonalityTrait('action')}
                                        >
                                            <span>02</span>
                                            <strong>ACTION</strong>
                                            <p>
                                                오래 고민하기보다 직접 시도하고, 경험하면서 답을
                                                찾아갑니다.
                                            </p>
                                            <i aria-hidden="true" />
                                        </button>
                                        <button
                                            className={`personality-trait personality-trait--connection${selectedPersonalityTrait === 'connection' ? ' is-selected' : ''}${activePersonalityTrait === 'connection' ? ' is-active' : ''}`}
                                            type="button"
                                            aria-pressed={selectedPersonalityTrait === 'connection'}
                                            onMouseEnter={() =>
                                                setPreviewPersonalityTrait('connection')
                                            }
                                            onMouseLeave={() => setPreviewPersonalityTrait(null)}
                                            onFocus={() => setPreviewPersonalityTrait('connection')}
                                            onBlur={() => setPreviewPersonalityTrait(null)}
                                            onClick={() =>
                                                setSelectedPersonalityTrait('connection')
                                            }
                                        >
                                            <span>03</span>
                                            <strong>CONNECTION</strong>
                                            <p>
                                                다양한 사람과 소통하며 새로운 관점을 발견하는 걸
                                                좋아합니다.
                                            </p>
                                            <i aria-hidden="true" />
                                        </button>
                                        <button
                                            className={`personality-trait personality-trait--positive${selectedPersonalityTrait === 'positive' ? ' is-selected' : ''}${activePersonalityTrait === 'positive' ? ' is-active' : ''}`}
                                            type="button"
                                            aria-pressed={selectedPersonalityTrait === 'positive'}
                                            onMouseEnter={() =>
                                                setPreviewPersonalityTrait('positive')
                                            }
                                            onMouseLeave={() => setPreviewPersonalityTrait(null)}
                                            onFocus={() => setPreviewPersonalityTrait('positive')}
                                            onBlur={() => setPreviewPersonalityTrait(null)}
                                            onClick={() => setSelectedPersonalityTrait('positive')}
                                        >
                                            <span>04</span>
                                            <strong>POSITIVE ENERGY</strong>
                                            <p>
                                                밝고 솔직한 태도로 분위기를 만들고, 유연하게
                                                적응합니다.
                                            </p>
                                            <i aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="more-about-visual more-about-visual--personality"
                                    aria-hidden="true"
                                >
                                    <span className="identity-collage__coords identity-collage__coords--top">
                                        ID.01 / 37°33'N
                                    </span>
                                    <span className="identity-collage__coords identity-collage__coords--bottom">
                                        X 004 / Y 017
                                    </span>
                                    <span className="identity-collage__keyword identity-collage__keyword--honest">
                                        HONEST
                                    </span>
                                    <span className="identity-collage__keyword identity-collage__keyword--curious">
                                        CURIOUS
                                    </span>
                                    <span className="identity-collage__keyword identity-collage__keyword--outgoing">
                                        OUTGOING
                                    </span>
                                    <span className="identity-collage__keyword identity-collage__keyword--playful">
                                        PLAYFUL
                                    </span>
                                    <div className="identity-collage__object">
                                        <span className="identity-collage__orbit" />
                                        <span className="identity-collage__chrome">
                                            <i />
                                            <i />
                                        </span>
                                    </div>
                                    <i className="identity-collage__star identity-collage__star--one">
                                        ✦
                                    </i>
                                    <i className="identity-collage__star identity-collage__star--two">
                                        ✧
                                    </i>
                                    <i className="identity-collage__point identity-collage__point--one" />
                                    <i className="identity-collage__point identity-collage__point--two" />
                                    <span
                                        className="identity-collage__reaction"
                                        key={activePersonalityTrait}
                                    >
                                        {personalityReactions[activePersonalityTrait]}
                                    </span>
                                </div>
                            </article>

                            <article
                                className={`more-about-panel more-about-panel--love${activeMoreAboutPanel === 2 ? ' is-active' : ''}`}
                            >
                                <div className="love-editorial">
                                    <div className="more-about-panel__meta">
                                        <span>02</span>
                                        <span>My Favorites</span>
                                    </div>
                                    <p className="love-editorial__kicker">
                                        PERSONAL DIGITAL ARCHIVE / 04 CATEGORIES
                                    </p>
                                    <h3
                                        className="love-editorial__headline"
                                        key={activeLoveCategory}
                                    >
                                        {activeLove.headline}
                                    </h3>
                                    <p className="love-editorial__description">
                                        {activeLove.description}
                                    </p>
                                    <nav className="love-category-nav" aria-label="취향 카테고리">
                                        {Object.entries(loveCategories).map(([key, category]) => (
                                            <button
                                                className={
                                                    activeLoveCategory === key ? 'is-active' : ''
                                                }
                                                type="button"
                                                key={key}
                                                aria-pressed={activeLoveCategory === key}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setActiveLoveCategory(key);
                                                }}
                                            >
                                                <span>{category.number}</span>
                                                <strong>{category.label}</strong>
                                                <i aria-hidden="true" />
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                                <section
                                    className={`love-archive love-archive--${activeLoveCategory}`}
                                    aria-label={`${activeLove.label} archive`}
                                    aria-live="polite"
                                >
                                    <div className="love-archive__system-bar" aria-hidden="true">
                                        <span>FAVORITES.DB</span>
                                        <span>INDEX / {activeLove.number}</span>
                                    </div>

                                    {activeLoveCategory === 'travel' && (
                                        <div className="love-archive__stage love-travel">
                                            <figure className="love-travel__hero">
                                                <img
                                                    key={activeTravelImage.src}
                                                    src={activeTravelImage.src}
                                                    alt={activeTravelImage.alt}
                                                    style={{
                                                        objectPosition: activeTravelImage.position,
                                                    }}
                                                />
                                                <figcaption>
                                                    <span>ARCHIVE {activeTravelImage.number}</span>
                                                    <strong>{activeTravelImage.city}</strong>
                                                    <small>
                                                        {activeTravelImage.label} / MEMORY FILE
                                                    </small>
                                                </figcaption>
                                                <i aria-hidden="true">VIEW / 35MM</i>
                                            </figure>
                                            <div
                                                className="love-travel__film"
                                                aria-label="여행 사진 선택"
                                            >
                                                {travelArchive.map((image, index) => (
                                                    <button
                                                        className={
                                                            selectedTravelIndex === index
                                                                ? 'is-active'
                                                                : ''
                                                        }
                                                        type="button"
                                                        key={image.src}
                                                        aria-label={`${image.city} ${image.label} 사진 보기`}
                                                        aria-pressed={selectedTravelIndex === index}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setSelectedTravelIndex(index);
                                                        }}
                                                    >
                                                        <img
                                                            src={image.src}
                                                            alt=""
                                                            style={{
                                                                objectPosition: image.position,
                                                            }}
                                                        />
                                                        <span>{image.number}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <span
                                                className="love-archive__chrome-star"
                                                aria-hidden="true"
                                            >
                                                ✦
                                            </span>
                                        </div>
                                    )}

                                    {activeLoveCategory === 'fashion' && (
                                        <div className="love-archive__stage love-fashion">
                                            <figure className="love-fashion__look love-fashion__look--main">
                                                <img
                                                    src="/images/about/paris-view.jpg"
                                                    alt="파리 여행에서 기록한 개인 스타일"
                                                />
                                                <figcaption>LOOK 01 / CITY NEUTRAL</figcaption>
                                            </figure>
                                            <figure className="love-fashion__look love-fashion__look--detail">
                                                <img
                                                    src="/images/about/venice.jpg"
                                                    alt="베네치아 여행에서 기록한 개인 스타일"
                                                />
                                                <figcaption>LOOK 02 / BLACK LAYER</figcaption>
                                            </figure>
                                            <div className="love-fashion__type" aria-hidden="true">
                                                <span>PERSONAL LOOKBOOK</span>
                                                <strong>
                                                    STYLE
                                                    <br />
                                                    IS A MOOD.
                                                </strong>
                                                <small>NEUTRAL · LAYERED · MODERN</small>
                                            </div>
                                            <span
                                                className="love-fashion__chrome"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}

                                    {activeLoveCategory === 'music' && (
                                        <div className="love-archive__stage love-music">
                                            <div className="love-music__player" aria-hidden="true">
                                                <span className="love-music__backplate" />
                                                <div className="love-music__toprail">
                                                    <span>CYBER POP / 03</span>
                                                    <i />
                                                    <i />
                                                    <i />
                                                </div>
                                                <div className="love-music__display">
                                                    <span>VISUAL MODE</span>
                                                    <strong>03:47</strong>
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                </div>
                                                <div className="love-music__disc-bay">
                                                    <div className="love-music__disc">
                                                        <i />
                                                        <span>
                                                            DAILY
                                                            <br />
                                                            MOOD
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="love-music__side-label">
                                                    CHROME DISC ARCHIVE
                                                </span>
                                                <div className="love-music__controls">
                                                    <i>Ⅱ</i>
                                                    <i>‹‹</i>
                                                    <i>››</i>
                                                    <i>◆</i>
                                                </div>
                                                <span className="love-music__speaker" />
                                                <span className="love-music__shine" />
                                            </div>
                                            <div className="love-music__keyring" aria-hidden="true">
                                                <i />
                                                <i />
                                                <i />
                                                <span>♡</span>
                                            </div>
                                            <span
                                                className="love-music__star love-music__star--one"
                                                aria-hidden="true"
                                            >
                                                ✦
                                            </span>
                                            <span
                                                className="love-music__star love-music__star--two"
                                                aria-hidden="true"
                                            >
                                                ✧
                                            </span>
                                            <span
                                                className="love-music__sticker"
                                                aria-hidden="true"
                                            >
                                                MOOD
                                                <br />
                                                ON
                                            </span>
                                            <div className="love-music__caption">
                                                <span>VISUAL SOUND ARCHIVE / NO AUDIO</span>
                                                <strong>
                                                    RHYTHM
                                                    <br />
                                                    EVERY DAY.
                                                </strong>
                                                <div aria-hidden="true">
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                </div>
                                                <small>AMBIENCE · RHYTHM · MEMORY</small>
                                            </div>
                                        </div>
                                    )}

                                    {activeLoveCategory === 'cafe' && (
                                        <div className="love-archive__stage love-cafe">
                                            <span className="love-cafe__orbit" aria-hidden="true" />
                                            <div className="love-cafe__cup" aria-hidden="true">
                                                <span className="love-cafe__rim">
                                                    <i />
                                                </span>
                                                <span className="love-cafe__handle" />
                                                <span className="love-cafe__reflection" />
                                                <span className="love-cafe__saucer" />
                                            </div>
                                            <div className="love-cafe__card">
                                                <div className="love-cafe__card-meta">
                                                    <span>CAFE ARCHIVE</span>
                                                    <span>NO. 004</span>
                                                </div>
                                                <strong>
                                                    PAUSE,
                                                    <br />
                                                    NOTICE,
                                                    <br />
                                                    INSPIRE.
                                                </strong>
                                                <p>
                                                    Soft light, quiet corners
                                                    <br />
                                                    and a little time for myself.
                                                </p>
                                                <div className="love-cafe__card-tags">
                                                    <span>SPACE</span>
                                                    <span>DETAIL</span>
                                                    <span>MOOD</span>
                                                </div>
                                                <div
                                                    className="love-cafe__barcode"
                                                    aria-hidden="true"
                                                >
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                    <i />
                                                </div>
                                                <small>ARCHIVED / 2026.10 · STATUS: SLOW</small>
                                                <span
                                                    className="love-cafe__card-shine"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="love-cafe__sticker" aria-hidden="true">
                                                <span>♡</span>
                                                <strong>
                                                    STAY
                                                    <br />A WHILE
                                                </strong>
                                            </div>
                                            <span className="love-cafe__star" aria-hidden="true">
                                                ✦
                                            </span>
                                            <span className="love-cafe__heart" aria-hidden="true">
                                                ♥
                                            </span>
                                        </div>
                                    )}
                                </section>
                            </article>

                            <article
                                className={`more-about-panel${activeMoreAboutPanel === 3 ? ' is-active' : ''}`}
                            >
                                <div className="more-about-panel__copy">
                                    <div className="more-about-panel__meta">
                                        <span>03</span>
                                        <span>My Mindset</span>
                                    </div>
                                    <h3>
                                        Try first.
                                        <br />
                                        Learn along the way.
                                    </h3>
                                    <p>
                                        완벽한 준비를 기다리기보다 직접 부딪히고 경험하며 배워가는
                                        것을 좋아합니다. 모든 과정이 쉽거나 즐겁지만은 않지만, 한번
                                        시작한 일은 책임감을 가지고 끝까지 해내려고 노력합니다.
                                        예상과 다른 결과를 만나더라도 그 안에서 배울 점을 찾고,
                                        조금씩 더 나은 방향으로 나아갑니다.
                                    </p>
                                    <ul className="more-about-keywords" aria-label="Keywords">
                                        {['TRY', 'LEARN', 'KEEP GOING'].map((keyword) => (
                                            <li key={keyword}>{keyword}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div
                                    className="more-about-visual more-about-visual--mindset"
                                    aria-hidden="true"
                                >
                                    <span>TRY</span>
                                    <i>→</i>
                                    <span>LEARN</span>
                                    <i>→</i>
                                    <span>GROW</span>
                                    <div className="more-about-orbit" />
                                </div>
                            </article>
                        </div>

                        <div className="more-about-progress" aria-hidden="true">
                            {[1, 2, 3].map((panel) => (
                                <i
                                    className={activeMoreAboutPanel === panel ? 'is-active' : ''}
                                    key={panel}
                                />
                            ))}
                        </div>
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
                    onClick={closeDocumentPreview}
                >
                    <div
                        ref={previewDialogRef}
                        className={`document-preview__content${documentPreview.isDetail ? ' document-preview__content--scrollable' : ''}${documentPreview.isResearch ? ' document-preview__content--research' : ''}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="document-preview__close"
                            type="button"
                            aria-label="닫기"
                            onClick={closeDocumentPreview}
                            autoFocus
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <img src={documentPreview.src} alt={documentPreview.alt} />
                    </div>
                </div>
            )}
            {architecturePreview &&
                createPortal(
                    <div
                        className="architecture-preview"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="architecture-preview-title"
                        onClick={closeArchitecturePreview}
                    >
                        <div
                            ref={architectureDialogRef}
                            className="architecture-preview__dialog"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <header>
                                <div>
                                    <span>{architecturePreview.number} / UX ARCHITECTURE</span>
                                    <strong id="architecture-preview-title">
                                        {architecturePreview.title}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    aria-label="확대 이미지 닫기"
                                    onClick={closeArchitecturePreview}
                                    autoFocus
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </header>
                            <div
                                ref={architectureViewportRef}
                                className={`architecture-preview__viewport${architectureZoom > architectureFitZoom + 0.001 ? ' is-zoomed' : ''}`}
                                onPointerDown={handleArchitecturePointerDown}
                                onPointerMove={handleArchitecturePointerMove}
                                onPointerUp={handleArchitecturePointerUp}
                                onPointerCancel={handleArchitecturePointerUp}
                            >
                                <div
                                    className="architecture-preview__canvas"
                                    style={{
                                        width: architectureImageSize.width
                                            ? `max(100%, ${architectureImageSize.width * architectureZoom + 32}px)`
                                            : '100%',
                                        height: architectureImageSize.height
                                            ? `max(100%, ${architectureImageSize.height * architectureZoom + 32}px)`
                                            : '100%',
                                    }}
                                >
                                    <img
                                        src={architecturePreview.src}
                                        alt={architecturePreview.alt}
                                        draggable="false"
                                        width={
                                            architectureImageSize.width
                                                ? architectureImageSize.width * architectureZoom
                                                : undefined
                                        }
                                        height={
                                            architectureImageSize.height
                                                ? architectureImageSize.height * architectureZoom
                                                : undefined
                                        }
                                        onLoad={(event) => {
                                            const { naturalWidth, naturalHeight } =
                                                event.currentTarget;
                                            setArchitectureImageSize({
                                                width: naturalWidth,
                                                height: naturalHeight,
                                            });
                                            fitArchitectureImage(naturalWidth, naturalHeight);
                                        }}
                                    />
                                </div>
                            </div>
                            <footer>
                                <div
                                    className="architecture-preview__controls"
                                    aria-label="이미지 확대 도구"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateArchitectureZoom(
                                                architectureZoom -
                                                    Math.max(0.1, architectureZoom * 0.2)
                                            )
                                        }
                                        disabled={architectureZoom <= 0.05}
                                        aria-label="축소"
                                    >
                                        −
                                    </button>
                                    <span>{Math.round(architectureZoom * 100)}%</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateArchitectureZoom(
                                                architectureZoom +
                                                    Math.max(0.1, architectureZoom * 0.25)
                                            )
                                        }
                                        disabled={architectureZoom >= 3}
                                        aria-label="확대"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            architectureViewMode === 'fit' ? 'is-active' : ''
                                        }
                                        onClick={() => fitArchitectureImage()}
                                    >
                                        FIT
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            architectureViewMode === 'actual' ? 'is-active' : ''
                                        }
                                        onClick={() => {
                                            updateArchitectureZoom(1, 'actual');
                                            centerArchitectureViewport();
                                        }}
                                    >
                                        100%
                                    </button>
                                </div>
                                <p>확대 후 드래그하거나 내부 스크롤로 이미지 전체를 탐색하세요.</p>
                            </footer>
                        </div>
                    </div>,
                    document.body
                )}
            {developmentPreview && selectedDevelopmentImage &&
                createPortal(
                    <div
                        className="architecture-preview development-preview"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="development-preview-title"
                        onClick={closeDevelopmentPreview}
                    >
                        <div
                            ref={developmentDialogRef}
                            className="architecture-preview__dialog development-preview__dialog"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <header>
                                <div>
                                    <span>{developmentPreview.number} / DESIGN DEVELOPMENT</span>
                                    <strong id="development-preview-title">
                                        {developmentPreview.title}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    aria-label="확대 이미지 닫기"
                                    onClick={closeDevelopmentPreview}
                                    autoFocus
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </header>
                            {developmentPreview.modalImages.length > 1 && (
                                <div
                                    className="development-preview__tabs"
                                    role="tablist"
                                    aria-label={`${developmentPreview.title} 상세 이미지 선택`}
                                >
                                    {developmentPreview.modalImages.map((image) => (
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={activeDevelopmentImage === image.key}
                                            tabIndex={activeDevelopmentImage === image.key ? 0 : -1}
                                            className={
                                                activeDevelopmentImage === image.key
                                                    ? 'is-active'
                                                    : ''
                                            }
                                            key={image.key}
                                            onClick={() => selectDevelopmentModalImage(image.key)}
                                            onKeyDown={(event) =>
                                                handleResearchTabKeyDown(
                                                    event,
                                                    developmentPreview.modalImages,
                                                    activeDevelopmentImage,
                                                    selectDevelopmentModalImage
                                                )
                                            }
                                        >
                                            {image.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div
                                className="development-preview__viewer"
                                aria-busy={!isDevelopmentImageReady}
                            >
                                {!isDevelopmentImageReady && (
                                    <span className="development-preview__loading" role="status">
                                        FITTING IMAGE…
                                    </span>
                                )}
                                <div
                                    ref={developmentViewportRef}
                                    className={`architecture-preview__viewport${developmentZoom > developmentFitZoom + 0.001 ? ' is-zoomed' : ''}`}
                                    onPointerDown={handleDevelopmentPointerDown}
                                    onPointerMove={handleDevelopmentPointerMove}
                                    onPointerUp={handleDevelopmentPointerUp}
                                    onPointerCancel={handleDevelopmentPointerUp}
                                >
                                    <div
                                        className="architecture-preview__canvas"
                                        style={{
                                            width: developmentImageSize.width
                                                ? `max(100%, ${developmentImageSize.width * developmentZoom + 32}px)`
                                                : '100%',
                                            height: developmentImageSize.height
                                                ? `max(100%, ${developmentImageSize.height * developmentZoom + 32}px)`
                                                : '100%',
                                        }}
                                    >
                                        <img
                                            key={selectedDevelopmentImage.key}
                                            className={
                                                isDevelopmentImageReady ? 'is-ready' : ''
                                            }
                                            src={selectedDevelopmentImage.src}
                                            alt={selectedDevelopmentImage.alt}
                                            draggable="false"
                                            width={
                                                developmentImageSize.width
                                                    ? developmentImageSize.width * developmentZoom
                                                    : undefined
                                            }
                                            height={
                                                developmentImageSize.height
                                                    ? developmentImageSize.height * developmentZoom
                                                    : undefined
                                            }
                                            onLoad={(event) => {
                                                const { naturalWidth, naturalHeight } =
                                                    event.currentTarget;
                                                prepareDevelopmentImage(
                                                    selectedDevelopmentImage.key,
                                                    naturalWidth,
                                                    naturalHeight
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <footer>
                                <div
                                    className="architecture-preview__controls"
                                    aria-label="이미지 확대 도구"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateDevelopmentZoom(
                                                developmentZoom -
                                                    Math.max(0.1, developmentZoom * 0.2)
                                            )
                                        }
                                        disabled={
                                            !isDevelopmentImageReady || developmentZoom <= 0.05
                                        }
                                        aria-label="축소"
                                    >
                                        −
                                    </button>
                                    <span>
                                        {isDevelopmentImageReady
                                            ? `${Math.round(developmentZoom * 100)}%`
                                            : '—'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateDevelopmentZoom(
                                                developmentZoom +
                                                    Math.max(0.1, developmentZoom * 0.25)
                                            )
                                        }
                                        disabled={
                                            !isDevelopmentImageReady || developmentZoom >= 3
                                        }
                                        aria-label="확대"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            developmentViewMode === 'fit' ? 'is-active' : ''
                                        }
                                        onClick={() => fitDevelopmentImage()}
                                        disabled={!isDevelopmentImageReady}
                                    >
                                        FIT
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            developmentViewMode === 'actual' ? 'is-active' : ''
                                        }
                                        onClick={() => {
                                            updateDevelopmentZoom(1, 'actual');
                                            centerDevelopmentViewport();
                                        }}
                                        disabled={!isDevelopmentImageReady}
                                    >
                                        100%
                                    </button>
                                </div>
                                <p>휠 또는 드래그하거나 내부 스크롤로 이미지 전체를 탐색하세요.</p>
                            </footer>
                        </div>
                    </div>,
                    document.body
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
