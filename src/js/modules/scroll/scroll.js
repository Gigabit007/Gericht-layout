//https://michalsnik.github.io/aos/
import Aos from "aos";

//https://kimyvgy.github.io/simple-scrollspy/
import scrollSpy from 'simple-scrollspy';
//Styles
// import 'aos/dist/aos.css;'

//https://github.com/tsuyoshiwada/sweet-scroll
import SweetScroll from 'sweet-scroll';

window.addEventListener('load', () => {
	Aos.init()
})

const scroll = new SweetScroll()

export function fixedHead () {
    const header = document.querySelector('header.header');
    const headerPoint = document.querySelector('[data-head-point]') ? document.querySelector('[data-head-point]').offsetHeight : window.innerHeight / 2;

    document.addEventListener('scroll', function() {
		let scrollPos = window.pageYOffset;
        if(scrollPos >= headerPoint) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')	
        }
    })
}
export function bgParallax() {
	addWindowScrollEvent = true;
	const bgItems = document.querySelectorAll('[data-bg]');
	if (bgItems.length) {
		document.addEventListener("scroll", function (e) {
			bgItems.forEach(bgItem => {
				//let size = bgItem.dataset.bg ? Number(bgItem.dataset.bg) : 30;
				let bgItemPosition = bgItem.getBoundingClientRect().top + scrollY;
				let bgItemHeight = bgItem.offsetHeight;
				let bgItemBg = bgItem.querySelector('.bg-item');
				let bgItemScrollPrc = Math.abs((bgItem.getBoundingClientRect().top - window.innerHeight) / (bgItemHeight + window.innerHeight) * 100);
				let bgItemPositionValue = (bgItemHeight / 100 * 30) / 100 * bgItemScrollPrc;
				if (bgItemBg) {
					if (scrollY > bgItemPosition - window.innerHeight && scrollY < bgItemPosition + bgItemHeight) {
						bgItemBg.style.cssText = `transform: translate3D(0,${bgItemPositionValue}px,0);`;
					}
				}
			});
		});
	}
}



