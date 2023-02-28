// https://just-validate.dev/docs/intro

import JustValidate from 'just-validate';
import JustValidatePluginDate from 'just-validate-plugin-date'

const reservationForm = document.querySelector('#reservation');
const footerForm = document.querySelector('.footer-form');
const contactForm = document.querySelector('#contact-form');
const postForm = document.querySelector('#post-form');

if(reservationForm) {
    const reservation = new JustValidate('#reservation');


    reservation
    .addField('#select-person', [
        {
            rule: 'required',
        },
    ])
    .addField('#input-date', [
        {
            rule: 'required',
        },
        {
            plugin: JustValidatePluginDate(() => ({
              format: 'dd/MM/yyyy',
            })),
            errorMessage: 'Date should be in dd/MM/yyyy format (e.g. 20/12/2021)',
        },
    ])
    .addField('#select-time', [
        {
            rule: 'required',
        },
    ])
    .onSuccess((event) => {
        alert('ok')
        event.target.reset()
    })
}

if(footerForm) {
    const footer = new JustValidate('.footer-form');

    footer.addField('#footer-input', [
        {
            rule: 'required',
        },
        {
            rule: 'email',
        },
    ])
    .onSuccess((event) => {
        alert('ok')
        event.target.reset()
    })
}

if(contactForm) {
    const contact = new JustValidate('#contact-form', )

    contact
    .addField('#contact-name', [
        {
            rule: 'required',
        },
        {
            rule: 'minLength',
            value: 3,
        },
        {
            rule: 'maxLength',
            value: 15,
        },
    ])
    .addField('#contact-email', [
        {
            rule: 'required',
        },
        {
            rule: 'email',
        },
    ])
    .addField('#contact-message', [
        {
            rule: 'required',
        },
        {
            rule: 'minLength',
            value: 15,
        },
        
    ])
    .onSuccess((event) => {
        alert('ok')
        event.target.reset()
    })
}

if(postForm) {
    const post = new JustValidate('#post-form')

    post
    .addField('#post-text', [
        {
            rule: 'required',
        },
        {
            rule: 'minLength',
            value: 10,
        },     
         
    ],
    {
        errorsContainer: document.querySelector('#text-errors'),
    } 
    )
    .addField('#post-name', [
        {
            rule: 'required',
        },
        {
            rule: 'minLength',
            value: 3,
        },
    ],
    {
        errorsContainer: document.querySelector('#name-errors'),
    }
    )
    .addField('#post-surname', [
        {
            rule: 'required',
        },
        {
            rule: 'minLength',
            value: 3,
        },        
    ],
    {
        errorsContainer: document.querySelector('#surname-errors'),
    })
    .addField('#post-checkbox', [
        {
            rule: 'required',
        },
        
    ],
    {
        errorsContainer: document.querySelector('#checkbox-errors'),
    }
    )
    .onSuccess((event) => {
        alert('ok')
        event.target.reset()
    })
}


