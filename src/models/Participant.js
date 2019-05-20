import { types } from "mobx-state-tree";
import { Partner } from "./Partner";
import find from "lodash/find";
import shortid from "shortid";
import { GET_PARTICIPANT_BY_ID, ADD_PARTICIPANT } from "actions/participant";

export function Participant() {
    return types.model({
        id: types.identifier,

        // Номер участника ПЛ
        number: types.number,

        // ФИО
        fullName: types.string,

        partner: types.reference(types.late(() => Partner), {
            get(_, parent) {
                return parent;
            },

            set(value) {
                return value.id;
            },
        }),

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
}

const ParticipantStore = types
    .model({
        participants: types.array(Participant()),
    })
    .actions(self => ({
        [ADD_PARTICIPANT](participant) {
            self.participants.push({ id: shortid(), ...participant });
        },

        [GET_PARTICIPANT_BY_ID]({ id }) {
            return find(self.participants, { id });
        },
    }));

export default ParticipantStore;
