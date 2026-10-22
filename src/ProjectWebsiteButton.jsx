import './projectWebsiteButton.css';

export default function ProjectWebsiteButton({ href = '', tone = 'light', className = '' }) {
    const classes = `project-website-button project-website-button--${tone} ${className}`.trim();
    const content = (
        <>
            <span>VIEW WEBSITE</span>
            <span className="project-website-button__arrow" aria-hidden="true">
                ↗
            </span>
        </>
    );

    if (href) {
        return (
            <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return (
        <button className={classes} type="button" disabled aria-label="Website coming soon">
            {content}
        </button>
    );
}
