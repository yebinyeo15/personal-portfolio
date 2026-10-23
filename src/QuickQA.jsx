import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './quickQA.css';

const questions = [
    {
        number: 'Q.01',
        question: '왜 웹디자인을 시작하게 되었나요?',
        answer: '아이디어를 화면으로 직접 구현하고, 사용자의 경험까지 설계할 수 있다는 점에 매력을 느꼈습니다. 디자인과 퍼블리싱을 함께 배우며 생각한 것을 실제 결과물로 완성하는 즐거움을 발견했습니다.',
    },
    {
        number: 'Q.02',
        question: '나만의 강점은 무엇인가요?',
        answer: '밝은 에너지와 적극적인 소통, 그리고 새로운 시도를 두려워하지 않는 실행력입니다. 처음 접하는 작업도 직접 부딪히며 배우고, 맡은 일은 끝까지 완성하려고 노력합니다.',
    },
    {
        number: 'Q.03',
        question: '디자인할 때 가장 중요하게 생각하는 것은?',
        answer: '시각적인 완성도와 사용자의 경험 사이의 균형입니다. 보기 좋은 화면뿐 아니라 정보가 명확하게 전달되고, 누구나 자연스럽게 사용할 수 있는 디자인을 지향합니다.',
    },
    {
        number: 'Q.04',
        question: '어떤 디자이너로 성장하고 싶나요?',
        answer: '새로운 기술과 트렌드를 꾸준히 배우면서 아이디어를 실제 화면으로 구현할 수 있는 디자이너가 되고 싶습니다. 다양한 사람들과 소통하며 더 나은 결과물을 만드는 것이 목표입니다.',
    },
];

const QuickQA = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const innerRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const stage = stageRef.current;
        const inner = innerRef.current;
        if (!section || !stage || !inner) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobile = window.matchMedia('(max-width: 700px)');
        let settleTimer = 0;

        const updateLayoutMode = () => {
            const safeHeight = Math.max(160, window.innerHeight * 0.18);
            const contentIsTooTall = inner.scrollHeight + safeHeight > window.innerHeight;
            section.classList.toggle(
                'is-static',
                reducedMotion.matches || mobile.matches || contentIsTooTall
            );
        };

        updateLayoutMode();
        window.requestAnimationFrame(updateLayoutMode);
        settleTimer = window.setTimeout(updateLayoutMode, 450);
        window.addEventListener('resize', updateLayoutMode);
        reducedMotion.addEventListener('change', updateLayoutMode);
        mobile.addEventListener('change', updateLayoutMode);

        return () => {
            window.clearTimeout(settleTimer);
            window.removeEventListener('resize', updateLayoutMode);
            reducedMotion.removeEventListener('change', updateLayoutMode);
            mobile.removeEventListener('change', updateLayoutMode);
        };
    }, [openIndex]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            section.classList.add('is-visible');
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => section.classList.toggle('is-visible', entry.isIntersecting),
            { threshold: 0.16 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="quick-qa" ref={sectionRef} aria-labelledby="quick-qa-title">
            <div className="quick-qa__stage" ref={stageRef}>
                <div className="quick-qa__inner" ref={innerRef}>
                    <header className="quick-qa__header">
                        <h2 id="quick-qa-title">
                            <img
                                src="/images/Q&A-quick.png"
                                alt="quick"
                                width="2034"
                                height="773"
                            />
                            <span>Q&amp;A</span>
                        </h2>
                        <p>디자인을 대하는 태도와 경험을 네 가지 질문으로 소개합니다.</p>
                    </header>

                    <div className="quick-qa__list">
                        {questions.map((item, index) => {
                        const isOpen = openIndex === index;
                        const answerId = `quick-qa-answer-${index + 1}`;
                        const buttonId = `quick-qa-question-${index + 1}`;

                        return (
                            <article
                                className={`quick-qa__item${isOpen ? ' is-open' : ''}`}
                                style={{ '--qa-delay': `${140 + index * 80}ms` }}
                                key={item.number}
                            >
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className="quick-qa__number">{item.number}</span>
                                    <span className="quick-qa__question">{item.question}</span>
                                    <span className="quick-qa__toggle" aria-hidden="true" />
                                </button>
                                <div
                                    className="quick-qa__answer"
                                    id={answerId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    aria-hidden={!isOpen}
                                >
                                    <div>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </article>
                        );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickQA;
