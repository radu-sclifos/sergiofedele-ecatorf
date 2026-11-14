import type PhotoSwipe from 'photoswipe';
import type { PhotoSwipeOptions } from 'photoswipe';

const arrowSVG = '<svg class="pswp__icn" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M15 5 8 12 15 19"/></svg>';

export const imageZoomOptions: Pick<PhotoSwipeOptions,
    'secondaryZoomLevel' | 'imageClickAction' | 'bgClickAction' | 'tapAction' | 'arrowPrevSVG' | 'arrowNextSVG'> = {
    arrowPrevSVG: arrowSVG,
    arrowNextSVG: arrowSVG,
    secondaryZoomLevel: level => Math.max(level.initial * 2, Math.min(1, level.fit * 3)),
    imageClickAction: 'zoom',
    bgClickAction: 'close',
    tapAction(this: PhotoSwipe, point, event) {
        if ((event.target as Element).closest('.pswp__img')) {
            this.currSlide?.toggleZoom(point);
        } else {
            this.close();
        }
    },
};
