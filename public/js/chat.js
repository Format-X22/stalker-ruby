class Chat extends Base {
    constructor() {
        super();

        this.pcChat = $('#pc-chat');
        this.pcChatEl = this.pcChat[0];
        this.mobileChat = $('#mobile-chat');
        this.mobileChatEl = this.mobileChat[0];

        this.last = 0;
        this.syncMessages();

        setInterval(this.syncMessages.bind(this), 2000);
    }

    syncMessages() {
        this.post('/api/chat/list', {last: this.last}, (data) => {
            if (!data.length) {
                return;
            }

            const needPcScroll = this.needScroll(this.pcChat, this.pcChatEl);
            const needMobileScroll = this.needScroll(this.mobileChat, this.mobileChatEl);

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
                const dateFormatShort = `${dateItems[0]}:${dateItems[1]}:${dateItems[2]}`;
                const dateFormat = `${dateFormatShort} ${dateItems[3]}.${dateItems[4]}`;
                const template = `
                    <div class="well">
                        <b>${message.login}</b>
                        <p>${message.text}</p>
                    </div>
                `;


                this.pcChat.append(`
                    <span class="label label-default pull-right">${dateFormat}</span>
                    ${template}
                `);

                this.mobileChat.append(`
                    <span class="label label-default pull-right">${dateFormatShort}</span>
                    ${template}
                `);
            });

            if (needPcScroll) {
                this.scrollToBottom(this.pcChat, this.pcChatEl);
            }

            if (needMobileScroll) {
                this.scrollToBottom(this.mobileChat, this.mobileChatEl);
            }
        }, null, null, false);
    }

    needScroll(target, targetEl) {
        let scrollTop = targetEl.scrollTop;
        let innerHeight = target.innerHeight();
        let scrollHeight = targetEl.scrollHeight;

        return (scrollHeight - (scrollTop + innerHeight)) < 100;
    }

    scrollToBottom(target, targetEl) {
        targetEl.scrollTo(0, targetEl.scrollHeight - target.innerHeight());
    }
}

$(() => new Chat());