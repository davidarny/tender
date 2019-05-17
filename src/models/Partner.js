import { types } from "mobx-state-tree";
import { ADD_PARTNER, GET_PARTNER_BY_ID } from "actions/partner";
import shortid from "shortid";
import find from "lodash/find";

const Partner = types.model({
    // ID
    id: types.string,

    // Название
    title: types.string,

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
});

const PartnerStore = types
    .model({
        partners: types.array(Partner),
    })
    .actions(self => ({
        [ADD_PARTNER](partner) {
            self.partners.push({ id: shortid(), manager: shortid(), ...partner });
        },

        [GET_PARTNER_BY_ID]({ id }) {
            return find(self.partners, { id });
        },
    }));

export default PartnerStore;
