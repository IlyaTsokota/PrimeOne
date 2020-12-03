export default function burger() {
	const button = document.querySelector('.header-menu__icon'),
		menu = document.querySelector('.header-menu');

	button.addEventListener('click', () => {
		if (button.classList.contains('header-menu__icon--active') && menu.classList.contains('header-menu--active')) {
			button.classList.remove('header-menu__icon--active');
			menu.classList.remove('header-menu--active');
			document.body.style.overflow = '';
		} else {
			button.classList.add('header-menu__icon--active');
			menu.classList.add('header-menu--active');
			document.body.style.overflow = 'hidden';
		}
	});
}