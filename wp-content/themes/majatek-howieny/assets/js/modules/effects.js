/**
 * Effects — parallax, tilt kart, word-by-word reveal nagłówków.
 * Wszystko opt-in (działa tylko gdy są elementy) + reduced-motion aware.
 * @package iab
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function parallax() {
	const els = document.querySelectorAll('.iab-parallax');
	if (!els.length || reduce) return;
	let ticking = false;
	const update = () => {
		els.forEach((el) => {
			const speed = parseFloat(el.dataset.speed || '0.12');
			const rect = el.getBoundingClientRect();
			const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
			el.style.setProperty('--py', offset.toFixed(1) + 'px');
		});
		ticking = false;
	};
	update();
	window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
}

function tilt() {
	const els = document.querySelectorAll('.iab-tilt');
	if (!els.length || reduce || matchMedia('(hover: none)').matches) return;
	els.forEach((el) => {
		el.addEventListener('mousemove', (e) => {
			const r = el.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width - 0.5;
			const y = (e.clientY - r.top) / r.height - 0.5;
			el.style.setProperty('--tiltY', (x * 6).toFixed(2) + 'deg');
			el.style.setProperty('--tiltX', (-y * 6).toFixed(2) + 'deg');
		});
		el.addEventListener('mouseleave', () => {
			el.style.setProperty('--tiltX', '0deg');
			el.style.setProperty('--tiltY', '0deg');
		});
	});
}

function words() {
	const els = document.querySelectorAll('.iab-words');
	if (!els.length) return;
	els.forEach((el) => {
		if (el.dataset.split) return;
		el.dataset.split = '1';
		const parts = el.textContent.trim().split(/\s+/);
		el.textContent = '';
		parts.forEach((w, i) => {
			const span = document.createElement('span');
			span.className = 'iab-word';
			span.textContent = w;
			span.style.transitionDelay = (i * 60) + 'ms';
			el.appendChild(span);
			if (i < parts.length - 1) { el.appendChild(document.createTextNode(' ')); } // spacja POZA inline-block
		});
	});
	if (reduce || !('IntersectionObserver' in window)) {
		els.forEach((el) => el.classList.add('is-visible'));
		return;
	}
	const io = new IntersectionObserver((ents) => {
		ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
	}, { threshold: 0.3 });
	els.forEach((el) => io.observe(el));
}

export function initEffects() {
	parallax();
	tilt();
	words();
}
