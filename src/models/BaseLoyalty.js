import { types } from "mobx-state-tree";
import { ADD_BASE_LOYALTY } from "actions/baseLoyalty";
import shortid from "shortid";

const BaseLoyalty = types.model({
    id: types.identifier,

    title: types.string,

    type: types.string,

    condition: types.string,

    status: types.maybe(types.string),

    property: types.string,

    distance: types.maybe(types.string),

    points: types.maybe(types.string),

    train: types.maybe(types.string),
});

const BaseLoyaltyStore = types
    .model({
        programs: types.array(BaseLoyalty, []),
    })
    .actions(self => ({
        [ADD_BASE_LOYALTY](program) {
            const payload = { id: shortid(), ...program };
            self.programs.push(payload);
            return payload;
        },
    }));

export default BaseLoyaltyStore;
