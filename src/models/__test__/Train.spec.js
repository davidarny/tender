import chai from "chai";
import { ADD_TRAIN } from "actions/train";
import { getTrainPayload } from "utils";
import find from "lodash/find";
import TrainStore from "models/Train";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("train model", () => {
    const model = types.model({
        train: TrainStore,
    });
    const store = model.create({
        train: {},
    });

    it("should handle initial state", () => {
        expect(store.train.trains)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_TRAIN", () => {
        const trainType = "Скоростной";
        const { id: trainId } = store.train[ADD_TRAIN](getTrainPayload(trainType));
        const addedTrain = find(store.train.trains, { id: trainId });

        expect(trainId).to.be.a("string");
        expect(addedTrain).to.have.property("id", trainId);
        expect(addedTrain).to.have.property("type", trainType);
    });
});
