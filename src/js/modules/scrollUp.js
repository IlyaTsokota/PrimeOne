
function scrollUp(upSelector) {

	const up = document.querySelector(upSelector);
	window.addEventListener("scroll", function () {
		scrollFunction();
	});

	function scrollFunction() {
		if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
			up.classList.add('up--active');
		} else {
			up.classList.remove('up--active');
		}
	}

	up.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo(0, 0);
	});
}

export default scrollUp;
