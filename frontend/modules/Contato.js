const validator = require('validator');

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) {
            return;
        }
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const nomeInputContato = el.querySelector('input[name="nome"]');
        const sobrenomeInputContato = el.querySelector('input[name="sobrenome"]');
        const emailInputContato = el.querySelector('input[name="email"]');
        const telefoneInputContato = el.querySelector('input[name="telefone"]');

        let error = false;

        let p = document.createElement('p');


        if(emailInputContato.value && !validator.isEmail(emailInputContato.value)){
            alert('E-mail inválido.');
            error = true;
        }

        if(!nomeInputContato.value && !sobrenomeInputContato.value) {
            alert('Nome ou sobrenome é um campo obrigatório.');
            error = true;
        }

        if(!emailInputContato.value && !telefoneInputContato.value) {
            alert('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
            error = true;
        }

        if(!error) {
            el.submit();
        }
    }
}