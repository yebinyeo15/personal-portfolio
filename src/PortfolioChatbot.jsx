import { useEffect, useRef, useState } from 'react';
import './PortfolioChatbot.css';

const welcomeMessage = {
    id: 'welcome',
    sender: 'bot',
    text: '안녕하세요! 여예빈의 포트폴리오 안내 챗봇입니다. 궁금한 내용을 선택해 주세요.',
};

const questions = [
    {
        id: 'intro',
        label: '자기소개',
        answer: '안녕하세요! 밝고 긍정적인 에너지와 끈기를 바탕으로 끊임없이 배우고 성장하는 여예빈입니다. UI/UX 디자인과 웹 퍼블리싱을 공부하며, 아이디어를 직접 디자인하고 구현하는 과정에서 즐거움을 느끼고 있습니다.',
    },
    {
        id: 'motivation',
        label: '디자인 계기',
        answer: '처음에는 새로운 분야에 도전해 보고 싶은 마음으로 UI/UX 디자인과 웹 퍼블리싱을 배우기 시작했습니다. 배우는 과정에서 머릿속 아이디어가 실제 웹사이트로 구현되는 것이 흥미로웠고, 직접 디자인하고 완성해 나가는 과정에서 점점 더 큰 매력을 느끼게 되었습니다.',
    },
    {
        id: 'strengths',
        label: '나의 강점',
        answer: '저의 가장 큰 강점은 실행력과 끈기입니다. 새로운 것을 배우는 데 주저하지 않고, 어려운 문제가 생겨도 쉽게 포기하지 않습니다. 부족한 부분은 직접 부딪히고 해결하며 끝까지 완성하려고 노력합니다.',
    },
    {
        id: 'collaboration',
        label: '협업 스타일',
        answer: '사람들과 소통하고 의견을 나누는 것을 좋아합니다. 팀 프로젝트에서는 다양한 의견을 적극적으로 듣고, 제 생각도 솔직하게 전달하려고 노력합니다. 서로의 강점을 살려 더 좋은 결과물을 만드는 협업을 중요하게 생각합니다.',
    },
    {
        id: 'projects',
        label: '프로젝트',
        answer: 'Nintendo 웹사이트 리디자인을 비롯해 Diptyque, Swarovski 등 다양한 브랜드를 주제로 웹 프로젝트를 진행했습니다. 브랜드의 분위기와 사용자 경험을 고려해 디자인하고, 인터랙션을 구현하는 작업을 경험했습니다.',
    },
    {
        id: 'role',
        label: '담당 역할',
        answer: '팀 프로젝트에서 UI 디자인과 이미지 제작, 웹 퍼블리싱 등 전반적인 제작 과정에 함께 참여했습니다. 팀원들과 다양한 아이디어를 나누고 각자의 의견이 결과물에 반영될 수 있도록 노력했으며, 회의 내용과 진행 사항을 꼼꼼히 기록하며 원활한 협업에 기여했습니다.',
    },
    {
        id: 'technology',
        label: '사용 기술',
        answer: 'HTML, CSS, JavaScript, React를 활용해 웹페이지를 제작합니다. 반응형 레이아웃과 스크롤 인터랙션을 구현하고, GitHub를 통한 코드 관리와 Vercel 배포도 경험했습니다.',
    },
    {
        id: 'design-tools',
        label: '디자인 툴',
        answer: 'Figma를 중심으로 웹사이트 레이아웃과 UI를 디자인합니다. Photoshop을 활용한 이미지 편집과 보정 작업도 가능하며, Illustrator는 기본 기능을 익히며 활용 범위를 넓혀가고 있습니다.',
    },
    {
        id: 'interests',
        label: '관심 분야',
        answer: '웹 디자인과 인터랙티브한 사용자 경험에 관심이 많습니다. 특히 패션, 뷰티, 라이프스타일 브랜드의 감각적인 웹사이트를 좋아하며, 시각적인 완성도와 사용성을 함께 고려하는 디자인을 지향합니다.',
    },
    {
        id: 'contact',
        label: '연락 방법',
        answer: '함께할 기회나 궁금한 점이 있다면 언제든 연락해 주세요! 포트폴리오 하단 CONTACT 섹션에서 이메일과 연락처를 확인하실 수 있습니다.',
    },
];

