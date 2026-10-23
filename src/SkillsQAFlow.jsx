import { useLayoutEffect, useRef } from 'react';
import SkillsSection from './SkillsSection.jsx';
import QuickQA from './QuickQA.jsx';
import './skillsQAFlow.css';

const startColor = [17, 24, 39];
const endColor = [28, 37, 56];

const SkillsQAFlow = () => {
    const flowRef = useRef(null);

    useLayoutEffect(() => {
        const flow = flowRef.current;
        const quickQA = flow?.querySelector('.quick-qa');
        if (!flow || !quickQA) return undefined;

        let frame = 0;

        const render = () => {
            frame = 0;
            const viewportHeight = window.innerHeight;
            const quickTop = quickQA.getBoundingClientRect().top;
            const transitionStart = viewportHeight * 1.4;
            const transitionEnd = viewportHeight * 0.82;
            const rawProgress = Math.min(
                1,
                Math.max(0, (transitionStart - quickTop) / (transitionStart - transitionEnd))
            );
            const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
            const color = startColor.map((channel, index) =>
                Math.round(channel + (endColor[index] - channel) * progress)
            );

            flow.style.backgroundColor = `rgb(${color.join(', ')})`;
        };

        const requestRender = () => {
            if (!frame) frame = window.requestAnimationFrame(render);
        };

        render();
        window.addEventListener('scroll', requestRender, { passive: true });
        window.addEventListener('resize', requestRender);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestRender);
            window.removeEventListener('resize', requestRender);
        };
    }, []);

    return (
        <div className="skills-qa-flow" ref={flowRef}>
            <SkillsSection />
            <QuickQA />
        </div>
    );
};

export default SkillsQAFlow;
