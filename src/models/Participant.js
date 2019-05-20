import { types } from "mobx-state-tree";
import find from "lodash/find";
import shortid from "shortid";
import { GET_PARTICIPANT_BY_ID, ADD_PARTICIPANT } from "actions/participant";

const Participant = types.model({
    id: types.identifier,

    // Номер участника ПЛ
    number: types.string,

    // ФИО
    fullName: types.string,

    // Ref to Partner
    partner: types.maybe(types.string),

    // Тип участника
    type: types.union(
        types.literal("personal"),
        types.literal("corporate"),
        types.literal("family")
    ),

    email: types.string,

    phone: types.string,

    birthDate: types.Date,

    citizenship: types.string,

    // Паспортные данные
    passport: types.string,

    // TODO: references
    // - bonus account
    // - trips
    // - tickets
});

const ParticipantStore = types
    .model({
        participants: types.array(Participant),
    })
    .actions(self => ({
        [ADD_PARTICIPANT](participant) {
            const payload = { id: shortid(), ...participant };
            self.participants.push(payload);
            return payload;
        },

        [GET_PARTICIPANT_BY_ID]({ id }) {
            return find(self.participants, { id });
        },
    }));

export default ParticipantStore;
