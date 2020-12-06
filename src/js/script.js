// IE9 - 11
// import 'core-js/stable';
// require('es6-promise/auto');
// require('mdn-polyfills/Node.prototype.append');
// require('mdn-polyfills/Node.prototype.remove');
// require('mdn-polyfills/Element.prototype.matches');
// require('formdata-polyfill');
// import 'unfetch/polyfill';

import isWebP from './modules/webp';
import responsive from './modules/responsive';
import burger from './modules/burger';
import sendMail from './modules/email';
import { closeModalListener } from './modules/modal';
import scrollUp from './modules/scrollUp';
import { enableScroll, disableScroll } from './modules/scrollSwitcher';

disableScroll();

window.addEventListener('load', () => {
	history.pushState('', document.title, window.location.pathname);
	const preloader = document.querySelector('.preloader');
	setTimeout(() => {
		start();
		setTimeout(() => {
			preloader.classList.remove('preloader--active');
			enableScroll();
			setTimeout(() => {
				preloader.remove();
			}, 800);
		}, 200);
	}, 300);
});

function start() {
	isWebP();
	responsive();
	burger();
	closeModalListener('.modal');
	sendMail('.form', '.loading');
	scrollUp('.up');
}
