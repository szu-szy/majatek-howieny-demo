/** Galeria restauracji — filtry kategorii (pokaż/ukryj per data-cat). @package iab */
export const initMhGallery = () => {
	const bar = document.querySelector('.mh-galfilters');
	if (!bar) return;
	const grid = bar.parentElement.querySelector('.mh-galgrid');

	bar.addEventListener('click', (e) => {
		const btn = e.target.closest('.mh-galfilter');
		if (!btn) return;
		for (const b of bar.querySelectorAll('.mh-galfilter')) {
			b.classList.remove('is-active');
			b.setAttribute('aria-pressed', 'false');
		}
		btn.classList.add('is-active');
		btn.setAttribute('aria-pressed', 'true');
		const f = btn.dataset.filter;
		for (const it of grid.querySelectorAll('.mh-galitem')) {
			it.hidden = !(f === 'all' || it.dataset.cat === f);
		}
	});
};
