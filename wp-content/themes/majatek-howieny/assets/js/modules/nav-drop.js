/**
 * Dropdown „Oferta" na pasku głównym — klik/klawiatura (hover obsługuje CSS).
 * Na desktopie toggle pozwala wejść w podstronę linkiem, a klik w karet otwiera menu.
 * @package iab
 */
export function initNavDrop() {
	const drops = document.querySelectorAll( '[data-nav-drop]' );
	if ( ! drops.length ) {
		return;
	}

	drops.forEach( ( drop ) => {
		const toggle = drop.querySelector( '[data-nav-drop-toggle]' );
		const caret  = drop.querySelector( '.mhx-nav__drop-caret' );
		if ( ! toggle ) {
			return;
		}

		const open = ( state ) => {
			drop.classList.toggle( 'is-open', state );
			toggle.setAttribute( 'aria-expanded', state ? 'true' : 'false' );
		};

		// Klik w karetkę (lub w toggle na ekranach dotykowych) otwiera menu zamiast nawigować.
		const isTouch = window.matchMedia( '(hover: none)' ).matches;
		toggle.addEventListener( 'click', ( e ) => {
			if ( caret && caret.contains( e.target ) ) {
				e.preventDefault();
				open( ! drop.classList.contains( 'is-open' ) );
			} else if ( isTouch && ! drop.classList.contains( 'is-open' ) ) {
				e.preventDefault();
				open( true );
			}
		} );

		toggle.addEventListener( 'keydown', ( e ) => {
			if ( 'Escape' === e.key ) {
				open( false );
			}
		} );
	} );

	// Klik poza dowolnym dropdownem zamyka wszystkie.
	document.addEventListener( 'click', ( e ) => {
		drops.forEach( ( drop ) => {
			if ( ! drop.contains( e.target ) ) {
				drop.classList.remove( 'is-open' );
				const t = drop.querySelector( '[data-nav-drop-toggle]' );
				if ( t ) {
					t.setAttribute( 'aria-expanded', 'false' );
				}
			}
		} );
	} );
}
