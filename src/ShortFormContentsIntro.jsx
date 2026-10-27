import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './shortFormContentsIntro.css';

const shortFormMockups = [
    {
        id: 'diptyque',
        src: '/images/shortform-diptyque-mockup.png',
        alt: '딥디크 향수 숏폼 광고 아이폰 목업',
    },
    {
        id: 'running',
        src: '/images/shortform/shortform-running-mockup.png',
        alt: '러닝화 숏폼 광고 아이폰 목업',
    },
    {
        id: 'blue-bottle',
        src: '/images/shortform/bluebottle-ipad-mockup.png',
        alt: '블루보틀 커피 캠페인 아이패드 목업',
    },
];

const adidasFilmDetails = [
    ['기획 의도', '아디다스 러닝화의 퍼포먼스와 러닝 문화의 역동성을 전달하는 숏폼 광고'],
    ['타깃', '러닝과 스포츠 라이프스타일에 관심 있는 소비자'],
    [
        '제작 과정',
        '콘셉트 기획 → 스토리보드 설계 → AI 이미지 생성 → AI 영상 제작 → 영상·사운드 편집',
    ],
    ['편집 포인트', '착용 전후의 대비, 러닝 동작의 속도감, 리듬감 있는 장면 전환'],
    ['사용 도구', 'AI 이미지·영상 생성 도구, CapCut'],
    ['영상 포맷', '세로형 9:16 · 약 34초'],
];

const diptyqueFilmDetails = [
    ['기획 의도', '딥디크 EAU ROSE의 섬세하고 로맨틱한 향을 감각적인 영상으로 표현'],
    ['타깃', '니치 향수와 감성적인 브랜드 콘텐츠에 관심 있는 소비자'],
    [
        '제작 과정',
        '콘셉트 기획 → 스토리보드 설계 → AI 이미지 생성 → AI 영상 제작 → 장면 편집 → 자막 및 사운드 편집',
    ],
    ['편집 포인트', '장미와 향수병의 클로즈업, 부드러운 장면 전환, 일관된 컬러 톤'],
    ['사용 도구', 'AI 이미지·영상 생성 도구, CapCut'],
    ['영상 포맷', '세로형 9:16 숏폼 광고 · 약 36초'],
];

const blueBottleFilmDetails = [
    ['기획 의도', '커피가 완성되는 과정에 담긴 시간과 정성, 일상의 여유를 시네마틱하게 전달'],
    ['타깃', '스페셜티 커피와 미니멀한 라이프스타일, 감각적인 브랜드 콘텐츠에 관심 있는 소비자'],
    [
        '제작 과정',
        '콘셉트 기획 → 14씬 스토리보드 설계 → AI 이미지 생성 → AI 영상 제작 → 영상·사운드 편집',
    ],
    ['편집 포인트', '매크로 클로즈업, 느린 카메라 움직임, 온도감 있는 컬러 전환, 커피 추출 ASMR'],
    ['사용 도구', 'Figma, AI 이미지·영상 생성 도구, CapCut'],
    ['영상 포맷', '가로형 16:9 브랜드 콘셉트 필름 · 1분 10초'],
];

