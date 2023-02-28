// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}

// Вспомогательные модули блокировки прокрутки и скочка 
let body = document.querySelector("body");
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (body.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Модуь работы с меню (бургер)
const navToggle = document.querySelector(".header__menu");
export function menuInit() {
	const iconMenu = document.querySelector("#burger");
	
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			e.preventDefault()
			if (bodyLockStatus) {
				bodyLockToggle();
				iconMenu.classList.toggle('active')
				navToggle.classList.toggle("header__menu-open");
			}
		});
	};
}
export function menuOpen() {
	bodyLock();
	navToggle.classList.add("header__menu-open");
}
export function menuClose() {
	bodyUnlock();
	navToggle.classList.remove("header__menu-open");
} 

