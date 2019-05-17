import chai from "chai";
import omit from "lodash/omit";
import { ADD_DEAL, GET_DEAL_BY_ID } from "actions/deal";
import shortid from "shortid";
import { getDealPayload, getDealStoreSnapshot } from "utils";
import find from "lodash/find";

const expect = chai.expect;

describe("deal model", () => {
    it("should handle initial state", () => {
        const store = getDealStoreSnapshot(undefined, {});
        expect(store.deals)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_DEAL", () => {
        const payload = getDealPayload();
        const deals = getDealStoreSnapshot(undefined, { type: ADD_DEAL, ...payload }).deals;
        const deal = find(deals, { title: payload.title });
        expect(omit(deal, ["id", "activePeriod"])).to.deep.equal(omit(payload, "activePeriod"));
    });

    it("should handle GET_DEAL_BY_ID", () => {
        const id = shortid();
        const payload = getDealPayload();
        const store = getDealStoreSnapshot(
            { deals: [{ id, ...payload }] },
            { type: GET_DEAL_BY_ID, id }
        );
        expect(store.result).to.have.property("id", id);
    });

    it("should get undefined if GET_DEAL_BY_ID on empty array", () => {
        const store = getDealStoreSnapshot(undefined, { type: GET_DEAL_BY_ID });
        expect(store.result).to.equal(undefined);
    });
});
