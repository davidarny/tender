import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App";
import * as ServiceWorker from "./ServiceWorker";
import { connectReduxDevtools } from "mst-middlewares";
import { types } from "mobx-state-tree";
import UserStore from "models/User";
import PartnerStore from "models/Partner";
import UiStore from "models/UI";
import { setStoreContext } from "context";
import DealStore from "models/Deal";
import ParticipantStore from "models/Participant";
import LoyaltyStore from "models/Loyalty";

const model = types.model({
    user: UserStore,
    ui: UiStore,
    partner: PartnerStore,
    participant: ParticipantStore,
    deal: DealStore,
    loyalty: LoyaltyStore,
});

const store = model.create({
    user: {},
    ui: {
        isLoggedIn: process.env.NODE_ENV === "development",
    },
    partner: {},
    participant: {},
    deal: {},
    loyalty: {},
});

const StoreContext = React.createContext(store);
setStoreContext(StoreContext);

if (process.env.NODE_ENV === "development") {
    connectReduxDevtools(require("remotedev"), store);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
