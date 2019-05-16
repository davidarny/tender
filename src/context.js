export const BASE_PATH = process.env.NODE_ENV === "development" ? "" : "/tender";

let StoreContext = null;

export function setStoreContext(CTX) {
    StoreContext = CTX;
}

export { StoreContext };
