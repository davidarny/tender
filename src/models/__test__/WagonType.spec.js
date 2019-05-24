import chai from "chai";
import { ADD_WAGON_TYPE, GET_WAGON_TYPE_BY_ID } from "actions/wagonType";
import shortid from "shortid";
import { getWagonClassPayload, getWagonTypePayload } from "utils";
import find from "lodash/find";
import { types } from "mobx-state-tree";
import WagonTypeStore from "models/WagonType";

const expect = chai.expect;

describe("wagonType model", () => {
    const model = types.model({
        wagonType: WagonTypeStore,
    });
    const store = model.create({
        wagonType: {},
    });

    it("should handle initial state", () => {
        expect(store.wagonType.wagonTypes)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_WAGON_TYPE", () => {
        const { id: wagonTypeId, name, type } = store.wagonType[ADD_WAGON_TYPE](
            getWagonTypePayload()
        );

        const addedWagon = find(store.wagonType.wagonTypes, { id: wagonTypeId });
        expect(wagonTypeId).to.be.a("string");
        expect(addedWagon.name).to.equal(name);
        expect(addedWagon.type).to.equal(type);
    });

    it("should handle GET_WAGON_TYPE_BY_ID", () => {
        const { id: wagonTypeId } = store.wagonType[ADD_WAGON_TYPE](getWagonClassPayload());
        const wagon = store.wagonType[GET_WAGON_TYPE_BY_ID]({ id: wagonTypeId });
        expect(wagon).to.have.property("id", wagonTypeId);
    });

    it("should get undefined if GET_WAGON_CLASS_BY_ID on empty array", () => {
        const actual = store.wagonType[GET_WAGON_TYPE_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
