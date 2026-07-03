/**
 * Modal „Sielskie Wakacje" — AUTO promo (bez klikania w nawigację).
 * Wyzwalacze: przewinięcie ≥30% strony LUB exit-intent (kursor ucieka za górę okna).
 * Desktop: centered. Mobile: bottom-sheet. Zamknięcie: X / „Innym razem" / ESC / backdrop.
 * PAMIĘĆ: po zamknięciu zapisujemy trwale (localStorage) → modal NIE pokazuje się
 * ponownie (żeby nie denerwować). Poza stronami z blacklisty.
 * @package iab
 */
const EXIT_MS = 300;
const SESSION_KEY = 'mh_sw_modal_seen';      // pokazany w tej sesji (anty-podwójne wyzwolenie)
const DISMISS_KEY = 'mh_sw_modal_dismissed'; // zamknięty przez użytkownika → trwale (localStorage)
const SCROLL_PCT = 30;
const BLACKLIST = ['/sielskie-wakacje', '/kontakt', '/podziekowanie', '/dziekujemy'];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const seenThisSession = () => {
	try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
};
const markSeen = () => {
	try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* prywatny tryb → ignoruj */ }
};
const isDismissed = () => {
	try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; }
};
const markDismissed = () => {
	try { localStorage.setItem(DISMISS_KEY, '1'); } catch { /* prywatny tryb → ignoruj */ }
};
const isBlacklisted = () => {
	const path = window.location.pathname.replace(/\/$/, '') || '/';
	return BLACKLIST.some((p) => path === p || path.startsWith(`${p}/`));
};

export function initSielskieModal() {
	const modal = document.querySelector('[data-sw-modal]');
	const openers = document.querySelectorAll('[data-sw-open]');
	if (!modal) return;

	let shown = false;
	let returnFocusTo = null;

	const show = () => {
		if (shown) return;
		shown = true;
		markSeen();
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
		markDismissed(); // zamknięcie = trwała zgoda „nie pokazuj więcej"
		modal.classList.add('is-closing');
		if (reducedMotion()) finalize();
		else setTimeout(finalize, EXIT_MS);
	};

	// Ręczne wyzwalacze (opcjonalne, np. link „zobacz ofertę" gdzieś w treści)
	openers.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			show();
		});
	});

	// AUTO-POPUP: scroll ≥30% LUB exit-intent. Nie pokazuj gdy już zamknięty (trwale)
	// ani gdy już widziany w tej sesji, ani na stronach z blacklisty.
	if (!isDismissed() && !seenThisSession() && !isBlacklisted()) {
		let autoFired = false;
		const cleanup = () => {
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('mouseout', onExit);
		};
		const autoShow = () => {
			if (autoFired || shown || isDismissed() || seenThisSession()) return;
			autoFired = true;
			cleanup();
			show();
		};

		// 1) Próg przewinięcia (działa też na mobile)
		let rafQueued = false;
		const onScroll = () => {
			if (autoFired || rafQueued) return;
			rafQueued = true;
			requestAnimationFrame(() => {
				rafQueued = false;
				const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
				if ((window.scrollY / max) * 100 >= SCROLL_PCT) autoShow();
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		// 2) Exit-intent (desktop): kursor ucieka poza górną krawędź okna
		const onExit = (e) => {
			if (e.relatedTarget || e.toElement) return; // wciąż w oknie
			if (e.clientY <= 4) autoShow();
		};
		document.addEventListener('mouseout', onExit);
	}

	// Zamknięcia (X, „Innym razem")
	modal.querySelectorAll('[data-sw-close]').forEach((el) => {
		el.addEventListener('click', hide);
	});

	// CTA — pozwól nawigować, zamknij tło (i zapamiętaj — user wszedł w ofertę)
	modal.querySelectorAll('[data-sw-cta="primary"]').forEach((el) => {
		el.addEventListener('click', () => { shown = false; markDismissed(); });
	});

	// Backdrop
	modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });

	// ESC
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && shown) hide();
	});
}
