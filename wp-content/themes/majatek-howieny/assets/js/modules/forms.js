/**
 * Formularze — redirect na /dziekujemy/ po wysłaniu CF7 + drobny UX.
 * @package iab
 */
export function initForms() {
	// CF7: po sukcesie → strona podziękowania (jeśli istnieje).
	document.addEventListener('wpcf7mailsent', () => {
		const url = (document.body.dataset.thankyou || '/dziekujemy/');
		// pozwól GA4/Pixel złapać event, potem redirect
		setTimeout(() => { window.location.assign(url); }, 250);
	}, false);

	// UX: scroll do pierwszego błędu
	document.addEventListener('wpcf7invalid', (e) => {
		const form = e.target;
		const bad = form && form.querySelector('.wpcf7-not-valid');
		if (bad) bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, false);
}
