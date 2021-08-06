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
            const clearReq = table.clear();

            clearReq.onsuccess = () => {
                for (let i = 0; i < figures.length; i++) {
                    const request = table.get(figures[i].id);
                    request.onerror = (event) => {
                        const requestAdd = table.add(figures[i]);

                        requestAdd.onsuccess = () => {
                            this.current = requestAdd.result;
                        };
                    };
                    request.onsuccess = (event) => {
                        const requestUpdate = table.put(figures[i], figures[i].id);

                        requestUpdate.onsuccess = () => {
                            this.current = requestUpdate.result;
                        };
                    };
                }
            };
        };

        req.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }

    static async load(setFigures) {
        const req = this.openDB();

        req.onsuccess = async (event) => {
            const db = event.target.result;
            const transaction = db.transaction('figures', 'readonly');
            const allFigures = transaction.objectStore('figures');

            const request = await allFigures.getAll();
            request.onsuccess = () => {
                if (request.result !== undefined) {
                    setFigures(request.result);
                    return request.result;
                }
            };
        };

        req.onerror = ({ target }) => {
            console.log(`error opening database ${target.errorCode}`);
        };
    }
}