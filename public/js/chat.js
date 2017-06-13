class Chat extends Base {
    constructor() {
        super();

        this.loadMessages();
    }

    loadMessages(last) {
        this.post('/api/chat/list', {last}, (response) => {
            console.log(response);
        });
    }
}

$(() => new Chat());