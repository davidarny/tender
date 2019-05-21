import chai from "chai";
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "actions/user";
import { getUserPayload } from "utils";
import UserStore from "models/User";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("user model", () => {
    const model = types.model({
        user: UserStore,
    });
    const store = model.create({
        user: {},
    });

    it("should handle initial state", () => {
        expect(store.user.current).to.be.equal(undefined);
    });

    it("should handle SET_CURRENT_USER", () => {
        store.user[SET_CURRENT_USER](getUserPayload());
        expect(store.user.current).to.have.property("id");
        expect(store.user.current).to.have.property("email");
    });

    it("should handle REMOVE_CURRENT_USER", () => {
        store.user[REMOVE_CURRENT_USER]();
        expect(store.user.current).to.equal(undefined);
    });
});
