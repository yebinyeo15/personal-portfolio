import { useLayoutEffect, useRef } from 'react';
import './skillsTypographyIntro.css';

const introWords = [
    { text: 'FROM', style: 'sans' },
    { text: 'idea', style: 'serif' },
    { text: 'TO', style: 'sans' },
    { text: 'design', style: 'serif' },
    { text: 'TO', style: 'sans' },
    { text: 'reality.', style: 'serif' },
];

const SkillsTypographyIntro = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        if (!section || !text) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const glyphs = Array.from(text.querySelectorAll('.skills-type-glyph'));
        let frame = 0;
        let startX = 0;
        let endX = 0;
        let glyphCenters = [];
        let disposed = false;

        const clearAbsorption = () => {
            glyphs.forEach((glyph) => {
                glyph.style.removeProperty('--skills-absorb-x');
                glyph.style.removeProperty('--skills-absorb-y');
                glyph.style.removeProperty('--skills-absorb-opacity');
                glyph.style.removeProperty('--skills-absorb-blur');
                glyph.style.removeProperty('--skills-absorb-scale-x');
                glyph.style.removeProperty('--skills-absorb-scale-y');
            });
        };

        const measure = () => {
            const viewportWidth = window.innerWidth;
            const startEdge = viewportWidth * 0.2;
            const exitEdge = Math.max(20, viewportWidth * 0.055);
            startX = startEdge;
            endX = -text.scrollWidth - exitEdge;

            clearAbsorption();
            const textRect = text.getBoundingClientRect();
            glyphCenters = glyphs.map((glyph) => {
                const glyphRect = glyph.getBoundingClientRect();
                return glyphRect.left - textRect.left + glyphRect.width / 2;
            });
        };

        const render = () => {
            frame = 0;
            if (reducedMotion.matches) {
                text.style.removeProperty('--skills-type-x');
                clearAbsorption();
                return;
            }

            const rect = section.getBoundingClientRect();
            const travel = Math.max(1, rect.height - window.innerHeight);
            const progress = Math.min(1, Math.max(0, -rect.top / travel));
            const x = startX + (endX - startX) * progress;
            const absorptionWidth = window.innerWidth * 0.2;
            const compact = window.innerWidth <= 700;
            const lift = window.innerHeight * (compact ? 0.18 : 0.34);
            text.style.setProperty('--skills-type-x', `${x.toFixed(2)}px`);

            glyphs.forEach((glyph, index) => {
                const viewportCenter = x + glyphCenters[index];
                const absorption = Math.min(
                    1,
                    Math.max(0, (absorptionWidth - viewportCenter) / absorptionWidth)
                );
                const curve = absorption * absorption;
                const opacity = Math.pow(1 - absorption, 1.35);
                const blur = Math.pow(absorption, 1.5) * (compact ? 2.2 : 5);

                glyph.style.setProperty(
                    '--skills-absorb-x',
                    `${(-curve * absorptionWidth * 0.14).toFixed(2)}px`
                );
                glyph.style.setProperty('--skills-absorb-y', `${(-curve * lift).toFixed(2)}px`);
                glyph.style.setProperty('--skills-absorb-opacity', opacity.toFixed(3));
                glyph.style.setProperty('--skills-absorb-blur', `${blur.toFixed(2)}px`);
                glyph.style.setProperty(
                    '--skills-absorb-scale-x',
                    (1 - absorption * (compact ? 0.03 : 0.08)).toFixed(3)
                );
                glyph.style.setProperty(
                    '--skills-absorb-scale-y',
                    (1 - absorption * (compact ? 0.14 : 0.28)).toFixed(3)
                );
            });
        };

        const requestRender = () => {
            if (!frame) frame = window.requestAnimationFrame(render);
        };

        const handleResize = () => {
            measure();
            requestRender();
        };

        measure();
        render();
        document.fonts?.ready?.then(() => {
            if (!disposed) handleResize();
        });
        window.addEventListener('scroll', requestRender, { passive: true });
        window.addEventListener('resize', handleResize);
        reducedMotion.addEventListener('change', handleResize);

        return () => {
            disposed = true;
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestRender);
            window.removeEventListener('resize', handleResize);
            reducedMotion.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <section
            className="skills-typography-intro"
            ref={sectionRef}
            aria-label="Skills and tools introduction"
        >
            <div className="skills-typography-intro__stage">
                <p ref={textRef} aria-label="FROM idea TO design TO reality.">
                    {introWords.map((word, wordIndex) => {
                        const Word = word.style === 'serif' ? 'em' : 'span';
                        return (
                            <Word
                                className={`skills-type-word skills-type-word--${word.style}`}
                                key={`${word.text}-${wordIndex}`}
                                aria-hidden="true"
                            >
                                {Array.from(word.text).map((character, characterIndex) => (
                                    <span
                                        className="skills-type-glyph"
                                        key={`${word.text}-${characterIndex}`}
                                    >
                                        {character}
                                    </span>
                                ))}
                                {wordIndex < introWords.length - 1 && ' '}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </section>
    );
};

export default SkillsTypographyIntro;
