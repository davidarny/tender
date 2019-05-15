import { types } from "mobx-state-tree";
import shortid from "shortid";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "actions/user";

// Справочник УПЛ (физ. лицо)
const User = types.model({
    // ID
    id: types.string,

    email: types.maybe(types.string),

    phone: types.maybe(types.string),

    password: types.maybe(types.string),

    // Обращение
    appeal: types.string,

    // ФИО, Имя (рус), Фамилия (рус)
    fullName: types.string,

    // Дата рождения
    birthDate: types.Date,

    // Предпочтительный способ связи
    preferredCommunicationMethod: types.union(types.literal("email"), types.literal("phone")),

    // Документы удостоверяющие личность
    idDocument: types.model({
        // Тип документа
        documentType: types.string,

        // Номер документа
        documentId: types.string,
    }),

    // Согласие на коммуникации
    consentToCommunication: types.boolean,
});

const UserStore = types
    .model({
        current: types.maybe(User),
    })
    .actions(self => ({
        [SET_CURRENT_USER](user) {
            self.current = { id: shortid(), ...user };
        },

        [REMOVE_CURRENT_USER]() {
            self.current = undefined;
        },
    }));

export default UserStore;
