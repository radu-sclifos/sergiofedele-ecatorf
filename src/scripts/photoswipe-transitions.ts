import type PhotoSwipeLightbox from 'photoswipe/lightbox';

// Animate the zoom wrapper's margin, leaving PhotoSwipe's pan/zoom transform intact.
export function addFullscreenTransitions(lightbox: PhotoSwipeLightbox) {
    lightbox.on('bindEvents', () => {
        const pswp = lightbox.pswp;
        if (!pswp || pswp.getNumItems() < 2) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const goTo = pswp.goTo.bind(pswp);
        let busy = false;
        let version = 0;
        let timer: number | undefined;

        const reset = () => {
            for (const holder of pswp.mainScroll.itemHolders) {
                const surface = holder.slide?.container;
                if (!surface) continue;
                surface.classList.remove('viewer-leave-next', 'viewer-leave-previous',
                    'viewer-enter-next', 'viewer-enter-previous');
                surface.style.removeProperty('opacity');
            }
        };
        const cancel = () => {
            version++;
            window.clearTimeout(timer);
            busy = false;
            reset();
        };

        pswp.goTo = index => {
            if (busy || !pswp.isOpen) return;
            const destination = pswp.canLoop() ? pswp.getLoopedIndex(index)
                : Math.max(0, Math.min(index, pswp.getNumItems() - 1));
            if (destination === pswp.currIndex) return;
            if (reducedMotion.matches || pswp.mainScroll.isShifted()) {
                cancel();
                goTo(destination);
                return;
            }

            const direction = index > pswp.currIndex ? 'next' : 'previous';
            const surface = pswp.currSlide?.container;
            if (!surface) return;
            reset();
            busy = true;
            const transition = ++version;
            surface.classList.add(`viewer-leave-${direction}`);
            timer = window.setTimeout(() => {
                if (transition !== version) return;
                reset();
                goTo(destination);
                pswp.currSlide?.container.classList.add(`viewer-enter-${direction}`);
                timer = window.setTimeout(cancel, 180);
            }, 120);
        };

        // Retain native swipe physics, fading each page with its displacement.
        pswp.on('moveMainScroll', () => {
            if (busy || reducedMotion.matches || !pswp.opener.isOpen) return;
            const width = pswp.mainScroll.slideWidth;
            if (!width) return;
            const left = pswp.scrollWrap?.getBoundingClientRect().left || 0;
            for (const holder of pswp.mainScroll.itemHolders) {
                if (!holder.slide) continue;
                const distance = Math.abs(holder.el.getBoundingClientRect().left - left);
                holder.slide.container.style.opacity = String(Math.max(0, 1 - distance / width));
            }
        });
        pswp.on('change', reset);
        pswp.on('pointerDown', cancel);
        pswp.on('resize', cancel);
        pswp.on('close', cancel);
        pswp.on('destroy', cancel);
        reducedMotion.addListener(cancel);
        pswp.on('destroy', () => reducedMotion.removeListener(cancel));
    });
}
