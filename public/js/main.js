$(() => {
    new Auth();

    if (~location.href.indexOf('/profile')) {
        new Map();
    }
});

