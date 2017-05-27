class ProfileInit extends Base {
    constructor() {
        super();

        this.inventoryStateBars   = $('.inventory-state-bar');
        this.inventoryStateWindow = $('#inventory-state-bar-window');

        this.click(this.inventoryStateBars, this.showInventoryStateWindow);
    }

    showInventoryStateWindow() {
        this.inventoryStateWindow.modal('show');
    }
}

$(() => new ProfileInit());