import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './quickQA.css';

const questions = [
    {
        number: 'Q.01',
        question: '왜 웹디자인을 시작하게 되었나요?',
        answer: '우연히 접한 웹디자인 작업물들이 인상 깊었습니다. 처음에는 감각적인 화면과 인터랙션에 끌렸지만, 직접 배우면서 디자인한 결과물이 실제 웹사이트로 구현되는 과정에 더 큰 흥미를 느꼈습니다. 작은 호기심에서 시작했지만, 지금은 저만의 결과물을 만들어가는 재미를 알아가고 있습니다.',
    },
    {
        number: 'Q.02',
        question: '나만의 강점은 무엇인가요?',
        answer: '밝고 긍정적인 성격으로 사람들과 소통하며 아이디어를 나누는 것을 좋아합니다. 새로운 것에 대한 호기심이 많아 처음 접하는 일에도 주저하지 않고 도전하는 편입니다. 어려운 과정에서도 쉽게 포기하지 않고, 시작한 일은 끝까지 완성하려고 노력합니다.',
    },
    {
        number: 'Q.03',
        question: '디자인할 때 가장 중요하게 생각하는 것은?',
        answer: '보는 사람의 시선을 끄는 디자인도 중요하지만, 실제로 사용했을 때 편리한지도 함께 생각하려고 합니다. 시각적인 완성도와 사용성을 모두 고려하면서, 작은 디테일까지 자연스럽게 연결되는 디자인을 만들고 싶습니다.',
    },
    {
        number: 'Q.04',
        question: '어떤 디자이너로 성장하고 싶나요?',
        answer: '디자인 감각뿐 아니라 직접 구현할 수 있는 기술까지 갖춘 디자이너로 성장하고 싶습니다. 새로운 도구와 트렌드를 꾸준히 배우고, 다양한 프로젝트 경험을 쌓아 제 실력으로 인정받는 사람이 되는 것이 목표입니다.',
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
