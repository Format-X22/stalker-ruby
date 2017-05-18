$(() => {
    let loginTop           = $('#login-top');
    let passTop            = $('#pass-top');
    let chatInput          = $('#chat-input');
    let loginRegisterModal = $('#login-register-modal');
    let passRegisterModal  = $('#pass-register-modal');
    let mailRegisterModal  = $('#mail-register-modal');
    let loginSignInModal   = $('#login-sign-in-modal');
    let passSignInModal    = $('#pass-sign-in-modal');
    
    $('#sign-in-top').click(signInFromTop);

    function signInFromTop () {
        const login = loginTop;
        const pass = passTop;

        if (!validateLogin(login) || !validatePass(pass)) {
            return;
        }

        signIn(login, pass, () => {
            toProfile();
        });
    }

    callOnEnterKey(loginTop, signInFromTop);
    callOnEnterKey(passTop, signInFromTop);
    
    loginTop.change(function () {
        validateLogin($(this));
    });
    passTop.change(function () {
        validatePass($(this));
    });

    $('#chat-send').click(sendChatMessageFromForm);

    function sendChatMessageFromForm () {
        const text = chatInput;

        if (!validateChatText(text)) {
            return;
        }

        sendChatMessage(text, () => {
            // TODO RENDER SINGLE MESSAGE
        });
    }

    callOnEnterKey(chatInput, sendChatMessageFromForm);
    
    chatInput.change(function () {
        validateChatText($(this));
    });

    $('#register-send-modal').click(registerFromModal);

    function registerFromModal () {
        const login = loginRegisterModal;
        const pass = passRegisterModal;
        const mail = mailRegisterModal;

        if (!validateLogin(login) || !validatePass(pass) || !validateMail(pass)) {
            return;
        }

        register(login, pass, mail, () => {
            $('#register-modal').modal('hide');
            toProfile();
        });
    }

    callOnEnterKey(loginRegisterModal, registerFromModal);
    callOnEnterKey(passRegisterModal, registerFromModal);
    callOnEnterKey(mailRegisterModal, registerFromModal);

    loginRegisterModal.change(function () {
        validateLogin($(this));
    });
    passRegisterModal.change(function () {
        validatePass($(this));
    });
    mailRegisterModal.change(function () {
        validateMail($(this));
    });

    $('#sign-in-send-modal').click(signInFromModal);

    function signInFromModal () {
        const login = loginSignInModal;
        const pass = passSignInModal;

        if (!validateLogin(login) || !validatePass(pass)) {
            return;
        }

        signIn(login, pass, () => {
            $('#sign-in-modal').modal('hide');
            toProfile();
        });
    }

    callOnEnterKey(loginSignInModal, signInFromModal);
    callOnEnterKey(passSignInModal, signInFromModal);

    loginSignInModal.change(function () {
        validateLogin($(this));
    });
    passSignInModal.change(function () {
        validatePass($(this));
    });

    function validateLogin(field) {
        return validateField(field, (val) => {
            return val.length > 2 && val.length < 100;
        });
    }

    function validatePass(field) {
        return validateField(field, (val) => {
            return val.length >= 8 && val.length < 100;
        });
    }

    function validateMail(field) {
        return validateField(field, (val) => {
            return val.length >= 6 && val.length < 100;
        });
    }

    function validateChatText(field) {
        return validateField(field, (val) => {
            return val.length > 0 && val.length < 3000;
        });
    }

    function validateField(field, cond) {
        const val = field.val();

        if (cond(val)) {
            field.parent('.form-group').children('.form-control-feedback').addClass('hidden');
            field.parent('.form-group').removeClass('has-error');
            field.parent('.form-group').removeClass('has-feedback');
            return true;
        } else {
            field.parent('.form-group').addClass('has-error');
            field.parent('.form-group').addClass('has-feedback');
            field.parent('.form-group').children('.form-control-feedback').removeClass('hidden');
            return false;
        }
    }

    function signIn(login, pass, callback) {
        showPreloader();

        $.post('/api/sign-in', {
            login: login.val(),
            pass: pass.val()
        })
            .done((result) => {
                if (result.success === false) {
                    showErrorModal(result.message);
                } else {
                    callback();
                }
            })
            .fail((error) => {
                showErrorModal(error.message);
            })
            .always(() => {
                hidePreloader();
            });
    }

    function register(login, pass, mail, callback) {
        showPreloader();

        $.post('/api/register', {
            login: login.val(),
            pass: pass.val(),
            mail: mail.val()
        })
            .done((result) => {
                if (result.success === false) {
                    showErrorModal(result.message);
                } else {
                    callback();
                }
            })
            .fail((error) => {
                showErrorModal(error.message);
            })
            .always(() => {
                hidePreloader();
            });
    }

    function sendChatMessage(text, callback) {
        showPreloader();

        $.post('/api/chat', {
            text: text.val()
        })
            .done((result) => {
                if (result.success === false) {
                    showErrorModal(result.message);
                } else {
                    callback();
                }
            })
            .fail((error) => {
                showErrorModal(error.message);
            })
            .always(() => {
                hidePreloader();
            });
    }

    function getChatMessages(callback) {
        showPreloader();

        $.get('/api/chat')
            .done((result) => {
                if (result.success === false) {
                    showErrorModal(result.message);
                } else {
                    callback();
                }
            })
            .fail((error) => {
                showErrorModal(error.message);
            })
            .always(() => {
                hidePreloader();
            });
    }

    function showPreloader() {
        $('#preloader').removeClass('hidden');
    }

    function hidePreloader() {
        $('#preloader').addClass('hidden');
    }

    function showErrorModal(text) {
        $('#error-modal-body').html(text || 'Неизвестная ошибка...');
        $('#error-modal').modal('show');
    }

    function callOnEnterKey(input, callback) {
        input.keypress((event) => {
            if (event.which === 13) {
                callback();
            }
        })
    }

    function toProfile() {
        location.href = '/profile'
    }
});

$(() => {
    $('#map-tab-bar-button').click(() => {
        setTimeout(() => {
            let indicator = $('.map').width() / 15;

            console.log(indicator);

            $('.map-zone').each((index, item) => {
                let itemJq = $(item);
                let moveData = itemJq.attr('data-move');
                let moveArr = [0, 0];

                if (moveData) {
                    [moveArr[0], moveArr[1]] = moveData.split(', ');

                    moveArr[0] = +moveArr[0];
                    moveArr[1] = +moveArr[1];
                }

                itemJq
                    .css('width', `${indicator}px`)
                    .css('height', `${indicator}px`)
                    .css('margin-top', `-${indicator}px`)
                    .css('margin-left', `-${indicator}px`)
                    .css('border-radius', `${indicator / 2}px`)
                    .css('transform',
                        `translate(calc(${indicator}px + ${moveArr[0]}%), calc(${indicator}px + ${moveArr[1]}%))`
                    )
                    .removeClass('hidden');
            });
        }, 100);
    });
});