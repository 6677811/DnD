export default class Storage {
    static openDB() {
        this.openRequest = indexedDB.open('DnD', 1);

        this.openRequest.onupgradeneeded = (event) => {
            this.db = event.target.result;
            this.figures = this.db.createObjectStore('figures', {
                autoIncrement: true,
            });
        };

        this.openRequest.onsuccess = (event) => {
            this.db = event.target.result;
        };

        this.openRequest.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };

        return this.openRequest;
    }

    static add(figures) {
        const req = this.openDB();

        req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(
                'figures',
                'readwrite',
            );
            const table = transaction.objectStore('figures');
            for (let i = 0; i < figures.length; i++) {
                const request = table.get(figures[i].id);
                request.onerror = (event) => {
                    const requestAdd = table.add(figures[i]);

                    requestAdd.onsuccess = () => {
                        console.log(requestAdd.result);
                        this.current = requestAdd.result;
                    };
                };
                request.onsuccess = (event) => {
                    const requestUpdate = table.put(figures[i], figures[i].id);

                    requestUpdate.onsuccess = () => {
                        console.log(requestUpdate.result);
                        this.current = requestUpdate.result;
                    };
                };
            }
        };

        req.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }

    // static update(figure) {
    //     const req = this.openDB();
    //
    //     req.onsuccess = (event) => {
    //         const db = event.target.result;
    //         const transaction = db.transaction(
    //             'figures',
    //             'readwrite',
    //         );
    //         const table = transaction.objectStore('figures');
    //         const request = table.put(figure, figure.id);
    //
    //         request.onsuccess = () => {
    //             this.current = request.result;
    //         };
    //     };
    //
    //     req.onerror = (event) => {
    //         console.log(`error opening database ${event.target.errorCode}`);
    //     };
    // }
}