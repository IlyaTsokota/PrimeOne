import { postData } from '../services/services';
import { openModal, closeModal } from './modal';

function sendMail(formSelector, spinnerSelector) {
	const form = document.querySelector(formSelector),
		spinner = document.querySelector(spinnerSelector);

	function sendMessage(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			startLoading();
			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			postData("mailer/sendmail.php", json)
				.then((data) => {
					endLoading();
					setTimeout(() => {
						openModal('.modal', '.modal__title', data.result);
					}, 300);
				})
				.catch((data) => {
					openModal('.modal', '.modal__title', data.result);
				})
				.finally(() => {
					form.reset();
					setTimeout(() => {
						closeModal('.modal');
					}, 5000);
				});
		});
	}
	function startLoading() {
		spinner.classList.add('loading--active');
	}
	function endLoading() {
		spinner.classList.remove('loading--active');
	}

	sendMessage(form);
}



export default sendMail;