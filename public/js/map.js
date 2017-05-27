class Map extends Base {
    constructor() {
        super();

        this.mapTabBarButton = $('#map-tab-bar-button');
        this.profileMap = $('#profile-map');
        this.mapZones = $('.map-zone');

        this.closedZoneWindow = $('#map-closed-zone-window');
        this.alreadyZoneWindow = $('#map-already-window');
        this.goToZoneWindow = $('#map-go-window');
        this.goToZoneWindowOk = $('#map-go-window-ok');

        this.click(this.mapTabBarButton, () => {
            setTimeout(() => this.renderZones(), 100);
        });

        this.click(this.mapZones, this.showGoDialog);
    }

    renderZones() {
        const cell = this.profileMap.width() / 15;

        this.mapZones.each((index, item) => {
            const itemJq = $(item);
            const moveData = itemJq.attr('data-move');
            let [x, y] = [0, 0];

            if (moveData) {
                [x, y] = moveData.split(', ');

                x = +x;
                y = +y;
            }

            itemJq
                .css('width', `${cell}px`)
                .css('height', `${cell}px`)
                .css('margin-top', `-${cell}px`)
                .css('margin-left', `-${cell}px`)
                .css('border-radius', `${cell / 2}px`)
                .css('transform', `translate(calc(${cell}px + ${x}%), calc(${cell}px + ${y}%))`)
                .removeClass('hidden');
        });
    }

    showGoDialog(field, event) {
        const target = event.target;
        const id = target.id.split('-')[1];
        const cls = target.className;

        if (cls && ~cls.indexOf('closed')) {
            this.closedZoneWindow.modal('show');
        } else if (cls && ~cls.indexOf('current')) {
            this.alreadyZoneWindow.modal('show');
        } else {
            this.currentId = id;
            this.goToZoneWindowOk.one('click', this.tryGoToZone.bind(this));
            this.goToZoneWindow.modal('show');
        }
    }

    tryGoToZone() {
        console.log(this.currentId);  // TODO
    }
}

$(() => new Map());