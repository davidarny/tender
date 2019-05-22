/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Fragment, useState, useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import { navigate } from "@reach/router";
import Layout from "components/Layout";
import { ADD_PARTICIPANT } from "actions/participant";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import random from "lodash/random";
import { GET_PARTNER_BY_TITLE } from "actions/partner";
import get from "lodash/get";

export default function AddParticipant() {
    const [form, setFormValues] = useState({
        fullName: undefined,
        phone: undefined,
        email: undefined,
        participantType: "individual",
        accountType: "personal",
        partner: undefined,
        INN: undefined,
        ORGN: undefined,
    });
    const store = useContext(StoreContext);

    function onFullNameChange(event) {
        setFormValues({ ...form, fullName: event.target.value });
        console.log("%cAddParticipant full name change", "color: #795548", event.target.value);
    }

    function onAccountTypeChange(event) {
        if (event.target.value === "corporate") {
            setFormValues({
                ...form,
                participantType: "legalEntity",
                accountType: event.target.value,
            });
        } else {
            setFormValues({
                ...form,
                participantType: "individual",
                accountType: event.target.value,
            });
        }
        console.log("%cAddParticipant account type change", "color: #795548", event.target.value);
    }

    function onPhoneChange(event) {
        setFormValues({ ...form, phone: event.target.value });
        console.log("%cAddParticipant phone change", "color: #795548", event.target.value);
    }

    function onEmailChange(event) {
        setFormValues({ ...form, email: event.target.value });
        console.log("%cAddParticipant email change", "color: #795548", event.target.value);
    }

    function onPartnerChange(event) {
        setFormValues({ ...form, partner: event.target.value });
        console.log("%cAddParticipant partner change", "color: #795548", event.target.value);
    }

    function onINNChange(event) {
        setFormValues({ ...form, INN: event.target.value });
        console.log("%cAddParticipant INN change", "color: #795548", event.target.value);
    }

    function onORGNChange(event) {
        setFormValues({ ...form, ORGN: event.target.value });
        console.log("%cAddParticipant ORGN change", "color: #795548", event.target.value);
    }

    function onParticipantTypeChange(event) {
        setFormValues({ ...form, participantType: event.target.value });
        console.log(
            "%cAddParticipant participant type change",
            "color: #795548",
            event.target.value
        );
    }

    function onBirthDateChange(date) {
        setFormValues({ ...form, birthDate: date });
        console.log("%cAddParticipant birth date change", "color: #795548", date);
    }

    function onFormSubmit(event) {
        const partner = store.partner[GET_PARTNER_BY_TITLE]({ title: form.partner });
        const payload = {
            ...form,
            number: random(0, Number.MAX_SAFE_INTEGER).toString(),
            partner: get(partner, "id"),
        };
        console.log("%cAddParticipant submit", "color: #795548", payload);
        event.preventDefault();
        store.participant[ADD_PARTICIPANT](payload);
        navigate(BASE_PATH + "/participants");
    }

    return (
        <Layout centered>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                css={css`
                    width: 100%;
                    height: 100%;
                `}
            >
                <Grid
                    item
                    css={css`
                        max-width: 600px;
                    `}
                >
                    <SignForm
                        noIcon
                        title="Создание участника ПЛ"
                        button="СОЗДАТЬ"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <RadioGroup
                                        aria-label="Тип участника ПЛ"
                                        name="participantType"
                                        value={form.participantType}
                                        onChange={onParticipantTypeChange}
                                        css={css`
                                            flex-direction: row;
                                            justify-content: space-around;
                                        `}
                                        defaultValue="individual"
                                    >
                                        <FormControlLabel
                                            value="individual"
                                            control={<Radio />}
                                            label="Физическое лицо"
                                        />
                                        <FormControlLabel
                                            value="legalEntity"
                                            control={<Radio />}
                                            label="Юридическое лицо"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="fullName">Имя</InputLabel>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        autoComplete="fullName"
                                        autoFocus
                                        onChange={onFullNameChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="phone">Номер телефона</InputLabel>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        autoComplete="phone"
                                        onChange={onPhoneChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Эл. адрес</InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onEmailChange}
                                    />
                                </FormControl>
                                {form.participantType === "individual" && (
                                    <Fragment>
                                        <FormControl margin="normal" required fullWidth>
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <DatePicker
                                                    id="birthDate"
                                                    margin="normal"
                                                    label="Дата рождения"
                                                    value={form.birthDate}
                                                    onChange={onBirthDateChange}
                                                    format="DD MMM YYYY"
                                                />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </Fragment>
                                )}
                                {form.participantType === "legalEntity" && (
                                    <Fragment>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="partner">Компания</InputLabel>
                                            <Input
                                                id="partner"
                                                name="partner"
                                                autoComplete="partner"
                                                onChange={onPartnerChange}
                                            />
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="INN">ИНН</InputLabel>
                                            <Input
                                                id="INN"
                                                name="INN"
                                                autoComplete="INN"
                                                onChange={onINNChange}
                                            />
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="ORGN">ОРГН</InputLabel>
                                            <Input
                                                id="ORGN"
                                                name="ORGN"
                                                autoComplete="ORGN"
                                                onChange={onORGNChange}
                                            />
                                        </FormControl>
                                    </Fragment>
                                )}
                                <FormControl required fullWidth>
                                    <InputLabel shrink htmlFor="accountType">
                                        Тип счёта
                                    </InputLabel>
                                    <Select
                                        value={form.accountType}
                                        onChange={onAccountTypeChange}
                                        input={<Input name="accountType" id="accountType" />}
                                        name="communicationLanguage"
                                    >
                                        <MenuItem value="personal">Личный</MenuItem>
                                        <MenuItem value="corporate">Корпоративный</MenuItem>
                                        <MenuItem value="family">Семейный</MenuItem>
                                    </Select>
                                </FormControl>
                            </Fragment>
                        )}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}
