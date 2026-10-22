import ProjectWebsiteButton from './ProjectWebsiteButton';
import './swarovskiProjectIntro.css';

const SWAROVSKI_WEBSITE_URL = '';

export default function SwarovskiProjectIntro() {
    return (
        <section
            className="swarovski-project-intro"
            id="swarovski-project-01"
            aria-labelledby="swarovski-project-intro-title"
        >
            <div className="swarovski-project-intro__inner">
                <div className="swarovski-project-intro__visual">
                    <div className="swarovski-project-intro__visual-index" aria-hidden="true">
                        <span>VISUAL STUDY / 01</span>
                        <span>CRYSTAL · DIGITAL</span>
                    </div>

                    <figure className="swarovski-project-intro__mockup">
                        <img
                            src="/images/swarovski-macbook.png"
                            alt="스와로브스키 웹 리디자인 화면을 보여주는 맥북 목업"
                        />
                        <figcaption>MAIN EXPERIENCE / DESKTOP VIEW</figcaption>
                    </figure>
                </div>

                <div className="swarovski-project-intro__content">
                    <header className="swarovski-project-intro__heading">
                        <p>01 / PERSONAL PROJECT</p>
                        <h2 id="swarovski-project-intro-title">SWAROVSKI</h2>
                        <em>Crystal Reimagined.</em>
                    </header>

                    <p className="swarovski-project-intro__description">
                        빛과 크리스털의 섬세한 반짝임을 디지털 화면에 담아낸 스와로브스키 웹 리디자인
                        프로젝트입니다. 주얼리 화보를 중심으로 브랜드의 세련된 이미지를 강조하고,
                        대비되는 명암과 절제된 타이포그래피로 시각적 몰입감을 높였습니다.
                    </p>

                    <div className="swarovski-project-intro__details">
                        <section aria-labelledby="swarovski-overview-title">
                            <h3 id="swarovski-overview-title">PROJECT OVERVIEW</h3>
                            <dl>
                                <div>
                                    <dt>TYPE</dt>
                                    <dd>Personal Project</dd>
                                </div>
                                <div>
                                    <dt>SCOPE</dt>
                                    <dd>Main Page Design</dd>
                                </div>
                                <div>
                                    <dt>TOOLS</dt>
                                    <dd>Figma</dd>
                                </div>
                            </dl>
                        </section>

                        <section aria-labelledby="swarovski-role-title">
                            <h3 id="swarovski-role-title">MY ROLE</h3>
                            <ul className="swarovski-project-intro__role-list">
                                <li>UI Design</li>
                                <li>Visual Direction</li>
                                <li>Editorial Layout</li>
                            </ul>
                        </section>
                    </div>

                    <div className="swarovski-project-intro__action">
                        <ProjectWebsiteButton href={SWAROVSKI_WEBSITE_URL} />
                    </div>
                </div>
            </div>
        </section>
    );
}