const keywordMap = {
    intro: ['자기소개', '소개', '성격', '누구'],
    motivation: ['디자인 시작', '계기', '이유', '왜 시작'],
    strengths: ['강점', '장점', '잘하는 것'],
    collaboration: ['협업', '소통', '팀워크'],
    projects: ['프로젝트', '작업물', '포트폴리오'],
    role: ['담당', '역할', '기여', '팀 프로젝트'],
    technology: ['코딩', '개발', 'React', 'JavaScript', 'HTML', 'CSS'],
    'design-tools': ['Figma', 'Photoshop', 'Illustrator', '디자인 툴'],
    interests: ['관심', '좋아하는 분야', '관심 분야'],
    contact: ['연락', '이메일', '메일', 'contact'],
};

const fallbackAnswer =
    '아직 해당 질문에 대한 답변은 준비되지 않았어요. 아래 키워드에서 궁금한 내용을 선택해 주세요!';

const normalizeText = (text) =>
    text
        .toLocaleLowerCase('ko-KR')
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .trim()
        .replace(/\s+/g, ' ');

const includesKeyword = (normalizedText, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    const isEnglishKeyword = /^[a-z0-9 ]+$/.test(normalizedKeyword);

    if (isEnglishKeyword) {
        const escapedKeyword = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(^|[^a-z0-9])${escapedKeyword}($|[^a-z0-9])`, 'i').test(
            normalizedText
        );
    }

    return normalizedText.replace(/\s/g, '').includes(normalizedKeyword.replace(/\s/g, ''));
};

const findAnswer = (input) => {
    const normalizedInput = normalizeText(input);
    let bestMatch = null;

    questions.forEach((question) => {
        const matchedKeywords = keywordMap[question.id].filter((keyword) =>
            includesKeyword(normalizedInput, keyword)
        );

        if (matchedKeywords.length === 0) return;

        const specificity = matchedKeywords.reduce(
            (score, keyword) => score + normalizeText(keyword).replace(/\s/g, '').length,
            0
        );
        const match = { question, matchedCount: matchedKeywords.length, specificity };

        if (
            !bestMatch ||
            match.matchedCount > bestMatch.matchedCount ||
            (match.matchedCount === bestMatch.matchedCount &&
                match.specificity > bestMatch.specificity)
        ) {
            bestMatch = match;
        }
    });

    return bestMatch?.question.answer ?? fallbackAnswer;
};

function PortfolioChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([welcomeMessage]);
    const [inputValue, setInputValue] = useState('');
    const [isNudgeVisible, setIsNudgeVisible] = useState(false);
    const [isTriggerHovered, setIsTriggerHovered] = useState(false);
    const messageSequence = useRef(0);
    const scrollAreaRef = useRef(null);
    const closeButtonRef = useRef(null);
    const triggerButtonRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                triggerButtonRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !scrollAreaRef.current) return;
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [isOpen, messages]);

    useEffect(() => {
        if (isOpen || isTriggerHovered) {
            return undefined;
        }

        let hideTimer;
        const showNudge = () => {
            setIsNudgeVisible(true);
            window.clearTimeout(hideTimer);
            hideTimer = window.setTimeout(() => setIsNudgeVisible(false), 3750);
        };
        const interval = window.setInterval(showNudge, 10000);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(hideTimer);
        };
    }, [isOpen, isTriggerHovered]);

    const closeChat = () => {
        setIsOpen(false);
        triggerButtonRef.current?.focus();
    };

    const addConversation = (userText, answer) => {
        messageSequence.current += 1;
        const sequence = messageSequence.current;

        setMessages((currentMessages) => [
            ...currentMessages,
            { id: `user-${sequence}`, sender: 'user', text: userText },
            { id: `bot-${sequence}`, sender: 'bot', text: answer },
        ]);
    };

    const selectQuestion = (question) => {
        addConversation(question.label, question.answer);
    };

    const submitQuestion = (event) => {
        event.preventDefault();
        const trimmedInput = inputValue.trim();

        if (!trimmedInput) return;

        addConversation(trimmedInput, findAnswer(trimmedInput));
        setInputValue('');
    };

    const toggleChat = () => {
        setIsNudgeVisible(false);
        setIsOpen((current) => !current);
    };

    const openChat = () => {
        setIsNudgeVisible(false);
        setIsOpen(true);
    };

    return (
        <aside className={`portfolio-chatbot${isOpen ? ' is-open' : ''}`}>
            <section
                id="portfolio-chatbot-dialog"
                className="portfolio-chatbot__panel"
                role="dialog"
                aria-modal="false"
                aria-label="포트폴리오 안내 챗봇"
                aria-hidden={!isOpen}
            >
                <header className="portfolio-chatbot__header">
                    <div>
                        <span className="portfolio-chatbot__status" aria-hidden="true" />
                        <p>PORTFOLIO GUIDE</p>
                        <h2>여예빈에게 궁금한 점이 있나요?</h2>
                    </div>
                    <button
                        ref={closeButtonRef}
                        className="portfolio-chatbot__close"
                        type="button"
                        aria-label="챗봇 닫기"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={closeChat}
                    >
                        <span aria-hidden="true" />
                    </button>
                </header>

                <div
                    ref={scrollAreaRef}
                    className="portfolio-chatbot__messages"
                    data-lenis-prevent
                    onWheel={(event) => event.stopPropagation()}
                    onTouchMove={(event) => event.stopPropagation()}
                    aria-live="polite"
                    aria-relevant="additions"
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`portfolio-chatbot__message is-${message.sender}`}
                        >
                            {message.sender === 'bot' && (
                                <span className="portfolio-chatbot__avatar" aria-hidden="true">
                                    Y
                                </span>
                            )}
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>

                <div className="portfolio-chatbot__questions" aria-label="추천 질문">
                    <p>추천 질문</p>
                    <div>
                        {questions.map((question) => (
                            <button
                                key={question.id}
                                type="button"
                                tabIndex={isOpen ? 0 : -1}
                                onClick={() => selectQuestion(question)}
                            >
                                {question.label}
                            </button>
                        ))}
                    </div>
                    <form className="portfolio-chatbot__input-form" onSubmit={submitQuestion}>
                        <label className="portfolio-chatbot__input-label" htmlFor="chatbot-question">
                            직접 질문하기
                        </label>
                        <div>
                            <input
                                id="chatbot-question"
                                type="text"
                                value={inputValue}
                                placeholder="궁금한 점을 입력해 주세요."
                                autoComplete="off"
                                tabIndex={isOpen ? 0 : -1}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                            <button
                                className="portfolio-chatbot__send"
                                type="submit"
                                aria-label="질문 전송"
                                tabIndex={isOpen ? 0 : -1}
                                disabled={!inputValue.trim()}
                            >
                                <svg viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M4 10h12M11 5l5 5-5 5" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <button
                className={`portfolio-chatbot__nudge${isNudgeVisible ? ' is-visible' : ''}`}
                type="button"
                aria-hidden={!isNudgeVisible}
                tabIndex={isNudgeVisible ? 0 : -1}
                onClick={openChat}
            >
                저에 대해 더 알고 싶으신가요?
            </button>
            <button
                ref={triggerButtonRef}
                className={`portfolio-chatbot__trigger${isNudgeVisible ? ' is-nudging' : ''}`}
                type="button"
                aria-label={isOpen ? '챗봇 닫기' : '포트폴리오 챗봇 열기'}
                aria-expanded={isOpen}
                aria-controls="portfolio-chatbot-dialog"
                onClick={toggleChat}
                onMouseEnter={() => {
                    setIsNudgeVisible(false);
                    setIsTriggerHovered(true);
                }}
                onMouseLeave={() => setIsTriggerHovered(false)}
            >
                <img src="/images/chatbot-icon.png" alt="" aria-hidden="true" />
            </button>
        </aside>
    );
}

export default PortfolioChatbot;
