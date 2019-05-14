import { getSnapshot } from "mobx-state-tree";
import faker from "faker";
import UserStore from "models/User";
import _ from "lodash";

export function getUserPayload() {
    return {
        appeal: faker.random.uuid(),
        fullName: `${faker.name.firstName()} ${faker.name.lastName(0)}`,
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