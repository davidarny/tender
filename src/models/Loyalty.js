import { types } from "mobx-state-tree";
import { ADD_LOYALTY, GET_LOYALTY_BY_TYPE, GET_LOYALTY_BY_ID } from "actions/loyalty";
import shortid from "shortid";
import find from "lodash/find";

const Loyalty = types.model({
    id: types.identifier,

    // Общие поля правил
    title: types.string,

    transferType: types.union(types.literal("withdraw"), types.literal("income")),

    condition: types.union(types.literal("cost"), types.literal("distance")),

    loyaltyType: types.union(types.literal("base"), types.literal("extra")),

    status: types.union(types.literal(1), types.literal(2)),

    // Базовые правила
    property: types.maybe(types.string),

    distance: types.maybe(types.string),

    cost: types.maybe(types.string),

    points: types.maybe(types.string),

    trains: types.maybe(types.string),

    // Дополнительные правила
    startStation: types.maybe(types.string),

    endStation: types.maybe(types.string),

    service: types.maybe(types.union(types.literal("vip"), types.literal("nonVip"))),

    termsStart: types.maybe(types.Date),

    termsEnd: types.maybe(types.Date),

    train: types.maybe(types.string),
});

const LoyaltyStore = types
    .model({
        loyalties: types.array(Loyalty),
    })
    .actions(self => ({
        [ADD_LOYALTY](program) {
            const payload = { id: shortid(), ...program };
            self.loyalties.push(payload);
            return payload;
        },

        [GET_LOYALTY_BY_ID]({ id }) {
            return find(self.loyalties, { id });
        },

        [GET_LOYALTY_BY_TYPE]({ type }) {
            return self.loyalties.filter(loyalty => loyalty.loyaltyType === type);
        },
    }));

export default LoyaltyStore;
