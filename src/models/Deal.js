import { types } from "mobx-state-tree";
import { ADD_DEAL, GET_DEAL_BY_ID } from "actions/deal";
import shortid from "shortid";
import find from "lodash/find";

const Deal = types.model({
    id: types.string,

    title: types.string,

    subtitle: types.string,

    text: types.string,

    activePeriod: types.model({
        from: types.maybe(types.Date),
        to: types.maybe(types.Date),
    }),

    periodicity: types.union(
        types.literal("day"),
        types.literal("week"),
        types.literal("month"),
        types.literal("year")
    ),

    discount: types.number,

    promoCode: types.string,

    startStation: types.maybe(types.string),

    endStation: types.maybe(types.string),
});

const DealStore = types
    .model({
        deals: types.array(Deal),
    })
    .actions(self => ({
        [ADD_DEAL](deal) {
            self.deals.push({ id: shortid(), ...deal });
        },

        [GET_DEAL_BY_ID]({ id }) {
            return find(self.deals, { id });
        },
    }));

export default DealStore;
