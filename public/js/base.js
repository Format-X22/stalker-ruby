class Base {
    constructor() {
        this.loader     = $('#loader');
        this.errorModal = $('#error_modal');
        this.errorBody  = $('#error_body');
    }

    toMain() {
        window.location.href = '/'
    }

    toProfile() {
        window.location.href = '/profile'
    }

    actions(field, onChange, onEnter) {
        field.on('change', () => {
            onChange.call(this, field);
        });

        field.on('keypress', (event) => {
            if (event.which === 13) {
                onEnter.call(this, field);
            }
        });
    }

    click(field, callback) {
        field.on('click', () => {
            callback.call(this, field);
        })
    }

    validate(field, cond) {
        const value = field.val();
        const wrap = field.parent('.form-group');
        const feedback = wrap.children('.form-control-feedback');

        if (cond(value)) {
            feedback.addClass('hidden');
            wrap.removeClass('has-error');
            wrap.removeClass('has-feedback');
            return true;
        } else {
            wrap.addClass('has-error');
            wrap.addClass('has-feedback');
            feedback.removeClass('hidden');
            return false;
        }
    }

    showPreloader() {
        this.loader.removeClass('hidden');
    }

    hidePreloader() {
        this.loader.addClass('hidden');
    }

    showErrorModal(text='Неизвестная ошибка...') {
        this.errorBody.html(text);
        this.errorModal.modal('show');
    }
}