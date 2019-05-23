import { types } from "mobx-state-tree";
import {
    ADD_PARTNER,
    GET_PARTNER_BY_ID,
    ADD_PARTICIPANT_TO_PARTNER,
    GET_PARTNER_BY_TITLE,
    GET_PARTICIPANTS_OF_PARTNER,
} from "actions/partner";
import shortid from "shortid";
import find from "lodash/find";
import { GET_PARTICIPANT_BY_ID } from "actions/participant";

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

    category: types.union(
        types.literal("banks"),
        types.literal("relax"),
        types.literal("other"),
        types.literal("hotels")
    ),

    // Иконка банка
    icon: types.maybe(types.string),
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

        [GET_PARTICIPANTS_OF_PARTNER]({ partnerId, model }) {
            const partner = find(self.partners, { id: partnerId });
            if (partner) {
                return partner.participants.map(participantId => {
                    const participant = model[GET_PARTICIPANT_BY_ID]({ id: participantId });
                    return participant;
                });
            } else {
                return [];
            }
        },
    }));

export default PartnerStore;
