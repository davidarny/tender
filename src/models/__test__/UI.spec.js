import chai from "chai";
import { getUiStoreSnapshot } from "utils";
import { LOG_IN, LOG_OUT } from "actions/ui";

const expect = chai.expect;

describe("ui model", () => {
    it("should handle initial state", () => {
        const store = getUiStoreSnapshot(false, {});
        expect(store.isLoggedIn).to.be.equal(false);
    });

    it("should handle LOG_IN", () => {
        const store = getUiStoreSnapshot(false, { type: LOG_IN });
        expect(store.isLoggedIn).to.equal(true);
    });

    it("should handle LOG_OUT", () => {
        const store = getUiStoreSnapshot(true, { type: LOG_OUT });
        expect(store.isLoggedIn).to.equal(false);
    });
});
