import { types } from "mobx-state-tree";
import {
    ADD_PARTNER,
    GET_PARTNER_BY_ID,
    ADD_PARTICIPANT_TO_PARTNER,
    GET_PARTNER_BY_TITLE,
} from "actions/partner";
import shortid from "shortid";
import find from "lodash/find";

const Partner = types.model({
    // ID
    id: types.identifier,

    // Название
    title: types.string,

    phone: types.maybe(types.string),

    email: types.maybe(types.string),

    // ИНН
    INN: types.string,

    // ОГРН
    ORGN: types.string,

    // Язык коммуникации
    communicationLanguage: types.string,

    // Предпочтительный способ связи
    preferredCommunicationMethod: types.union(types.literal("email"), types.literal("phone")),

    // Менеджер
    manager: types.string,

    // Ref to Participants
    participants: types.array(types.string),
});

const PartnerStore = types
    .model({
        partners: types.array(Partner, []),
    })
    .actions(self => ({
        [ADD_PARTNER](partner) {
            const payload = { id: shortid(), manager: shortid(), ...partner };
            self.partners.push(payload);
            return payload;
        },

        [GET_PARTNER_BY_ID]({ id }) {
            return find(self.partners, { id });
        },

        [GET_PARTNER_BY_TITLE]({ title }) {
            return find(self.partners, { title });
        },

        [ADD_PARTICIPANT_TO_PARTNER]({ id, participant }) {
            const partner = find(self.partners, { id });
            partner.participants.push(participant);
        },
    }));

export default PartnerStore;
