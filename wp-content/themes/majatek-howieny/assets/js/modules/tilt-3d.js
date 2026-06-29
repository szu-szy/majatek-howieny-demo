/**
 * Tilt 3D — kafle bento („Na każdą okazję") przechylają się w 3D za kursorem,
 * z połyskiem (glare). Tylko myszka/trackpad; touch i reduce-motion pomijane.
 * @package iab
 */
export function initTilt3d() {
	const tiles = document.querySelectorAll('[data-tilt]');
	if (!tiles.length) return;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	const MAX = 8; // maks. kąt przechyłu (deg)

	tiles.forEach((tile) => {
		let raf = 0;
		let pending = null;

		const apply = () => {
			raf = 0;
			if (!pending) return;
			const { px, py } = pending;
			tile.style.setProperty('--ry', `${(px - 0.5) * 2 * MAX}deg`);
			tile.style.setProperty('--rx', `${-(py - 0.5) * 2 * MAX}deg`);
			tile.style.setProperty('--mx', `${px * 100}%`);
			tile.style.setProperty('--my', `${py * 100}%`);
		};

		tile.addEventListener('pointermove', (e) => {
			if (e.pointerType && e.pointerType !== 'mouse') return;
			const r = tile.getBoundingClientRect();
			pending = { px: (e.clientX - r.left) / r.width, py: (e.clientY - r.top) / r.height };
			if (!tile.classList.contains('is-tilt')) tile.classList.add('is-tilt');
			if (!raf) raf = requestAnimationFrame(apply);
		});

		tile.addEventListener('pointerleave', () => {
			pending = null;
			if (raf) { cancelAnimationFrame(raf); raf = 0; }
			tile.classList.remove('is-tilt');
			tile.style.setProperty('--rx', '0deg');
			tile.style.setProperty('--ry', '0deg');
		});
	});
}
