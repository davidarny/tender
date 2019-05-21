import { types } from "mobx-state-tree";
import { ADD_ROUT } from "actions/rout";

const Rout = types.model({
    id: types.number,

    // Станция отправления
    stationFrom: types.string,

    // Станция прибытия
    stationTo: types.string,

    // 1 = действует, 2 = приостановлен
    status: types.number,
});

const RoutsStore = types
    .model({
        routs: types.array(Rout),
    })
    .actions(self => ({
        [ADD_ROUT](rout) {
            const payload = { id: self.routs.length, ...rout };
            self.routs.push(payload);
            return payload;
        },
    }));

export default RoutsStore;
