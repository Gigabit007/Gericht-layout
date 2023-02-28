// https://swiperjs.com/swiper-api

import Swiper, { Pagination, EffectFade, Autoplay, FreeMode, } from "swiper";

// import 'swiper/scss'

if(document.querySelector('.main__slider')) {
    const mainSlider = new Swiper('.main__slider', {
        modules: [Pagination, EffectFade, Autoplay],
        pagination: {
            el: '.main__slider-bullets',
            type: "bullets",
            clickable: true,
        }, 
        lazy: true,
        observer: true,
        autoplay: {
            delay: 5000,
        }, 
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        }, 
        autoHeight: true,
        slidesPerView: 1,
        speed: 1000,
        on: {
            init: function(){
                let bullets = document.querySelectorAll('.main__slider-bullets .swiper-pagination-bullet')
                let num;
                bullets.forEach((el, index) => {
                    let num = null;
                    if (index < 10) {
                        num = `0`;
                    }
                    el.innerHTML = `${num}${index + 1}`;
                });
            }
        }
        
    })
}

if(document.querySelector('.shefs__slider')) {
    const shefsSlider = new Swiper('.shefs__slider', {
        modules: [EffectFade, Autoplay],
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        lazy: true,
        observer: true,
        slidesPerView: 1,
        speed: 1000,
        autoplay: {
            delay: 5000,
        }, 
        loop: true,
    });
}


if(document.querySelector('.gallery__slider')) {
    const gallerySlider = new Swiper('.gallery__slider', {
        modules: [Autoplay, FreeMode],
        autoplay: {
            delay: 3000,
        },
        lazy: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        autoHeight: false,
        speed: 1000,
        updateOnWindowResize: true,
        loop: true,
        slidesOffsetAfter: document.querySelector('.gallery__slider').offsetWidth 
        
       
        
    })
    function gallerySliderFix() {
       
        const galleryContainer = document.querySelector('.gallery__content');
        const diff = (window.innerWidth - galleryContainer.offsetWidth) / 2;
        if (diff > 0) {
            document.querySelector('.gallery-content__slider').style.width = document.querySelector('.gallery-content__slider').offsetWidth + diff  + 15 + 'px';
        } else {
            document.querySelector('.gallery-content__slider').style.width = document.querySelector('.gallery-content__slider').offsetWidth  + 15 + 'px';
        }
        gallerySlider.update();
        
        
    }
    
    window.addEventListener("resize", gallerySliderFix);
    gallerySliderFix();
    gallerySlider.update();
}

if(document.querySelector('.hero-bar__slider')) {
    const barSlider = new Swiper('.hero-bar__slider', {
        modules: [Autoplay, EffectFade, Pagination],
        pagination: {
            el: '.hero-bar__pagination',
            clickable: true,
        },
        spaceBetween: 50,
        autoplay: {
            delay: 3000,
        },
        lazy: true,
        direction: 'vertical',
        on: {
            init: function(){
                let bullets = document.querySelectorAll('.hero-bar__pagination .swiper-pagination-bullet')
                let num;
                bullets.forEach((el, index) => {
                    let num = null;
                    if (index < 10) {
                        num = `0`;
                    }
                    el.innerHTML = `${num}${index + 1}`;
                });
            }
        }
    
    })
}



