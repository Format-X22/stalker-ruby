class ProfileInfo extends Base {
    constructor() {
        super();

        [
            'stamina',
            'real',
            'rad',
            'anomal',
            'hide',
            'war',
            'detect'
        ].forEach((name) => {
            const bar  = $(`#chara-${name}`);
            const hint = $(`#chara-${name}-window`);

            this.click(bar, () => hint.modal('show'));
        });
    }
}

$(() => new ProfileInfo());