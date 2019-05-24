import { types } from "mobx-state-tree";
import { ADD_WAGON_CLASS, GET_WAGON_CLASS_BY_ID } from "actions/wagonClass";
import shortid from "shortid";
import find from "lodash/find";

const WagonClass = types.model({
    id: types.string,

    // Сокращенное название
    type: types.string,

    // Название типа вагона
    name: types.string,
});

const WagonClassStore = types
    .model({
        wagonClasses: types.array(WagonClass),
    })
    .actions(self => ({
        [ADD_WAGON_CLASS](wagonClass) {
            const payload = { id: shortid(), ...wagonClass };
            self.wagonClasses.push(payload);
            return payload;
        },

        [GET_WAGON_CLASS_BY_ID]({ id }) {
            return find(self.wagonClasses, { id });
        },
    }));

export default WagonClassStore;
