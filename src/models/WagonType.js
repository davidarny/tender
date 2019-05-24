import { types } from "mobx-state-tree";
import { ADD_WAGON_TYPE, GET_WAGON_TYPE_BY_ID } from "actions/wagonType";
import shortid from "shortid";
import find from "lodash/find";

const WagonType = types.model({
    id: types.string,

    // Сокращенное название
    type: types.string,

    // Название типа вагона
    name: types.string,
});

const WagonTypeStore = types
    .model({
        wagonTypes: types.array(WagonType),
    })
    .actions(self => ({
        [ADD_WAGON_TYPE](wagonType) {
            const payload = { id: shortid(), ...wagonType };
            self.wagonTypes.push(payload);
            return payload;
        },

        [GET_WAGON_TYPE_BY_ID]({ id }) {
            return find(self.wagonTypes, { id });
        },
    }));

export default WagonTypeStore;
