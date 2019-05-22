import { types } from "mobx-state-tree";
import { ADD_TRAIN, GET_TRAIN_BY_ID } from "actions/train";
import shortid from "shortid";
import find from "lodash/find";

const Train = types.model({
    id: types.identifier,

    // Номер поезда
    number: types.string,

    // Тип поезда
    type: types.union(
        types.literal(1), // "Скорый круглогодичный"
        types.literal(2), // "Скорый сезонного и разового обращения"
        types.literal(3), // "Пассажирский круглогодичный"
        types.literal(4), // "Высокоскоростной"
        types.literal(5) // "Скоростной"
    ),
});

const TrainStore = types
    .model({
        trains: types.array(Train),
    })
    .actions(self => ({
        [ADD_TRAIN](train) {
            const payload = { id: shortid(), ...train };
            self.trains.push(payload);
            return payload;
        },

        [GET_TRAIN_BY_ID]({ id }) {
            return find(self.trains, { id });
        },
    }));

export default TrainStore;
