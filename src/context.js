export const BASE_PATH = "";

let StoreContext = null;

export function setStoreContext(ctx) {
    StoreContext = ctx;
}

export { StoreContext };
