import chai from "chai";
import {
    ADD_PARTNER,
    GET_PARTNER_BY_ID,
    ADD_PARTICIPANT_TO_PARTNER,
    GET_PARTNER_BY_TITLE,
    GET_PARTICIPANTS_OF_PARTNER,
} from "actions/partner";
import { ADD_PARTICIPANT } from "actions/participant";
import shortid from "shortid";
import { getPartnerPayload, getParticipantPayload } from "utils";
import find from "lodash/find";
import PartnerStore from "models/Partner";
import ParticipantStore from "models/Participant";
import { types } from "mobx-state-tree";
import first from "lodash/first";

const expect = chai.expect;

describe("partner model", () => {
    const model = types.model({
        partner: PartnerStore,
        participant: ParticipantStore,
    });
    const store = model.create({
        partner: {},
        participant: {},
    });

    it("should handle initial state", () => {
        expect(store.partner.partners)
            .to.be.an("array")
            .and.to.have.lengthOf(0);
    });

    it("should handle ADD_PARTNER", () => {
        const { id: partnerId } = store.partner[ADD_PARTNER](getPartnerPayload());
        expect(partnerId).to.be.a("string");
        expect(find(store.partner.partners, { id: partnerId })).to.have.property("id", partnerId);
    });

    it("should handle GET_PARTNER_BY_ID", () => {
        const { id: partnerId } = store.partner[ADD_PARTNER](getPartnerPayload());
        const partner = store.partner[GET_PARTNER_BY_ID]({ id: partnerId });
        expect(partner).to.have.property("id", partnerId);
    });

    it("should get undefined if GET_PARTNER_BY_ID on empty array", () => {
        const actual = store.partner[GET_PARTNER_BY_ID]({ id: shortid() });
        expect(actual).to.equal(undefined);
    });

    it("should handle ADD_PARTICIPANT_TO_PARTNER", () => {
        const participant = store.participant[ADD_PARTICIPANT](getParticipantPayload());
        const partner = store.partner[ADD_PARTNER](getPartnerPayload());
        store.partner[ADD_PARTICIPANT_TO_PARTNER]({ id: partner.id, participant: participant.id });
        const updatedPartner = store.partner[GET_PARTNER_BY_ID]({ id: partner.id });
        expect(updatedPartner).to.have.property("id", partner.id);
        expect(updatedPartner)
            .to.have.property("participants")
            .to.have.length(1)
            .and.to.have.all.members([participant.id]);
    });

    it("should handle GET_PARTNER_BY_TITLE", () => {
        const { id: partnerId } = store.partner[ADD_PARTNER]({
            ...getPartnerPayload(),
            title: "Gazprom",
        });
        const partner = store.partner[GET_PARTNER_BY_TITLE]({ title: "Gazprom" });
        expect(partner).to.have.property("id", partnerId);
        expect(partner).to.have.property("title", "Gazprom");
    });

    it("should return empty array on GET_PARTICIPANTS_OF_PARTNER if no has no participants", () => {
        const partnerId = first(store.partner.partners).id;
        const participants = store.partner[GET_PARTICIPANTS_OF_PARTNER]({
            partnerId,
            model: store.participant,
        });
        expect(participants)
            .to.be.an("array")
            .to.have.length(0);
    });

    it("should return empty array on GET_PARTICIPANTS_OF_PARTNER if unknown id", () => {
        const participants = store.partner[GET_PARTICIPANTS_OF_PARTNER]({
            partnerId: shortid(),
            model: store.participant,
        });
        expect(participants)
            .to.be.an("array")
            .to.have.length(0);
    });

    it("should handle GET_PARTICIPANTS_OF_PARTNER", () => {
        const participant = store.participant[ADD_PARTICIPANT](getParticipantPayload());
        const partnerId = first(store.partner.partners).id;
        store.partner[ADD_PARTICIPANT_TO_PARTNER]({ id: partnerId, participant: participant.id });
        const participants = store.partner[GET_PARTICIPANTS_OF_PARTNER]({
            partnerId,
            model: store.participant,
        });
        expect(participants)
            .to.be.an("array")
            .to.have.length(1);
        expect(first(participants)).to.have.property("id", participant.id);
    });
});
