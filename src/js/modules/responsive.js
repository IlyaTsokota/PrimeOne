

function responsive() {
	window.addEventListener('resize', responsiveMenu, true);
	function responsiveMenu() {
		const headerMenu = document.querySelector('.header-menu'),
			headerLang = document.querySelector('.header-top__lang'),
			headerBottomMenu = document.querySelectorAll('.header-bottom__menu'),
			headerTop = document.querySelector('.header-top'),
			headerColumn = document.querySelectorAll('.header-bottom__column');

		let width = window.innerWidth;
		if (width < 768) {
			if (!headerMenu.classList.contains('done')) {
				headerMenu.classList.add('done');
				headerMenu.append(headerLang);
				headerBottomMenu.forEach(item => headerMenu.append(item));
			}
		}
		else {
			if (headerMenu.classList.contains('done')) {
				headerMenu.classList.remove('done');
				headerTop.prepend(headerLang);
				headerColumn[0].append(headerBottomMenu[0]);
				headerColumn[2].append(headerBottomMenu[1]);
			}
		}
	}

	responsiveMenu();

}

export default responsive;