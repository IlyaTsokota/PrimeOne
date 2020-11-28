// IE9 - 11
// import 'core-js/stable';
// require('es6-promise/auto');
// require('mdn-polyfills/Node.prototype.append');
// require('mdn-polyfills/Node.prototype.remove');
// require('mdn-polyfills/Element.prototype.matches');
// require('formdata-polyfill');
// import 'unfetch/polyfill';

import isWebP from './modules/webp';
import responsive from './modules/responsive-menu';
import burger from './modules/burger';

window.addEventListener("DOMContentLoaded", () => {
	isWebP();
	responsive();
	burger();
});