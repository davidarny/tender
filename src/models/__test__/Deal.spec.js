import chai from "chai";
import { ADD_DEAL, GET_DEAL_BY_ID } from "actions/deal";
import shortid from "shortid";
import { getDealPayload } from "utils";
import find from "lodash/find";
import DealStore from "models/Deal";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("deal model", () => {
    const model = types.model({
        deal: DealStore,
    });
    const store = model.create({
        deal: {},
    });

    it("should handle initial state", () => {
        expect(store.deal.deals)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });
    it("should handle ADD_DEAL", () => {
        const { id: dealId } = store.deal[ADD_DEAL](getDealPayload());
        expect(dealId).to.be.a("string");
        expect(find(store.deal.deals, { id: dealId })).to.have.property("id", dealId);
    });

    it("should handle GET_DEAL_BY_ID", () => {
        const { id: dealId } = store.deal[ADD_DEAL](getDealPayload());
        const deal = store.deal[GET_DEAL_BY_ID]({ id: dealId });
        expect(deal).to.have.property("id", dealId);
    });

    it("should get undefined if GET_DEAL_BY_ID on empty array", () => {
        const actual = store.deal[GET_DEAL_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
