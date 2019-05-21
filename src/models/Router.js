import { types } from "mobx-state-tree";
import { ADD_ROUT } from "actions/routers";

const Router = types.model({
    id: types.number,

    // Станция отправления
    stationFrom: types.string,

    // Станция прибытия
    stationTo: types.string,

    // 1 = действует, 2 = приостановлен
    status: types.number,
});

const RoutersStore = types
    .model({
        routers: types.array(Router),
    })
    .actions(self => ({
        [ADD_ROUT](rout) {
            const payload = { id: self.routers.length, ...rout };
            self.routers.push(payload);
            return payload;
        },
    }));

export default RoutersStore;
