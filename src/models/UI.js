import { types } from "mobx-state-tree";
import { LOG_IN, LOG_OUT, TOGGLE_DRAWER } from "actions/ui";

const UiStore = types
    .model({
        isLoggedIn: types.optional(types.boolean, false),
        drawer: types.optional(types.array(types.string), [
            "Home",
            "Management",
            "Partners",
            "Participants",
            "Tickets",
            "Statistics",
            "Deals",
        ]),
        isDrawerOpen: types.optional(types.boolean, false),
    })
    .actions(self => ({
        [LOG_IN]() {
            self.isLoggedIn = true;
        },

        [LOG_OUT]() {
            self.isLoggedIn = false;
        },

        [TOGGLE_DRAWER]() {
            self.isDrawerOpen = !self.isDrawerOpen;
        },
    }));

export default UiStore;
