import { types } from "mobx-state-tree";
import { ADD_WAGON, GET_WAGON_BY_ID } from "actions/wagon";
import shortid from "shortid";
import find from "lodash/find";

const Wagon = types.model({
    id: types.string,

    // ID который будет показан пользователям
    publicId: types.string,

    type: types.union(
        types.literal("Купейный"),
        types.literal("Плацкартный"),
        types.literal("Сидячий"),
        types.literal("Люкс (СВ)"),
        types.literal("Мягкий"),
        types.literal("Общий"),
        types.literal("«Стриж»")
    ),

    subClass: types.string,
});

const WagonStore = types
    .model({
        wagons: types.array(Wagon),
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
    }));

export default WagonStore;
