class Auth extends Base {
    constructor() {
        super();

        this.loginTop = $('#login-top');
        this.passTop  = $('#pass-top');
        this.signTop  = $('#sign-top');

        this.loginModal = $('#login-modal');
        this.passModal  = $('#pass-modal');
        this.signModal  = $('#sign-modal');
        this.signWindow = $('#sign-window');

        this.loginRegister  = $('#login-register');
        this.passRegister   = $('#pass-register');
        this.mailRegister   = $('#mail-register');
        this.register       = $('#register');
        this.registerWindow = $('#register-window');

        this.click(  this.signTop,  this.signFromTop);
        this.actions(this.loginTop, this.validateLogin, this.signFromTop);
        this.actions(this.passTop,  this.validatePass,  this.signFromTop);

        this.click(  this.signModal,  this.signFromModal);
        this.actions(this.loginModal, this.validateLogin, this.signFromModal);
        this.actions(this.passModal,  this.validatePass,  this.signFromModal);

        this.click(  this.register,      this.doRegister);
        this.actions(this.loginRegister, this.validateLogin, this.doRegister);
        this.actions(this.passRegister,  this.validatePass,  this.doRegister);
        this.actions(this.mailRegister,  this.validateMail,  this.doRegister);
    }

    signFromTop() {
        if (this.validateSign()) {
            this.sign(this.loginTop, this.passTop, () => {
                this.toProfile();
            });
        }
    }

    signFromModal() {
        if (this.validateSignModal) {
            this.sign(this.loginModal, this.passModal, () => {
                this.signWindow.modal('hide');
                this.toProfile();
            });
        }
    }

    sign(login, pass, callback) {
        this.authAction({
            login: login.val(),
            pass:  pass.val()
        }, callback)
    }

    doRegister(login, pass, mail, callback) {
        this.authAction({
            login: login.val(),
            pass:  pass.val(),
            mail:  mail.val()
        }, callback)
    }

    authAction(data, callback) {
        this.showPreloader();

        $.post('/api/register', data)
            .done(
                (response) => {
                    try {
                        const result = response.json;

                        if (result.success) {
                            callback.call(this);
                        } else {
                            this.showErrorModal(result.message);
                        }
                    } catch (error) {
                        this.showErrorModal(error);
                    }
                }
            )
            .fail(
                (response) => this.showErrorModal(response.message)
            )
            .always(
                () => this.hidePreloader()
            );
    }

    validateSign() {
        this.validateLogin(this.loginTop) &&
        this.validatePass(this.passTop);
    }

    validateSignModal() {
        this.validateLogin(this.loginModal) &&
        this.validatePass(this.passModal);
    }

    validateRegister() {
        this.validateLogin(this.loginRegister) &&
        this.validatePass(this.passRegister) &&
        this.validateMail(this.mailRegister);
    }

    validateLogin(field) {
        this.validate(field, (value) => {
            return value.length >= 2 && value.length <= 100;
        });
    }

    validatePass(field) {
        this.validate(field, (value) => {
            return value.length >= 8 && value.length <= 100;
        });
    }

    validateMail(field) {
        this.validate(field, (value) => {
            return value.length >= 6 && value.length <= 100;
        });
    }
}