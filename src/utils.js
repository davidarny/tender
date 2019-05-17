import { getSnapshot } from "mobx-state-tree";
import shortid from "shortid";
import UserStore from "models/User";
import omit from "lodash/omit";
import UiStore from "models/UI";
import PartnerStore from "models/Partner";
import DealStore from "models/Deal";

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

export function getPartnerPayload() {
    return {
        title: "John Doe inc.",
        phone: undefined,
        email: undefined,
        idData: {
            INN: shortid(),
            ORGN: shortid(),
        },
        communicationLanguage: "en",
        preferredCommunicationMethod: "phone",
        manager: "Иванов. И.И.",
    };
}

export function getDealPayload() {
    return {
        title: "Magic Deal",
        subtitle: "Subtitle of Magic Deal",
        text: "Long description of Magic Deal",
        activePeriod: {
            from: new Date(),
            to: new Date(),
        },
        periodicity: "year",
        discount: 10,
        promoCode: "PITERMAY",
    };
}

export function getUserStoreSnapshot(state, action) {
    return getStoreSnapshot(UserStore, state, action);
}

export function getUiStoreSnapshot(state, action) {
    return getStoreSnapshot(UiStore, state, action);
}

export function getPartnerStoreSnapshot(state, action) {
    return getStoreSnapshot(PartnerStore, state, action);
}

export function getDealStoreSnapshot(state, action) {
    return getStoreSnapshot(DealStore, state, action);
}

function getStoreSnapshot(Store, state, action) {
    let result = {};
    const store = Store.create(state);
    if (action.type) {
        result = store[action.type](omit(action, "type"));
    }
    return { ...getSnapshot(store), result };
}
