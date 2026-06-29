/**
 * Head-init: klasa `iab-js` (gate reveal-animacji — bez JS treść jest widoczna)
 * + safety-net, gdy moduł nie odsłoni sekcji w 1.5s. Ładowane blokująco w <head>,
 * żeby klasa była na <html> przed renderem <body> (bez FOUC). @package iab
 */
document.documentElement.classList.add('iab-js');
addEventListener('load', () => {
	setTimeout(() => {
		if (!window.__iabReveal) {
			for (const el of document.querySelectorAll('.iab-reveal')) el.classList.add('is-visible');
		}
	}, 1500);
});
