/**
 * Entry ES module — ładuje moduły interakcji po DOM ready.
 * @package iab
 */
import { initLoader } from './modules/loader.js';
import { initDrawer } from './modules/mobile-drawer.js';
import { initReveal } from './modules/scroll-reveal.js';
import { initHeader } from './modules/header.js';
import { initForms } from './modules/forms.js';
import { initAccordion } from './modules/accordion.js';
import { initCounters } from './modules/counters.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initExitIntent } from './modules/exit-intent.js';
import { initEffects } from './modules/effects.js';
import { initTilt3d } from './modules/tilt-3d.js';
import { initAmbient } from './modules/ambient.js';
import { initMhFsmenu } from './modules/mh-fsmenu.js';
import { initMhDrawer } from './modules/mh-drawer.js';
import { initMhArticle } from './modules/mh-article.js';
import { initMhLightbox } from './modules/mh-lightbox.js';
import { initMhBooking } from './modules/mh-booking.js';
import { initMhGallery } from './modules/mh-gallery.js';
import { initNavDrop } from './modules/nav-drop.js';
import { initSielskieModal } from './modules/sielskie-modal.js';

const boot = () => {
	initLoader();   // pierwsze — blokuje scroll, musi uruchomić się jak najszybciej
	initHeader();
	initNavDrop();
	initSielskieModal();
	initDrawer();
	initReveal();
	initForms();
	initAccordion();
	initCounters();
	initReadingProgress();
	initExitIntent();
	initEffects();
	initTilt3d();
	initAmbient();
	initMhFsmenu();
	initMhDrawer();
	initMhArticle();
	initMhLightbox();
	initMhBooking();
	initMhGallery();
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', boot);
} else {
	boot();
}