const shortFormFilms = [
    {
        id: '01',
        title: 'ADIDAS RUNNING FILM',
        subtitle: 'FEEL THE LOCK IN.',
        videoSrc: '/videos/shortform/shortform-running.mp4',
        videoLabel: 'ADIDAS 러닝화 AI 숏폼 광고',
        description: [
            '스포츠 브랜드 아디다스의 러닝화 ADIZERO ADIOS PRO 4를 중심으로, 최근 주목받는 러닝 문화를 결합한 숏폼 광고를 기획했습니다.',
            '러닝화 착용 전후의 감각과 움직임의 변화를 하나의 이야기로 구성하고, 스토리보드 기획부터 AI 이미지·영상 제작, 장면 편집과 사운드 연출까지 연결해 제품의 퍼포먼스와 브랜드 특유의 역동적인 에너지를 표현했습니다.',
        ],
        details: adidasFilmDetails,
    },
    {
        id: '02',
        theme: 'diptyque',
        title: 'DIPTYQUE EAU ROSE',
        subtitle: 'Where Roses Become a Memory.',
        videoSrc: '/videos/shortform/shortform-diptyque.mp4',
        videoLabel: 'DIPTYQUE EAU ROSE AI 숏폼 광고',
        description: [
            '프랑스 니치 향수 브랜드 딥디크(DIPTYQUE)의 EAU ROSE를 주제로, 장미가 가진 섬세하고 우아한 분위기를 감각적인 숏폼 광고로 기획했습니다.',
            '장미의 꽃잎과 향수병의 디테일을 중심으로 스토리보드를 구성하고, AI 이미지·영상 생성과 장면 편집을 통해 향기가 시각적으로 전해지는 듯한 경험을 표현했습니다.',
        ],
        details: diptyqueFilmDetails,
    },
    {
        id: '03',
        theme: 'blue-bottle',
        title: 'BLUE BOTTLE COFFEE',
        subtitle: 'THE ART OF SLOW.',
        supportingCopy: '천천히 완성되는 한 잔의 가치',
        videoSrc: '/videos/blue-bottle/blue-bottle-the-art-of-slow.mp4',
        videoLabel: 'BLUE BOTTLE COFFEE THE ART OF SLOW 브랜드 콘셉트 필름',
        headerLabel: 'BRAND CAMPAIGN',
        categoryLabel: 'BRAND AD CAMPAIGNS',
        disclaimer: 'UNOFFICIAL BRAND CONCEPT FILM',
        projectLink: 'https://www.figma.com/design/DaUzuGBSc95Y1SZMdQMfc0/?node-id=836-3352',
        description: [
            '블루보틀 커피를 주제로, 한 잔의 커피가 완성되기까지의 시간과 섬세한 과정을 담은 약 90초 분량의 브랜드 콘셉트 필름을 제작했습니다.',
            '블루보틀의 아침을 비추는 햇살에서 시작해 원두의 질감, 핸드드립 추출, 아이스 라떼가 완성되는 순간까지 총 14개의 장면을 설계했습니다. AI 이미지·영상 제작과 사운드 편집을 통해 일상의 느린 순간이 가진 감각적인 가치를 표현했습니다.',
        ],
        details: blueBottleFilmDetails,
    },
];

