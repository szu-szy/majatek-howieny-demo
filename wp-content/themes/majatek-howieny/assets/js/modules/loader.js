/** Page loader — dismiss po window.load (z minimalnym 1.2s by anim się dopełniła). @package iab */
export const initLoader = () => {
	const el = document.getElementById( 'mh-loader' );
	if ( ! el ) return;

	document.body.style.overflow = 'hidden';

	const dismiss = () => {
		if ( el.classList.contains( 'mh-loader--out' ) ) return;
		el.classList.add( 'mh-loader--out' );
		document.body.style.overflow = '';
		const cleanup = () => el.remove();
		el.addEventListener( 'transitionend', cleanup, { once: true } );
		setTimeout( cleanup, 900 ); // fallback gdyby transitionend nie odpalił
	};

	const MIN_MS = 1200; // poczekaj min. tyle żeby animacja łuku zdążyła się wyrysować
	const t0 = Date.now();

	const onLoad = () => {
		const wait = Math.max( 0, MIN_MS - ( Date.now() - t0 ) );
		setTimeout( dismiss, wait );
	};

	if ( document.readyState === 'complete' ) {
		onLoad();
	} else {
		window.addEventListener( 'load', onLoad, { once: true } );
	}

	// Hard cap — loader nigdy nie blokuje dłużej niż 4s
	setTimeout( dismiss, 4000 );
};
