import chai from "chai";
import { getUiStoreSnapshot } from "utils";
import { LOG_IN, LOG_OUT, TOGGLE_DRAWER } from "actions/ui";

const expect = chai.expect;

describe("ui model", () => {
    it("should handle initial state", () => {
        const store = getUiStoreSnapshot({ isLoggedIn: false, isDrawerOpen: false }, {});
        expect(store.isLoggedIn).to.equal(false);
        expect(store.isDrawerOpen).to.equal(false);
    });

    it("should handle LOG_IN", () => {
        const store = getUiStoreSnapshot({ isLoggedIn: false }, { type: LOG_IN });
        expect(store.isLoggedIn).to.equal(true);
    });

    it("should handle LOG_OUT", () => {
        const store = getUiStoreSnapshot({ isLoggedIn: true }, { type: LOG_OUT });
        expect(store.isLoggedIn).to.equal(false);
    });

    it("should handle TOGGLE_DRAWER when false", () => {
        const store = getUiStoreSnapshot({ isDrawerOpen: false }, { type: TOGGLE_DRAWER });
        expect(store.isDrawerOpen).to.equal(true);
    });

    it("should handle TOGGLE_DRAWER when rue", () => {
        const store = getUiStoreSnapshot({ isDrawerOpen: true }, { type: TOGGLE_DRAWER });
        expect(store.isDrawerOpen).to.equal(false);
    });
});
