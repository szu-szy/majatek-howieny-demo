/** Fullscreen menu (home) — open/close, ESC, klik-tło, blokada scrolla, drzewko sekcji. @package iab */
export const initMhFsmenu = () => {
	const menu = document.getElementById('mhx-fsmenu');
	if (!menu) return;

	/* Drzewko: nagłówek sekcji nad dziećmi + domyślnie pokaż aktywną sekcję (lub pierwszą). */
	const tree = menu.querySelector('.mhx-fstree');
	if (tree) {
		for (const li of tree.querySelectorAll(':scope > li.menu-item-has-children')) {
			const sub = li.querySelector('.sub-menu');
			const link = li.querySelector(':scope > a');
			if (sub && link && !sub.querySelector('.mhx-subhead')) {
				const head = document.createElement('li');
				head.className = 'mhx-subhead';
				head.setAttribute('aria-hidden', 'true');
				head.textContent = link.textContent.trim();
				sub.prepend(head);
			}
		}
		const def = tree.querySelector('li.current-menu-item, li.current-menu-ancestor')
			?? tree.querySelector(':scope > li.menu-item-has-children');
		def?.classList.add('mhx-fsdefault');
	}

	const openers = [...document.querySelectorAll('[data-fsmenu-open]')];
	const open = () => {
		menu.hidden = false;
		requestAnimationFrame(() => menu.classList.add('is-open'));
		document.body.style.overflow = 'hidden';
		menu.querySelector('a, button')?.focus();
		for (const o of openers) o.setAttribute('aria-expanded', 'true');
	};
	const close = () => {
		menu.classList.remove('is-open');
		document.body.style.overflow = '';
		for (const o of openers) o.setAttribute('aria-expanded', 'false');
		setTimeout(() => { menu.hidden = true; }, 420);
	};
	for (const o of openers) o.addEventListener('click', open);
	for (const c of menu.querySelectorAll('[data-fsmenu-close]')) c.addEventListener('click', close);
	for (const a of menu.querySelectorAll('.mhx-fsmenu__nav a')) a.addEventListener('click', close);
	menu.addEventListener('click', (e) => { if (e.target === menu) close(); });
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) close(); });
};
