import { getSnapshot } from "mobx-state-tree";
import shortid from "shortid";
import UserStore from "models/User";
import omit from "lodash/omit";
import UiStore from "models/UI";

export function getUserPayload() {
    return {
        appeal: shortid(),
        email: "john.doe@mail.com",
        phone: "+12345678910",
        password: shortid(),
        fullName: "John Doe",
        birthDate: new Date(),
        preferredCommunicationMethod: "email",
        idDocument: {
            documentType: "passport",
            documentId: shortid(),
        },
        consentToCommunication: true,
    };
}

export function getUserStoreSnapshot(state, action) {
    const store = UserStore.create({ current: state });
    if (action.type) {
        store[action.type](omit(action, "type"));
    }
    return getSnapshot(store);
}

export function getUiStoreSnapshot(state, action) {
    const store = UiStore.create(state);
    if (action.type) {
        store[action.type](omit(action, "type"));
    }
    return getSnapshot(store);
}
