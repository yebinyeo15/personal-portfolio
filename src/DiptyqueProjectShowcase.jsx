import ProjectWebsiteButton from './ProjectWebsiteButton';
import './diptyqueProjectShowcase.css';

const detailPages = [
    {
        number: '01',
        src: '/images/diptyque-detail-01.png',
        alt: '딥티크 향수 컬렉션 웹페이지',
    },
    {
        number: '02',
        src: '/images/diptyque-detail-02.png',
        alt: '딥티크 브랜드 타이포그래피 웹페이지',
    },
    {
        number: '03',
        src: '/images/diptyque-detail-03.png',
        alt: '딥티크 DO SON 향수 상세페이지',
    },
    {
        number: '04',
        src: '/images/diptyque-detail-04.png',
        alt: '딥티크 이미지 2분할 브랜드 스토리 페이지',
    },
];

export default function DiptyqueProjectShowcase() {
    return (
        <section
            className="diptyque-project-showcase"
            id="diptyque-project-02"
            aria-labelledby="diptyque-project-showcase-title"
        >
            <div className="diptyque-project-showcase__inner">
                <div className="diptyque-project-showcase__visual">
                    <div className="diptyque-project-showcase__collage">
                        {detailPages.map((page) => (
                            <figure
                                className={`diptyque-project-showcase__detail diptyque-project-showcase__detail--${page.number}`}
                                key={page.number}
                            >
                                <img src={page.src} alt={page.alt} />
                                <figcaption>{page.number} / DETAIL VIEW</figcaption>
                            </figure>
                        ))}

                        <figure className="diptyque-project-showcase__mockup">
                            <div className="diptyque-project-showcase__device">
                                <img
                                    src="/images/diptyque-mockup.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                                <div className="diptyque-project-showcase__screen">
                                    <video
                                        src="/videos/diptyque-showcase.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label="딥티크 웹사이트 화면 인터랙션 쇼케이스"
                                    />
                                </div>
                            </div>
                            <figcaption>
                                <span>INTERACTION PREVIEW</span>
                                <span>AUTOPLAY / LOOP</span>
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <article className="diptyque-project-showcase__content">
                    <header>
                        <p>02 / DIGITAL EXPERIENCE</p>
                        <h2 id="diptyque-project-showcase-title">
                            <span>Beyond the</span>
                            <em>Scent.</em>
                        </h2>
                    </header>

                    <h3>향의 이야기를 디지털 경험으로 확장하다.</h3>
                    <p className="diptyque-project-showcase__description">
                        브랜드의 감각적인 이미지를 스크롤 인터랙션과 섬세한 화면 전환으로
                        구현했습니다. 메인페이지부터 여섯 가지 향수의 상세페이지까지 일관된 사용자
                        경험으로 연결했습니다.
                    </p>

                    <ul className="diptyque-project-showcase__keywords" aria-label="프로젝트 키워드">
                        <li>SCROLL INTERACTION</li>
                        <li>FRAGRANCE COLLECTION</li>
                        <li>DETAIL PAGES</li>
                    </ul>

                    <ProjectWebsiteButton
                        className="diptyque-project-showcase__website"
                        href="https://diptyque-portfolio.vercel.app/"
                    />
                </article>
            </div>
        </section>
    );
}
