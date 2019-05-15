import { types } from "mobx-state-tree";
import { LOG_IN, LOG_OUT } from "actions/ui";

const UiStore = types
    .model({
        isLoggedIn: types.optional(types.boolean, false),
    })
    .actions(self => ({
        [LOG_IN]() {
            self.isLoggedIn = true;
        },

        [LOG_OUT]() {
            self.isLoggedIn = false;
        },
    }));

export default UiStore;
