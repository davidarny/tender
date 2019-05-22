import { types } from "mobx-state-tree";
import { ADD_WAGON, GET_WAGON_BY_ID } from "actions/wagon";
import shortid from "shortid";
import find from "lodash/find";

const Wagon = types.model({
    id: types.string,

    // ID который будет показан пользователям
    publicId: types.string,

    // Номер вагона
    number: types.string,

    // Класс вагона
    type: types.union(
        types.literal(1), // Купейный
        types.literal(2), // Плацкартный
        types.literal(3), // Сидячий
        types.literal(4), // Люкс (СВ)
        types.literal(5), // Мягкий
        types.literal(6), // Общий
        types.literal(7) // «Стриж»
    ),

    // Подкласс
    subClass: types.union(
        types.literal(1), // 2Э
        types.literal(2), // 2Т
        types.literal(3), // 1Р
        types.literal(4), // 1Э
        types.literal(5), // 1А
        types.literal(6), // 3В
        types.literal(7) // 1Е
    ),
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
