import { types } from "mobx-state-tree";
import { ADD_PARTNER, GET_PARTNER_BY_ID, ADD_PARTICIPANT_TO_PARTNER } from "actions/partner";
import shortid from "shortid";
import find from "lodash/find";
import { Participant } from "./Participant";

export function Partner() {
    return types.model({
        // ID
        id: types.identifier,

        // Название
        title: types.string,

        phone: types.maybe(types.string),

        email: types.maybe(types.string),

        // Идентификационные данные
        idData: types.model({
            // ИНН
            INN: types.string,

            // ОГРН
            ORGN: types.string,
        }),

        // Язык коммуникации
        communicationLanguage: types.string,

        // Предпочтительный способ связи
        preferredCommunicationMethod: types.union(types.literal("email"), types.literal("phone")),

        // Менеджер
        manager: types.string,

        participants: types.array(types.reference(types.late(() => Participant))),
    });
}

const PartnerStore = types
    .model({
        partners: types.array(Partner()),
    })
    .actions(self => ({
        [ADD_PARTNER](partner) {
            self.partners.push({ id: shortid(), manager: shortid(), ...partner });
        },

        [GET_PARTNER_BY_ID]({ id }) {
            return find(self.partners, { id });
        },

        [ADD_PARTICIPANT_TO_PARTNER]({ id, participant }) {
            const partner = find(self.partners, { id });
            partner.participants.push(participant);
        },
    }));

export default PartnerStore;
