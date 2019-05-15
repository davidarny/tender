import { getSnapshot } from "mobx-state-tree";
import faker from "faker";
import UserStore from "models/User";
import _ from "lodash";
import UiStore from "models/UI";

export function getUserPayload() {
    return {
        appeal: faker.random.uuid(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        birthDate: faker.date.past(),
        preferredCommunicationMethod: "email",
        idDocument: {
            documentType: "passport",
            documentId: faker.random.uuid(),
        },
        consentToCommunication: true,
    };
}

export function getUserStoreSnapshot(state, action) {
    const store = UserStore.create({ current: state });
    if (action.type) {
        store[action.type](_.omit(action, "type"));
    }
    return getSnapshot(store);
}

export function getUiStoreSnapshot(state, action) {
    const store = UiStore.create(state);
    if (action.type) {
        store[action.type](_.omit(action, "type"));
    }
    return getSnapshot(store);
}
