import { useLayoutEffect, useRef } from 'react';
import SkillsSection from './SkillsSection.jsx';
import MoreAboutTypographyIntro from './MoreAboutTypographyIntro.jsx';
import MoreAboutRotatingGallery from './MoreAboutRotatingGallery.jsx';
import QuickQA from './QuickQA.jsx';
import ClosingStatement from './ClosingStatement.jsx';
import './skillsQAFlow.css';

const startColor = [17, 24, 39];
const introColor = [201, 228, 242];
const endColor = [28, 37, 56];

const SkillsQAFlow = () => {
    const flowRef = useRef(null);

    useLayoutEffect(() => {
        const flow = flowRef.current;
        const typographyIntro = flow?.querySelector('.more-about-typography-intro');
        const quickQA = flow?.querySelector('.quick-qa');
        if (!flow || !typographyIntro || !quickQA) return undefined;

        let frame = 0;

        const render = () => {
            frame = 0;
            const viewportHeight = window.innerHeight;
            const introTop = typographyIntro.getBoundingClientRect().top;
            const quickTop = quickQA.getBoundingClientRect().top;
            const introRawProgress = Math.min(
                1,
                Math.max(0, (viewportHeight - introTop) / viewportHeight)
            );
            const introProgress =
                introRawProgress * introRawProgress * (3 - 2 * introRawProgress);
            const transitionStart = viewportHeight;
            const transitionEnd = viewportHeight * 0.45;
            const rawProgress = Math.min(
                1,
                Math.max(0, (transitionStart - quickTop) / (transitionStart - transitionEnd))
            );
            const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
            const skillsToIntroColor = startColor.map((channel, index) =>
                channel + (introColor[index] - channel) * introProgress
            );
            const color = skillsToIntroColor.map((channel, index) =>
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
            <MoreAboutTypographyIntro />
            <MoreAboutRotatingGallery />
            <QuickQA />
            <ClosingStatement />
        </div>
    );
};

export default SkillsQAFlow;