const ShortFormFilmPlayer = ({ film }) => {
    const playerRef = useRef(null);
    const videoRef = useRef(null);
    const userPausedRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleVideoPlay = () => {
        setIsPlaying(true);
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
    };

    const playVideo = useCallback(async () => {
        const video = videoRef.current;
        if (!video || hasError) return;
        try {
            await video.play();
        } catch {
            setIsPlaying(false);
        }
    }, [hasError]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video || hasError) return;
        if (video.paused) {
            userPausedRef.current = false;
            playVideo();
        } else {
            userPausedRef.current = true;
            video.pause();
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;
        const nextMuted = !video.muted;
        video.muted = nextMuted;
        setIsMuted(nextMuted);
    };

    const handleSeek = (event) => {
        const video = videoRef.current;
        if (!video || !duration) return;
        const nextTime = Number(event.target.value);
        video.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const toggleFullscreen = async () => {
        const player = playerRef.current;
        const video = videoRef.current;
        if (!player || !video) return;

        const fullscreenElement = document.fullscreenElement ?? document.webkitFullscreenElement;

        try {
            if (fullscreenElement) {
                const exitFullscreen = document.exitFullscreen ?? document.webkitExitFullscreen;
                await exitFullscreen?.call(document);
                return;
            }

            const requestFullscreen = player.requestFullscreen ?? player.webkitRequestFullscreen;
            if (requestFullscreen) {
                await requestFullscreen.call(player);
            } else if (typeof video.webkitEnterFullscreen === 'function') {
                video.webkitEnterFullscreen();
            }
        } catch {
            setIsFullscreen(false);
        }
    };

    const handleKeyDown = (event) => {
        const video = videoRef.current;
        if (!video) return;
        if (event.key === ' ' || event.key.toLowerCase() === 'k') {
            event.preventDefault();
            togglePlayback();
        } else if (event.key.toLowerCase() === 'm') {
            toggleMute();
        } else if (event.key.toLowerCase() === 'f') {
            event.preventDefault();
            toggleFullscreen();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 5 : -5;
            video.currentTime = Math.min(Math.max(video.currentTime + direction, 0), duration);
        }
    };

    useEffect(() => {
        const player = playerRef.current;
        const video = videoRef.current;
        if (!player || !video) return undefined;

        const syncFullscreenState = () => {
            const fullscreenElement =
                document.fullscreenElement ?? document.webkitFullscreenElement;
            setIsFullscreen(fullscreenElement === player);
        };
        const handleNativeFullscreenStart = () => setIsFullscreen(true);
        const handleNativeFullscreenEnd = () => setIsFullscreen(false);

        document.addEventListener('fullscreenchange', syncFullscreenState);
        document.addEventListener('webkitfullscreenchange', syncFullscreenState);
        video.addEventListener('webkitbeginfullscreen', handleNativeFullscreenStart);
        video.addEventListener('webkitendfullscreen', handleNativeFullscreenEnd);

        return () => {
            document.removeEventListener('fullscreenchange', syncFullscreenState);
            document.removeEventListener('webkitfullscreenchange', syncFullscreenState);
            video.removeEventListener('webkitbeginfullscreen', handleNativeFullscreenStart);
            video.removeEventListener('webkitendfullscreen', handleNativeFullscreenEnd);
        };
    }, []);

    useEffect(() => {
        const player = playerRef.current;
        const video = videoRef.current;
        const panel = player?.closest(`[data-short-form-panel="film-${film.id}"]`);
        if (!video || !panel) return undefined;

        let frame = 0;
        let wasVisible = false;

        const updatePlaybackForVisibility = () => {
            frame = 0;
            const rect = player.getBoundingClientRect();
            const visibleWidth = Math.max(
                0,
                Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
            );
            const visibleHeight = Math.max(
                0,
                Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
            );
            const widthRatio = rect.width > 0 ? visibleWidth / rect.width : 0;
            const heightRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
            const isVisible = widthRatio >= 0.55 && heightRatio >= 0.55;

            if (isVisible && !wasVisible) {
                video.muted = true;
                setIsMuted(true);
                if (!userPausedRef.current) playVideo();
            } else if (!isVisible && wasVisible) {
                video.pause();
                video.muted = true;
                setIsMuted(true);
            }
            wasVisible = isVisible;
        };

        const requestVisibilityUpdate = () => {
            if (!frame) frame = window.requestAnimationFrame(updatePlaybackForVisibility);
        };

        updatePlaybackForVisibility();
        window.addEventListener('scroll', requestVisibilityUpdate, { passive: true });
        window.addEventListener('resize', requestVisibilityUpdate);
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', requestVisibilityUpdate);
            window.removeEventListener('resize', requestVisibilityUpdate);
            video.pause();
        };
    }, [film.id, playVideo]);

    return (
        <figure className="short-form-film-media short-form-film-media--player">
            <div
                className={`short-form-video-player${controlsVisible ? ' is-controls-visible' : ''}`}
                ref={playerRef}
                role="group"
                aria-label={`${film.title} 영상 플레이어`}
                tabIndex="0"
                onKeyDown={handleKeyDown}
                onMouseEnter={() => setControlsVisible(true)}
                onMouseLeave={(event) => {
                    if (!event.currentTarget.matches(':focus-within')) {
                        setControlsVisible(false);
                    }
                }}
                onFocusCapture={() => setControlsVisible(true)}
                onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setControlsVisible(false);
                    }
                }}
            >
                <video
                    ref={videoRef}
                    src={film.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={film.videoLabel}
                    onPointerUp={(event) => {
                        if (event.pointerType !== 'mouse') {
                            setControlsVisible((visible) => !visible);
                        }
                    }}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
                    onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                    onDurationChange={(event) => setDuration(event.currentTarget.duration)}
                    onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                    onError={() => {
                        setHasError(true);
                        setIsPlaying(false);
                    }}
                />

                {hasError && (
                    <div className="short-form-video-player__notice" role="status">
                        <strong>영상을 불러올 수 없습니다.</strong>
                        <span>파일 경로와 형식을 확인해 주세요.</span>
                    </div>
                )}

                <div
                    className="short-form-video-controls"
                    onPointerDown={(event) => event.stopPropagation()}
                    onPointerUp={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={togglePlayback}
                        aria-label={isPlaying ? '일시정지' : '재생'}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="m8 5 11 7-11 7z" />
                            </svg>
                        )}
                    </button>
                    <input
                        className="short-form-video-controls__progress"
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.01"
                        value={Math.min(currentTime, duration || 0)}
                        onChange={handleSeek}
                        style={{
                            '--video-progress': `${duration ? (currentTime / duration) * 100 : 0}%`,
                        }}
                        aria-label="영상 재생 위치"
                    />
                    <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? '음소거 해제' : '음소거'}
                    >
                        {isMuted ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 9v6h4l5 4V5L8 9zm11.5 1.1 1.4-1.4 2.1 2.1 2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 9v6h4l5 4V5L8 9zm11.5-.5a5 5 0 0 1 0 7l1.4 1.4a7 7 0 0 0 0-9.8zm2.8-2.8a9 9 0 0 1 0 12.6l1.4 1.4a11 11 0 0 0 0-15.4z" />
                            </svg>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? '전체화면 종료' : '전체화면'}
                        aria-pressed={isFullscreen}
                    >
                        {isFullscreen ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 4H7v3H4v2h5zm6 0v5h5V7h-3V4zM4 15v2h3v3h2v-5zm16 0h-5v5h2v-3h3z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 4v5h2V6h3V4zm11 0v2h3v3h2V4zM4 15v5h5v-2H6v-3zm14 0v3h-3v2h5v-5z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </figure>
    );
};

