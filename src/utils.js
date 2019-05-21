import shortid from "shortid";
import random from "lodash/random";

export function getUserPayload() {
    return {
        email: "john.doe@mail.com",
        phone: "+12345678910",
        password: shortid(),
        fullName: "Иванов Иван",
        birthDate: new Date(),
        preferredCommunicationMethod: "email",
        consentToCommunication: true,
    };
}

export function getPartnerPayload(participants = []) {
    return {
        title: 'АО "Альфа-Банк"',
        phone: "+12345678910",
        email: "john.doe@mail.com",
        INN: random(0, Number.MAX_SAFE_INTEGER).toString(),
        ORGN: random(0, Number.MAX_SAFE_INTEGER).toString(),
        communicationLanguage: "en",
        preferredCommunicationMethod: "phone",
        manager: "Иванов Иван",
        participants,
    };
}

export function getDealPayload() {
    return {
        title: "Летний",
        subtitle: "Театральный сезон в Александринском театре!",
        text:
            "Только для участников программы РЖД Бонус 10% скидки на репертуарные спектакли в мае по промо-коду RZHD10 при онлайн-покупке на сайте кинотеатра",
        activePeriod: {
            from: new Date(),
            to: new Date(),
        },
        periodicity: "year",
        discount: 10,
        promoCode: "PITERMAY",
    };
}

export function getParticipantPayload(partner) {
    return {
        number: random(0, Number.MAX_SAFE_INTEGER).toString(),
        fullName: "Иванов Иван",
        partner,
        accountType: "personal",
        email: "john.doe@mail.com",
        phone: "+12345678910",
        birthDate: new Date(),
        citizenship: "RU",
        passport: random(0, Number.MAX_SAFE_INTEGER).toString(),
        participantType: "individual",
        INN: random(0, Number.MAX_SAFE_INTEGER).toString(),
        ORGN: random(0, Number.MAX_SAFE_INTEGER).toString(),
    };
}

export function getBaseLoyaltyProgramPayload() {
    return {
        type: "Начисление баллов",
        condition: "Расстояние",
        property: "30 баллов за каждые 500 км",
        trains: "116C, 858A, 032A-Лев Толстой",
    };
}

export function getExtraLoyaltyProgramPayload() {
    return {
        type: "Начисление баллов",
        stationStart: "Москва",
        stationEnd: "Казань",
        train: "Толстой",
        service: "vip",
        terms: "15 янв - 30 мар, ежегодно",
    };
}
