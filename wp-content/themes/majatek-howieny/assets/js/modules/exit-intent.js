/**
 * Exit-intent — pokaż [data-exit-intent] gdy kursor ucieka do góry (desktop) lub
 * po szybkim scroll-up (mobile). Opt-in: działa tylko gdy element istnieje. 1×/sesja.
 * @package iab
 */
export function initExitIntent() {
	const modal = document.querySelector('[data-exit-intent]');
	if (!modal) return;
	if (sessionStorage.getItem('iab_exit_shown')) return;

	const show = () => {
		if (sessionStorage.getItem('iab_exit_shown')) return;
		sessionStorage.setItem('iab_exit_shown', '1');
		modal.removeAttribute('hidden');
		modal.classList.add('is-open');
	};
	const close = () => { modal.classList.remove('is-open'); modal.setAttribute('hidden', ''); };

	document.addEventListener('mouseout', (e) => {
		if (!e.relatedTarget && e.clientY <= 0) show();
	});
	modal.querySelectorAll('[data-exit-close]').forEach((b) => b.addEventListener('click', close));
}
