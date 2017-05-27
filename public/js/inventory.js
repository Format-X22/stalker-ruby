class Inventory extends Base {
    constructor() {
        super();

        this.activeItems  = $('#inventory .row:not(#bag) .inventory');
        this.passiveItems = $('#bag .inventory');

        this.activeItemWindow    = $('#inventory-active-item-window');
        this.activeItemRemove    = $('#inventory-active-item-window-remove');
        this.passiveItemWindow   = $('#inventory-passive-item-window');
        this.passiveItemActivate = $('#inventory-passive-item-window-activate');

        this.click(this.activeItems, this.showActiveItemWindow);
        this.click(this.passiveItems, this.showPassiveItemWindow);

        this.click(this.activeItemRemove, this.tryRemoveItem);
        this.click(this.passiveItemActivate, this.tryActivateItem);
    }

    showActiveItemWindow(item, event) {
        const target = event.target;

        this.extractItemId(target);

        // TODO

        this.activeItemWindow.modal('show');
    }

    showPassiveItemWindow(item, event) {
        const target = event.target;

        this.extractItemId(target);

        // TODO

        this.passiveItemWindow.modal('show');
    }

    extractItemId(target) {
        this.itemId = $(target).attr('data-weapon');
    }

    tryRemoveItem() {
        // TODO

        console.log(this.itemId);
    }

    tryActivateItem() {
        // TODO

        console.log(this.itemId);
    }
}