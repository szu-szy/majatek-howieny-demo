/** Mobile drawer — slide-in (nasz standard). data-open steruje; backdrop/ESC/link zamykają. Tylko ≤860px. @package iab */
export const initMhDrawer = () => {
	const trigger = document.querySelector('[data-mh-drawer-trigger]');
	const drawer = document.querySelector('[data-mh-drawer]');
	if (!drawer || !trigger) return;

	const backdrop = document.querySelector('[data-mh-drawer-backdrop]');
	const closeBtn = document.querySelector('[data-mh-drawer-close]');
	drawer.removeAttribute('hidden');
	backdrop?.removeAttribute('hidden');

	const setOpen = (open) => {
		if (!open && drawer.dataset.open === 'true') {
			drawer.dataset.closing = 'true';
			trigger.setAttribute('aria-expanded', 'false');
			setTimeout(() => {
				delete drawer.dataset.closing;
				drawer.dataset.open = 'false';
				if (backdrop) backdrop.dataset.open = 'false';
				document.body.classList.remove('mh-drawer-open');
			}, 220);
			return;
		}
		const v = String(open);
		drawer.dataset.open = v;
		if (backdrop) backdrop.dataset.open = v;
		trigger.setAttribute('aria-expanded', v);
		document.body.classList.toggle('mh-drawer-open', open);
	};
	setOpen(false);

	trigger.addEventListener('click', (e) => {
		if (window.matchMedia('(max-width: 860px)').matches) {
			e.preventDefault();
			e.stopImmediatePropagation();
			setOpen(drawer.dataset.open !== 'true');
		}
	}, true);
	closeBtn?.addEventListener('click', () => setOpen(false));
	backdrop?.addEventListener('click', () => setOpen(false));
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && drawer.dataset.open === 'true') setOpen(false);
	});
	for (const a of drawer.querySelectorAll('a')) {
		a.addEventListener('click', () => setOpen(false));
	}
};
