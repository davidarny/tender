import chai from "chai";
import omit from "lodash/omit";
import { ADD_PARTNER, GET_PARTNER_BY_ID } from "actions/partner";
import shortid from "shortid";
import { getPartnerPayload, getPartnerStoreSnapshot } from "utils";
import find from "lodash/find";

const expect = chai.expect;

describe("partner model", () => {
    const excludedFields = ["id"];

    it("should handle initial state", () => {
        const store = getPartnerStoreSnapshot(undefined, {});
        expect(store.partners)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_PARTNER", () => {
        const payload = getPartnerPayload();
        const partners = getPartnerStoreSnapshot(undefined, { type: ADD_PARTNER, ...payload })
            .partners;
        const partner = find(partners, { title: payload.title });
        expect(omit(partner, excludedFields)).to.deep.equal(payload);
    });

    it("should handle GET_PARTNER_BY_ID", () => {
        const id = shortid();
        const payload = getPartnerPayload();
        const store = getPartnerStoreSnapshot(
            { partners: [{ id, ...payload }] },
            { type: GET_PARTNER_BY_ID, id }
        );
        expect(store.result).to.have.property("id", id);
    });

    it("should get undefined if GET_PARTNER_BY_ID on empty array", () => {
        const store = getPartnerStoreSnapshot(undefined, { type: GET_PARTNER_BY_ID });
        expect(store.result).to.equal(undefined);
    });
});
