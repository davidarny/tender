import chai from "chai";
import { ADD_WAGON, GET_WAGON_BY_ID } from "actions/wagon";
import shortid from "shortid";
import { getWagonPayload } from "utils";
import find from "lodash/find";
import WagonStore from "models/Wagon";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("wagon model", () => {
    const model = types.model({
        wagon: WagonStore,
    });
    const store = model.create({
        wagon: {},
    });

    it("should handle initial state", () => {
        expect(store.wagon.wagons)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_WAGON", () => {
        const { id: wagonId, publicId, type, class: wagonClass } = store.wagon[ADD_WAGON](
            getWagonPayload()
        );

        const addedWagon = find(store.wagon.wagons, { id: wagonId });
        expect(wagonId).to.be.a("string");
        expect(addedWagon.publicId).to.equal(publicId);
        expect(addedWagon.type).to.equal(type);
        expect(addedWagon.class).to.equal(wagonClass);
    });

    it("should handle GET_WAGON_BY_ID", () => {
        const { id: wagonId } = store.wagon[ADD_WAGON](getWagonPayload());
        const wagon = store.wagon[GET_WAGON_BY_ID]({ id: wagonId });
        expect(wagon).to.have.property("id", wagonId);
    });

    it("should get undefined if GET_WAGON_BY_ID on empty array", () => {
        const actual = store.wagon[GET_WAGON_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
