// https://github.com/oncode/handorgel

import handorgel from 'handorgel';
const acordionItem = document.querySelector('.faq__questions');
if(acordionItem) {
    let acordion = new handorgel(acordionItem, {
        multiSelectable: false,
        collapsible: false,
    });
}

