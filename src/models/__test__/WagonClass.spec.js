import chai from "chai";
import { ADD_WAGON_CLASS, GET_WAGON_CLASS_BY_ID } from "actions/wagonClass";
import shortid from "shortid";
import { getWagonClassPayload } from "utils";
import find from "lodash/find";
import { types } from "mobx-state-tree";
import WagonClassStore from "models/WagonClass";

const expect = chai.expect;

describe("wagonClass model", () => {
    const model = types.model({
        wagonClass: WagonClassStore,
    });
    const store = model.create({
        wagonClass: {},
    });

    it("should handle initial state", () => {
        expect(store.wagonClass.wagonClasses)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_WAGON_CLASS", () => {
        const { id: wagonClassId, name, type } = store.wagonClass[ADD_WAGON_CLASS](
            getWagonClassPayload()
        );

        const addedWagon = find(store.wagonClass.wagonClasses, { id: wagonClassId });
        expect(wagonClassId).to.be.a("string");
        expect(addedWagon.name).to.equal(name);
        expect(addedWagon.type).to.equal(type);
    });

    it("should handle GET_WAGON_CLASS_BY_ID", () => {
        const { id: wagonClassId } = store.wagonClass[ADD_WAGON_CLASS](getWagonClassPayload());
        const wagon = store.wagonClass[GET_WAGON_CLASS_BY_ID]({ id: wagonClassId });
        expect(wagon).to.have.property("id", wagonClassId);
    });

    it("should get undefined if GET_WAGON_CLASS_BY_ID on empty array", () => {
        const actual = store.wagonClass[GET_WAGON_CLASS_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
