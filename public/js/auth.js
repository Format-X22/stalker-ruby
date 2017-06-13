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

        this.signOut =       $('#sign-out');
        this.signOutMobile = $('#sign-out-mobile');

        this.click(  this.signTop,  this.signFromTop);
        this.actions(this.loginTop, this.validateLogin, this.signFromTop);
        this.actions(this.passTop,  this.validatePass,  this.signFromTop);

        this.click(  this.signModal,  this.signFromModal);
        this.actions(this.loginModal, this.validateLogin, this.signFromModal);
        this.actions(this.passModal,  this.validatePass,  this.signFromModal);

        this.click(  this.register,      this.registerFromModal);
        this.actions(this.loginRegister, this.validateLogin, this.registerFromModal);
        this.actions(this.passRegister,  this.validatePass,  this.registerFromModal);
        this.actions(this.mailRegister,  this.validateMail,  this.registerFromModal);

        this.click(this.signOut,       this.out);
        this.click(this.signOutMobile, this.out);
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
            point: 'sign',
            login: login.val(),
            pass:  pass.val()
        }, callback);
    }

    out() {
        this.authAction({
            point: 'out'
        }, () => {
            this.toMain();
        });
    }

    registerFromModal() {
        if (this.validateRegister()) {
            this.doRegister(this.loginRegister, this.passRegister, this.mailRegister, () => {
                this.registerWindow.modal('hide');
                this.toProfile();
            });
        }
    }

    doRegister(login, pass, mail, callback) {
        this.authAction({
            point: 'register',
            login: login.val(),
            pass:  pass.val(),
            mail:  mail.val()
        }, callback);
    }

    authAction(data, callback) {
        this.post(`/api/auth/${data.point}`, data, (response) => {
            this.onSuccessAuthAction(response, callback);
        });
    }

    onSuccessAuthAction(response, callback) {
        try {
            if (response.success) {
                callback.call(this);
            } else {
                this.showErrorModal(response.message);
            }
        } catch (error) {
            this.showErrorModal(error);
        }
    }

    validateSign() {
        return this.validateLogin(this.loginTop) &&
               this.validatePass(this.passTop);
    }

    validateSignModal() {
        return this.validateLogin(this.loginModal) &&
               this.validatePass(this.passModal);
    }

    validateRegister() {
        return this.validateLogin(this.loginRegister) &&
               this.validatePass(this.passRegister) &&
               this.validateMail(this.mailRegister);
    }

    validateLogin(field) {
        return this.validate(field, (value) => {
            return value.length >= 2 && value.length <= 100;
        });
    }

    validatePass(field) {
        return this.validate(field, (value) => {
            return value.length >= 8 && value.length <= 100;
        });
    }

    validateMail(field) {
        return this.validate(field, (value) => {
            return value.length >= 6 && value.length <= 100;
        });
    }
}

$(() => new Auth());