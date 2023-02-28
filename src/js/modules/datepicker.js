//https://mymth.github.io/vanillajs-datepicker

import { Datepicker } from 'vanillajs-datepicker';

const elem = document.querySelector('#input-date');
if(elem) {
  const datepicker = new Datepicker(elem, {
    orientation: 'bottom auto',
  });
}
