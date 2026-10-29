import ProjectWebsiteButton from './ProjectWebsiteButton';
import './swarovskiVisualShowcase.css';

const showcaseImages = [
    {
        id: 'hero',
        src: '/images/swarovski-visual-01.png',
        alt: '크리스털 목걸이를 착용한 여성 모델의 스와로브스키 화보',
    },
    {
        id: 'process',
        src: '/images/swarovski-visual-02.png',
        alt: '크리스털 주얼리를 정교하게 가공하는 제작 과정',
    },
    {
        id: 'crystal',
        src: '/images/swarovski-visual-03.png',
        alt: '투명한 크리스털 오브제 위에 놓인 실버 목걸이',
    },
    {
        id: 'bracelet',
        src: '/images/swarovski-visual-04.png',
        alt: '실버 크리스털 팔찌를 착용한 손목 화보',
    },
    {
        id: 'earring',
        src: '/images/swarovski-visual-05.png',
        alt: '크리스털 이어 커프를 착용한 여성의 귀 화보',
    },
];

const SWAROVSKI_SHOWCASE_WEBSITE_URL = 'https://swarovski-portfolio.vercel.app/';

export default function SwarovskiVisualShowcase() {
    return (
        <section
            className="swarovski-visual-showcase"
            id="swarovski-project-02"
            aria-labelledby="swarovski-visual-showcase-title"
        >
            <div className="swarovski-visual-showcase__inner">
                <div className="swarovski-visual-showcase__visual">
                    <div className="swarovski-visual-showcase__collage">
                        {showcaseImages.map((image) => (
                            <figure
                                className={`swarovski-visual-showcase__image swarovski-visual-showcase__image--${image.id}`}
                                key={image.id}
                            >
                                <img src={image.src} alt={image.alt} />
                            </figure>
                        ))}
                    </div>
                </div>

                <article className="swarovski-visual-showcase__content">
                    <header>
                        <p>02 / VISUAL SHOWCASE</p>
                        <h2 id="swarovski-visual-showcase-title">
                            <span>The Art of</span>
                            <em>Brilliance.</em>
                        </h2>
                    </header>

                    <h3>빛과 크리스털이 완성하는 시각적 경험.</h3>
                    <p className="swarovski-visual-showcase__description">
                        크리스털의 투명함과 실버 주얼리의 섬세한 디테일을 중심으로, 화보와 여백의
                        대비를 활용한 에디토리얼 웹 디자인을 구성했습니다.
                    </p>

                    <p className="swarovski-visual-showcase__keywords">
                        VISUAL DIRECTION <span aria-hidden="true">·</span> JEWELRY EDITORIAL{' '}
                        <span aria-hidden="true">·</span> UI DESIGN
                    </p>

                    <div className="swarovski-visual-showcase__action">
                        <ProjectWebsiteButton
                            href={SWAROVSKI_SHOWCASE_WEBSITE_URL}
                            tone="dark"
                        />
                    </div>
                </article>
            </div>
        </section>
    );
}
