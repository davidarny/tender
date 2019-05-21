import chai from "chai";
import { ADD_PARTICIPANT, GET_PARTICIPANT_BY_ID } from "actions/participant";
import shortid from "shortid";
import { getParticipantPayload } from "utils";
import ParticipantStore from "models/Participant";
import { types } from "mobx-state-tree";
import find from "lodash/find";

const expect = chai.expect;

describe("participant model", () => {
    const model = types.model({
        participant: ParticipantStore,
    });
    const store = model.create({
        participant: {},
    });

    it("should handle initial state", () => {
        expect(store.participant.participants)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_PARTICIPANT", () => {
        const { id: participantId } = store.participant[ADD_PARTICIPANT](getParticipantPayload());
        expect(participantId).to.be.a("string");
        expect(find(store.participant.participants, { id: participantId })).to.have.property(
            "id",
            participantId
        );
    });

    it("should handle GET_PARTICIPANT_BY_ID", () => {
        const { id: participantId } = store.participant[ADD_PARTICIPANT](getParticipantPayload());
        const participant = store.participant[GET_PARTICIPANT_BY_ID]({ id: participantId });
        expect(participant).to.have.property("id", participantId);
    });

    it("should get undefined if GET_PARTNER_BY_ID on empty array", () => {
        const actual = store.participant[GET_PARTICIPANT_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
