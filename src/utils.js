import shortid from "shortid";

export function getUniqueId() {
    return getUniqueIdOfLength(10);
}

export function getUniqueIdOfLength(length) {
    return Math.floor(10 ** (length - 1) + Math.random() * 9 ** (length - 1)).toString();
}

export function getRandomLetter(capital = true) {
    const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    if (capital) {
        return letter.toUpperCase();
    } else {
        return letter;
    }
}

export function getUserPayload() {
    return {
        email: "john.doe@mail.com",
        phone: "+" + getUniqueIdOfLength(12),
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
        phone: "+" + getUniqueIdOfLength(12),
        email: "john.doe@mail.com",
        INN: getUniqueId(),
        ORGN: getUniqueId(),
        communicationLanguage: "en",
        preferredCommunicationMethod: "phone",
        manager: "Иванов Иван",
        participants,
        category: "relax",
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
        number: getUniqueId(),
        fullName: "Иванов Иван",
        partner,
        accountType: "personal",
        email: "john.doe@mail.com",
        phone: "+" + getUniqueIdOfLength(12),
        birthDate: new Date(),
        citizenship: "RU",
        passport: getUniqueId(),
        participantType: "individual",
        INN: getUniqueId(),
        ORGN: getUniqueId(),
    };
}

export function getLoyaltyPayload(type) {
    return {
        transferType: "income",
        condition: "distance",
        property: "property",
        trains: "trains",
        startStation: "moscow",
        endStation: "kazan",
        service: "vip",
        terms: "terms",
        loyaltyType: type,
    };
}

export function getRoutePayload() {
    return {
        startStation: "from",
        endStation: "to",
        status: 1,
    };
}

export function getWagonTypePayload() {
    return {
        type: "L",
        name: "Люкс",
    };
}

export function getWagonClassPayload() {
    return {
        name: "1А",
        type: "L",
    };
}

export function getWagonPayload() {
    return {
        publicId: getUniqueId(),
        type: "L",
        class: "1А",
    };
}

export function getTrainPayload(type) {
    return {
        number: shortid(),
        type: type,
    };
}
