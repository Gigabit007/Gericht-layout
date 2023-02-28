//https://github.com/inorganik/CountUp.js

import { CountUp } from "countup.js";

window.addEventListener('load', () => {
    const counterItems = document.querySelectorAll('.counter__number');
    if(counterItems) {
        setTimeout(() => {
            counterItems.forEach((e) => {
                const countUp = new CountUp(e, 30);
                countUp.start()
            })
        }, 0)
    }
    
    
})
