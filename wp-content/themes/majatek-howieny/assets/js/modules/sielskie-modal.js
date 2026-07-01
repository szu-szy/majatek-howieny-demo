/**
 * Modal „Sielskie Wakacje" — otwierany klikiem świecącego linku w nawigacji.
 * Desktop: centered. Mobile: bottom-sheet. Zamknięcie: X / „Innym razem" / ESC / backdrop.
 * Wzorzec z Magic Gym (Les Mills), tu bez auto-popupu — wyłącznie na klik.
 * @package iab
 */
const EXIT_MS = 300;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSielskieModal() {
	const modal = document.querySelector('[data-sw-modal]');
	const openers = document.querySelectorAll('[data-sw-open]');
	if (!modal || !openers.length) return;

	let shown = false;
	let returnFocusTo = null;

	const show = () => {
		if (shown) return;
		shown = true;
		returnFocusTo = document.activeElement;
		// Zamknij mobilny drawer, jeśli otwarty (żeby modal był nad wszystkim)
		document.querySelector('[data-mh-drawer-close]')?.click();
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		modal.querySelector('[data-sw-close]')?.focus();
	};

	const finalize = () => {
		modal.setAttribute('aria-hidden', 'true');
		modal.classList.remove('is-closing');
		document.body.style.overflow = '';
		returnFocusTo?.focus?.();
	};

	const hide = () => {
		if (!shown) return;
		shown = false;
		modal.classList.add('is-closing');
		if (reducedMotion()) finalize();
		else setTimeout(finalize, EXIT_MS);
	};

	openers.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			show();
		});
	});

	// Zamknięcia (X, „Innym razem")
	modal.querySelectorAll('[data-sw-close]').forEach((el) => {
		el.addEventListener('click', hide);
	});

	// CTA — pozwól nawigować, zamknij tło
	modal.querySelectorAll('[data-sw-cta="primary"]').forEach((el) => {
		el.addEventListener('click', () => { shown = false; });
	});

	// Backdrop
	modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });

	// ESC
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && shown) hide();
	});
}
