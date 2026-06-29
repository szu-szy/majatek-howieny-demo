/** Artykuł — progress bar czytania, kopiuj link, scroll-spy spisu treści. @package iab */
export const initMhArticle = () => {
	const bar = document.querySelector('.mh-progress__bar');
	const art = document.querySelector('.mh-article');
	if (bar && art) {
		const upd = () => {
			const h = art.offsetHeight - window.innerHeight;
			const p = h > 0 ? (window.scrollY - art.offsetTop) / h : 0;
			bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
		};
		window.addEventListener('scroll', upd, { passive: true });
		window.addEventListener('resize', upd);
		upd();
	}

	const copyBtn = document.querySelector('[data-blog-copy]');
	if (copyBtn && navigator.clipboard) {
		copyBtn.addEventListener('click', async () => {
			await navigator.clipboard.writeText(copyBtn.dataset.blogCopy);
			const toast = document.createElement('span');
			toast.className = 'mh-toast';
			toast.textContent = 'Skopiowano link!';
			document.body.append(toast);
			setTimeout(() => toast.remove(), 1800);
		});
	}

	/* Scroll-spy: podświetl w spisie treści sekcję, którą aktualnie czytasz. */
	const tocLinks = [...document.querySelectorAll('.mh-art-toc a[href^="#"]')];
	const heads = [...document.querySelectorAll('.mh-art-prose h2[id], .mh-art-prose h3[id]')];
	if (!tocLinks.length || !heads.length || !('IntersectionObserver' in window)) return;

	const byId = new Map(tocLinks.map((a) => [decodeURIComponent(a.getAttribute('href').slice(1)), a.parentElement]));
	const visible = new Set();
	let current = null;
	const setActive = (li) => {
		if (li === current) return;
		for (const a of tocLinks) a.parentElement.classList.remove('is-active');
		li?.classList.add('is-active');
		current = li;
	};
	const io = new IntersectionObserver((entries) => {
		for (const e of entries) {
			if (e.isIntersecting) visible.add(e.target.id);
			else visible.delete(e.target.id);
		}
		const firstId = heads.find((h) => visible.has(h.id))?.id;
		if (firstId && byId.has(firstId)) setActive(byId.get(firstId));
	}, { rootMargin: '-88px 0px -62% 0px', threshold: 0 });
	for (const h of heads) io.observe(h);
};
