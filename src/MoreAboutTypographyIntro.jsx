import { useLayoutEffect, useRef } from 'react';
import './moreAboutTypographyIntro.css';

const introWords = [
    { text: 'A', style: 'sans' },
    { text: 'LITTLE', style: 'sans' },
    { text: 'MORE', style: 'sans' },
    { text: 'About', style: 'serif' },
    { text: 'me.', style: 'serif' },
];

const introBackground = [201, 228, 242];
const galleryBackground = [234, 240, 246];

const MoreAboutTypographyIntro = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        if (!section || !text) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const glyphs = Array.from(text.querySelectorAll('.more-about-type-glyph'));
        let frame = 0;
        let startX = 0;
        let endX = 0;
        let glyphCenters = [];
        let disposed = false;

        const clearAbsorption = () => {
            glyphs.forEach((glyph) => {
                glyph.style.removeProperty('--more-about-absorb-x');
                glyph.style.removeProperty('--more-about-absorb-y');
                glyph.style.removeProperty('--more-about-absorb-opacity');
                glyph.style.removeProperty('--more-about-absorb-blur');
                glyph.style.removeProperty('--more-about-absorb-scale-x');
                glyph.style.removeProperty('--more-about-absorb-scale-y');
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
                text.style.removeProperty('--more-about-type-x');
                section.style.backgroundColor = '#eaf0f6';
                clearAbsorption();
                return;
            }

            const rect = section.getBoundingClientRect();
            const travel = Math.max(1, rect.height - window.innerHeight);
            const progress = Math.min(1, Math.max(0, -rect.top / travel));
            const x = startX + (endX - startX) * progress;
            const backgroundColor = introBackground.map((channel, index) =>
                Math.round(
                    channel + (galleryBackground[index] - channel) * progress
                )
            );
            const absorptionWidth = window.innerWidth * 0.2;
            const compact = window.innerWidth <= 700;
            const lift = window.innerHeight * (compact ? 0.18 : 0.34);
            text.style.setProperty('--more-about-type-x', `${x.toFixed(2)}px`);
            section.style.backgroundColor = `rgb(${backgroundColor.join(', ')})`;

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
                    '--more-about-absorb-x',
                    `${(-curve * absorptionWidth * 0.14).toFixed(2)}px`
                );
                glyph.style.setProperty('--more-about-absorb-y', `${(-curve * lift).toFixed(2)}px`);
                glyph.style.setProperty('--more-about-absorb-opacity', opacity.toFixed(3));
                glyph.style.setProperty('--more-about-absorb-blur', `${blur.toFixed(2)}px`);
                glyph.style.setProperty(
                    '--more-about-absorb-scale-x',
                    (1 - absorption * (compact ? 0.03 : 0.08)).toFixed(3)
                );
                glyph.style.setProperty(
                    '--more-about-absorb-scale-y',
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
            className="more-about-typography-intro"
            ref={sectionRef}
            aria-label="A little more about me introduction"
        >
            <div className="more-about-typography-intro__stage">
                <p ref={textRef} aria-label="A LITTLE MORE About me.">
                    {introWords.map((word, wordIndex) => {
                        const Word = word.style === 'serif' ? 'em' : 'span';
                        return (
                            <Word
                                className={`more-about-type-word more-about-type-word--${word.style}`}
                                key={`${word.text}-${wordIndex}`}
                                aria-hidden="true"
                            >
                                {Array.from(word.text).map((character, characterIndex) => (
                                    <span
                                        className="more-about-type-glyph"
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

export default MoreAboutTypographyIntro;
