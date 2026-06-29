/** Rezerwacja: blokada dat i godzin wstecz (min=dziś; minione godziny ukryte gdy data=dziś). @package iab */
export const initMhBooking = () => {
	const wrap = document.querySelector('.mh-booking');
	if (!wrap) return;
	const dateInput = wrap.querySelector('input[name="rez-date"]');
	const timeSelect = wrap.querySelector('select[name="rez-time"]');
	if (!dateInput) return;

	const now = new Date();
	const pad = (n) => String(n).padStart(2, '0');
	const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
	dateInput.min = today;

	const sync = () => {
		if (dateInput.value && dateInput.value < today) dateInput.value = today;
		if (!timeSelect) return;
		const isToday = dateInput.value === today;
		const cur = now.getHours() * 60 + now.getMinutes();
		for (const o of timeSelect.options) {
			const m = /^(\d{1,2}):(\d{2})/.exec(o.value);
			if (!m) continue;
			const past = isToday && Number(m[1]) * 60 + Number(m[2]) <= cur;
			o.disabled = past;
			o.hidden = past;
		}
		if (timeSelect.selectedOptions[0]?.disabled) timeSelect.value = '';
	};
	dateInput.addEventListener('change', sync);
	dateInput.addEventListener('input', sync);
	sync();
};
