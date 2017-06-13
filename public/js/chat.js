class Chat extends Base {
    constructor() {
        super();

        this.pcChat = $('#pc-chat');
        this.mobileChat = null;

        this.last = 0;
        this.syncMessages();

        setInterval(this.syncMessages.bind(this), 1500);
    }

    syncMessages() {
        this.post('/api/chat/list', {last: this.last}, (data) => {
            if (!data.length) {
                return;
            }

            this.last = data[data.length - 1].id || this.last;

            data.forEach((message) => {
                const date = new Date(message.date);
                const dateItems = [
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getDate(),
                    date.getMonth() + 1
                ].map((item) => {
                    if (item < 10) {
                        item = '0' + item;
                    }
                    
                    return item.toString();
                });
                const dateFormat = `${dateItems[0]}:${dateItems[1]}:${dateItems[2]} ${dateItems[3]}.${dateItems[4]}`;

                this.pcChat.append(`
                    <span class="label label-default pull-right">${dateFormat}</span>
                    <div class="well">
                        <b>${message.login}</b>
                        <p>${message.text}</p>
                    </div>
                `);

                this.mobileChat // TODO
            });
        }, null, null, false);
    }
}

$(() => new Chat());