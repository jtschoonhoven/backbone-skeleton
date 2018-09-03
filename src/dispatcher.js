class Dispatcher {
    constructor() {
        this.stores = [];
    }

    register(store) {
        /*
         * Subscribe the given store to this dispatcher's event channel.
         */
        this.stores.push(store);
        return this;
    }

    unregister(store) {
        /*
         * Unsubscribe the given store from this dispatcher's event channel.
         */
        const storeIndex = this.stores.indexOf(store);
        if (storeIndex > -1) {
            this.stores.splice(storeIndex, 1);
        }
        return this;
    }

    dispatch(eventType, data, callback) {
        /*
         * Dispatch an event with data payload to all stores.
         * Callback is called when all stores have finished updating.
         */
        // track which stores have not yet finished updating in a set
        const storesPendingUpdate = new Set(this.stores);

        // send event to each store
        this.stores.forEach((store) => {
            store.reduce(eventType, data, () => {
                storesPendingUpdate.delete(store);
                // callback only after all stores have finished updating
                if (storesPendingUpdate.size === 0 && callback) {
                    callback();
                }
            });
        });
    }
}

const dispatcher = new Dispatcher();


export default dispatcher;
