import { types } from "mobx-state-tree";
import {
    ADD_WAGON,
    GET_WAGON_BY_ID,
    ADD_WAGON_PROP,
    GET_WAGON_CLASS_BY_ID,
    GET_WAGON_TYPE_BY_ID,
    GET_WAGON_CLASSES,
    GET_WAGON_TYPES,
    GET_WAGON_CLASSES_BY_ABBR,
} from "actions/wagon";
import shortid from "shortid";
import find from "lodash/find";

const WagonProp = types.model({
    id: types.string,

    // Сокращенное название
    abbr: types.string,

    // Название типа вагона
    title: types.string,

    type: types.union(types.literal("class"), types.literal("type")),
});

const Wagon = types.model({
    id: types.string,

    // ID который будет показан пользователям
    publicId: types.string,

    // Тип вагона
    type: types.string,

    // Класс вагона
    class: types.string,
});

const WagonStore = types
    .model({
        wagons: types.array(Wagon),
        props: types.array(WagonProp),
    })
    .actions(self => ({
        [ADD_WAGON](wagon) {
            const payload = { id: shortid(), ...wagon };
            self.wagons.push(payload);
            return payload;
        },

        [GET_WAGON_BY_ID]({ id }) {
            return find(self.wagons, { id });
        },

        [ADD_WAGON_PROP](wagonClass) {
            const payload = { id: shortid(), ...wagonClass };
            self.props.push(payload);
            return payload;
        },

        [GET_WAGON_CLASS_BY_ID]({ id }) {
            return find(self.props, { id, type: "class" });
        },

        [GET_WAGON_TYPE_BY_ID]({ id }) {
            return find(self.props, { id, type: "type" });
        },

        [GET_WAGON_CLASSES]() {
            return self.props.filter(prop => prop.type === "class");
        },

        [GET_WAGON_TYPES]() {
            return self.props.filter(prop => prop.type === "type");
        },

        [GET_WAGON_CLASSES_BY_ABBR]({ abbr }) {
            return self.props.filter(prop => prop.type === "class" && prop.abbr === abbr);
        },
    }));

export default WagonStore;
