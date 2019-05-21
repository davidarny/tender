import { types } from "mobx-state-tree";
import { ADD_ROUTE } from "actions/route";
import shortid from "shortid";

const Route = types.model({
    id: types.identifier,

    // Станция отправления
    startStation: types.string,

    // Станция прибытия
    endStation: types.string,

    // 1 = действует, 2 = приостановлен
    status: types.union(types.literal(1), types.literal(2)),
});

const RouteStore = types
    .model({
        routes: types.array(Route),
    })
    .actions(self => ({
        [ADD_ROUTE](route) {
            const payload = { id: shortid(), ...route };
            self.routes.push(payload);
            return payload;
        },
    }));

export default RouteStore;
