import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App";
import * as ServiceWorker from "./ServiceWorker";
import { connectReduxDevtools } from "mst-middlewares";
import { types } from "mobx-state-tree";
import UserStore from "./models/User";

const model = types.model({
    user: UserStore,
});
const store = model.create({
    user: {
        current: undefined,
    },
});

if (process.env.NODE_ENV === "development") {
    connectReduxDevtools(require("remotedev"), store);
}

export const StoreContext = React.createContext(store);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
