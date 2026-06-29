/**
 * Accordion — (1) .iab-accordion (button + aria), (2) FAQ <details> z PŁYNNĄ animacją.
 * FAQ: animacja sterowana WYŁĄCZNIE klasą .is-open (grid-rows 0fr↔1fr w CSS); nie dotykamy
 * natywnego atrybutu `open` (eliminuje wyścig z natywnym toggle przy szybkim klikaniu). @package iab
 */
export function initAccordion() {
	// 1) Klasyczny akordeon na przyciskach
	document.querySelectorAll('.iab-accordion').forEach((acc) => {
		acc.querySelectorAll('.iab-accordion__head').forEach((head) => {
			head.addEventListener('click', () => {
				const open = head.getAttribute('aria-expanded') === 'true';
				head.setAttribute('aria-expanded', String(!open));
				const panel = document.getElementById(head.getAttribute('aria-controls'));
				if (panel) panel.hidden = open;
			});
		});
	});

	// 2) FAQ — natywne <details>, animowane czysto klasą .is-open (bez zacięć, bez desyncu)
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.querySelectorAll('.mh-faq__item').forEach((item) => {
		const summary = item.querySelector('summary');
		if (!summary) return;

		// Stan początkowy: trzymaj [open] otwarte zawsze (treść i tak display:grid w CSS),
		// a faktyczny collapse robi .is-open. Dzięki temu natywny toggle nigdy nie chowa treści.
		item.open = true;
		item.classList.remove('is-open'); // wizualnie zwinięte na starcie

		summary.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (reduce) { item.classList.toggle('is-open'); return; }
			item.classList.toggle('is-open');
		});
		// a11y: aria-expanded na summary
		const sync = () => summary.setAttribute('aria-expanded', String(item.classList.contains('is-open')));
		sync();
		summary.addEventListener('click', sync);
	});
}
