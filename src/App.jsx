import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import './nintendoResearch.css';
import './userInterview.css';
import './uxArchitecture.css';
import './designDevelopment.css';
import './finalOutcome.css';
import PersonalProjectsIntro from './PersonalProjectsIntro.jsx';
import DiptyqueProjectIntro from './DiptyqueProjectIntro.jsx';
import DiptyqueProjectShowcase from './DiptyqueProjectShowcase.jsx';
import SwarovskiProjectIntro from './SwarovskiProjectIntro.jsx';
import SwarovskiVisualShowcase from './SwarovskiVisualShowcase.jsx';
import ShortFormContentsIntro from './ShortFormContentsIntro.jsx';
import OtherWorks from './OtherWorks.jsx';
import SkillsTypographyIntro from './SkillsTypographyIntro.jsx';
import SkillsQAFlow from './SkillsQAFlow.jsx';
import ContactSection from './ContactSection.jsx';
import PortfolioChatbot from './PortfolioChatbot.jsx';

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

const designStructureArtifacts = [
    { ...uxArchitectureArtifacts.find((item) => item.key === 'ia'), number: '01' },
    {
        ...uxArchitectureArtifacts.find((item) => item.key === 'flow'),
        number: '02',
        title: 'USER FLOW',
    },
    { ...uxArchitectureArtifacts.find((item) => item.key === 'mindmap'), number: '03' },
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
                src: '/images/nintendo/nintendo-wireframe-main.png',
                alt: 'Nintendo 메인 페이지 전체 와이어프레임',
            },
            {
                key: 'mario',
                label: 'SUPER MARIO',
                src: '/images/nintendo/nintendo-wireframe-mario.png',
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

const researchArchiveCategories = [
    {
        key: 'nintendo',
        label: 'NINTENDO ANALYSIS',
        images: [
            {
                key: 'nintendo-analysis',
                label: 'OVERVIEW',
                src: '/images/nintendo/research/nintendo-analysis.png',
                alt: '닌텐도 공식 사이트 분석을 정리한 리서치 보드',
            },
            {
                key: 'nintendo-home',
                label: 'HOME',
                src: '/images/nintendo/research/nintendo-home.png',
                alt: '닌텐도 공식 사이트 메인 화면 분석 자료',
            },
            {
                key: 'nintendo-store',
                label: 'STORE',
                src: '/images/nintendo/research/nintendo-store.png',
                alt: '닌텐도 공식 사이트 스토어 화면 분석 자료',
            },
            {
                key: 'nintendo-character',
                label: 'CHARACTER',
                src: '/images/nintendo/research/nintendo-character.png',
                alt: '닌텐도 공식 사이트 캐릭터 화면 분석 자료',
            },
        ],
    },
    {
        key: 'competitor',
        label: 'COMPETITOR RESEARCH',
        images: [
            {
                key: 'competitive-research',
                label: 'OVERVIEW',
                src: '/images/nintendo/research/competitive-research.png',
                alt: '경쟁 게임 플랫폼 분석을 정리한 비교 리서치 보드',
            },
            {
                key: 'playstation',
                label: 'PLAYSTATION',
                src: '/images/nintendo/research/PlayStation.png',
                alt: 'PlayStation 공식 사이트 분석 자료',
            },
            {
                key: 'xbox',
                label: 'XBOX',
                src: '/images/nintendo/research/Xbox.png',
                alt: 'Xbox 공식 사이트 분석 자료',
            },
            {
                key: 'steam-deck',
                label: 'STEAM DECK',
                src: '/images/nintendo/research/Steam Deck.png',
                alt: 'Steam Deck 공식 사이트 분석 자료',
            },
        ],
    },
];

const chromeStoryPaths = [
    {
        panel: 3,
        d: 'M 75 255 C 280 170 430 245 575 405 C 730 575 900 650 1080 520 C 1260 390 1375 220 1530 285',
    },
    {
        panel: 4,
        d: 'M 65 690 C 265 610 390 650 565 735 C 760 830 880 575 1040 455 C 1220 320 1380 365 1535 245',
    },
    {
        panel: 5,
        d: 'M 65 315 C 255 210 415 250 590 390 C 770 535 905 630 1090 540 C 1280 445 1380 255 1535 320',
    },
    {
        panel: 6,
        d: 'M 70 735 C 275 690 420 545 610 575 C 815 610 900 355 1100 300 C 1280 250 1405 340 1530 225',
    },
];

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
        label: 'E-SHOP PAGE',
        title: 'E-shop 페이지 공동 제작',
        tags: ['COLLABORATION', 'UI DESIGN', 'FRONT-END'],
        description:
            '팀원과 협업하여 E-shop 페이지의 상품 구성과 UI 디자인, 프론트엔드 구현 작업에 참여했습니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo-eshop-preview.mp4',
            label: '닌텐도 E-shop 페이지 시연 영상',
        },
        href: 'https://mbc-teamproject-red.vercel.app/store',
    },
    {
        number: '04',
        label: 'NINTENDO SWITCH ONLINE',
        title: 'Nintendo Switch Online 페이지 제작',
        tags: ['UI DESIGN', 'FRONT-END', 'COLLABORATION'],
        description:
            'Nintendo Switch Online 서비스 페이지의 UI 디자인과 구현 작업에 참여했습니다.',
        media: {
            type: 'video',
            src: '/videos/nintendo-switch-online-preview.mp4',
            label: 'Nintendo Switch Online 페이지 시연 영상',
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

const interviewEditorial = {
    '01': {
        name: '정원희',
        summary: [
            '유튜브 리뷰를 참고해 게임을 비교하며, 기존에 즐기던 게임을 다시 구매하기도 합니다.',
            '신작 외 인기 게임이 메인에서 잘 보이지 않아 취향에 맞는 게임을 찾기 어렵다고 답했습니다.',
        ],
        needs: '장르·연령·플레이 방식과 취향을 반영한 게임 분류',
        pain: '신작 중심의 메인 화면으로 기존 인기 게임 탐색이 어려움',
        insight: '캐릭터와 게임의 특징을 짧은 영상과 직관적인 정보로 연결',
    },
    '02': {
        name: '김희선',
        summary: [
            '업데이트 확인과 관심 캐릭터 탐색을 위해 사이트를 이용합니다.',
            '인기 캐릭터를 찾으려면 여러 페이지를 이동해야 하고 원하는 정보가 쉽게 드러나지 않는다고 답했습니다.',
        ],
        needs: '인기·성향별 캐릭터 분류와 빠른 캐릭터 탐색 경로',
        pain: '캐릭터 정보가 여러 화면에 흩어져 탐색 단계가 길어짐',
        insight: '캐릭터의 개성과 세계관을 메인에서 시각적으로 선명하게 전달',
    },
    '03': {
        name: '최현석',
        summary: [
            '정확한 정보를 확인하기 위해 공식 사이트와 게임 커뮤니티를 함께 이용합니다.',
            '시리즈와 캐릭터 정보를 찾기 위해 여러 페이지를 방문했고 플레이 영상을 확인하기 어려웠다고 답했습니다.',
        ],
        needs: '시리즈·캐릭터 중심 탐색과 장르·플레이 방식별 세분화',
        pain: '시리즈 정보가 분산되고 실제 게임 플레이 영상 접근이 부족함',
        insight: '시리즈 역사와 라인업, 플레이 콘텐츠를 하나의 흐름으로 연결',
    },
};

const userInsightCategories = [
    {
        key: 'interview',
        label: 'USER INTERVIEW',
        images: userInterviews.map((user) => ({
            key: `interview-${user.number}`,
            label: `USER ${user.number}`,
            src: `/images/nintendo/research/interview-${user.number}.png`,
            alt: `${user.profile} 사용자 인터뷰 자료`,
            pdf: user.pdf,
            ...interviewEditorial[user.number],
        })),
    },
    {
        key: 'persona',
        label: 'PERSONA',
        images: userPersonas.map((user) => ({
            key: `persona-${user.number}`,
            label: `USER ${user.number}`,
            src: user.image,
            alt: `${user.name} 사용자 페르소나 자료`,
        })),
    },
    {
        key: 'journey',
        label: 'USER JOURNEY',
        images: journeyResearch.map((user) => ({
            key: `journey-${user.number}`,
            label: `USER ${user.number}`,
            src: user.journey,
            alt: `${user.name} 사용자 여정 지도`,
        })),
    },
    {
        key: 'canvas',
        label: 'LEAN CANVAS',
        images: journeyResearch.map((user) => ({
            key: `canvas-${user.number}`,
            label: `USER ${user.number}`,
            src: user.canvas,
            alt: `${user.name} 린 캔버스 자료`,
        })),
    },
];

const InterviewEditorialCard = ({ interview, className = '' }) => (
    <article
        className={`nintendo-user-insight__interview-card ${className}`.trim()}
        data-number={interview.label.slice(-2)}
    >
        <header>
            <span>USER INTERVIEW / {interview.label.slice(-2)}</span>
            <strong>{interview.name}</strong>
            <small>RESEARCH DOCUMENT</small>
        </header>
        <section>
            <span>INTERVIEW SUMMARY</span>
            {interview.summary.map((summary) => (
                <p key={summary}>{summary}</p>
            ))}
        </section>
        <dl>
            <div>
                <dt>NEEDS</dt>
                <dd>{interview.needs}</dd>
            </div>
            <div>
                <dt>PAIN POINT</dt>
                <dd>{interview.pain}</dd>
            </div>
            <div>
                <dt>INSIGHT</dt>
                <dd>{interview.insight}</dd>
            </div>
        </dl>
    </article>
);

const parseRgbColor = (color) => {
    const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    return channels?.length === 3 ? channels : null;
};

const interpolatePanelBackground = (panelColors, trackPosition) => {
    const firstPanelIndex = Math.floor(trackPosition);
    const secondPanelIndex = Math.min(firstPanelIndex + 1, panelColors.length - 1);
    const firstColor = panelColors[firstPanelIndex];
    const secondColor = panelColors[secondPanelIndex];

    if (!firstColor || !secondColor) return '';

    const linearProgress = trackPosition - firstPanelIndex;
    const easedProgress = linearProgress * linearProgress * (3 - 2 * linearProgress);
    const channels = firstColor.map((channel, index) =>
        Math.round(channel + (secondColor[index] - channel) * easedProgress)
    );

    return `rgb(${channels.join(', ')})`;
};

function App() {
    const aboutRef = useRef(null);
    const aboutBrowserRef = useRef(null);
    const aboutPopupRef = useRef(null);
    const aboutPopupDragRef = useRef(null);
    const headerRef = useRef(null);
    const heroRef = useRef(null);
    const selectedWorksRef = useRef(null);
    const selectedWorksTitleRef = useRef(null);
    const horizontalStoryRef = useRef(null);
    const horizontalStoryStageRef = useRef(null);
    const horizontalStoryTrackRef = useRef(null);
    const nintendoLateStoryRef = useRef(null);
    const nintendoLateStoryStageRef = useRef(null);
    const nintendoLateStoryTrackRef = useRef(null);
    const personalStoryRef = useRef(null);
    const personalStoryStageRef = useRef(null);
    const personalStoryTrackRef = useRef(null);
    const planningIntroRef = useRef(null);
    const chromeStoryOverlayRef = useRef(null);
    const chromeStoryPathRefs = useRef(new Map());
    const chromeStoryGroupRefs = useRef(new Map());
    const chromeStoryStarRef = useRef(null);
    const researchArchiveRef = useRef(null);
    const userInsightRef = useRef(null);
    const designStructureRef = useRef(null);
    const designDevelopmentArchiveRef = useRef(null);
    const activeResearchArchiveRef = useRef('nintendo');
    const activeResearchArchiveImageRef = useRef('nintendo-analysis');
    const researchArchiveTransitionTimerRef = useRef(null);
    const activeUserInsightRef = useRef('interview');
    const activeUserInsightImageRef = useRef('interview-01');
    const userInsightTransitionTimerRef = useRef(null);
    const activeDesignStructureRef = useRef('ia');
    const designStructureTransitionTimerRef = useRef(null);
    const activeDesignDevelopmentArchiveRef = useRef('wireframe');
    const activeDesignDevelopmentArchiveImageRef = useRef('main');
    const designDevelopmentArchiveTransitionTimerRef = useRef(null);
    const architectureDragRef = useRef(null);
    const architectureViewportRef = useRef(null);
    const architectureDialogRef = useRef(null);
    const architectureZoomRef = useRef(1);
    const developmentDragRef = useRef(null);
    const developmentViewportRef = useRef(null);
    const developmentDialogRef = useRef(null);
    const developmentZoomRef = useRef(1);
    const developmentImageKeyRef = useRef('main');
    const previewTriggerRef = useRef(null);
    const previewDialogRef = useRef(null);
    const topButtonRef = useRef(null);
    const [isAboutHeadlineActive, setIsAboutHeadlineActive] = useState(false);
    const [aboutPopupPosition, setAboutPopupPosition] = useState({ x: 0, y: 0 });
    const [isAboutPopupDragging, setIsAboutPopupDragging] = useState(false);
    const [isNavOnDark, setIsNavOnDark] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
    const [isTopButtonOnDark, setIsTopButtonOnDark] = useState(true);
    const [isSelectedWorksTitleVisible, setIsSelectedWorksTitleVisible] = useState(false);
    const [isPlanningIntroVisible, setIsPlanningIntroVisible] = useState(false);
    const [nintendoComparePosition, setNintendoComparePosition] = useState(50);
    const [activeResearchArchive, setActiveResearchArchive] = useState('nintendo');
    const [activeResearchArchiveImage, setActiveResearchArchiveImage] =
        useState('nintendo-analysis');
    const [previousResearchArchive, setPreviousResearchArchive] = useState(null);
    const [activeUserInsight, setActiveUserInsight] = useState('interview');
    const [activeUserInsightImage, setActiveUserInsightImage] = useState('interview-01');
    const [previousUserInsight, setPreviousUserInsight] = useState(null);
    const [activeDesignStructure, setActiveDesignStructure] = useState('ia');
    const [previousDesignStructure, setPreviousDesignStructure] = useState(null);
    const [activeDesignDevelopmentArchive, setActiveDesignDevelopmentArchive] =
        useState('wireframe');
    const [activeDesignDevelopmentArchiveImage, setActiveDesignDevelopmentArchiveImage] =
        useState('main');
    const [previousDesignDevelopmentArchive, setPreviousDesignDevelopmentArchive] = useState(null);
    const [documentPreview, setDocumentPreview] = useState(null);
    const [architecturePreview, setArchitecturePreview] = useState(null);
    const [architectureZoom, setArchitectureZoom] = useState(1);
    const [architectureFitZoom, setArchitectureFitZoom] = useState(1);
    const [architectureImageSize, setArchitectureImageSize] = useState({ width: 0, height: 0 });
    const [architectureViewMode, setArchitectureViewMode] = useState('fit');
    const [developmentPreview, setDevelopmentPreview] = useState(null);
    const [activeDevelopmentImage, setActiveDevelopmentImage] = useState('main');
    const [developmentZoom, setDevelopmentZoom] = useState(1);
    const [developmentFitZoom, setDevelopmentFitZoom] = useState(1);
    const [developmentImageSize, setDevelopmentImageSize] = useState({ width: 0, height: 0 });
    const [developmentViewMode, setDevelopmentViewMode] = useState('fit');
    const [isDevelopmentImageReady, setIsDevelopmentImageReady] = useState(false);
    const [activeUserInterview, setActiveUserInterview] = useState('user-01');

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

    const openDevelopmentPreview = (item, event, imageKey = item.modalImages[0].key) => {
        previewTriggerRef.current = event.currentTarget;
        setDevelopmentPreview(item);
        selectDevelopmentModalImage(imageKey);
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
        const resetAboutPopupPosition = () => setAboutPopupPosition({ x: 0, y: 0 });
        window.addEventListener('resize', resetAboutPopupPosition);
        return () => window.removeEventListener('resize', resetAboutPopupPosition);
    }, []);

    useEffect(() => {
        const section = aboutRef.current;
        if (!section) return undefined;

        const desktopQuery = window.matchMedia('(min-width: 901px)');
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;

        const clamp = (value) => Math.min(1, Math.max(0, value));
        const segment = (progress, start, end) => clamp((progress - start) / (end - start));
        const setCompleted = () => {
            [
                '--about-browser-progress',
                '--about-photo-progress',
                '--about-name-ko-progress',
                '--about-name-en-progress',
                '--about-role-progress',
                '--about-lead-progress',
                '--about-body-progress',
                '--about-popup-progress',
            ].forEach((property) => section.style.setProperty(property, '1'));
        };
        const renderAboutScroll = () => {
            frame = 0;
            if (!desktopQuery.matches || reducedMotionQuery.matches) {
                setCompleted();
                return;
            }
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
            const progress = clamp((window.scrollY - sectionTop) / scrollRange);
            const values = {
                '--about-browser-progress': segment(progress, 0, 0.17),
                '--about-photo-progress': segment(progress, 0.15, 0.34),
                '--about-name-ko-progress': segment(progress, 0.31, 0.43),
                '--about-name-en-progress': segment(progress, 0.36, 0.48),
                '--about-role-progress': segment(progress, 0.41, 0.53),
                '--about-lead-progress': segment(progress, 0.47, 0.62),
                '--about-body-progress': segment(progress, 0.55, 0.7),
                '--about-popup-progress': segment(progress, 0.66, 0.82),
            };
            Object.entries(values).forEach(([property, value]) =>
                section.style.setProperty(property, value.toFixed(4))
            );
        };
        const requestAboutRender = () => {
            if (!frame) frame = window.requestAnimationFrame(renderAboutScroll);
        };

        renderAboutScroll();
        window.addEventListener('scroll', requestAboutRender, { passive: true });
        window.addEventListener('resize', requestAboutRender);
        desktopQuery.addEventListener('change', requestAboutRender);
        reducedMotionQuery.addEventListener('change', requestAboutRender);
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestAboutRender);
            window.removeEventListener('resize', requestAboutRender);
            desktopQuery.removeEventListener('change', requestAboutRender);
            reducedMotionQuery.removeEventListener('change', requestAboutRender);
        };
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let scrollDistance = 0;
        let animationFrame = null;

        const updateNavigation = () => {
            const currentScrollY = window.scrollY;
            const heroBottom = heroRef.current
                ? heroRef.current.offsetTop + heroRef.current.offsetHeight
                : window.innerHeight;
            const delta = currentScrollY - lastScrollY;

            if (currentScrollY < heroBottom) {
                setIsNavHidden(false);
                scrollDistance = 0;
            } else if (Math.abs(delta) > 1) {
                if (Math.sign(delta) !== Math.sign(scrollDistance)) scrollDistance = 0;
                scrollDistance += delta;

                if (scrollDistance >= 10) {
                    setIsNavHidden(true);
                    scrollDistance = 0;
                } else if (scrollDistance <= -10) {
                    setIsNavHidden(false);
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

            const topButton = topButtonRef.current;

            if (topButton) {
                const buttonRect = topButton.getBoundingClientRect();
                const sampleX = Math.min(
                    Math.max(buttonRect.left + buttonRect.width / 2, 0),
                    window.innerWidth - 1
                );
                const sampleY = Math.min(
                    Math.max(buttonRect.top + buttonRect.height / 2, 0),
                    window.innerHeight - 1
                );
                const backgroundLayer = document
                    .elementsFromPoint(sampleX, sampleY)
                    .find((element) => {
                        if (topButton.contains(element)) return false;

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
                        setIsTopButtonOnDark(luminance < 0.5);
                    }
                }
            }

            lastScrollY = currentScrollY;
            animationFrame = null;
        };

        const handleScroll = () => {
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
        const section = planningIntroRef.current;
        if (!section) return undefined;

        if (!('IntersectionObserver' in window)) {
            const frameId = window.requestAnimationFrame(() => setIsPlanningIntroVisible(true));
            return () => window.cancelAnimationFrame(frameId);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setIsPlanningIntroVisible(true);
                observer.disconnect();
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        const story = horizontalStoryRef.current;
        const stage = horizontalStoryStageRef.current;
        const track = horizontalStoryTrackRef.current;
        const chromeOverlay = chromeStoryOverlayRef.current;
        const chromeStar = chromeStoryStarRef.current;
        const chromePathPreview = track?.querySelector('.nintendo-chrome-path-preview');

        if (!story || !stage || !track || !chromeOverlay || !chromeStar || !chromePathPreview) {
            return undefined;
        }

        const desktopQuery = window.matchMedia('(min-width: 901px)');
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const panels = Array.from(track.children).filter((panel) =>
            panel.classList.contains('section')
        );
        let animationFrame = null;
        let isHorizontal = false;
        let storyStart = 0;
        let horizontalTravelDistance = 0;
        let verticalScrollDistance = 0;
        let timeline = [];
        let panelAlignmentDistances = [];
        const chromePathLengths = new Map();
        let activeChromePanel = null;
        let activePanelIndex = -1;
        let snapTimer = null;
        let snapAnimationFrame = null;
        let initializationFrame = null;
        let isSnapping = false;
        let isDisposed = false;
        let lastScrollY = window.scrollY;
        let lastScrollDirection = 0;
        let lastDiagnosticScrollTime = 0;
        let layoutResizeObserver = null;
        let diagnosticResizeObserver = null;
        let diagnosticMutationObserver = null;
        const isDevelopment = import.meta.env.DEV;
        const diagnosticStore = isDevelopment
            ? (window.__NINTENDO_HORIZONTAL_DEBUG__ ??= {
                  history: [],
                  instanceCount: 0,
              })
            : null;
        const diagnosticInstance = diagnosticStore ? (diagnosticStore.instanceCount += 1) : null;

        const describeElement = (element) => {
            if (!element) return null;
            const style = window.getComputedStyle(element);
            return {
                nodeName: element.nodeName,
                id: element.id,
                className:
                    typeof element.className === 'string'
                        ? element.className
                        : element.className?.baseVal,
                scrollTop: element.scrollTop,
                clientHeight: element.clientHeight,
                scrollHeight: element.scrollHeight,
                overflowY: style.overflowY,
                position: style.position,
                transform: style.transform,
            };
        };

        const getScrollableAncestors = () => {
            const ancestors = [];
            let element = story.parentElement;

            while (element) {
                const style = window.getComputedStyle(element);
                if (
                    element.scrollHeight > element.clientHeight + 1 ||
                    ['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowY) ||
                    style.transform !== 'none'
                ) {
                    ancestors.push(describeElement(element));
                }
                element = element.parentElement;
            }

            return ancestors;
        };

        const getDiagnosticSnapshot = () => ({
            instance: diagnosticInstance,
            timestamp: new Date().toISOString(),
            readyState: document.readyState,
            fonts: document.fonts?.status ?? 'unsupported',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio,
            },
            media: {
                desktop: desktopQuery.matches,
                reducedMotion: reducedMotionQuery.matches,
            },
            isHorizontal,
            storyClass: story.className,
            storyStart,
            storyHeight: story.getBoundingClientRect().height,
            storyScrollHeight: story.scrollHeight,
            stage: {
                clientWidth: stage.clientWidth,
                clientHeight: stage.clientHeight,
                scrollWidth: stage.scrollWidth,
                scrollHeight: stage.scrollHeight,
                position: window.getComputedStyle(stage).position,
                overflow: window.getComputedStyle(stage).overflow,
            },
            track: {
                clientWidth: track.clientWidth,
                scrollWidth: track.scrollWidth,
                transform: window.getComputedStyle(track).transform,
                display: window.getComputedStyle(track).display,
            },
            horizontalTravelDistance,
            verticalScrollDistance,
            scrollY: window.scrollY,
            scrollRoots: {
                scrollingElement: describeElement(document.scrollingElement),
                documentElement: describeElement(document.documentElement),
                body: describeElement(document.body),
                scrollableStoryAncestors: getScrollableAncestors(),
                visualViewport: window.visualViewport
                    ? {
                          pageTop: window.visualViewport.pageTop,
                          offsetTop: window.visualViewport.offsetTop,
                          height: window.visualViewport.height,
                      }
                    : null,
            },
            documentScrollHeight: document.documentElement.scrollHeight,
            panels: panels.map((panel, index) => ({
                index,
                className: panel.className,
                clientHeight: panel.clientHeight,
                scrollHeight: panel.scrollHeight,
                offsetLeft: panel.offsetLeft,
            })),
        });

        const recordDiagnostic = (event, details = {}) => {
            if (!diagnosticStore) return;
            const entry = { event, details, ...getDiagnosticSnapshot() };
            diagnosticStore.latest = entry;
            diagnosticStore.history.push(entry);
            if (diagnosticStore.history.length > 100) diagnosticStore.history.shift();
            console.info(`[Nintendo horizontal #${diagnosticInstance}] ${event}`, entry);
        };

        if (diagnosticStore) {
            diagnosticStore.snapshot = getDiagnosticSnapshot;
            diagnosticStore.help =
                'Run __NINTENDO_HORIZONTAL_DEBUG__.snapshot() for current values or inspect .latest and .history.';
            recordDiagnostic('effect:init', {
                styleSheets: Array.from(document.styleSheets, (sheet) => sheet.href ?? 'inline'),
            });
        }

        const cancelSnap = () => {
            if (snapTimer !== null) {
                window.clearTimeout(snapTimer);
                snapTimer = null;
            }
            if (snapAnimationFrame !== null) {
                window.cancelAnimationFrame(snapAnimationFrame);
                snapAnimationFrame = null;
            }
            isSnapping = false;
            lastScrollY = window.scrollY;
        };

        const setActivePanel = (nextIndex) => {
            if (nextIndex === activePanelIndex) return;
            activePanelIndex = nextIndex;

            panels.forEach((panel, index) => {
                const shouldBeInert = index !== nextIndex;
                if (shouldBeInert && panel.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
                panel.inert = shouldBeInert;
            });
        };

        const hideChromeGuide = () => {
            if (activeChromePanel !== null) {
                chromeStoryGroupRefs.current.get(activeChromePanel)?.classList.remove('is-active');
            }
            activeChromePanel = null;
            chromeOverlay.classList.remove('is-visible');
            chromeOverlay.removeAttribute('data-chrome-panel');
            chromeStar.style.opacity = '0';
            chromeOverlay.style.setProperty('--nintendo-02-trail-progress', '0');
            chromeOverlay.style.setProperty('--nintendo-02-star-progress', '0');
        };

        const updateChromePathPreview = (position) => {
            const phase = position.phase;
            const holdReveal = 0.8;
            const arrivalReveal = 0.42;
            const lastPanelIndex = panels.length - 1;
            const previewSegmentCount = Math.max(1, lastPanelIndex - 1);
            let progress = 0;

            if (
                phase?.type === 'hold' &&
                phase.panel >= 2 &&
                phase.panel <= lastPanelIndex
            ) {
                const segment = phase.panel - 2;
                const segmentStart = segment === 0 ? 0 : segment + arrivalReveal;
                const segmentEnd =
                    segment + (phase.panel === lastPanelIndex ? 1 : holdReveal);
                progress =
                    (segmentStart + (segmentEnd - segmentStart) * position.phaseProgress) /
                    previewSegmentCount;
            } else if (
                phase?.type === 'transition' &&
                phase.from >= 2 &&
                phase.from < lastPanelIndex
            ) {
                const segment = phase.from - 2;
                const transitionStart = segment + holdReveal;
                const transitionEnd = segment + 1 + arrivalReveal;
                progress =
                    (transitionStart + (transitionEnd - transitionStart) * position.phaseProgress) /
                    previewSegmentCount;
            } else if (phase?.type === 'complete') {
                progress = 1;
            }

            chromePathPreview.style.setProperty(
                '--chrome-preview-progress',
                Math.min(1, Math.max(0, progress)).toFixed(4)
            );
        };

        const updateChromeGuide = (position) => {
            const phase = position.phase;
            if (!phase || phase.type !== 'hold' || phase.panel < 2) {
                hideChromeGuide();
                return;
            }

            const panel = phase.panel;

            if (panel === 2) {
                if (activeChromePanel !== null) {
                    chromeStoryGroupRefs.current
                        .get(activeChromePanel)
                        ?.classList.remove('is-active');
                    activeChromePanel = null;
                }

                const progress = position.holdProgress;
                const trailProgress = Math.min(1, progress / 0.68);
                const starProgress = Math.min(1, Math.max(0, (progress - 0.68) / 0.32));
                chromeOverlay.style.setProperty(
                    '--nintendo-02-trail-progress',
                    trailProgress.toFixed(4)
                );
                chromeOverlay.style.setProperty(
                    '--nintendo-02-star-progress',
                    starProgress.toFixed(4)
                );
                chromeStar.style.opacity = '0';
                chromeOverlay.dataset.chromePanel = '2';
                chromeOverlay.classList.add('is-visible');
                return;
            }

            const path = chromeStoryPathRefs.current.get(panel);
            const group = chromeStoryGroupRefs.current.get(panel);
            if (!path || !group) {
                hideChromeGuide();
                return;
            }

            chromeOverlay.dataset.chromePanel = String(panel);

            if (activeChromePanel !== panel) {
                if (activeChromePanel !== null) {
                    chromeStoryGroupRefs.current
                        .get(activeChromePanel)
                        ?.classList.remove('is-active');
                }
                group.classList.add('is-active');
                activeChromePanel = panel;
            }

            const progress = position.holdProgress;
            group.style.setProperty('--chrome-path-progress', progress.toFixed(4));

            let pathLength = chromePathLengths.get(panel);
            if (!pathLength) {
                pathLength = path.getTotalLength();
                chromePathLengths.set(panel, pathLength);
            }

            const point = path.getPointAtLength(pathLength * progress);
            const tangentDistance = Math.min(3, pathLength * 0.01);
            const previousPoint = path.getPointAtLength(
                Math.max(0, pathLength * progress - tangentDistance)
            );
            const nextPoint = path.getPointAtLength(
                Math.min(pathLength, pathLength * progress + tangentDistance)
            );
            const angle =
                (Math.atan2(nextPoint.y - previousPoint.y, nextPoint.x - previousPoint.x) * 180) /
                Math.PI;

            chromeStar.setAttribute(
                'transform',
                `translate(${point.x} ${point.y}) rotate(${angle}) translate(-43 -43)`
            );
            chromeStar.style.opacity = '1';
            chromeOverlay.classList.add('is-visible');
        };

        const resetStory = () => {
            cancelSnap();
            isHorizontal = false;
            activePanelIndex = -1;
            story.classList.remove('is-horizontal');
            story.style.removeProperty('height');
            story.style.removeProperty('--horizontal-panel-width');
            story.style.removeProperty('--horizontal-preview-panel-count');
            story.style.removeProperty('--horizontal-hold-progress');
            story.removeAttribute('data-horizontal-phase');
            track.style.removeProperty('width');
            track.style.removeProperty('transform');
            chromePathPreview.style.removeProperty('width');
            chromePathPreview.style.removeProperty('--chrome-preview-progress');
            hideChromeGuide();
            timeline = [];
            panelAlignmentDistances = [];
            panels.forEach((panel) => {
                panel.inert = false;
                panel.style.removeProperty('--nintendo-title-reveal');
                panel.style.removeProperty('--nintendo-title-line-1-reveal');
                panel.style.removeProperty('--nintendo-title-line-2-reveal');
            });
        };

        const getTimelinePosition = (scrollDistance) => {
            const clampedDistance = Math.min(verticalScrollDistance, Math.max(0, scrollDistance));
            const phase =
                timeline.find(({ end }) => clampedDistance < end) ?? timeline[timeline.length - 1];

            if (!phase) {
                return {
                    activePanel: 0,
                    holdProgress: 0,
                    phaseProgress: 0,
                    offset: 0,
                    phase: null,
                };
            }

            const phaseProgress = Math.min(
                1,
                Math.max(0, (clampedDistance - phase.start) / phase.distance)
            );

            if (phase.type === 'hold') {
                const holdProgress = Math.min(
                    1,
                    Math.max(
                        0,
                        (clampedDistance - phase.start) /
                            (phase.revealDistance ?? phase.distance)
                    )
                );
                return {
                    activePanel: phase.panel,
                    holdProgress,
                    phaseProgress: holdProgress,
                    offset: phase.offset,
                    phase,
                };
            }

            if (phase.type === 'complete') {
                return {
                    activePanel: phase.panel,
                    holdProgress: 1,
                    phaseProgress,
                    offset: phase.offset,
                    phase,
                };
            }

            return {
                activePanel: phaseProgress < 0.5 ? phase.from : phase.to,
                holdProgress: phase.from >= 2 ? 1 : 0,
                phaseProgress,
                offset: phase.fromOffset + (phase.toOffset - phase.fromOffset) * phaseProgress,
                phase,
            };
        };

        const updateStory = () => {
            animationFrame = null;
            if (!isHorizontal) return;

            const scrollDistance = window.scrollY - storyStart;
            const position = getTimelinePosition(scrollDistance);
            const offset = Math.min(horizontalTravelDistance, position.offset);
            track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            story.style.setProperty('--horizontal-hold-progress', position.holdProgress.toFixed(4));
            panels.forEach((panel, panelIndex) => {
                if (panelIndex < 2 || panelIndex >= panels.length) return;
                const holdPhase = timeline.find(
                    (phase) => phase.type === 'hold' && phase.panel === panelIndex
                );
                if (!holdPhase) return;
                const titleReveal = Math.min(
                    1,
                    Math.max(
                        0,
                        (scrollDistance - holdPhase.start) / holdPhase.revealDistance
                    )
                );
                panel.style.setProperty(
                    '--nintendo-title-reveal',
                    `${(titleReveal * 100).toFixed(3)}%`
                );
                const firstLineReveal = Math.min(1, titleReveal * 2);
                const secondLineReveal = Math.min(
                    1,
                    Math.max(0, (titleReveal - 0.5) * 2)
                );
                panel.style.setProperty(
                    '--nintendo-title-line-1-reveal',
                    `${(firstLineReveal * 100).toFixed(3)}%`
                );
                panel.style.setProperty(
                    '--nintendo-title-line-2-reveal',
                    `${(secondLineReveal * 100).toFixed(3)}%`
                );
            });
            story.dataset.horizontalPhase = position.phase?.type ?? 'transition';
            setActivePanel(position.activePanel);
            updateChromePathPreview(position);
            if (scrollDistance > verticalScrollDistance) {
                hideChromeGuide();
            } else {
                updateChromeGuide(position);
            }
        };

        const scheduleUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateStory);
            }
        };

        const snapToNearestPanel = () => {
            snapTimer = null;
            if (!isHorizontal || isSnapping) return;

            const currentY = window.scrollY;
            const storyEnd = storyStart + verticalScrollDistance;
            if (currentY < storyStart || currentY > storyEnd) return;

            const currentDistance = currentY - storyStart;
            const { phase } = getTimelinePosition(currentDistance);
            if (!phase || phase.type !== 'transition') return;

            const distanceFromStart = currentDistance - phase.start;
            const distanceToEnd = phase.end - currentDistance;
            const targetDistance = distanceFromStart <= distanceToEnd ? phase.start : phase.end;
            const targetY = storyStart + targetDistance;
            const distance = targetY - currentY;
            const absoluteDistance = Math.abs(distance);
            const snapThreshold = phase.distance * 0.3;
            const reverseCorrectionThreshold = phase.distance * 0.04;
            const movesAgainstDirection =
                (lastScrollDirection > 0 && distance < 0) ||
                (lastScrollDirection < 0 && distance > 0);

            if (
                absoluteDistance < 1 ||
                absoluteDistance > snapThreshold ||
                (movesAgainstDirection && absoluteDistance > reverseCorrectionThreshold)
            ) {
                return;
            }

            const startY = currentY;
            const distanceRatio = Math.min(1, absoluteDistance / snapThreshold);
            const duration = Math.min(520, Math.max(320, 300 + Math.sqrt(distanceRatio) * 220));
            let startTime = null;
            isSnapping = true;

            const animateSnap = (time) => {
                if (!isSnapping) return;
                if (startTime === null) startTime = time;

                const progress = Math.min(1, (time - startTime) / duration);
                const easedProgress =
                    progress * progress * progress * (progress * (progress * 6 - 15) + 10);
                window.scrollTo({
                    top: startY + distance * easedProgress,
                    behavior: 'instant',
                });

                if (progress < 1) {
                    snapAnimationFrame = window.requestAnimationFrame(animateSnap);
                    return;
                }

                snapAnimationFrame = null;
                isSnapping = false;
                lastScrollY = targetY;
                updateStory();
            };

            snapAnimationFrame = window.requestAnimationFrame(animateSnap);
        };

        const scheduleSnap = () => {
            if (!isHorizontal || isSnapping) return;
            if (snapTimer !== null) window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(snapToNearestPanel, 220);
        };

        const handleStoryScroll = () => {
            const currentY = window.scrollY;
            if (!isSnapping) {
                const delta = currentY - lastScrollY;
                if (Math.abs(delta) > 0.5) lastScrollDirection = Math.sign(delta);
                scheduleSnap();
            }
            lastScrollY = currentY;
            scheduleUpdate();
            if (isDevelopment && performance.now() - lastDiagnosticScrollTime > 500) {
                lastDiagnosticScrollTime = performance.now();
                recordDiagnostic('scroll');
            }
        };

        const handleWheel = (event) => {
            cancelSnap();
            scheduleUpdate();
            recordDiagnostic('wheel', {
                deltaX: event.deltaX,
                deltaY: event.deltaY,
                deltaMode: event.deltaMode,
                defaultPrevented: event.defaultPrevented,
                target: event.target?.className ?? event.target?.nodeName,
                path: event
                    .composedPath()
                    .filter((element) => element instanceof Element)
                    .slice(0, 8)
                    .map(describeElement),
            });
        };

        const handleAnyScroll = (event) => {
            if (!isDevelopment || performance.now() - lastDiagnosticScrollTime <= 250) return;
            lastDiagnosticScrollTime = performance.now();
            recordDiagnostic('scroll:capture', {
                target: event.target === document ? 'document' : describeElement(event.target),
            });
        };

        const handleScrollKeyInput = (event) => {
            if (
                ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(
                    event.key
                )
            ) {
                cancelSnap();
            }
        };

        const isPanelOverflowing = (panel, index, stageHeight) => {
            if (index !== 1) return panel.scrollHeight > stageHeight + 2;

            const panelRect = panel.getBoundingClientRect();
            const contentElements = [
                panel.querySelector('.section-index'),
                panel.querySelector('.nintendo-intro__visual img'),
                panel.querySelector('.nintendo-intro__content'),
            ].filter(Boolean);

            return contentElements.some((element) => {
                const rect = element.getBoundingClientRect();
                return rect.top < panelRect.top - 2 || rect.bottom > panelRect.bottom + 2;
            });
        };

        const measureStory = () => {
            resetStory();
            recordDiagnostic('measure:start');

            if (!desktopQuery.matches || reducedMotionQuery.matches || window.innerHeight < 760) {
                recordDiagnostic('measure:rejected-media-or-height', {
                    minimumHeight: 760,
                });
                return;
            }

            story.classList.add('is-horizontal');
            chromePathLengths.clear();
            const stageHeight = stage.clientHeight;
            const stageWidth = stage.clientWidth;
            const lastPanel = panels[panels.length - 1];
            story.style.setProperty('--horizontal-panel-width', `${stageWidth}px`);
            story.style.setProperty(
                '--horizontal-preview-panel-count',
                String(Math.max(1, panels.length - 2))
            );
            track.style.width = `${stageWidth * panels.length}px`;
            chromePathPreview.style.width = `${stageWidth * Math.max(1, panels.length - 2)}px`;
            const hasOverflowingPanel = panels.some((panel, index) =>
                isPanelOverflowing(panel, index, stageHeight)
            );

            if (hasOverflowingPanel) {
                recordDiagnostic('measure:rejected-overflow', {
                    stageHeight,
                    overflowingPanels: panels
                        .map((panel, index) => ({ index, scrollHeight: panel.scrollHeight }))
                        .filter((panel) => panel.scrollHeight > stageHeight + 2),
                });
                resetStory();
                return;
            }

            horizontalTravelDistance = Math.max(
                0,
                lastPanel.offsetLeft + lastPanel.offsetWidth - stageWidth
            );
            if (horizontalTravelDistance <= 0) {
                recordDiagnostic('measure:rejected-no-horizontal-travel');
                resetStory();
                return;
            }

            const transitionDistance = stageWidth * 1.25;
            const holdDistance = Math.min(900, Math.max(500, stageWidth * 0.42));
            const completionHoldDistance = Math.min(
                180,
                Math.max(120, stageWidth * 0.075)
            );
            let timelineCursor = 0;

            timeline = [];
            panelAlignmentDistances = Array(panels.length).fill(0);

            const addTransition = (from, to) => {
                const start = timelineCursor;
                const end = start + transitionDistance;
                timeline.push({
                    type: 'transition',
                    from,
                    to,
                    fromOffset: panels[from].offsetLeft,
                    toOffset: panels[to].offsetLeft,
                    start,
                    end,
                    distance: transitionDistance,
                });
                timelineCursor = end;
                panelAlignmentDistances[to] = end;
            };

            const addHold = (panel) => {
                const start = timelineCursor;
                const end = start + holdDistance + completionHoldDistance;
                timeline.push({
                    type: 'hold',
                    panel,
                    offset: panels[panel].offsetLeft,
                    start,
                    end,
                    distance: holdDistance + completionHoldDistance,
                    revealDistance: holdDistance,
                    completionHoldDistance,
                });
                timelineCursor = end;
            };

            addTransition(0, 1);
            addTransition(1, 2);
            for (let panel = 2; panel < panels.length; panel += 1) {
                addHold(panel);
                if (panel < panels.length - 1) addTransition(panel, panel + 1);
            }

            verticalScrollDistance = timelineCursor;
            story.style.height = `${stageHeight + verticalScrollDistance}px`;
            story.style.setProperty('--horizontal-panel-width', `${stage.clientWidth}px`);
            if (panels.some((panel, index) => isPanelOverflowing(panel, index, stageHeight))) {
                recordDiagnostic('measure:rejected-overflow-after-timeline', {
                    stageHeight,
                    overflowingPanels: panels
                        .map((panel, index) => ({ index, scrollHeight: panel.scrollHeight }))
                        .filter((panel) => panel.scrollHeight > stageHeight + 2),
                });
                resetStory();
                return;
            }
            horizontalTravelDistance = Math.max(
                0,
                lastPanel.offsetLeft + lastPanel.offsetWidth - stageWidth
            );
            story.style.height = `${stageHeight + verticalScrollDistance}px`;
            storyStart = story.offsetTop;
            isHorizontal = true;
            lastScrollY = window.scrollY;
            updateStory();
            recordDiagnostic('measure:activated');
        };

        const scrollToNintendoPanel = (behavior = 'auto') => {
            if (!isHorizontal) return;
            cancelSnap();
            const target = track.querySelector('#nintendo');
            if (!target) return;

            const targetIndex = panels.indexOf(target);
            const targetDistance = panelAlignmentDistances[targetIndex];
            if (!Number.isFinite(targetDistance)) return;
            window.scrollTo({
                top: storyStart + targetDistance,
                behavior,
            });
        };

        const handleDocumentClick = (event) => {
            const link = event.target.closest('a[href="#nintendo"]');
            if (!link || !isHorizontal) return;

            event.preventDefault();
            if (window.location.hash !== '#nintendo') {
                window.history.pushState(null, '', '#nintendo');
            }
            scrollToNintendoPanel('smooth');
        };

        const handleHistoryNavigation = () => {
            if (window.location.hash === '#nintendo') {
                scrollToNintendoPanel('auto');
            }
        };

        const handleResize = () => {
            recordDiagnostic('resize:scheduled');
            const currentY = window.scrollY;
            const shouldPreserveTimelinePosition =
                isHorizontal &&
                currentY >= storyStart &&
                currentY <= storyStart + verticalScrollDistance;
            const previousTimelineProgress = shouldPreserveTimelinePosition
                ? (currentY - storyStart) / verticalScrollDistance
                : null;

            cancelSnap();
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(() => {
                animationFrame = null;
                measureStory();
                if (window.location.hash === '#nintendo') {
                    handleHistoryNavigation();
                } else if (isHorizontal && previousTimelineProgress !== null) {
                    window.scrollTo({
                        top: storyStart + previousTimelineProgress * verticalScrollDistance,
                        behavior: 'instant',
                    });
                    updateStory();
                }
            });
        };

        handleResize();
        const handleAssetsReady = () => {
            if (!isDisposed) handleResize();
        };
        initializationFrame = window.requestAnimationFrame(() => {
            initializationFrame = window.requestAnimationFrame(() => {
                initializationFrame = null;
                handleAssetsReady();
            });
        });
        if (document.readyState === 'complete') {
            handleAssetsReady();
        } else {
            window.addEventListener('load', handleAssetsReady, { once: true });
        }
        document.fonts?.ready.then(handleAssetsReady);

        if ('ResizeObserver' in window) {
            layoutResizeObserver = new ResizeObserver(() => {
                handleResize();
                recordDiagnostic('layout:upstream-resize');
            });
            [heroRef.current, aboutRef.current]
                .filter(Boolean)
                .forEach((element) => layoutResizeObserver.observe(element));
        }

        if (isDevelopment && 'ResizeObserver' in window) {
            diagnosticResizeObserver = new ResizeObserver((entries) => {
                recordDiagnostic('layout:resize-observer', {
                    elements: entries.map((entry) => ({
                        className: entry.target.className,
                        width: entry.contentRect.width,
                        height: entry.contentRect.height,
                    })),
                });
            });
            [story, stage, track, ...panels].forEach((element) =>
                diagnosticResizeObserver.observe(element)
            );
        }

        if (isDevelopment && 'MutationObserver' in window) {
            diagnosticMutationObserver = new MutationObserver((mutations) => {
                recordDiagnostic('layout:mutation', {
                    mutations: mutations.map((mutation) => ({
                        target: describeElement(mutation.target),
                        attributeName: mutation.attributeName,
                        oldValue: mutation.oldValue,
                    })),
                });
            });
            diagnosticMutationObserver.observe(track, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['class', 'style'],
            });
        }

        window.addEventListener('scroll', handleStoryScroll, { passive: true });
        document.addEventListener('scroll', handleAnyScroll, { capture: true, passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', cancelSnap, { passive: true });
        window.addEventListener('pointerdown', cancelSnap, { passive: true });
        window.addEventListener('keydown', handleScrollKeyInput);
        window.addEventListener('resize', handleResize);
        window.addEventListener('popstate', handleHistoryNavigation);
        desktopQuery.addEventListener('change', handleResize);
        reducedMotionQuery.addEventListener('change', handleResize);
        document.addEventListener('click', handleDocumentClick);

        return () => {
            recordDiagnostic('effect:cleanup');
            isDisposed = true;
            window.removeEventListener('scroll', handleStoryScroll);
            document.removeEventListener('scroll', handleAnyScroll, true);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', cancelSnap);
            window.removeEventListener('pointerdown', cancelSnap);
            window.removeEventListener('keydown', handleScrollKeyInput);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('popstate', handleHistoryNavigation);
            desktopQuery.removeEventListener('change', handleResize);
            reducedMotionQuery.removeEventListener('change', handleResize);
            document.removeEventListener('click', handleDocumentClick);
            window.removeEventListener('load', handleAssetsReady);
            layoutResizeObserver?.disconnect();
            diagnosticResizeObserver?.disconnect();
            diagnosticMutationObserver?.disconnect();
            if (diagnosticStore?.snapshot === getDiagnosticSnapshot) {
                diagnosticStore.snapshot = null;
            }
            if (initializationFrame !== null) {
                window.cancelAnimationFrame(initializationFrame);
            }
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            cancelSnap();
            resetStory();
        };
    }, []);

    useLayoutEffect(() => {
        const story = nintendoLateStoryRef.current;
        const stage = nintendoLateStoryStageRef.current;
        const track = nintendoLateStoryTrackRef.current;

        if (!story || !stage || !track) return undefined;

        const desktopQuery = window.matchMedia('(min-width: 901px)');
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const panels = Array.from(track.children).filter(
            (panel) => panel.classList.contains('section') && !panel.hidden
        );
        const panelBackgrounds = panels.map((panel) =>
            parseRgbColor(window.getComputedStyle(panel).backgroundColor)
        );
        let animationFrame = null;
        let initializationFrame = null;
        let snapTimer = null;
        let snapAnimationFrame = null;
        let resizeObserver = null;
        let isHorizontal = false;
        let isSnapping = false;
        let isDisposed = false;
        let lastScrollY = window.scrollY;
        let storyStart = 0;
        let horizontalTravel = 0;
        let verticalTravel = 0;
        let measuredStageWidth = 0;
        let measuredStageHeight = 0;
        let timeline = [];
        let panelAlignmentDistances = [];
        const scrollPacing = 1.18;

        const clamp = (value, minimum, maximum) =>
            Math.min(Math.max(value, minimum), maximum);

        const cancelSnap = () => {
            if (snapTimer !== null) {
                window.clearTimeout(snapTimer);
                snapTimer = null;
            }
            if (snapAnimationFrame !== null) {
                window.cancelAnimationFrame(snapAnimationFrame);
                snapAnimationFrame = null;
            }
            isSnapping = false;
        };

        const resetStory = () => {
            cancelSnap();
            isHorizontal = false;
            story.classList.remove('is-horizontal');
            story.style.removeProperty('height');
            story.style.removeProperty('--nintendo-late-panel-width');
            track.style.removeProperty('width');
            track.style.removeProperty('transform');
            track.style.removeProperty('will-change');
            stage.style.removeProperty('background-color');
            timeline = [];
            panelAlignmentDistances = [];
            panels.forEach((panel) => {
                panel.style.removeProperty('--nintendo-late-title-reveal');
                panel.style.removeProperty('--nintendo-late-title-line-1-reveal');
                panel.style.removeProperty('--nintendo-late-title-line-2-reveal');
            });
        };

        const getTimelinePosition = (scrollDistance) => {
            const clampedDistance = clamp(scrollDistance, 0, verticalTravel);
            const phase =
                timeline.find(({ end }) => clampedDistance < end) ??
                timeline[timeline.length - 1];

            if (!phase) return { offset: 0, phase: null, revealProgress: 0 };

            if (phase.type === 'hold') {
                return {
                    offset: phase.offset,
                    phase,
                    revealProgress: clamp(
                        (clampedDistance - phase.start) / phase.revealDistance,
                        0,
                        1
                    ),
                };
            }

            const phaseProgress = clamp(
                (clampedDistance - phase.start) / phase.distance,
                0,
                1
            );
            return {
                offset:
                    phase.fromOffset +
                    (phase.toOffset - phase.fromOffset) * phaseProgress,
                phase,
                revealProgress: 0,
            };
        };

        const updateTrack = () => {
            animationFrame = null;
            if (!isHorizontal || verticalTravel <= 0) return;

            const scrollDistance = window.scrollY - storyStart;
            const position = getTimelinePosition(scrollDistance);
            const offset = clamp(position.offset, 0, horizontalTravel);
            track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            stage.style.backgroundColor = interpolatePanelBackground(
                panelBackgrounds,
                horizontalTravel > 0
                    ? (offset / horizontalTravel) * (panels.length - 1)
                    : 0
            );
            panels.forEach((panel, panelIndex) => {
                if (panelIndex < 1 || panelIndex >= panels.length) return;
                const holdPhase = timeline.find(
                    (phase) => phase.type === 'hold' && phase.panel === panelIndex
                );
                if (!holdPhase) return;
                const titleReveal = clamp(
                    (scrollDistance - holdPhase.start) / holdPhase.revealDistance,
                    0,
                    1
                );
                const firstLineReveal = Math.min(1, titleReveal * 2);
                const secondLineReveal = Math.min(
                    1,
                    Math.max(0, (titleReveal - 0.5) * 2)
                );
                panel.style.setProperty(
                    '--nintendo-late-title-reveal',
                    `${(titleReveal * 100).toFixed(3)}%`
                );
                panel.style.setProperty(
                    '--nintendo-late-title-line-1-reveal',
                    `${(firstLineReveal * 100).toFixed(3)}%`
                );
                panel.style.setProperty(
                    '--nintendo-late-title-line-2-reveal',
                    `${(secondLineReveal * 100).toFixed(3)}%`
                );
            });
        };

        const requestTrackUpdate = () => {
            if (animationFrame !== null) return;
            animationFrame = window.requestAnimationFrame(updateTrack);
        };

        const snapToNearestPanel = () => {
            snapTimer = null;
            if (!isHorizontal || isSnapping || horizontalTravel <= 0) return;

            const currentY = window.scrollY;
            const storyEnd = storyStart + verticalTravel;
            if (currentY < storyStart || currentY > storyEnd) return;

            const currentDistance = currentY - storyStart;
            const { phase } = getTimelinePosition(currentDistance);
            if (!phase || phase.type !== 'transition') return;
            const targetScrollDistance =
                currentDistance - phase.start <= phase.end - currentDistance
                    ? phase.start
                    : phase.end;
            const targetY = storyStart + targetScrollDistance;
            const distance = targetY - currentY;
            const absoluteDistance = Math.abs(distance);

            if (absoluteDistance < 1) return;

            const startY = currentY;
            const distanceRatio = Math.min(
                1,
                absoluteDistance / Math.max(1, phase.distance * 0.5)
            );
            const duration = 300 + 150 * distanceRatio;
            let startTime = null;
            isSnapping = true;

            const animateSnap = (time) => {
                if (!isSnapping) return;
                if (startTime === null) startTime = time;

                const progress = Math.min(1, (time - startTime) / duration);
                const easedProgress = 1 - (1 - progress) ** 5;
                window.scrollTo({
                    top: startY + distance * easedProgress,
                    behavior: 'instant',
                });

                if (progress < 1) {
                    snapAnimationFrame = window.requestAnimationFrame(animateSnap);
                    return;
                }

                snapAnimationFrame = null;
                isSnapping = false;
                lastScrollY = targetY;
                requestTrackUpdate();
            };

            snapAnimationFrame = window.requestAnimationFrame(animateSnap);
        };

        const scheduleSnap = () => {
            if (!isHorizontal || isSnapping) return;
            if (snapTimer !== null) window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(snapToNearestPanel, 320);
        };

        const handleStoryScroll = () => {
            const currentY = window.scrollY;
            requestTrackUpdate();
            if (!isSnapping && Math.abs(currentY - lastScrollY) > 0.5) scheduleSnap();
            lastScrollY = currentY;
        };

        const handleUserInput = () => {
            cancelSnap();
            lastScrollY = window.scrollY;
        };

        const measureStory = ({ preserveProgress = false } = {}) => {
            if (isDisposed) return;

            const shouldUseHorizontal =
                desktopQuery.matches && !reducedMotionQuery.matches && panels.length > 1;
            const previousProgress =
                preserveProgress && isHorizontal && verticalTravel > 0
                    ? clamp((window.scrollY - storyStart) / verticalTravel, 0, 1)
                    : null;
            const wasInsideStory =
                previousProgress !== null &&
                window.scrollY >= storyStart &&
                window.scrollY <= storyStart + verticalTravel;

            if (!shouldUseHorizontal) {
                resetStory();
                return;
            }

            story.classList.add('is-horizontal');
            isHorizontal = true;

            const stageRect = stage.getBoundingClientRect();
            measuredStageWidth = Math.max(1, Math.round(stageRect.width));
            measuredStageHeight = Math.max(1, Math.round(stageRect.height));
            horizontalTravel = measuredStageWidth * (panels.length - 1);
            story.style.setProperty(
                '--nintendo-late-panel-width',
                `${measuredStageWidth}px`
            );
            track.style.width = `${measuredStageWidth * panels.length}px`;
            const revealDistance = Math.min(
                900,
                Math.max(500, measuredStageWidth * 0.42)
            );
            const completionHoldDistance = Math.min(
                180,
                Math.max(120, measuredStageWidth * 0.075)
            );
            let timelineCursor = 0;
            timeline = [];
            panelAlignmentDistances = Array(panels.length).fill(0);

            for (let panelIndex = 1; panelIndex < panels.length; panelIndex += 1) {
                const fromOffset = clamp(
                    panels[panelIndex - 1].offsetLeft,
                    0,
                    horizontalTravel
                );
                const toOffset = clamp(
                    panels[panelIndex].offsetLeft,
                    0,
                    horizontalTravel
                );
                const transitionDistance =
                    Math.max(1, Math.abs(toOffset - fromOffset)) * scrollPacing;
                const transitionStart = timelineCursor;
                const transitionEnd = transitionStart + transitionDistance;
                timeline.push({
                    type: 'transition',
                    from: panelIndex - 1,
                    to: panelIndex,
                    fromOffset,
                    toOffset,
                    start: transitionStart,
                    end: transitionEnd,
                    distance: transitionDistance,
                });
                timelineCursor = transitionEnd;
                panelAlignmentDistances[panelIndex] = transitionEnd;

                const holdStart = timelineCursor;
                const holdEnd = holdStart + revealDistance + completionHoldDistance;
                timeline.push({
                    type: 'hold',
                    panel: panelIndex,
                    offset: toOffset,
                    start: holdStart,
                    end: holdEnd,
                    distance: revealDistance + completionHoldDistance,
                    revealDistance,
                    completionHoldDistance,
                });
                timelineCursor = holdEnd;
            }
            verticalTravel = timelineCursor;

            story.style.height = `${measuredStageHeight + verticalTravel}px`;
            track.style.willChange = 'transform';

            storyStart = window.scrollY + story.getBoundingClientRect().top;

            if (wasInsideStory) {
                window.scrollTo({
                    top: storyStart + previousProgress * verticalTravel,
                    behavior: 'auto',
                });
            }

            updateTrack();
        };

        const requestMeasure = ({ preserveProgress = true } = {}) => {
            if (initializationFrame !== null) {
                window.cancelAnimationFrame(initializationFrame);
            }
            initializationFrame = window.requestAnimationFrame(() => {
                initializationFrame = null;
                measureStory({ preserveProgress });
            });
        };

        const scrollToPanel = (target, behavior = 'smooth') => {
            if (!isHorizontal) return false;

            const panel = target.closest('.nintendo-late-story__track > .section');
            const panelIndex = panels.indexOf(panel);
            if (panelIndex < 0) return false;

            const targetDistance = panelAlignmentDistances[panelIndex];
            if (!Number.isFinite(targetDistance)) return false;
            window.scrollTo({
                top: storyStart + targetDistance,
                behavior: reducedMotionQuery.matches ? 'auto' : behavior,
            });
            return true;
        };

        const handleDocumentClick = (event) => {
            const anchor = event.target.closest('a[href^="#"]');
            if (!anchor || anchor.getAttribute('href') === '#') return;

            const targetId = decodeURIComponent(anchor.hash.slice(1));
            const target = document.getElementById(targetId);
            if (!target || !track.contains(target)) return;

            event.preventDefault();
            if (scrollToPanel(target)) {
                window.history.pushState(null, '', anchor.hash);
            }
        };

        const handleHashNavigation = () => {
            if (!window.location.hash) {
                requestTrackUpdate();
                return;
            }

            const target = document.getElementById(
                decodeURIComponent(window.location.hash.slice(1))
            );
            if (!target || !track.contains(target)) {
                requestTrackUpdate();
                return;
            }

            window.requestAnimationFrame(() => scrollToPanel(target, 'auto'));
        };

        const handleResize = () => {
            cancelSnap();
            requestMeasure({ preserveProgress: true });
        };
        const handleAssetsReady = () => {
            cancelSnap();
            requestMeasure({ preserveProgress: true });
        };

        measureStory();
        initializationFrame = window.requestAnimationFrame(() => {
            initializationFrame = null;
            measureStory();
            handleHashNavigation();
        });

        if ('ResizeObserver' in window) {
            resizeObserver = new ResizeObserver(([entry]) => {
                const { width, height } = entry.contentRect;
                if (
                    Math.abs(width - measuredStageWidth) > 1 ||
                    Math.abs(height - measuredStageHeight) > 1
                ) {
                    requestMeasure({ preserveProgress: true });
                }
            });
            resizeObserver.observe(stage);
        }

        window.addEventListener('scroll', handleStoryScroll, { passive: true });
        window.addEventListener('wheel', handleUserInput, { passive: true });
        window.addEventListener('touchstart', handleUserInput, { passive: true });
        window.addEventListener('pointerdown', handleUserInput, { passive: true });
        window.addEventListener('keydown', handleUserInput);
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleAssetsReady);
        window.addEventListener('pageshow', handleAssetsReady);
        window.addEventListener('popstate', handleHashNavigation);
        window.addEventListener('hashchange', handleHashNavigation);
        desktopQuery.addEventListener('change', handleResize);
        reducedMotionQuery.addEventListener('change', handleResize);
        document.addEventListener('click', handleDocumentClick);

        document.fonts?.ready.then(() => {
            if (!isDisposed) requestMeasure({ preserveProgress: true });
        });

        return () => {
            isDisposed = true;
            window.removeEventListener('scroll', handleStoryScroll);
            window.removeEventListener('wheel', handleUserInput);
            window.removeEventListener('touchstart', handleUserInput);
            window.removeEventListener('pointerdown', handleUserInput);
            window.removeEventListener('keydown', handleUserInput);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleAssetsReady);
            window.removeEventListener('pageshow', handleAssetsReady);
            window.removeEventListener('popstate', handleHashNavigation);
            window.removeEventListener('hashchange', handleHashNavigation);
            desktopQuery.removeEventListener('change', handleResize);
            reducedMotionQuery.removeEventListener('change', handleResize);
            document.removeEventListener('click', handleDocumentClick);
            resizeObserver?.disconnect();
            if (initializationFrame !== null) {
                window.cancelAnimationFrame(initializationFrame);
            }
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            cancelSnap();
            resetStory();
        };
    }, []);

    useLayoutEffect(() => {
        const story = personalStoryRef.current;
        const stage = personalStoryStageRef.current;
        const track = personalStoryTrackRef.current;

        if (!story || !stage || !track) return undefined;

        const desktopQuery = window.matchMedia('(min-width: 901px)');
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const panels = Array.from(track.children).filter((panel) => !panel.hidden);
        const panelBackgrounds = panels.map((panel) =>
            parseRgbColor(window.getComputedStyle(panel).backgroundColor)
        );
        let animationFrame = null;
        let measureFrame = null;
        let snapTimer = null;
        let snapAnimationFrame = null;
        let resizeObserver = null;
        let isHorizontal = false;
        let isSnapping = false;
        let isDisposed = false;
        let lastScrollY = window.scrollY;
        let storyStart = 0;
        let horizontalTravel = 0;
        let verticalTravel = 0;
        let measuredStageWidth = 0;
        let measuredStageHeight = 0;
        let timeline = [];
        let panelAlignmentDistances = [];
        const scrollPacing = 1.18;

        const clamp = (value, minimum, maximum) =>
            Math.min(Math.max(value, minimum), maximum);

        const smoothstep = (value) => value * value * (3 - 2 * value);

        const cancelSnap = () => {
            if (snapTimer !== null) {
                window.clearTimeout(snapTimer);
                snapTimer = null;
            }
            if (snapAnimationFrame !== null) {
                window.cancelAnimationFrame(snapAnimationFrame);
                snapAnimationFrame = null;
            }
            isSnapping = false;
        };

        const updatePanelMotion = (trackPosition) => {
            panels.forEach((panel, panelIndex) => {
                const entryProgress = clamp(
                    (trackPosition - (panelIndex - 0.85)) / 0.75,
                    0,
                    1
                );
                const relativePosition = clamp(trackPosition - panelIndex, -1, 1);

                for (let step = 1; step <= 5; step += 1) {
                    const stepStart = (step - 1) * 0.1;
                    const stepProgress = smoothstep(
                        clamp((entryProgress - stepStart) / (1 - stepStart), 0, 1)
                    );
                    const remaining = 1 - stepProgress;

                    const motionOpacity = 0.2 + stepProgress * 0.8;

                    panel.style.setProperty(
                        `--motion-opacity-${step}`,
                        motionOpacity.toFixed(4)
                    );
                    panel.style.setProperty(`--motion-shift-${step}`, `${remaining * 20}px`);
                    panel.style.setProperty(
                        `--motion-shift-neg-${step}`,
                        `${remaining * -20}px`
                    );
                    panel.style.setProperty(
                        `--motion-scale-${step}`,
                        (0.99 + stepProgress * 0.01).toFixed(4)
                    );
                }

                panel.style.setProperty(
                    '--motion-parallax-small',
                    `${relativePosition * -6}px`
                );
                panel.style.setProperty(
                    '--motion-parallax-small-reverse',
                    `${relativePosition * 6}px`
                );
                panel.style.setProperty(
                    '--motion-parallax-medium',
                    `${relativePosition * -8}px`
                );
                panel.style.setProperty(
                    '--motion-parallax-medium-reverse',
                    `${relativePosition * 8}px`
                );
            });
        };

        const resetStory = () => {
            cancelSnap();
            isHorizontal = false;
            story.classList.remove('is-horizontal');
            story.style.removeProperty('height');
            story.style.removeProperty('--personal-story-panel-width');
            track.style.removeProperty('width');
            track.style.removeProperty('transform');
            track.style.removeProperty('will-change');
            stage.style.removeProperty('background-color');
            timeline = [];
            panelAlignmentDistances = [];
            panels.forEach((panel) => {
                for (let step = 1; step <= 5; step += 1) {
                    panel.style.removeProperty(`--motion-opacity-${step}`);
                    panel.style.removeProperty(`--motion-shift-${step}`);
                    panel.style.removeProperty(`--motion-shift-neg-${step}`);
                    panel.style.removeProperty(`--motion-scale-${step}`);
                }
                panel.style.removeProperty('--motion-parallax-small');
                panel.style.removeProperty('--motion-parallax-small-reverse');
                panel.style.removeProperty('--motion-parallax-medium');
                panel.style.removeProperty('--motion-parallax-medium-reverse');
                panel.style.removeProperty('--personal-title-reveal');
                panel.style.removeProperty('--personal-title-line-1-reveal');
                panel.style.removeProperty('--personal-title-line-2-reveal');
            });
        };

        const getTimelinePosition = (scrollDistance) => {
            const clampedDistance = clamp(scrollDistance, 0, verticalTravel);
            const phase =
                timeline.find(({ end }) => clampedDistance < end) ??
                timeline[timeline.length - 1];

            if (!phase) return { offset: 0, phase: null };
            if (phase.type === 'hold') return { offset: phase.offset, phase };

            const phaseProgress = clamp(
                (clampedDistance - phase.start) / phase.distance,
                0,
                1
            );
            return {
                offset:
                    phase.fromOffset +
                    (phase.toOffset - phase.fromOffset) * phaseProgress,
                phase,
            };
        };

        const updateTrack = () => {
            animationFrame = null;
            if (!isHorizontal || verticalTravel <= 0) return;

            const scrollDistance = window.scrollY - storyStart;
            const { offset: timelineOffset } = getTimelinePosition(scrollDistance);
            const offset = clamp(timelineOffset, 0, horizontalTravel);
            const trackPosition =
                horizontalTravel > 0
                    ? (offset / horizontalTravel) * (panels.length - 1)
                    : 0;
            track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            stage.style.backgroundColor = interpolatePanelBackground(
                panelBackgrounds,
                trackPosition
            );
            updatePanelMotion(trackPosition);
            panels.forEach((panel, panelIndex) => {
                if (panelIndex < 1 || panelIndex > 4) return;
                const holdPhase = timeline.find(
                    (phase) => phase.type === 'hold' && phase.panel === panelIndex
                );
                if (!holdPhase) return;
                const titleReveal = clamp(
                    (scrollDistance - holdPhase.start) / holdPhase.revealDistance,
                    0,
                    1
                );
                const firstLineReveal = Math.min(1, titleReveal * 2);
                const secondLineReveal = clamp((titleReveal - 0.5) * 2, 0, 1);
                panel.style.setProperty(
                    '--personal-title-reveal',
                    `${(titleReveal * 100).toFixed(3)}%`
                );
                panel.style.setProperty(
                    '--personal-title-line-1-reveal',
                    `${(firstLineReveal * 100).toFixed(3)}%`
                );
                panel.style.setProperty(
                    '--personal-title-line-2-reveal',
                    `${(secondLineReveal * 100).toFixed(3)}%`
                );
            });
        };

        const requestTrackUpdate = () => {
            if (animationFrame !== null) return;
            animationFrame = window.requestAnimationFrame(updateTrack);
        };

        const snapToNearestPanel = () => {
            snapTimer = null;
            if (!isHorizontal || isSnapping || horizontalTravel <= 0) return;

            const currentY = window.scrollY;
            const storyEnd = storyStart + verticalTravel;
            if (currentY < storyStart || currentY > storyEnd) return;

            const currentDistance = currentY - storyStart;
            const { phase } = getTimelinePosition(currentDistance);
            if (!phase || phase.type !== 'transition') return;
            const targetScrollDistance =
                currentDistance - phase.start <= phase.end - currentDistance
                    ? phase.start
                    : phase.end;
            const targetY = storyStart + targetScrollDistance;
            const distance = targetY - currentY;
            const absoluteDistance = Math.abs(distance);

            if (absoluteDistance < 1) return;

            const startY = currentY;
            const distanceRatio = Math.min(
                1,
                absoluteDistance / Math.max(1, phase.distance * 0.5)
            );
            const duration = 300 + 150 * distanceRatio;
            let startTime = null;
            isSnapping = true;

            const animateSnap = (time) => {
                if (!isSnapping) return;
                if (startTime === null) startTime = time;

                const progress = Math.min(1, (time - startTime) / duration);
                const easedProgress = 1 - (1 - progress) ** 5;
                window.scrollTo({
                    top: startY + distance * easedProgress,
                    behavior: 'instant',
                });

                if (progress < 1) {
                    snapAnimationFrame = window.requestAnimationFrame(animateSnap);
                    return;
                }

                snapAnimationFrame = null;
                isSnapping = false;
                lastScrollY = targetY;
                requestTrackUpdate();
            };

            snapAnimationFrame = window.requestAnimationFrame(animateSnap);
        };

        const scheduleSnap = () => {
            if (!isHorizontal || isSnapping) return;
            if (snapTimer !== null) window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(snapToNearestPanel, 320);
        };

        const handleStoryScroll = () => {
            const currentY = window.scrollY;
            requestTrackUpdate();
            if (!isSnapping && Math.abs(currentY - lastScrollY) > 0.5) scheduleSnap();
            lastScrollY = currentY;
        };

        const handleUserInput = () => {
            cancelSnap();
            lastScrollY = window.scrollY;
        };

        const measureStory = ({ preserveProgress = false } = {}) => {
            if (isDisposed) return;

            const shouldUseHorizontal =
                desktopQuery.matches && !reducedMotionQuery.matches && panels.length > 1;
            const previousProgress =
                preserveProgress && isHorizontal && verticalTravel > 0
                    ? clamp((window.scrollY - storyStart) / verticalTravel, 0, 1)
                    : null;
            const wasInsideStory =
                previousProgress !== null &&
                window.scrollY >= storyStart &&
                window.scrollY <= storyStart + verticalTravel;

            if (!shouldUseHorizontal) {
                resetStory();
                return;
            }

            story.classList.add('is-horizontal');
            isHorizontal = true;

            const stageRect = stage.getBoundingClientRect();
            measuredStageWidth = Math.max(1, Math.round(stageRect.width));
            measuredStageHeight = Math.max(1, Math.round(stageRect.height));
            horizontalTravel = measuredStageWidth * (panels.length - 1);
            story.style.setProperty('--personal-story-panel-width', `${measuredStageWidth}px`);
            track.style.width = `${measuredStageWidth * panels.length}px`;
            const revealDistance = Math.min(
                900,
                Math.max(500, measuredStageWidth * 0.42)
            );
            const completionHoldDistance = Math.min(
                180,
                Math.max(120, measuredStageWidth * 0.075)
            );
            let timelineCursor = 0;
            timeline = [];
            panelAlignmentDistances = Array(panels.length).fill(0);

            for (let panelIndex = 1; panelIndex < panels.length; panelIndex += 1) {
                const fromOffset = clamp(
                    panels[panelIndex - 1].offsetLeft,
                    0,
                    horizontalTravel
                );
                const toOffset = clamp(
                    panels[panelIndex].offsetLeft,
                    0,
                    horizontalTravel
                );
                const transitionDistance =
                    Math.max(1, Math.abs(toOffset - fromOffset)) * scrollPacing;
                const transitionStart = timelineCursor;
                const transitionEnd = transitionStart + transitionDistance;
                timeline.push({
                    type: 'transition',
                    fromOffset,
                    toOffset,
                    start: transitionStart,
                    end: transitionEnd,
                    distance: transitionDistance,
                });
                timelineCursor = transitionEnd;
                panelAlignmentDistances[panelIndex] = transitionEnd;

                const holdStart = timelineCursor;
                const holdEnd = holdStart + revealDistance + completionHoldDistance;
                timeline.push({
                    type: 'hold',
                    panel: panelIndex,
                    offset: toOffset,
                    start: holdStart,
                    end: holdEnd,
                    distance: revealDistance + completionHoldDistance,
                    revealDistance,
                    completionHoldDistance,
                });
                timelineCursor = holdEnd;
            }
            verticalTravel = timelineCursor;

            story.style.height = `${measuredStageHeight + verticalTravel}px`;
            track.style.willChange = 'transform';

            storyStart = window.scrollY + story.getBoundingClientRect().top;

            if (wasInsideStory) {
                window.scrollTo({
                    top: storyStart + previousProgress * verticalTravel,
                    behavior: 'auto',
                });
            }

            updateTrack();
        };

        const requestMeasure = ({ preserveProgress = true } = {}) => {
            if (measureFrame !== null) window.cancelAnimationFrame(measureFrame);
            measureFrame = window.requestAnimationFrame(() => {
                measureFrame = null;
                measureStory({ preserveProgress });
            });
        };

        const scrollToPanel = (target, behavior = 'smooth') => {
            if (!isHorizontal) return false;

            const panel = target.closest('.personal-horizontal-story__track > section');
            const panelIndex = panels.indexOf(panel);
            if (panelIndex < 0) return false;

            const targetDistance = panelAlignmentDistances[panelIndex];
            if (!Number.isFinite(targetDistance)) return false;

            window.scrollTo({
                top: storyStart + targetDistance,
                behavior: reducedMotionQuery.matches ? 'auto' : behavior,
            });
            return true;
        };

        const handleDocumentClick = (event) => {
            if (!(event.target instanceof Element)) return;
            const anchor = event.target.closest('a[href^="#"]');
            if (!anchor || anchor.getAttribute('href') === '#') return;

            const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
            if (!target || !track.contains(target)) return;

            event.preventDefault();
            if (scrollToPanel(target)) window.history.pushState(null, '', anchor.hash);
        };

        const handleHashNavigation = () => {
            const target = window.location.hash
                ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
                : null;

            if (!target || !track.contains(target)) {
                requestTrackUpdate();
                return;
            }

            window.requestAnimationFrame(() => scrollToPanel(target, 'auto'));
        };

        const handleResize = () => {
            cancelSnap();
            requestMeasure({ preserveProgress: true });
        };

        measureStory();
        measureFrame = window.requestAnimationFrame(() => {
            measureFrame = null;
            measureStory();
            handleHashNavigation();
        });

        if ('ResizeObserver' in window) {
            resizeObserver = new ResizeObserver(([entry]) => {
                const { width, height } = entry.contentRect;
                if (
                    Math.abs(width - measuredStageWidth) > 1 ||
                    Math.abs(height - measuredStageHeight) > 1
                ) {
                    requestMeasure({ preserveProgress: true });
                }
            });
            resizeObserver.observe(stage);
        }

        window.addEventListener('scroll', handleStoryScroll, { passive: true });
        window.addEventListener('wheel', handleUserInput, { passive: true });
        window.addEventListener('touchstart', handleUserInput, { passive: true });
        window.addEventListener('pointerdown', handleUserInput, { passive: true });
        window.addEventListener('keydown', handleUserInput);
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        window.addEventListener('pageshow', handleResize);
        window.addEventListener('popstate', handleHashNavigation);
        window.addEventListener('hashchange', handleHashNavigation);
        desktopQuery.addEventListener('change', handleResize);
        reducedMotionQuery.addEventListener('change', handleResize);
        document.addEventListener('click', handleDocumentClick);

        document.fonts?.ready.then(() => {
            if (!isDisposed) requestMeasure({ preserveProgress: true });
        });

        return () => {
            isDisposed = true;
            window.removeEventListener('scroll', handleStoryScroll);
            window.removeEventListener('wheel', handleUserInput);
            window.removeEventListener('touchstart', handleUserInput);
            window.removeEventListener('pointerdown', handleUserInput);
            window.removeEventListener('keydown', handleUserInput);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
            window.removeEventListener('pageshow', handleResize);
            window.removeEventListener('popstate', handleHashNavigation);
            window.removeEventListener('hashchange', handleHashNavigation);
            desktopQuery.removeEventListener('change', handleResize);
            reducedMotionQuery.removeEventListener('change', handleResize);
            document.removeEventListener('click', handleDocumentClick);
            resizeObserver?.disconnect();
            if (measureFrame !== null) window.cancelAnimationFrame(measureFrame);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            cancelSnap();
            resetStory();
        };
    }, []);

    const selectResearchArchive = useCallback((key) => {
        const category = researchArchiveCategories.find((item) => item.key === key);
        if (!category || activeResearchArchiveRef.current === key) return;

        setPreviousResearchArchive({
            categoryKey: activeResearchArchiveRef.current,
            imageKey: activeResearchArchiveImageRef.current,
        });

        activeResearchArchiveRef.current = key;
        activeResearchArchiveImageRef.current = category.images[0].key;
        setActiveResearchArchive(key);
        setActiveResearchArchiveImage(category.images[0].key);

        if (researchArchiveTransitionTimerRef.current !== null) {
            window.clearTimeout(researchArchiveTransitionTimerRef.current);
        }
        researchArchiveTransitionTimerRef.current = window.setTimeout(() => {
            setPreviousResearchArchive(null);
            researchArchiveTransitionTimerRef.current = null;
        }, 700);
    }, []);

    const selectUserInsight = useCallback((key) => {
        const category = userInsightCategories.find((item) => item.key === key);
        if (!category || activeUserInsightRef.current === key) return;

        setPreviousUserInsight({
            categoryKey: activeUserInsightRef.current,
            imageKey: activeUserInsightImageRef.current,
        });
        activeUserInsightRef.current = key;
        activeUserInsightImageRef.current = category.images[0].key;
        setActiveUserInsight(key);
        setActiveUserInsightImage(category.images[0].key);

        if (userInsightTransitionTimerRef.current !== null) {
            window.clearTimeout(userInsightTransitionTimerRef.current);
        }
        userInsightTransitionTimerRef.current = window.setTimeout(() => {
            setPreviousUserInsight(null);
            userInsightTransitionTimerRef.current = null;
        }, 700);
    }, []);

    const selectDesignStructure = useCallback((key) => {
        if (
            !designStructureArtifacts.some((item) => item.key === key) ||
            activeDesignStructureRef.current === key
        ) {
            return;
        }
        setPreviousDesignStructure(activeDesignStructureRef.current);
        activeDesignStructureRef.current = key;
        setActiveDesignStructure(key);

        if (designStructureTransitionTimerRef.current !== null) {
            window.clearTimeout(designStructureTransitionTimerRef.current);
        }
        designStructureTransitionTimerRef.current = window.setTimeout(() => {
            setPreviousDesignStructure(null);
            designStructureTransitionTimerRef.current = null;
        }, 700);
    }, []);

    const selectDesignDevelopmentArchive = useCallback((key) => {
        const category = designDevelopmentArtifacts.find((item) => item.key === key);
        if (!category || activeDesignDevelopmentArchiveRef.current === key) return;

        setPreviousDesignDevelopmentArchive({
            categoryKey: activeDesignDevelopmentArchiveRef.current,
            imageKey: activeDesignDevelopmentArchiveImageRef.current,
        });
        activeDesignDevelopmentArchiveRef.current = key;
        activeDesignDevelopmentArchiveImageRef.current = category.modalImages[0].key;
        setActiveDesignDevelopmentArchive(key);
        setActiveDesignDevelopmentArchiveImage(category.modalImages[0].key);

        if (designDevelopmentArchiveTransitionTimerRef.current !== null) {
            window.clearTimeout(designDevelopmentArchiveTransitionTimerRef.current);
        }
        designDevelopmentArchiveTransitionTimerRef.current = window.setTimeout(() => {
            setPreviousDesignDevelopmentArchive(null);
            designDevelopmentArchiveTransitionTimerRef.current = null;
        }, 700);
    }, []);

    useEffect(() => {
        const section = researchArchiveRef.current;
        if (!section) return undefined;

        let animationFrame = null;
        let scrollCategory = null;

        const updateResearchArchive = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(rect.height - window.innerHeight, 1);
            const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
            const nextCategory = progress >= 0.5 ? 'competitor' : 'nintendo';

            if (nextCategory !== scrollCategory) {
                scrollCategory = nextCategory;
                selectResearchArchive(nextCategory);
            }

            animationFrame = null;
        };

        const scheduleResearchArchiveUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateResearchArchive);
            }
        };

        window.addEventListener('scroll', scheduleResearchArchiveUpdate, { passive: true });
        window.addEventListener('resize', scheduleResearchArchiveUpdate);
        updateResearchArchive();

        return () => {
            window.removeEventListener('scroll', scheduleResearchArchiveUpdate);
            window.removeEventListener('resize', scheduleResearchArchiveUpdate);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [selectResearchArchive]);

    useEffect(
        () => () => {
            if (researchArchiveTransitionTimerRef.current !== null) {
                window.clearTimeout(researchArchiveTransitionTimerRef.current);
            }
            if (userInsightTransitionTimerRef.current !== null) {
                window.clearTimeout(userInsightTransitionTimerRef.current);
            }
            if (designStructureTransitionTimerRef.current !== null) {
                window.clearTimeout(designStructureTransitionTimerRef.current);
            }
            if (designDevelopmentArchiveTransitionTimerRef.current !== null) {
                window.clearTimeout(designDevelopmentArchiveTransitionTimerRef.current);
            }
        },
        []
    );

    useEffect(() => {
        const section = userInsightRef.current;
        if (!section) return undefined;

        let animationFrame = null;
        let scrollCategory = null;

        const updateUserInsight = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(rect.height - window.innerHeight, 1);
            const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
            const categoryIndex = Math.min(
                userInsightCategories.length - 1,
                Math.floor(progress * userInsightCategories.length)
            );
            const nextCategory = userInsightCategories[categoryIndex].key;

            if (nextCategory !== scrollCategory) {
                scrollCategory = nextCategory;
                selectUserInsight(nextCategory);
            }
            animationFrame = null;
        };

        const scheduleUserInsightUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateUserInsight);
            }
        };

        window.addEventListener('scroll', scheduleUserInsightUpdate, { passive: true });
        window.addEventListener('resize', scheduleUserInsightUpdate);
        updateUserInsight();

        return () => {
            window.removeEventListener('scroll', scheduleUserInsightUpdate);
            window.removeEventListener('resize', scheduleUserInsightUpdate);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [selectUserInsight]);

    useEffect(() => {
        const section = designStructureRef.current;
        if (!section) return undefined;
        let animationFrame = null;
        let scrollCategory = null;

        const updateDesignStructure = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(rect.height - window.innerHeight, 1);
            const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
            const index = Math.min(
                designStructureArtifacts.length - 1,
                Math.floor(progress * designStructureArtifacts.length)
            );
            const nextCategory = designStructureArtifacts[index].key;
            if (nextCategory !== scrollCategory) {
                scrollCategory = nextCategory;
                selectDesignStructure(nextCategory);
            }
            animationFrame = null;
        };

        const scheduleUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateDesignStructure);
            }
        };

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        updateDesignStructure();
        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [selectDesignStructure]);

    useEffect(() => {
        const section = designDevelopmentArchiveRef.current;
        if (!section) return undefined;
        let animationFrame = null;
        let scrollCategory = null;

        const updateDesignDevelopmentArchive = () => {
            const rect = section.getBoundingClientRect();
            const scrollRange = Math.max(rect.height - window.innerHeight, 1);
            const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
            const index = Math.min(
                designDevelopmentArtifacts.length - 1,
                Math.floor(progress * designDevelopmentArtifacts.length)
            );
            const nextCategory = designDevelopmentArtifacts[index].key;
            if (nextCategory !== scrollCategory) {
                scrollCategory = nextCategory;
                selectDesignDevelopmentArchive(nextCategory);
            }
            animationFrame = null;
        };

        const scheduleUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateDesignDevelopmentArchive);
            }
        };

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        updateDesignDevelopmentArchive();
        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
        };
    }, [selectDesignDevelopmentArchive]);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const selectedResearchArchive = researchArchiveCategories.find(
        (category) => category.key === activeResearchArchive
    );
    const selectedResearchArchiveImage = selectedResearchArchive.images.find(
        (image) => image.key === activeResearchArchiveImage
    );
    const previousResearchArchiveCategory = previousResearchArchive
        ? researchArchiveCategories.find(
              (category) => category.key === previousResearchArchive.categoryKey
          )
        : null;
    const previousResearchArchiveImage = previousResearchArchiveCategory?.images.find(
        (image) => image.key === previousResearchArchive.imageKey
    );

    const selectResearchArchiveImage = (key) => {
        activeResearchArchiveImageRef.current = key;
        setActiveResearchArchiveImage(key);
    };
    const selectedUserInsight = userInsightCategories.find(
        (category) => category.key === activeUserInsight
    );
    const selectedUserInsightImage = selectedUserInsight.images.find(
        (image) => image.key === activeUserInsightImage
    );
    const previousUserInsightCategory = previousUserInsight
        ? userInsightCategories.find((category) => category.key === previousUserInsight.categoryKey)
        : null;
    const previousUserInsightImage = previousUserInsightCategory?.images.find(
        (image) => image.key === previousUserInsight.imageKey
    );
    const selectUserInsightImage = (key) => {
        activeUserInsightImageRef.current = key;
        setActiveUserInsightImage(key);
    };
    const selectUserInsightFromControl = (key) => {
        const section = userInsightRef.current;
        const categoryIndex = userInsightCategories.findIndex((item) => item.key === key);
        if (!section || categoryIndex < 0) return;

        const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
        const categoryCenter = (categoryIndex + 0.5) / userInsightCategories.length;
        window.scrollTo({
            top: section.offsetTop + scrollRange * categoryCenter,
            behavior: 'auto',
        });
        selectUserInsight(key);
    };
    const selectedDesignStructure = designStructureArtifacts.find(
        (item) => item.key === activeDesignStructure
    );
    const previousDesignStructureItem = previousDesignStructure
        ? designStructureArtifacts.find((item) => item.key === previousDesignStructure)
        : null;
    const selectDesignStructureFromControl = (key) => {
        const section = designStructureRef.current;
        const index = designStructureArtifacts.findIndex((item) => item.key === key);
        if (!section || index < 0) return;
        const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
        window.scrollTo({
            top:
                section.offsetTop + scrollRange * ((index + 0.5) / designStructureArtifacts.length),
            behavior: 'auto',
        });
        selectDesignStructure(key);
    };

    const selectedDesignDevelopmentArchive = designDevelopmentArtifacts.find(
        (item) => item.key === activeDesignDevelopmentArchive
    );
    const selectedDesignDevelopmentArchiveImage = selectedDesignDevelopmentArchive.modalImages.find(
        (image) => image.key === activeDesignDevelopmentArchiveImage
    );
    const previousDesignDevelopmentArchiveCategory = previousDesignDevelopmentArchive
        ? designDevelopmentArtifacts.find(
              (item) => item.key === previousDesignDevelopmentArchive.categoryKey
          )
        : null;
    const previousDesignDevelopmentArchiveImage =
        previousDesignDevelopmentArchiveCategory?.modalImages.find(
            (image) => image.key === previousDesignDevelopmentArchive.imageKey
        );
    const selectDesignDevelopmentArchiveImage = (key) => {
        if (activeDesignDevelopmentArchiveImageRef.current === key) return;
        setPreviousDesignDevelopmentArchive({
            categoryKey: activeDesignDevelopmentArchiveRef.current,
            imageKey: activeDesignDevelopmentArchiveImageRef.current,
        });
        activeDesignDevelopmentArchiveImageRef.current = key;
        setActiveDesignDevelopmentArchiveImage(key);
        if (designDevelopmentArchiveTransitionTimerRef.current !== null) {
            window.clearTimeout(designDevelopmentArchiveTransitionTimerRef.current);
        }
        designDevelopmentArchiveTransitionTimerRef.current = window.setTimeout(() => {
            setPreviousDesignDevelopmentArchive(null);
            designDevelopmentArchiveTransitionTimerRef.current = null;
        }, 700);
    };
    const selectDesignDevelopmentArchiveFromControl = (key) => {
        const section = designDevelopmentArchiveRef.current;
        const index = designDevelopmentArtifacts.findIndex((item) => item.key === key);
        if (!section || index < 0) return;
        const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
        window.scrollTo({
            top:
                section.offsetTop +
                scrollRange * ((index + 0.5) / designDevelopmentArtifacts.length),
            behavior: 'auto',
        });
        selectDesignDevelopmentArchive(key);
    };

    const selectedUserInterview = userInterviews.find((item) => item.key === activeUserInterview);
    const selectedDevelopmentImage = developmentPreview?.modalImages.find(
        (item) => item.key === activeDevelopmentImage
    );

    const startAboutPopupDrag = (event) => {
        if (
            event.pointerType === 'touch' ||
            window.matchMedia('(max-width: 1180px), (pointer: coarse)').matches
        ) {
            return;
        }
        const browser = aboutBrowserRef.current;
        const popup = aboutPopupRef.current;
        if (!browser || !popup) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        aboutPopupDragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: aboutPopupPosition.x,
            originY: aboutPopupPosition.y,
            browserRect: browser.getBoundingClientRect(),
            popupRect: popup.getBoundingClientRect(),
        };
        setIsAboutPopupDragging(true);
    };

    const moveAboutPopup = (event) => {
        const drag = aboutPopupDragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        const deltaX = event.clientX - drag.startX;
        const deltaY = event.clientY - drag.startY;
        const baseLeft = drag.popupRect.left - drag.originX;
        const baseTop = drag.popupRect.top - drag.originY;
        const x = Math.min(
            drag.browserRect.right - baseLeft - drag.popupRect.width,
            Math.max(drag.browserRect.left - baseLeft, drag.originX + deltaX)
        );
        const y = Math.min(
            drag.browserRect.bottom - baseTop - drag.popupRect.height,
            Math.max(drag.browserRect.top - baseTop, drag.originY + deltaY)
        );
        setAboutPopupPosition({ x, y });
    };

    const endAboutPopupDrag = (event) => {
        const drag = aboutPopupDragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        aboutPopupDragRef.current = null;
        setIsAboutPopupDragging(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    return (
        <div className="site-shell">
            <header
                ref={headerRef}
                className={`site-header${isNavOnDark ? ' is-on-dark' : ''}${isNavHidden ? ' is-auto-hidden' : ''}`}
                aria-hidden={isNavHidden}
            >
                <nav className="site-nav site-nav--left" aria-label="왼쪽 주요 메뉴">
                    <a href="#work" tabIndex={isNavHidden ? -1 : 0}>
                        Works
                    </a>
                    <a href="#skills" tabIndex={isNavHidden ? -1 : 0}>
                        Skills
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
                <nav className="site-nav site-nav--right" aria-label="오른쪽 주요 메뉴">
                    <a href="#more-about-gallery" tabIndex={isNavHidden ? -1 : 0}>
                        About
                    </a>
                    <a href="#contact" tabIndex={isNavHidden ? -1 : 0}>
                        Contact
                    </a>
                </nav>
            </header>

            <main>
                <section className="hero" id="home" ref={heroRef}>
                    <div className="hero-visual" aria-label="웹 디자이너 여예빈">
                        <img
                            className="hero-chrome-decorations"
                            src="/images/hero-orbit-ring.png"
                            alt=""
                            draggable="false"
                            aria-hidden="true"
                        />
                        <div className="hero-chrome-name" aria-hidden="true">
                            <span className="hero-chrome-name__item hero-chrome-name__yeo">
                                <img
                                    className="hero-chrome-name__image hero-chrome-name__image--yeo"
                                    src="/images/hero/hero-yeo-chrome.png"
                                    alt=""
                                    draggable="false"
                                />
                            </span>
                            <span className="hero-chrome-name__item hero-chrome-name__yebin">
                                <img
                                    className="hero-chrome-name__image hero-chrome-name__image--yebin"
                                    src="/images/hero/hero-yebin-chrome.png"
                                    alt=""
                                    draggable="false"
                                />
                            </span>
                        </div>
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
                        <div className="hero-intro">
                            <span className="hero-intro__label">A LITTLE ABOUT ME</span>
                            <p>
                                밝은 에너지로 소통하고, 아이디어를 직접
                                <br />
                                디자인하고 구현하는 웹 디자이너{' '}
                                <span className="hero-intro__name">여예빈</span>입니다.
                            </p>
                            <small>YEO YEBIN · 2026</small>
                        </div>
                    </div>
                </section>

                <section
                    className={`about section${isAboutHeadlineActive ? ' is-visible' : ''}`}
                    id="about"
                    ref={aboutRef}
                >
                    <div className="about-desktop-decor" aria-hidden="true">
                        <img src="/images/lavender-sparkle.png" alt="" />
                        <img src="/images/chrome-star.png" alt="" />
                        <span>▱</span>
                    </div>
                    <div className="about__sticky">
                        <div className="section-index">
                            <span>01</span>
                            <span>About me</span>
                        </div>
                        <div className="about-browser" ref={aboutBrowserRef}>
                        <div className="about-browser__toolbar">
                            <div className="about-browser__history" aria-hidden="true">
                                <span>←</span>
                                <span>→</span>
                            </div>
                            <div className="about-browser__address">yeyebin.profile</div>
                            <div className="about-browser__controls" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>
                        <div className="about-browser__tabs" aria-label="프로필">
                            <span>PROFILE</span>
                        </div>
                        <div className="about-browser__panel">
                            <figure className="about-browser__portrait">
                                <div className="about-browser__portrait-frame">
                                    <img
                                        className="profile-placeholder"
                                        src="/images/about/about-profile.png"
                                        alt="여예빈 프로필"
                                    />
                                </div>
                                <img
                                    className="about-chrome-star"
                                    src="/images/chrome-star.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </figure>

                            <article className="about-browser__copy">
                                <header className="about-browser__identity">
                                    <h2>여예빈</h2>
                                    <strong>YEO YEBIN</strong>
                                    <p>웹디자이너 · 웹퍼블리셔</p>
                                </header>
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
                                        발견하고, 직접 실행하는 과정을 즐깁니다.
                                    </p>
                                    <p>
                                        사람들과 의견을 나누며 다양한 관점을 배우고, 기획부터
                                        디자인과 웹 퍼블리싱까지 아이디어를 실제 경험으로 구현하는
                                        디자이너로 성장하고 있습니다.
                                    </p>
                                </div>
                            </article>

                            <aside
                                className={`about-id-popup${isAboutPopupDragging ? ' is-dragging' : ''}`}
                                ref={aboutPopupRef}
                                style={{
                                    '--about-popup-x': `${aboutPopupPosition.x}px`,
                                    '--about-popup-y': `${aboutPopupPosition.y}px`,
                                }}
                                aria-label="Personal ID"
                            >
                                <div className="about-id-popup__window">
                                    <div
                                        className="about-id-popup__titlebar"
                                        onPointerDown={startAboutPopupDrag}
                                        onPointerMove={moveAboutPopup}
                                        onPointerUp={endAboutPopupDrag}
                                        onPointerCancel={endAboutPopupDrag}
                                    >
                                        <strong>PERSONAL ID</strong>
                                        <span aria-hidden="true">—</span>
                                    </div>
                                    <dl>
                                        <div className="is-mbti">
                                            <dt>MBTI</dt>
                                            <dd>ESTP</dd>
                                        </div>
                                        <div>
                                            <dt>성격</dt>
                                            <dd>밝고 적극적인 성격</dd>
                                        </div>
                                        <div>
                                            <dt>강점</dt>
                                            <dd>소통 능력 · 실행력</dd>
                                        </div>
                                        <div>
                                            <dt>가치관</dt>
                                            <dd>경험하며 배우는 자세</dd>
                                        </div>
                                    </dl>
                                </div>
                            </aside>
                        </div>
                    </div>
                    </div>
                </section>

                <section className="project" id="work">
                    <div className="horizontal-story" ref={horizontalStoryRef}>
                        <div className="horizontal-story__stage" ref={horizontalStoryStageRef}>
                            <div className="horizontal-story__track" ref={horizontalStoryTrackRef}>
                                <div
                                    className={`selected-works-heading section${isSelectedWorksTitleVisible ? ' is-visible' : ''}`}
                                    ref={selectedWorksRef}
                                >
                                    <div className="section-index section-index--light">
                                        <span>02</span>
                                        <span>Team Project</span>
                                    </div>
                                    <div className="selected-works-layout">
                                        <h2
                                            className="team-projects-title"
                                            ref={selectedWorksTitleRef}
                                        >
                                            <img
                                                className="team-projects-title__image"
                                                src="/images/nintendo/team-chrome-title.png"
                                                alt="TEAM"
                                                draggable="false"
                                            />
                                            <span className="team-projects-title__serif">
                                                Projects.
                                            </span>
                                        </h2>
                                        <div
                                            className="team-projects-editorial-meta"
                                            aria-hidden="true"
                                        >
                                            <span>FEATURED COLLABORATION</span>
                                            <strong>Ideas made together.</strong>
                                            <p>From concept to interactive experience.</p>
                                        </div>
                                        <p
                                            className="team-projects-edge-caption"
                                            aria-hidden="true"
                                        >
                                            01 / NINTENDO
                                        </p>
                                    </div>
                                </div>
                                <div className="project-hero section" id="nintendo">
                                    <div className="section-index section-index--light">
                                        <span>01</span>
                                        <span>Team Project</span>
                                    </div>
                                    <div className="nintendo-intro">
                                        <div className="nintendo-intro__visual">
                                            <span
                                                className="nintendo-intro__orbit"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="nintendo-intro__sparkle"
                                                aria-hidden="true"
                                            >
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
                                                    닌텐도의 다양한 캐릭터 IP를 중심으로 브랜드
                                                    경험을 강화하고, 게임 탐색 구조와 인터랙션을
                                                    개선한 웹사이트 리뉴얼 프로젝트입니다.
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
                                                            UI/UX Design · Frontend Development ·
                                                            Team Collaboration
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
                                        <div
                                            className="nintendo-experience__backdrops"
                                            aria-hidden="true"
                                        >
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
                                            캐릭터 IP를 중심으로 콘텐츠를 재구성하고, 게임 탐색부터
                                            다양한 인터랙션까지 닌텐도만의 즐거움을 웹 경험 전반에
                                            담아냈습니다.
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
                                                <br className="nintendo-character__lead-break" />{' '}
                                                새로운 플레이가 시작됩니다.
                                            </p>
                                            <p className="nintendo-character__description">
                                                마리오와 친구들을 직접 선택하고, 아이템에 따라
                                                변화하는 캐릭터를 경험할 수 있도록 구성했습니다.
                                                스크롤과 선택 인터랙션을 통해 게임 속 플레이의
                                                즐거움을 웹에서도 느낄 수 있도록 설계했습니다.
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
                                                <span className="nintendo-comparison__title-serif">
                                                    After.
                                                </span>
                                            </h3>
                                            <div className="nintendo-comparison__copy">
                                                <p>
                                                    정보를 전달하는 웹에서, 캐릭터를 경험하는
                                                    웹으로.
                                                </p>
                                                <p>
                                                    기존 닌텐도 웹사이트의 게임별 배너와 소식 중심
                                                    구성을 캐릭터 IP 중심의 경험으로 재구성했습니다.
                                                    직관적인 게임 탐색과 스크롤 인터랙션을 더해,
                                                    정보를 확인하는 과정을 브랜드를 직접 경험하는
                                                    순간으로 확장했습니다.
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
                                                        setNintendoComparePosition(
                                                            Number(event.target.value)
                                                        )
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
                                                    게임별 정보 중심에서 벗어나, 닌텐도의 캐릭터를
                                                    전면에 배치해 브랜드의 개성을 강화했습니다.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <span>02</span>
                                            <div>
                                                <strong>Game Discovery</strong>
                                                <h4>더 직관적인 게임 탐색</h4>
                                                <p>
                                                    게임을 시각적으로 탐색할 수 있도록 콘텐츠를
                                                    재구성해 원하는 게임을 발견하는 과정을
                                                    개선했습니다.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <span>03</span>
                                            <div>
                                                <strong>Interactive Experience</strong>
                                                <h4>스크롤로 이어지는 플레이 경험</h4>
                                                <p>
                                                    스크롤에 반응하는 캐릭터와 콘텐츠 연출을 통해
                                                    탐색 과정에도 즐거움을 더했습니다.
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
                                                        aria-label={
                                                            nintendoContributionItems[0].media.label
                                                        }
                                                    >
                                                        <source
                                                            src={
                                                                nintendoContributionItems[0].media
                                                                    .src
                                                            }
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
                                                    {nintendoContributionItems[0].tags.map(
                                                        (tag) => (
                                                            <li key={tag}>{tag}</li>
                                                        )
                                                    )}
                                                </ul>
                                                <p className="nintendo-contribution__description">
                                                    {nintendoContributionItems[0].description}
                                                </p>
                                            </div>
                                        </article>

                                        <div className="nintendo-contribution__details">
                                            {nintendoContributionItems.slice(1).map((item) => (
                                                <article
                                                    className={`nintendo-contribution__detail${
                                                        item.number === '03' || item.number === '04'
                                                            ? ' nintendo-contribution__detail--mobile-video'
                                                            : ''
                                                    }`}
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
                                                                        aria-label={
                                                                            item.media.label
                                                                        }
                                                                    >
                                                                        <source
                                                                            src={item.media.src}
                                                                            type="video/mp4"
                                                                        />
                                                                        브라우저에서 영상을 재생할
                                                                        수 없습니다.
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
                                                <p>
                                                    서로의 아이디어를 연결해 하나의 경험을 완성하다.
                                                </p>
                                                <p>
                                                    팀원들과 디자인 방향을 논의하고, 작업 과정을
                                                    공유하며 피드백을 반영했습니다.
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
                                                    <p>
                                                        함께 논의하며 디자인 방향을 구체화했습니다.
                                                    </p>
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
                                                    <p>
                                                        서로의 의견을 공유하고 작업 방향을
                                                        조율했습니다.
                                                    </p>
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
                                                    <p>
                                                        결과물을 함께 검토하며 개선점을
                                                        찾아갔습니다.
                                                    </p>
                                                </figcaption>
                                            </div>
                                        </figure>
                                    </div>

                                    <p className="nintendo-collaboration__keywords">
                                        Discuss <span>/</span> Share <span>/</span> Refine
                                    </p>
                                </div>

                                <div className="nintendo-chrome-path-preview" aria-hidden="true">
                                    <svg
                                        viewBox="0 0 9600 900"
                                        preserveAspectRatio="none"
                                        focusable="false"
                                    >
                                        <path
                                            d="M 60 830 C 430 795 1340 770 1600 760 C 1860 750 2940 835 3200 850 C 3460 865 4540 855 4800 860 C 5060 865 5380 848 5700 846 C 6020 844 6140 851 6400 850 C 6660 849 6940 842 7220 844 C 7500 846 7740 846 8000 848 C 8260 850 8500 832 8720 830 C 8940 828 9280 822 9580 812"
                                            pathLength="1"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="horizontal-story__chrome-guide"
                                ref={chromeStoryOverlayRef}
                                aria-hidden="true"
                            >
                                <svg
                                    viewBox="0 0 1600 900"
                                    preserveAspectRatio="none"
                                    focusable="false"
                                >
                                    <defs>
                                        <mask
                                            id="nintendo-02-trail-mask"
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="1600"
                                            height="900"
                                        >
                                            <path
                                                className="nintendo-02-chrome__trail-mask"
                                                d="M 43 794 C 210 730 310 690 451 691 C 620 695 700 700 820 620 C 950 535 1120 515 1338 558"
                                                pathLength="1"
                                            />
                                        </mask>
                                        <mask
                                            id="nintendo-02-star-mask"
                                            maskUnits="userSpaceOnUse"
                                            x="1320"
                                            y="493"
                                            width="238"
                                            height="180"
                                        >
                                            <rect
                                                className="nintendo-02-chrome__star-mask"
                                                x="1320"
                                                y="493"
                                                height="180"
                                            />
                                        </mask>
                                        <linearGradient
                                            id="chrome-story-silver"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="1"
                                        >
                                            <stop offset="0" stopColor="#6f7b8c" />
                                            <stop offset="0.22" stopColor="#f8fbff" />
                                            <stop offset="0.43" stopColor="#9fb7d1" />
                                            <stop offset="0.65" stopColor="#eee9ff" />
                                            <stop offset="0.84" stopColor="#7d8999" />
                                            <stop offset="1" stopColor="#f9fbff" />
                                        </linearGradient>
                                        <filter
                                            id="chrome-story-soft-shadow"
                                            x="-20%"
                                            y="-20%"
                                            width="140%"
                                            height="140%"
                                        >
                                            <feDropShadow
                                                dx="0"
                                                dy="4"
                                                stdDeviation="5"
                                                floodColor="#02050b"
                                                floodOpacity="0.42"
                                            />
                                        </filter>
                                    </defs>

                                    <g className="nintendo-02-chrome">
                                        <image
                                            className="nintendo-02-chrome__trail"
                                            href="/images/chrome-trail-only.png"
                                            x="28"
                                            y="425"
                                            width="1312"
                                            height="438"
                                            preserveAspectRatio="xMidYMid meet"
                                            mask="url(#nintendo-02-trail-mask)"
                                        />
                                        <image
                                            className="nintendo-02-chrome__star"
                                            href="/images/chrome-shooting-star.png"
                                            x="1320"
                                            y="493"
                                            width="238"
                                            height="180"
                                            preserveAspectRatio="xMidYMid meet"
                                            mask="url(#nintendo-02-star-mask)"
                                        />
                                    </g>

                                    {chromeStoryPaths.map((item) => (
                                        <g
                                            className="chrome-story-path"
                                            data-panel={item.panel}
                                            key={item.panel}
                                            ref={(node) => {
                                                if (node) {
                                                    chromeStoryGroupRefs.current.set(
                                                        item.panel,
                                                        node
                                                    );
                                                } else {
                                                    chromeStoryGroupRefs.current.delete(item.panel);
                                                }
                                            }}
                                        >
                                            <path
                                                className="chrome-story-path__shadow"
                                                d={item.d}
                                                pathLength="1"
                                            />
                                            <path
                                                className="chrome-story-path__silver"
                                                d={item.d}
                                                pathLength="1"
                                                ref={(node) => {
                                                    if (node) {
                                                        chromeStoryPathRefs.current.set(
                                                            item.panel,
                                                            node
                                                        );
                                                    } else {
                                                        chromeStoryPathRefs.current.delete(
                                                            item.panel
                                                        );
                                                    }
                                                }}
                                            />
                                            <path
                                                className="chrome-story-path__highlight"
                                                d={item.d}
                                                pathLength="1"
                                            />
                                        </g>
                                    ))}

                                    <image
                                        className="chrome-story-star"
                                        ref={chromeStoryStarRef}
                                        href="/images/chrome-star.png"
                                        width="86"
                                        height="86"
                                        preserveAspectRatio="xMidYMid meet"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="nintendo-late-story" ref={nintendoLateStoryRef}>
                        <div
                            className="nintendo-late-story__stage"
                            ref={nintendoLateStoryStageRef}
                        >
                            <div
                                className="nintendo-late-story__track"
                                ref={nintendoLateStoryTrackRef}
                            >
                    <section
                        ref={planningIntroRef}
                        className={`nintendo-planning-intro section${isPlanningIntroVisible ? ' is-visible' : ''}`}
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
                            <p className="nintendo-planning-intro__label">07 / PLANNING PROCESS</p>

                            <div className="nintendo-planning-intro__title-wrap">
                                <span
                                    className="nintendo-planning-intro__system"
                                    aria-hidden="true"
                                >
                                    NEXT CHAPTER · RESEARCH MODE
                                </span>
                                <h3 id="nintendo-planning-title">
                                    <img
                                        className="nintendo-planning-intro__title-image"
                                        src="/images/behind-the-chrome.png"
                                        alt="BEHIND THE"
                                    />
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
                        ref={researchArchiveRef}
                        className="nintendo-research-archive section"
                        aria-labelledby="nintendo-research-archive-title"
                    >
                        <div className="nintendo-research-archive__inner">
                            <header className="nintendo-research-archive__meta">
                                <p>08 / RESEARCH ARCHIVE</p>
                                <span>ANALYSIS FILES · NINTENDO RENEWAL</span>
                            </header>

                            <div className="nintendo-research-archive__layout">
                                <div className="nintendo-research-archive__media">
                                    <button
                                        className="nintendo-research-archive__main"
                                        type="button"
                                        onClick={(event) =>
                                            openDocumentPreview(
                                                {
                                                    src: selectedResearchArchiveImage.src,
                                                    alt: selectedResearchArchiveImage.alt,
                                                    isResearch: true,
                                                },
                                                event
                                            )
                                        }
                                        aria-label={`${selectedResearchArchiveImage.label} 원본 이미지 확대 보기`}
                                    >
                                        {previousResearchArchiveImage && (
                                            <img
                                                className="is-leaving"
                                                src={previousResearchArchiveImage.src}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        )}
                                        <img
                                            className="is-entering"
                                            key={selectedResearchArchiveImage.key}
                                            src={selectedResearchArchiveImage.src}
                                            alt={selectedResearchArchiveImage.alt}
                                        />
                                        <span>
                                            VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                        </span>
                                    </button>

                                    <div
                                        className="nintendo-research-archive__thumbnails"
                                        role="group"
                                        aria-label={`${selectedResearchArchive.label} 세부 이미지 선택`}
                                    >
                                        {previousResearchArchiveCategory && (
                                            <div
                                                className="nintendo-research-archive__thumbnail-set is-leaving"
                                                aria-hidden="true"
                                            >
                                                {previousResearchArchiveCategory.images.map(
                                                    (image) => (
                                                        <div key={image.key}>
                                                            <img src={image.src} alt="" />
                                                            <span>{image.label}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <div
                                            className="nintendo-research-archive__thumbnail-set is-entering"
                                            key={selectedResearchArchive.key}
                                        >
                                            {selectedResearchArchive.images.map((image) => (
                                                <button
                                                    type="button"
                                                    aria-pressed={
                                                        activeResearchArchiveImage === image.key
                                                    }
                                                    className={
                                                        activeResearchArchiveImage === image.key
                                                            ? 'is-active'
                                                            : ''
                                                    }
                                                    key={image.key}
                                                    onClick={() =>
                                                        selectResearchArchiveImage(image.key)
                                                    }
                                                >
                                                    <img src={image.src} alt="" />
                                                    <span>{image.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="nintendo-research-archive__content">
                                    <p className="nintendo-research-archive__eyebrow">
                                        ARCHIVE 01 / 02
                                    </p>
                                    <h3 id="nintendo-research-archive-title">
                                        <span>Beyond the</span>
                                        <em>Screen.</em>
                                    </h3>
                                    <p className="nintendo-research-archive__description">
                                        익숙한 닌텐도의 화면을 다시 바라보고, 다른 게임 플랫폼과의
                                        차이를 살펴봤습니다.
                                    </p>

                                    <div
                                        className="nintendo-research-archive__categories"
                                        role="tablist"
                                        aria-label="리서치 자료 카테고리"
                                    >
                                        {researchArchiveCategories.map((category, index) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={
                                                    activeResearchArchive === category.key
                                                }
                                                tabIndex={
                                                    activeResearchArchive === category.key ? 0 : -1
                                                }
                                                className={
                                                    activeResearchArchive === category.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={category.key}
                                                onClick={() => selectResearchArchive(category.key)}
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        researchArchiveCategories,
                                                        activeResearchArchive,
                                                        selectResearchArchive
                                                    )
                                                }
                                            >
                                                <span>{String(index + 1).padStart(2, '0')}</span>
                                                <strong>{category.label}</strong>
                                                <i aria-hidden="true">↗</i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        ref={userInsightRef}
                        className="nintendo-research-archive nintendo-user-insight section"
                        aria-labelledby="nintendo-user-insight-title"
                    >
                        <div className="nintendo-research-archive__inner">
                            <header className="nintendo-research-archive__meta">
                                <p>09 / USER INSIGHT</p>
                                <span>PROCESS ARCHIVE · NINTENDO RENEWAL</span>
                            </header>

                            <div className="nintendo-research-archive__layout">
                                <div className="nintendo-research-archive__media">
                                    <div
                                        className={`nintendo-research-archive__main${activeUserInsight === 'interview' ? ' is-editorial' : ''}`}
                                    >
                                        {previousUserInsightCategory?.key === 'interview' ? (
                                            <InterviewEditorialCard
                                                interview={previousUserInsightImage}
                                                className="is-leaving"
                                            />
                                        ) : previousUserInsightImage ? (
                                            <img
                                                className="is-leaving"
                                                src={previousUserInsightImage.src}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        {activeUserInsight === 'interview' ? (
                                            <InterviewEditorialCard
                                                key={selectedUserInsightImage.key}
                                                interview={selectedUserInsightImage}
                                                className="is-entering"
                                            />
                                        ) : (
                                            <button
                                                className="nintendo-user-insight__image-trigger"
                                                type="button"
                                                onClick={(event) =>
                                                    openDocumentPreview(
                                                        {
                                                            src: selectedUserInsightImage.src,
                                                            alt: selectedUserInsightImage.alt,
                                                            isResearch: true,
                                                        },
                                                        event
                                                    )
                                                }
                                                aria-label={`${selectedUserInsightImage.label} 자료 확대 보기`}
                                            >
                                                <img
                                                    className="is-entering"
                                                    key={selectedUserInsightImage.key}
                                                    src={selectedUserInsightImage.src}
                                                    alt={selectedUserInsightImage.alt}
                                                />
                                                <span>
                                                    VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    <div
                                        className="nintendo-research-archive__thumbnails"
                                        role="group"
                                        aria-label={`${selectedUserInsight.label} 사용자 자료 선택`}
                                    >
                                        {previousUserInsightCategory && (
                                            <div
                                                className="nintendo-research-archive__thumbnail-set is-leaving"
                                                aria-hidden="true"
                                            >
                                                {previousUserInsightCategory.images.map((image) => (
                                                    <div
                                                        className={
                                                            previousUserInsightCategory.key ===
                                                            'interview'
                                                                ? 'is-person'
                                                                : ''
                                                        }
                                                        key={image.key}
                                                    >
                                                        {previousUserInsightCategory.key !==
                                                            'interview' && (
                                                            <img src={image.src} alt="" />
                                                        )}
                                                        <span>{image.label}</span>
                                                        {previousUserInsightCategory.key ===
                                                            'interview' && (
                                                            <strong>{image.name}</strong>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div
                                            className="nintendo-research-archive__thumbnail-set is-entering"
                                            key={selectedUserInsight.key}
                                        >
                                            {selectedUserInsight.images.map((image) => (
                                                <button
                                                    type="button"
                                                    aria-pressed={
                                                        activeUserInsightImage === image.key
                                                    }
                                                    className={`${activeUserInsight === 'interview' ? 'is-person ' : ''}${activeUserInsightImage === image.key ? 'is-active' : ''}`.trim()}
                                                    key={image.key}
                                                    onClick={() =>
                                                        selectUserInsightImage(image.key)
                                                    }
                                                >
                                                    {activeUserInsight !== 'interview' && (
                                                        <img src={image.src} alt="" />
                                                    )}
                                                    <span>{image.label}</span>
                                                    {activeUserInsight === 'interview' && (
                                                        <strong>{image.name}</strong>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className={`nintendo-user-insight__source-actions${activeUserInsight === 'interview' ? '' : ' is-placeholder'}`}
                                        aria-hidden={activeUserInsight !== 'interview'}
                                    >
                                        {activeUserInsight === 'interview' &&
                                            selectedUserInsightImage.pdf && (
                                                <>
                                                    <a
                                                        href={selectedUserInsightImage.pdf}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        VIEW ORIGINAL PDF{' '}
                                                        <span aria-hidden="true">↗</span>
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={(event) =>
                                                            openDocumentPreview(
                                                                {
                                                                    src: selectedUserInsightImage.src,
                                                                    alt: selectedUserInsightImage.alt,
                                                                    isResearch: true,
                                                                },
                                                                event
                                                            )
                                                        }
                                                    >
                                                        VIEW ORIGINAL IMAGE{' '}
                                                        <span aria-hidden="true">↗</span>
                                                    </button>
                                                </>
                                            )}
                                    </div>
                                </div>

                                <div className="nintendo-research-archive__content">
                                    <p className="nintendo-research-archive__eyebrow">
                                        ARCHIVE 01 / 04
                                    </p>
                                    <h3 id="nintendo-user-insight-title">
                                        <span>Understanding</span>
                                        <em>the Players.</em>
                                    </h3>
                                    <p className="nintendo-research-archive__description">
                                        사용자의 목소리에서 출발해, 경험의 흐름을 구체화했습니다.
                                    </p>
                                    <div
                                        className="nintendo-research-archive__categories"
                                        role="tablist"
                                        aria-label="사용자 인사이트 자료 카테고리"
                                    >
                                        {userInsightCategories.map((category, index) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={activeUserInsight === category.key}
                                                tabIndex={
                                                    activeUserInsight === category.key ? 0 : -1
                                                }
                                                className={
                                                    activeUserInsight === category.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={category.key}
                                                onClick={() =>
                                                    selectUserInsightFromControl(category.key)
                                                }
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        userInsightCategories,
                                                        activeUserInsight,
                                                        selectUserInsightFromControl
                                                    )
                                                }
                                            >
                                                <span>{String(index + 1).padStart(2, '0')}</span>
                                                <strong>{category.label}</strong>
                                                <i aria-hidden="true">↗</i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        ref={designStructureRef}
                        className="nintendo-research-archive nintendo-user-insight nintendo-design-structure section"
                        aria-labelledby="nintendo-design-structure-title"
                    >
                        <div className="nintendo-research-archive__inner">
                            <header className="nintendo-research-archive__meta">
                                <p>10 / DESIGN STRUCTURE</p>
                                <span>PROCESS ARCHIVE · NINTENDO RENEWAL</span>
                            </header>
                            <div className="nintendo-research-archive__layout">
                                <div className="nintendo-research-archive__media">
                                    <div className="nintendo-research-archive__main">
                                        {previousDesignStructureItem && (
                                            <img
                                                className="is-leaving"
                                                src={previousDesignStructureItem.src}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        )}
                                        <button
                                            className="nintendo-user-insight__image-trigger"
                                            type="button"
                                            onClick={(event) =>
                                                openArchitecturePreview(
                                                    selectedDesignStructure,
                                                    event
                                                )
                                            }
                                            aria-label={`${selectedDesignStructure.title} 원본 이미지 확대 보기`}
                                        >
                                            <img
                                                className="is-entering"
                                                key={selectedDesignStructure.key}
                                                src={selectedDesignStructure.src}
                                                alt={selectedDesignStructure.alt}
                                            />
                                            <span>
                                                VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                            </span>
                                        </button>
                                    </div>
                                    <div
                                        className="nintendo-research-archive__thumbnails"
                                        role="group"
                                        aria-label="디자인 구조 자료 선택"
                                    >
                                        <div
                                            className="nintendo-research-archive__thumbnail-set is-entering"
                                            key={activeDesignStructure}
                                        >
                                            {designStructureArtifacts.map((item) => (
                                                <button
                                                    type="button"
                                                    aria-pressed={
                                                        activeDesignStructure === item.key
                                                    }
                                                    className={
                                                        activeDesignStructure === item.key
                                                            ? 'is-active'
                                                            : ''
                                                    }
                                                    key={item.key}
                                                    onClick={() =>
                                                        selectDesignStructureFromControl(item.key)
                                                    }
                                                >
                                                    <img src={item.previewSrc} alt="" />
                                                    <span>
                                                        {item.key === 'ia'
                                                            ? 'IA'
                                                            : item.key === 'flow'
                                                              ? 'USER FLOW'
                                                              : 'MIND MAP'}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div
                                        className="nintendo-user-insight__source-actions is-placeholder"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="nintendo-research-archive__content">
                                    <p className="nintendo-research-archive__eyebrow">
                                        ARCHIVE 01 / 03
                                    </p>
                                    <h3 id="nintendo-design-structure-title">
                                        <span>From Insight</span>
                                        <em>to Structure.</em>
                                    </h3>
                                    <p className="nintendo-research-archive__description">
                                        사용자의 니즈를 바탕으로 정보의 흐름과 사이트 구조를
                                        설계했습니다.
                                    </p>
                                    <div
                                        className="nintendo-research-archive__categories"
                                        role="tablist"
                                        aria-label="디자인 구조 자료 카테고리"
                                    >
                                        {designStructureArtifacts.map((item) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={activeDesignStructure === item.key}
                                                tabIndex={
                                                    activeDesignStructure === item.key ? 0 : -1
                                                }
                                                className={
                                                    activeDesignStructure === item.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={item.key}
                                                onClick={() =>
                                                    selectDesignStructureFromControl(item.key)
                                                }
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        designStructureArtifacts,
                                                        activeDesignStructure,
                                                        selectDesignStructureFromControl
                                                    )
                                                }
                                            >
                                                <span>{item.number}</span>
                                                <strong>{item.title}</strong>
                                                <i aria-hidden="true">↗</i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        ref={designDevelopmentArchiveRef}
                        className="nintendo-research-archive nintendo-user-insight nintendo-design-structure nintendo-design-development-archive section"
                        aria-labelledby="nintendo-design-development-title"
                    >
                        <div className="nintendo-research-archive__inner">
                            <header className="nintendo-research-archive__meta">
                                <p>11 / DESIGN DEVELOPMENT</p>
                                <span>PROCESS ARCHIVE · NINTENDO RENEWAL</span>
                            </header>
                            <div className="nintendo-research-archive__layout">
                                <div className="nintendo-research-archive__media">
                                    <div className="nintendo-research-archive__main">
                                        {previousDesignDevelopmentArchiveImage && (
                                            <img
                                                className="is-leaving"
                                                src={previousDesignDevelopmentArchiveImage.src}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        )}
                                        <button
                                            className="nintendo-user-insight__image-trigger"
                                            type="button"
                                            onClick={(event) =>
                                                openDevelopmentPreview(
                                                    selectedDesignDevelopmentArchive,
                                                    event,
                                                    selectedDesignDevelopmentArchiveImage.key
                                                )
                                            }
                                            aria-label={`${selectedDesignDevelopmentArchiveImage.label} 원본 이미지 확대 보기`}
                                        >
                                            <img
                                                className="is-entering"
                                                key={`${activeDesignDevelopmentArchive}-${activeDesignDevelopmentArchiveImage}`}
                                                src={selectedDesignDevelopmentArchiveImage.src}
                                                alt={selectedDesignDevelopmentArchiveImage.alt}
                                            />
                                            <span>
                                                VIEW FULL IMAGE <i aria-hidden="true">↗</i>
                                            </span>
                                        </button>
                                    </div>
                                    <div
                                        className="nintendo-research-archive__thumbnails"
                                        role="group"
                                        aria-label="디자인 개발 자료 선택"
                                    >
                                        {previousDesignDevelopmentArchiveCategory &&
                                            previousDesignDevelopmentArchiveCategory.key !==
                                                selectedDesignDevelopmentArchive.key && (
                                                <div className="nintendo-research-archive__thumbnail-set is-leaving">
                                                    {previousDesignDevelopmentArchiveCategory.modalImages.map(
                                                        (image) => (
                                                            <button
                                                                type="button"
                                                                key={image.key}
                                                                tabIndex={-1}
                                                            >
                                                                <img src={image.src} alt="" />
                                                                <span>{image.label}</span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        <div
                                            className="nintendo-research-archive__thumbnail-set is-entering"
                                            key={activeDesignDevelopmentArchive}
                                        >
                                            {selectedDesignDevelopmentArchive.modalImages.map(
                                                (image) => (
                                                    <button
                                                        type="button"
                                                        aria-pressed={
                                                            activeDesignDevelopmentArchiveImage ===
                                                            image.key
                                                        }
                                                        className={
                                                            activeDesignDevelopmentArchiveImage ===
                                                            image.key
                                                                ? 'is-active'
                                                                : ''
                                                        }
                                                        key={image.key}
                                                        onClick={() =>
                                                            selectDesignDevelopmentArchiveImage(
                                                                image.key
                                                            )
                                                        }
                                                    >
                                                        <img src={image.src} alt="" />
                                                        <span>{image.label}</span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="nintendo-user-insight__source-actions is-placeholder"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="nintendo-research-archive__content">
                                    <p className="nintendo-research-archive__eyebrow">
                                        ARCHIVE {selectedDesignDevelopmentArchive.number} / 03
                                    </p>
                                    <h3 id="nintendo-design-development-title">
                                        <span>Shaping the</span>
                                        <em>Experience.</em>
                                    </h3>
                                    <p className="nintendo-research-archive__description">
                                        아이디어를 구체적인 화면과 시각적 디자인 시스템으로
                                        발전시켰습니다.
                                    </p>
                                    <div
                                        className="nintendo-research-archive__categories"
                                        role="tablist"
                                        aria-label="디자인 개발 자료 카테고리"
                                    >
                                        {designDevelopmentArtifacts.map((item) => (
                                            <button
                                                type="button"
                                                role="tab"
                                                aria-selected={
                                                    activeDesignDevelopmentArchive === item.key
                                                }
                                                tabIndex={
                                                    activeDesignDevelopmentArchive === item.key
                                                        ? 0
                                                        : -1
                                                }
                                                className={
                                                    activeDesignDevelopmentArchive === item.key
                                                        ? 'is-active'
                                                        : ''
                                                }
                                                key={item.key}
                                                onClick={() =>
                                                    selectDesignDevelopmentArchiveFromControl(
                                                        item.key
                                                    )
                                                }
                                                onKeyDown={(event) =>
                                                    handleResearchTabKeyDown(
                                                        event,
                                                        designDevelopmentArtifacts,
                                                        activeDesignDevelopmentArchive,
                                                        selectDesignDevelopmentArchiveFromControl
                                                    )
                                                }
                                            >
                                                <span>{item.number}</span>
                                                <strong>{item.title}</strong>
                                                <i aria-hidden="true">●</i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="nintendo-documentation section">
                        <header className="nintendo-documentation__header">
                            <div className="nintendo-research-archive__meta nintendo-documentation__meta">
                                <p>12 / TEAM DOCUMENTATION</p>
                                <span>MY CONTRIBUTION · NINTENDO RENEWAL</span>
                            </div>
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
                                        팀 프로젝트의 서기를 맡아 매일 회의 내용을 기록하고,
                                        팀원별 역할 분담과 아이디어, 피드백을 체계적으로 정리해
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
                    </section>

                    <section
                        hidden
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
                        className="nintendo-final-outcome-13 section"
                        id="nintendo-final-outcome-13"
                        aria-labelledby="nintendo-final-outcome-13-title"
                    >
                        <div className="nintendo-final-outcome-13__inner">
                            <header className="nintendo-final-outcome-13__header">
                                <div className="nintendo-final-outcome-13__meta">
                                    <span>13 / FINAL OUTCOME</span>
                                    <span>NINTENDO RENEWAL · FINAL RESULT</span>
                                </div>
                                <div className="nintendo-final-outcome-13__heading">
                                    <h3 id="nintendo-final-outcome-13-title">
                                        <span>THE FINAL</span>
                                        <em>Experience.</em>
                                    </h3>
                                    <p>
                                        기획부터 디자인, 인터랙션 구현까지. 디바이스에 맞춰 완성한
                                        닌텐도 웹사이트 리뉴얼 프로젝트.
                                    </p>
                                </div>
                            </header>

                            <figure className="nintendo-final-outcome-13__visual">
                                <img
                                    src="/images/nintendo/nintendo-final-mockup.png"
                                    alt="맥북, 게임 화면, 모바일 화면으로 구성된 닌텐도 웹사이트 리뉴얼 최종 목업"
                                />
                            </figure>

                            <div className="nintendo-final-outcome-13__action">
                                <a
                                    href="https://mbc-teamproject-red.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    VIEW WEBSITE <span aria-hidden="true">↗</span>
                                </a>
                                <a
                                    href="https://www.figma.com/proto/jlCiMEG4RmMn2e8wsIMnks/Nintendo-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%9E%A5%ED%91%9C?node-id=1-574&viewport=73%2C269%2C0.03&t=3QdOCFPfZkn0ybZo-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A574&page-id=0%3A1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VIEW PROPOSAL <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </div>
                    </section>

                            </div>
                        </div>
                    </div>

                    <div className="personal-horizontal-story" ref={personalStoryRef}>
                        <div
                            className="personal-horizontal-story__stage"
                            ref={personalStoryStageRef}
                        >
                            <div
                                className="personal-horizontal-story__track"
                                ref={personalStoryTrackRef}
                            >
                                <PersonalProjectsIntro />
                                <DiptyqueProjectIntro />
                                <DiptyqueProjectShowcase />
                                <SwarovskiProjectIntro />
                                <SwarovskiVisualShowcase />
                            </div>
                        </div>
                    </div>

                    <ShortFormContentsIntro />
                    <OtherWorks />

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

                </section>

                <SkillsTypographyIntro />

                <SkillsQAFlow />


                <ContactSection />
            </main>
            <footer className="site-footer">
                <p>YEO YEBIN</p>
                <p>WEB DESIGN &amp; PUBLISHING PORTFOLIO</p>
                <p>© 2026 YEO YEBIN</p>
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
            {developmentPreview &&
                selectedDevelopmentImage &&
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
                                            className={isDevelopmentImageReady ? 'is-ready' : ''}
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
                                        disabled={!isDevelopmentImageReady || developmentZoom >= 3}
                                        aria-label="확대"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className={developmentViewMode === 'fit' ? 'is-active' : ''}
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
                ref={topButtonRef}
                className={`top-button${isTopButtonVisible ? ' is-visible' : ''}${isTopButtonOnDark ? '' : ' is-on-light'}`}
                type="button"
                aria-label="맨 위로 이동"
                aria-hidden={!isTopButtonVisible}
                tabIndex={isTopButtonVisible ? 0 : -1}
                disabled={!isTopButtonVisible}
                onClick={scrollToTop}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
                </svg>
            </button>
            <PortfolioChatbot />
        </div>
    );
}

export default App;
