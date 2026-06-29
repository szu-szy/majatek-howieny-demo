/**
 * Ambient — interaktywna poświata za kursorem na podstronach (CSS vars --mx/--my/--mglow).
 * Tylko desktop (pointer:fine), rAF-throttled, respektuje prefers-reduced-motion. @package iab
 */
export function initAmbient() {
	const body = document.body;
	if (body.classList.contains('home')) return;
	if (!window.matchMedia('(pointer: fine)').matches) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let raf = 0, x = 50, y = 24, shown = false;
	window.addEventListener('pointermove', (e) => {
		x = (e.clientX / window.innerWidth) * 100;
		y = (e.clientY / window.innerHeight) * 100;
		if (!shown) { body.style.setProperty('--mglow', '1'); shown = true; }
		if (!raf) {
			raf = requestAnimationFrame(() => {
				body.style.setProperty('--mx', x.toFixed(1) + '%');
				body.style.setProperty('--my', y.toFixed(1) + '%');
				raf = 0;
			});
		}
	}, { passive: true });

	document.addEventListener('mouseleave', () => { body.style.setProperty('--mglow', '0'); shown = false; });
}
