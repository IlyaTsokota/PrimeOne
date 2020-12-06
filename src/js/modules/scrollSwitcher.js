
const disableScroll = function () {
	const paddingRight = window.innerWidth - document.body.offsetWidth;
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = paddingRight + "px";
};

const enableScroll = function () {
	document.body.style.overflow = "";
	document.body.style.paddingRight = 0 + "px";
};


export { disableScroll };
export { enableScroll };