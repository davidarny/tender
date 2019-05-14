import { types } from "mobx-state-tree";
import shortid from "shortid";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "actions/user";

const User = types.model({
    id: types.string,
    appeal: types.string,
    fullName: types.string,
    birthDate: types.Date,
    preferredCommunicationMethod: types.union(types.literal("email"), types.literal("phone")),
    idDocument: types.model({
        documentType: types.string,
        documentId: types.string,
    }),
    consentToCommunication: types.boolean,
});

const UserStore = types
    .model({
        current: types.maybe(User),
    })
    .actions(self => ({
        [SET_CURRENT_USER](user) {
            self.current = { id: shortid(), ...user };
        },

        [REMOVE_CURRENT_USER]() {
            self.current = undefined;
        },
    }));

export default UserStore;
