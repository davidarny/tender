import shortid from "shortid";

export function getUniqueId() {
    return getUniqueIdOfLength(10);
}

export function getUniqueIdOfLength(length) {
    return Math.floor(10 ** (length - 1) + Math.random() * 9 ** (length - 1)).toString();
}

function getAccountPrefix(type) {
    if (type === "individual") {
        // Префикс личного счёта
        return "P";
    }
    if (type === "legalEntity") {
        // Префикс корпоративного счёта
        return "C";
    }
    // Неопределённый префикс
    return "U";
}

export function getRandomAccountNumber(type) {
    const prefix = getAccountPrefix(type);
    return prefix + getUniqueIdOfLength(2) + "_" + getUniqueIdOfLength(12);
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
    const common = {
        transferType: "income",
        condition: "distance",
        loyaltyType: type,
        status: 1,
    };
    if (type === "base") {
        return {
            ...common,
            property: "property",
            trains: "trains",
            points: "100",
            distance: "100",
            cost: "1000",
        };
    }
    if (type === "extra") {
        return {
            ...common,
            train: "train",
            startStation: "moscow",
            endStation: "kazan",
            service: "vip",
            termsStart: new Date(),
            termsEnd: new Date(),
        };
    }
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
        abbr: "L",
        title: "Люкс",
    };
}

export function getWagonClassPayload() {
    return {
        title: "1А",
        abbr: "L",
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
