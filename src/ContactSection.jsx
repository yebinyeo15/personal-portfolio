import { useEffect, useRef } from 'react';
import './contactSection.css';

const exploreLinks = [
    ['INTRO', '#home'],
    ['WORKS', '#work'],
    ['SKILLS', '#skills'],
    ['ABOUT', '#more-about-gallery'],
    ['CONTACT', '#contact'],
];

const LineIcon = ({ type }) => {
    const paths = {
        email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></>,
        phone: <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5 16.5 16.5 0 0 0 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-5-1-1.2 3A14 14 0 0 1 5 9.2L8 8 7 3Z" />,
        github: <><circle cx="12" cy="12" r="9" /><path d="M9 19c-4 1.2-4-2-5-2.5M15 21v-3.1c0-.9.3-1.6.8-2-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .5.4.8 1.2.8 2V21" transform="translate(-6)" /></>,
        resume: <><path d="M6 3h8l4 4v14H6Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
    };

    return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
};

const ContactSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            section.classList.add('is-visible');
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                section.classList.add('is-visible');
                observer.disconnect();
            },
            { threshold: 0.18 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="contact contact-final section"
            id="contact"
            ref={sectionRef}
            aria-labelledby="contact-title"
        >
            <header className="contact-final__hero">
                <h2 id="contact-title">
                    <img
                        src="/images/contact/lets-connect-chrome.png"
                        alt="LET'S CONNECT"
                        width="2172"
                        height="724"
                    />
                    <span>something together.</span>
                </h2>
                <p>새로운 아이디어와 가능성을 함께 만들어가고 싶습니다.</p>
            </header>

            <div className="contact-final__details">
                <nav
                    className="contact-final__column contact-final__column--explore"
                    aria-label="페이지 탐색"
                >
                    <h3>EXPLORE</h3>
                    <ul>
                        {exploreLinks.map(([label, href], index) => (
                            <li key={href}>
                                <a href={href}>
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="contact-final__column contact-final__column--contact">
                    <h3>CONTACT</h3>
                    <ul className="contact-final__contacts">
                        <li>
                            <a href="mailto:yebin3382@daum.net">
                                <LineIcon type="email" />
                                <span><small>EMAIL</small>yebin3382@daum.net</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:01071958446">
                                <LineIcon type="phone" />
                                <span><small>PHONE</small>010-7195-8446</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/yebinyeo15" target="_blank" rel="noopener noreferrer">
                                <LineIcon type="github" />
                                <span><small>GITHUB</small>github.com/yebinyeo15</span>
                            </a>
                        </li>
                        <li>
                            <span className="contact-final__disabled" aria-disabled="true">
                                <LineIcon type="resume" />
                                <span><small>RESUME</small>RESUME ↗</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    );
};

export default ContactSection;