const ShortFormFilmPlaceholder = ({ film }) => (
    <figure
        className="short-form-film-media short-form-film-media--landscape"
        aria-label={film.videoLabel}
    >
        <div className="short-form-film-media__placeholder">
            <span>BRAND FILM</span>
            <strong>COMING SOON</strong>
            <small>16:9 · APPROX. 90 SEC</small>
        </div>
    </figure>
);

const FilmDetailPanel = ({ film }) => (
    <section
        className={`short-form-film-detail is-${film.theme ?? (film.id === '01' ? 'adidas' : 'diptyque')}`}
        data-short-form-panel={`film-${film.id}`}
        aria-labelledby={`short-form-film-${film.id}-title`}
    >
        <div className="short-form-film-detail__inner">
            {film.videoSrc ? (
                <ShortFormFilmPlayer film={film} />
            ) : (
                <ShortFormFilmPlaceholder film={film} />
            )}
            <article className="short-form-film-detail__content">
                <header>
                    <span>
                        FILM {film.id} / {film.headerLabel ?? 'SHORT-FORM AD'}
                    </span>
                    <span>PROJECT DETAILS</span>
                </header>
                <div className="short-form-film-detail__heading">
                    <p>{film.categoryLabel ?? 'SHORT-FORM CONTENTS'}</p>
                    <h2 id={`short-form-film-${film.id}-title`}>{film.title}</h2>
                    <strong>{film.subtitle}</strong>
                    {film.supportingCopy && (
                        <span className="short-form-film-detail__supporting-copy">
                            {film.supportingCopy}
                        </span>
                    )}
                    <div className="short-form-film-detail__description">
                        {film.description.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                <dl className="short-form-film-detail__list">
                    {film.details.map(([label, value]) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </article>
        </div>
    </section>
);

const ShortFormContentsIntro = () => {
    const storyRef = useRef(null);
    const stageRef = useRef(null);
    const trackRef = useRef(null);
    const introRef = useRef(null);

    useEffect(() => {
        const section = introRef.current;
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
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        const story = storyRef.current;
        const stage = stageRef.current;
        const track = trackRef.current;
        if (!story || !stage || !track) return undefined;

        const desktopQuery = window.matchMedia('(min-width: 901px)');
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const panels = Array.from(track.children);
        const panelColors = [
            [241, 242, 248],
            [241, 238, 245],
            [234, 213, 221],
            [229, 239, 246],
        ];
        let frame = 0;
        let snapTimer = null;
        let snapAnimationFrame = null;
        let horizontalTravel = 0;
        let scrollTravel = 0;
        let holdDistance = 0;
        let completionHoldDistance = 0;
        let panelOffsets = [];
        let isSnapping = false;
        let lastScrollY = window.scrollY;

        const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
        const smoothstep = (value) => {
            const bounded = clamp(value);
            return bounded * bounded * (3 - 2 * bounded);
        };

        const cancelSnap = () => {
            if (snapTimer !== null) {
                window.clearTimeout(snapTimer);
                snapTimer = null;
            }
            if (snapAnimationFrame !== null) {
                window.cancelAnimationFrame(snapAnimationFrame);
                snapAnimationFrame = null;
            }
            isSnapping = false;
        };

        const clearMotionStyles = () => {
            panels.forEach((panel) => {
                for (let step = 1; step <= 5; step += 1) {
                    panel.style.removeProperty(`--sf-motion-opacity-${step}`);
                    panel.style.removeProperty(`--sf-motion-x-${step}`);
                    panel.style.removeProperty(`--sf-motion-x-neg-${step}`);
                    panel.style.removeProperty(`--sf-motion-y-${step}`);
                }
                panel.style.removeProperty('--sf-title-reveal');
            });
        };

        const getRouteState = (scrollDistance) => {
            const introOffset = panelOffsets[0] ?? 0;
            const adidasOffset = panelOffsets[1] ?? introOffset;
            const diptyqueOffset = panelOffsets[2] ?? adidasOffset;
            const blueBottleOffset = panelOffsets[3] ?? diptyqueOffset;
            const adidasHoldStart = adidasOffset;
            const adidasRevealEnd = adidasHoldStart + holdDistance;
            const adidasHoldEnd = adidasRevealEnd + completionHoldDistance;
            const diptyqueMoveEnd = adidasHoldEnd + (diptyqueOffset - adidasOffset);
            const diptyqueRevealEnd = diptyqueMoveEnd + holdDistance;
            const diptyqueHoldEnd = diptyqueRevealEnd + completionHoldDistance;
            const blueBottleMoveEnd = diptyqueHoldEnd + (blueBottleOffset - diptyqueOffset);
            const blueBottleRevealEnd = blueBottleMoveEnd + holdDistance;
            const blueBottleHoldEnd = blueBottleRevealEnd + completionHoldDistance;
            const distance = clamp(scrollDistance, 0, blueBottleHoldEnd);

            if (distance <= adidasHoldStart) {
                return {
                    horizontalOffset: distance,
                    adidasReveal: 0,
                    diptyqueReveal: 0,
                    blueBottleReveal: 0,
                    snapCandidates: [introOffset, adidasHoldStart],
                };
            }

            if (distance < adidasRevealEnd) {
                return {
                    horizontalOffset: adidasOffset,
                    adidasReveal: (distance - adidasHoldStart) / holdDistance,
                    diptyqueReveal: 0,
                    blueBottleReveal: 0,
                    snapCandidates: null,
                };
            }

            if (distance < adidasHoldEnd) {
                return {
                    horizontalOffset: adidasOffset,
                    adidasReveal: 1,
                    diptyqueReveal: 0,
                    blueBottleReveal: 0,
                    snapCandidates: null,
                };
            }

            if (distance <= diptyqueMoveEnd) {
                return {
                    horizontalOffset: adidasOffset + (distance - adidasHoldEnd),
                    adidasReveal: 1,
                    diptyqueReveal: 0,
                    blueBottleReveal: 0,
                    snapCandidates: [adidasHoldEnd, diptyqueMoveEnd],
                };
            }

            if (distance < diptyqueRevealEnd) {
                return {
                    horizontalOffset: diptyqueOffset,
                    adidasReveal: 1,
                    diptyqueReveal: (distance - diptyqueMoveEnd) / holdDistance,
                    blueBottleReveal: 0,
                    snapCandidates: null,
                };
            }

            if (distance < diptyqueHoldEnd) {
                return {
                    horizontalOffset: diptyqueOffset,
                    adidasReveal: 1,
                    diptyqueReveal: 1,
                    blueBottleReveal: 0,
                    snapCandidates: null,
                };
            }

            if (distance <= blueBottleMoveEnd) {
                return {
                    horizontalOffset: diptyqueOffset + (distance - diptyqueHoldEnd),
                    adidasReveal: 1,
                    diptyqueReveal: 1,
                    blueBottleReveal: 0,
                    snapCandidates: [diptyqueHoldEnd, blueBottleMoveEnd],
                };
            }

            if (distance < blueBottleRevealEnd) {
                return {
                    horizontalOffset: blueBottleOffset,
                    adidasReveal: 1,
                    diptyqueReveal: 1,
                    blueBottleReveal: (distance - blueBottleMoveEnd) / holdDistance,
                    snapCandidates: null,
                };
            }

            return {
                horizontalOffset: blueBottleOffset,
                adidasReveal: 1,
                diptyqueReveal: 1,
                blueBottleReveal: 1,
                snapCandidates: null,
            };
        };

        const updateBackground = (trackPosition) => {
            const lowerIndex = Math.min(Math.floor(trackPosition), panelColors.length - 1);
            const upperIndex = Math.min(lowerIndex + 1, panelColors.length - 1);
            const blend = smoothstep(trackPosition - lowerIndex);
            const color = panelColors[lowerIndex].map((channel, index) =>
                Math.round(channel + (panelColors[upperIndex][index] - channel) * blend)
            );
            stage.style.backgroundColor = `rgb(${color.join(', ')})`;
        };

        const updatePanelMotion = (trackPosition) => {
            panels.forEach((panel, panelIndex) => {
                const panelProgress = smoothstep((trackPosition - (panelIndex - 0.85)) / 0.85);

                for (let step = 1; step <= 5; step += 1) {
                    const delay = (step - 1) * 0.1;
                    const stepProgress = smoothstep((panelProgress - delay) / (1 - delay));
                    const remaining = 1 - stepProgress;
                    const x = remaining * (18 + step * 2);
                    const y = remaining * (14 + step * 2);
                    panel.style.setProperty(`--sf-motion-opacity-${step}`, stepProgress);
                    panel.style.setProperty(`--sf-motion-x-${step}`, `${x}px`);
                    panel.style.setProperty(`--sf-motion-x-neg-${step}`, `${-x}px`);
                    panel.style.setProperty(`--sf-motion-y-${step}`, `${y}px`);
                }
            });
        };

        const measure = () => {
            cancelSnap();
            const horizontal = desktopQuery.matches && !reducedMotionQuery.matches;
            story.classList.toggle('is-horizontal', horizontal);
            track.style.transform = '';
            story.style.height = '';
            stage.style.backgroundColor = '';
            if (!horizontal) {
                clearMotionStyles();
                return;
            }

            const stageWidth = Math.max(1, stage.getBoundingClientRect().width);
            horizontalTravel = Math.max(0, track.scrollWidth - stageWidth);
            panelOffsets = panels.map((panel) =>
                clamp(
                    panel.offsetLeft + panel.offsetWidth / 2 - stageWidth / 2,
                    0,
                    horizontalTravel
                )
            );
            holdDistance = clamp(stageWidth * 0.42, 500, 900);
            completionHoldDistance = clamp(stageWidth * 0.075, 120, 180);
            scrollTravel = horizontalTravel + (holdDistance + completionHoldDistance) * 3;
            story.style.height = `${window.innerHeight + scrollTravel}px`;
        };

        const render = () => {
            frame = 0;
            if (!story.classList.contains('is-horizontal')) return;
            const storyStart = story.getBoundingClientRect().top + window.scrollY;
            const scrollDistance = clamp(window.scrollY - storyStart, 0, scrollTravel);
            const route = getRouteState(scrollDistance);
            track.style.transform = `translate3d(${-route.horizontalOffset}px, 0, 0)`;
            const normalizedProgress =
                horizontalTravel > 0 ? route.horizontalOffset / horizontalTravel : 0;
            const trackPosition = normalizedProgress * (panels.length - 1);
            panels[1]?.style.setProperty(
                '--sf-title-reveal',
                `${(route.adidasReveal * 100).toFixed(3)}%`
            );
            panels[2]?.style.setProperty(
                '--sf-title-reveal',
                `${(route.diptyqueReveal * 100).toFixed(3)}%`
            );
            panels[3]?.style.setProperty(
                '--sf-title-reveal',
                `${(route.blueBottleReveal * 100).toFixed(3)}%`
            );
            updateBackground(trackPosition);
            updatePanelMotion(trackPosition);
        };

        const requestRender = () => {
            if (!frame) frame = window.requestAnimationFrame(render);
        };

        const snapToNearestPanel = () => {
            snapTimer = null;
            if (!story.classList.contains('is-horizontal') || isSnapping || scrollTravel <= 0) {
                return;
            }

            const storyStart = story.getBoundingClientRect().top + window.scrollY;
            const storyEnd = storyStart + scrollTravel;
            const currentY = window.scrollY;
            if (currentY < storyStart || currentY > storyEnd) return;

            const currentOffset = clamp(currentY - storyStart, 0, scrollTravel);
            const route = getRouteState(currentOffset);
            if (!route.snapCandidates) return;
            const targetOffset = route.snapCandidates.reduce((nearest, offset) =>
                Math.abs(offset - currentOffset) < Math.abs(nearest - currentOffset)
                    ? offset
                    : nearest
            );
            const targetY = storyStart + targetOffset;
            const distance = targetY - currentY;
            const absoluteDistance = Math.abs(distance);
            if (absoluteDistance < 2) return;

            const panelInterval = Math.max(1, horizontalTravel / (panels.length - 1));
            const distanceRatio = Math.min(1, absoluteDistance / (panelInterval * 0.5));
            const duration = 300 + 150 * distanceRatio;
            const startY = currentY;
            let startTime = null;
            isSnapping = true;

            const animateSnap = (time) => {
                if (!isSnapping) return;
                if (startTime === null) startTime = time;

                const progress = Math.min(1, (time - startTime) / duration);
                const easedProgress = 1 - (1 - progress) ** 5;
                window.scrollTo({
                    top: startY + distance * easedProgress,
                    behavior: 'instant',
                });
                requestRender();

                if (progress < 1) {
                    snapAnimationFrame = window.requestAnimationFrame(animateSnap);
                    return;
                }

                snapAnimationFrame = null;
                isSnapping = false;
                lastScrollY = targetY;
                requestRender();
            };

            snapAnimationFrame = window.requestAnimationFrame(animateSnap);
        };

        const scheduleSnap = () => {
            if (!story.classList.contains('is-horizontal') || isSnapping) return;
            if (snapTimer !== null) window.clearTimeout(snapTimer);
            snapTimer = window.setTimeout(snapToNearestPanel, 320);
        };

        const handleScroll = () => {
            const currentY = window.scrollY;
            requestRender();
            if (!isSnapping && Math.abs(currentY - lastScrollY) > 0.5) scheduleSnap();
            lastScrollY = currentY;
        };

        const handleUserInput = () => {
            cancelSnap();
            lastScrollY = window.scrollY;
        };

        const handleResize = () => {
            measure();
            requestRender();
        };

        measure();
        render();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleUserInput, { passive: true });
        window.addEventListener('touchstart', handleUserInput, { passive: true });
        window.addEventListener('pointerdown', handleUserInput, { passive: true });
        window.addEventListener('keydown', handleUserInput);
        window.addEventListener('resize', handleResize);
        desktopQuery.addEventListener('change', handleResize);
        reducedMotionQuery.addEventListener('change', handleResize);

        return () => {
            cancelSnap();
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleUserInput);
            window.removeEventListener('touchstart', handleUserInput);
            window.removeEventListener('pointerdown', handleUserInput);
            window.removeEventListener('keydown', handleUserInput);
            window.removeEventListener('resize', handleResize);
            desktopQuery.removeEventListener('change', handleResize);
            reducedMotionQuery.removeEventListener('change', handleResize);
            story.classList.remove('is-horizontal');
            story.style.height = '';
            stage.style.backgroundColor = '';
            track.style.transform = '';
            clearMotionStyles();
        };
    }, []);

    return (
        <div className="short-form-story" ref={storyRef}>
            <div className="short-form-story__stage" ref={stageRef}>
                <div className="short-form-story__track" ref={trackRef}>
                    <section
                        className="short-form-contents-intro section"
                        id="short-form-contents"
                        data-short-form-panel="intro"
                        aria-labelledby="short-form-contents-title"
                        ref={introRef}
                    >
                        <div className="short-form-contents-intro__inner">
                            <div
                                className="short-form-contents-intro__films"
                                role="group"
                                aria-label="숏폼 광고 두 편 미리보기"
                            >
                                {shortFormMockups.map((mockup) => (
                                    <figure
                                        className={`short-form-contents-intro__mockup-item is-${mockup.id}`}
                                        key={mockup.id}
                                    >
                                        <img
                                            className="short-form-contents-intro__mockup"
                                            src={mockup.src}
                                            alt={mockup.alt}
                                            draggable="false"
                                        />
                                    </figure>
                                ))}
                            </div>

                            <div className="short-form-contents-intro__content">
                                <header>
                                    <span>01 / BRAND AD CAMPAIGNS</span>
                                    <span>BRAND AD CAMPAIGNS · INTRO</span>
                                </header>

                                <div className="short-form-contents-intro__copy">
                                    <h2 id="short-form-contents-title">
                                        <img
                                            className="short-form-contents-intro__chrome-title"
                                            src="/images/shortform/ad-brand-chrome-title.png"
                                            alt="AD. BRAND"
                                        />
                                        <em>Campaigns.</em>
                                    </h2>
                                    <p className="short-form-contents-intro__subtitle">
                                        FROM IDEA TO CAMPAIGN.
                                    </p>
                                    <div className="short-form-contents-intro__description">
                                        <p>짧은 순간의 임팩트부터 깊이 있는 브랜드의 이야기까지.</p>
                                        <p>
                                            세로형 숏폼 광고와 가로형 브랜드 필름을 통해,
                                            <br />
                                            서로 다른 브랜드의 매력을 감각적인 영상으로
                                            표현했습니다.
                                        </p>
                                    </div>
                                    <div
                                        className="short-form-contents-intro__info"
                                        aria-label="Brand ad campaign production details"
                                    >
                                        <p>CREATIVE DIRECTION · AI VISUAL · VIDEO EDITING</p>
                                        <span>SELECTED FILMS / 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {shortFormFilms.map((film) => (
                        <FilmDetailPanel film={film} key={film.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortFormContentsIntro;
