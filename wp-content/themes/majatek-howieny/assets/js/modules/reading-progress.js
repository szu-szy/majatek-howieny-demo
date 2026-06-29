/**
 * Reading progress — pasek postępu czytania wpisu.
 * @package iab
 */
export function initReadingProgress() {
	const bar = document.querySelector('[data-reading-progress] > span');
	if (!bar) return;
	const article = document.querySelector('.iab-post__content') || document.querySelector('.iab-post');
	if (!article) return;

	let ticking = false;
	const update = () => {
		const rect = article.getBoundingClientRect();
		const total = rect.height - window.innerHeight;
		const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
		bar.style.width = (total > 0 ? (passed / total) * 100 : 0) + '%';
		ticking = false;
	};
	update();
	window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
	window.addEventListener('resize', update, { passive: true });
}
