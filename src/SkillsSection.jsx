import { useLayoutEffect, useRef } from 'react';
import './skillsSection.css';

const skillColumns = [
    [
        { category: 'DESIGN', tools: ['Figma', 'Photoshop', 'Illustrator'] },
        { category: 'WORKFLOW', tools: ['Git', 'GitHub', 'Vercel'] },
    ],
    [
        { category: 'FRONTEND', tools: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'React'] },
        { category: 'INTERACTION', tools: ['GSAP', 'ScrollTrigger', 'Scrolla.js'] },
    ],
    [
        { category: 'AI TOOLS', tools: ['ChatGPT', 'Gemini', 'Claude'] },
        { category: 'VIDEO', tools: ['Premiere Pro', 'After Effects', 'CapCut'] },
    ],
];

const orbitTools = [
    [
        { name: 'Figma', slug: 'figma' },
        { name: 'Git', slug: 'git' },
        { name: 'GitHub', slug: 'github' },
    ],
    [
        { name: 'HTML5', slug: 'html5' },
        { name: 'CSS', slug: 'css' },
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'React', slug: 'react' },
    ],
    [
        { name: 'Sass', slug: 'sass' },
        { name: 'Vite', slug: 'vite' },
        { name: 'Vercel', slug: 'vercel' },
    ],
];

const OrbitRing = ({ tools, ring }) => (
    <div className={`skills-orbit__ring skills-orbit__ring--${ring}`}>
        {tools.map((tool, index) => {
            const angle = (360 / tools.length) * index - 90;
            const radians = (angle * Math.PI) / 180;
            const position = {
                left: `${50 + Math.cos(radians) * 50}%`,
                top: `${50 + Math.sin(radians) * 50}%`,
            };

            return (
                <div className="skills-orbit__node" style={position} key={tool.name}>
                    <span className="skills-orbit__logo-frame">
                        <img
                            src={`https://cdn.simpleicons.org/${tool.slug}/C7D2E3`}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </span>
                </div>
            );
        })}
    </div>
);

const SkillsSection = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;

        const render = () => {
            frame = 0;
            if (reducedMotion.matches) {
                section.style.setProperty('--skills-reveal', '1');
                section.style.setProperty('--skills-reveal-y', '0px');
                section.style.setProperty('--orbit-a-rotation', '0deg');
                section.style.setProperty('--orbit-b-rotation', '0deg');
                section.style.setProperty('--orbit-c-rotation', '0deg');
                section.style.setProperty('--orbit-a-counter', '0deg');
                section.style.setProperty('--orbit-b-counter', '0deg');
                section.style.setProperty('--orbit-c-counter', '0deg');
                section.style.setProperty('--earth-rotation', '0deg');
                return;
            }

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const revealStart = viewportHeight * 0.9;
            const revealDistance = Math.max(1, viewportHeight * 0.28);
            const progress = Math.min(
                1,
                Math.max(0, (revealStart - rect.top) / revealDistance)
            );
            const pinTravel = Math.max(1, rect.height - viewportHeight);
            const orbitProgress = Math.min(1, Math.max(0, -rect.top / pinTravel));
            const orbitARotation = orbitProgress * 360;
            const orbitBRotation = orbitProgress * -360;
            const orbitCRotation = orbitProgress * 360;
            section.style.setProperty('--skills-reveal', progress.toFixed(3));
            section.style.setProperty('--skills-reveal-y', `${((1 - progress) * 20).toFixed(2)}px`);
            section.style.setProperty('--orbit-a-rotation', `${orbitARotation.toFixed(2)}deg`);
            section.style.setProperty('--orbit-b-rotation', `${orbitBRotation.toFixed(2)}deg`);
            section.style.setProperty('--orbit-c-rotation', `${orbitCRotation.toFixed(2)}deg`);
            section.style.setProperty('--orbit-a-counter', `${(-orbitARotation).toFixed(2)}deg`);
            section.style.setProperty('--orbit-b-counter', `${(-orbitBRotation).toFixed(2)}deg`);
            section.style.setProperty('--orbit-c-counter', `${(-orbitCRotation).toFixed(2)}deg`);
            section.style.setProperty('--earth-rotation', `${(orbitProgress * 28).toFixed(2)}deg`);
        };

        const requestRender = () => {
            if (!frame) frame = window.requestAnimationFrame(render);
        };

        render();
        window.addEventListener('scroll', requestRender, { passive: true });
        window.addEventListener('resize', requestRender);
        reducedMotion.addEventListener('change', requestRender);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestRender);
            window.removeEventListener('resize', requestRender);
            reducedMotion.removeEventListener('change', requestRender);
        };
    }, []);

    return (
        <section className="skills-section" id="skills" ref={sectionRef} aria-labelledby="skills-title">
            <div className="skills-section__stage">
                <div className="skills-orbit" aria-hidden="true">
                    <OrbitRing tools={orbitTools[0]} ring="a" />
                    <OrbitRing tools={orbitTools[1]} ring="b" />
                    <OrbitRing tools={orbitTools[2]} ring="c" />
                    <img className="skills-orbit__earth" src="/images/tool/earth.png" alt="" />
                </div>

                <div className="skills-section__inner">
                    <header className="skills-section__header">
                        <h2 id="skills-title">
                            SKILLS <em>&amp;</em> TOOLS
                        </h2>
                        <p>아이디어를 디자인하고, 직접 구현하는 과정에서 사용하는 도구들입니다.</p>
                    </header>

                    <div className="skills-section__columns">
                        {skillColumns.map((column, columnIndex) => (
                            <div className="skills-section__column" key={columnIndex}>
                                {column.map((group) => (
                                    <section className="skills-section__group" key={group.category}>
                                        <h3>{group.category}</h3>
                                        <ul>
                                            {group.tools.map((tool) => (
                                                <li key={tool}>{tool}</li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        ))}
                    </div>

                    <p className="skills-section__footer">FROM idea TO design TO reality.</p>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
