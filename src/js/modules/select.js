//https://github.com/bluzky/nice-select2

import NiceSelect from "nice-select2/dist/js/nice-select2.js";

const select = document.querySelectorAll('.reservation__select_item');
select.forEach((el) => {
    NiceSelect.bind(el)
})
