import { types } from "mobx-state-tree";
import { ADD_TRAIN } from "actions/train";
import shortid from "shortid";

const Train = types.model({
    id: types.identifier,

    // Номер поезда
    number: types.string,

    // Тип поезда
    type: types.union(
        types.literal("Скорый круглогодичный"),
        types.literal("Скорый сезонного и разового обращения"),
        types.literal("Пассажирский круглогодичный"),
        types.literal("Высокоскоростной"),
        types.literal("Скоростной")
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
    }));

export default TrainStore;
