import chai from "chai";
import omit from "lodash/omit";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "actions/user";
import shortid from "shortid";
import { getUserStoreSnapshot, getUserPayload } from "utils";

const expect = chai.expect;

describe("user model", () => {
    const excludedFields = ["id", "birthDate"];

    it("should handle initial state", () => {
        const user = getUserStoreSnapshot(undefined, {}).current;
        expect(user).to.be.equal(undefined);
    });

    it("should handle SET_CURRENT_USER", () => {
        const payload = getUserPayload();
        const user = getUserStoreSnapshot(undefined, { type: SET_CURRENT_USER, payload }).current;
        expect(user).to.deep.include(omit(payload, excludedFields));
        expect(user.birthDate).to.be.a("number");
    });

    it("should handle REMOVE_CURRENT_USER", () => {
        const payload = getUserPayload();
        const user = getUserStoreSnapshot({ id: shortid(), payload }, { type: REMOVE_CURRENT_USER })
            .current;
        expect(user).to.equal(undefined);
    });
});
