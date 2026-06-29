/** Lightbox galerii (globalny) — działa na każdym [data-lightbox]; per-kontener prev/next/ESC. @package iab */
export const initMhLightbox = () => {
	const boxes = [...document.querySelectorAll('[data-lightbox]')];
	if (!boxes.length) return;

	const lb = document.createElement('div');
	lb.className = 'mh-lb';
	lb.innerHTML = `
		<button class="mh-lb__close" type="button" aria-label="Zamknij">×</button>
		<button class="mh-lb__nav mh-lb__prev" type="button" aria-label="Poprzednie">‹</button>
		<img class="mh-lb__img" alt="">
		<button class="mh-lb__nav mh-lb__next" type="button" aria-label="Następne">›</button>`;
	document.body.append(lb);

	const img = lb.querySelector('.mh-lb__img');
	let current = [];
	let idx = 0;
	const show = (i) => { idx = (i + current.length) % current.length; img.src = current[idx]; };
	const open = (urls, i) => { current = urls; show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
	const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };

	for (const box of boxes) {
		const items = [...box.querySelectorAll('[data-full]')];
		for (const it of items) {
			it.addEventListener('click', (e) => {
				e.preventDefault();
				const vis = items.filter((x) => !x.hidden);
				open(vis.map((x) => x.dataset.full), vis.indexOf(it));
			});
		}
	}

	lb.querySelector('.mh-lb__close').addEventListener('click', close);
	lb.querySelector('.mh-lb__prev').addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
	lb.querySelector('.mh-lb__next').addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
	lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
	document.addEventListener('keydown', (e) => {
		if (!lb.classList.contains('is-open')) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') show(idx - 1);
		if (e.key === 'ArrowRight') show(idx + 1);
	});
};
