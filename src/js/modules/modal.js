import { enableScroll, disableScroll } from './scrollSwitcher';

function openModal(modalSelector, titleSelector, message) {
	const modal = document.querySelector(modalSelector),
		modalTitle = modal.querySelector(titleSelector);
	modalTitle.textContent = message;
	modal.classList.add('modal--active');
	disableScroll();
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('modal--active');
	enableScroll();
}

function closeModalListener(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal(modalSelector);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("modal--active")) {
			closeModal(modalSelector);
		}
	});

}

export { openModal };
export { closeModal };
export { closeModalListener };