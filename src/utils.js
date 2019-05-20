import { getSnapshot } from "mobx-state-tree";
import shortid from "shortid";
import UserStore from "models/User";
import UiStore from "models/UI";
import PartnerStore from "models/Partner";
import DealStore from "models/Deal";

export function getUserPayload() {
    return {
        appeal: "1053600591197",
        email: "john.doe@mail.com",
        phone: "+12345678910",
        password: shortid(),
        fullName: "John Doe",
        birthDate: new Date(),
        preferredCommunicationMethod: "email",
        idDocument: {
            documentType: "passport",
            documentId: "3664069397",
        },
        consentToCommunication: true,
    };
}

export function getPartnerPayload() {
    return {
        title: "John Doe inc.",
        phone: "john.doe@mail.com",
        email: "+12345678910",
        idData: {
            INN: "3664069397",
            ORGN: "1053600591197",
        },
        communicationLanguage: "en",
        preferredCommunicationMethod: "phone",
        manager: "Иванов. И.И.",
        participants: [],
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

export function getParticipantPayload(partner) {
    return {
        number: "1053600591197",
        fullName: "John Doe",
        partner,
        type: "personal",
        email: "john.doe@mail.com",
        phone: "+12345678910",
        birthDate: new Date(),
        citizenship: "RU",
        passport: "8811090121",
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
        result = store[action.type](action.payload);
    }
    return { ...getSnapshot(store), result };
}
