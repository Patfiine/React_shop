const ClientAPI = {
    clients: [
        { id: 1, name: "Ben", surname: "Blocker", phone: "+123(45)1234567" },
        { id: 2, name: "Alice", surname: "Smith", phone: "+123(45)2345678" },
        { id: 3, name: "John", surname: "Doe", phone: "+123(45)3456789" },
        { id: 4, name: "Jane", surname: "Roe", phone: "+123(45)4567890" },
        { id: 5, name: "Michael", surname: "Johnson", phone: "+123(45)5678901" },
        { id: 6, name: "Emily", surname: "Davis", phone: "+123(45)6789012" },
        { id: 7, name: "David", surname: "Wilson", phone: "+123(45)7890123" },
        { id: 8, name: "Emma", surname: "Brown", phone: "+123(45)8901234" }
    ],
    all: function () {
        return this.clients;
    },
    get: function (id) {
        const isClient = (p) => p.id === id;
        return this.clients.find(isClient);
    },
    delete: function (id) {
        const isNotDelClient = (p) => p.id !== id;
        this.clients = this.clients.filter(isNotDelClient);
        return true;
    },
    add: function (client) {
        if (!client.id)
            client = {
                ...client,
                id:
                    this.clients.reduce((prev, current) => {
                        return prev.id > current.id ? prev : current;
                    }, 0).id + 1,
            };
        this.clients = [...this.clients, client];
        return client;
    },
    update: function (client) {
        this.get();
        this.clients.shift(client);
        return client;
    },
};
export default ClientAPI;