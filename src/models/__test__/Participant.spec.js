import chai from "chai";
import { ADD_PARTICIPANT, GET_PARTICIPANT_BY_ID } from "actions/participant";
import { ADD_PARTNER, ADD_PARTICIPANT_TO_PARTNER } from "actions/partner";
import shortid from "shortid";
import { getParticipantPayload, getPartnerPayload } from "utils";
import ParticipantStore from "models/Participant";
import PartnerStore from "models/Partner";
import { types } from "mobx-state-tree";

const expect = chai.expect;

describe("participant model", () => {
    const model = types.model({
        partner: PartnerStore,
        participant: ParticipantStore,
    });
    const store = model.create({
        partner: {},
        participant: {},
    });

    it("should handle initial state", () => {
        expect(store.participant.participants)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_PARTICIPANT and GET_PARTICIPANT_BY_ID", () => {
        const partnerPayload = getPartnerPayload();
        const { id: partnerId } = store.partner[ADD_PARTNER](partnerPayload);
        const participantPayload = getParticipantPayload(partnerId);
        const { id: participantId } = store.participant[ADD_PARTICIPANT](participantPayload);
        store.partner[ADD_PARTICIPANT_TO_PARTNER]({ id: partnerId, participant: participantId });
        const actual = store.participant[GET_PARTICIPANT_BY_ID]({ id: participantId });
        expect(actual.id).to.equal(participantId);
        expect(actual.partner).to.equal(partnerId);
    });

    it("should get undefined if GET_PARTNER_BY_ID on empty array", () => {
        const actual = store.participant[GET_PARTICIPANT_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });
});
