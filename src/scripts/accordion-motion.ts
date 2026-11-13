// Animate measured heights: native <details> remains the fallback without JS
export function animateAccordion(details: HTMLDetailsElement) {
    const summary = details.querySelector('summary');
    const content = details.querySelector<HTMLElement>('.composition-content');
    if (!summary || !content) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let expanded = details.open;
    let animating = false;
    let completionTimer: number | undefined;

    function finish() {
        window.clearTimeout(completionTimer);
        details.open = expanded;
        details.classList.remove('accordion-animating', 'accordion-closing');
        details.style.removeProperty('height');
        animating = false;
    }

    summary.addEventListener('click', event => {
        event.preventDefault();
        expanded = !(animating ? expanded : details.open);
        if (reducedMotion.matches) {
            finish();
            return;
        }

        // Freeze the current rendered height, including when reversing a slide.
        const startHeight = details.getBoundingClientRect().height;
        window.clearTimeout(completionTimer);
        details.classList.remove('accordion-animating');
        details.style.height = `${startHeight}px`;
        details.open = true;
        details.classList.toggle('accordion-closing', !expanded);
        animating = true;

        const styles = window.getComputedStyle(details);
        const borders = parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
        const endHeight = summary.getBoundingClientRect().height + borders
            + (expanded ? content.getBoundingClientRect().height : 0);

        // Commit the starting height before enabling the CSS transition
        void details.offsetHeight;
        details.classList.add('accordion-animating');
        details.style.height = `${endHeight}px`;
        // Also clean up when no transitionend fires (e.g. an unchanged height)
        completionTimer = window.setTimeout(finish, 400);
    });

    details.addEventListener('transitionend', event => {
        if (event.target === details && event.propertyName === 'height' && animating) finish();
    });
    window.addEventListener('resize', () => {
        if (animating) finish();
    });
    reducedMotion.addListener(() => {
        if (animating) finish();
    });
}
