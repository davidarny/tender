import { types } from "mobx-state-tree";
import { ADD_EXTRA_LOYALTY } from "actions/extraLoyalty";
import shortid from "shortid";

const ExtraLoyalty = types.model({
    id: types.identifier,

    title: types.string,

    type: types.string,

    stationStart: types.string,

    stationEnd: types.string,

    status: types.maybe(types.string),

    train: types.maybe(types.string),

    service: types.maybe(types.string),

    terms: types.maybe(types.string),
});

const ExtraLoyaltyStore = types
    .model({
        programs: types.array(ExtraLoyalty, []),
    })
    .actions(self => ({
        [ADD_EXTRA_LOYALTY](program) {
            const payload = { id: shortid(), ...program };
            self.programs.push(payload);
            return payload;
        },
    }));

export default ExtraLoyaltyStore;
