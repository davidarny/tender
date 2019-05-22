import chai from "chai";
import { ADD_ROUTE } from "actions/route";
import { getRoutePayload } from "utils";
import find from "lodash/find";
import { types } from "mobx-state-tree";
import RouteStore from "models/Route";

const expect = chai.expect;

describe("route model", () => {
    const model = types.model({
        route: RouteStore,
    });
    const store = model.create({
        route: {},
    });

    it("should handle initial state", () => {
        expect(store.route.routes)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_ROUTE", () => {
        const { id: routeId } = store.route[ADD_ROUTE](getRoutePayload());
        expect(routeId).to.be.a("string");
        expect(find(store.route.routes, { id: routeId })).to.have.property("id", routeId);
    });
});
