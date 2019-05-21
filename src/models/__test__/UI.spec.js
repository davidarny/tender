import chai from "chai";
import { LOG_IN, LOG_OUT, TOGGLE_DRAWER } from "actions/ui";
import UiStore from "models/UI";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("ui model", () => {
    const model = types.model({
        ui: UiStore,
    });
    const store = model.create({
        ui: {},
    });

    it("should handle initial state", () => {
        expect(store.ui.isLoggedIn).to.equal(false);
        expect(store.ui.isDrawerOpen).to.equal(false);
    });

    it("should handle LOG_IN", () => {
        store.ui[LOG_IN]();
        expect(store.ui.isLoggedIn).to.equal(true);
    });

    it("should handle LOG_OUT", () => {
        store.ui[LOG_OUT]();
        expect(store.ui.isLoggedIn).to.equal(false);
    });

    it("should handle TOGGLE_DRAWER", () => {
        store.ui[TOGGLE_DRAWER]();
        expect(store.ui.isDrawerOpen).to.equal(true);
        store.ui[TOGGLE_DRAWER]();
        expect(store.ui.isDrawerOpen).to.equal(false);
    });
});
