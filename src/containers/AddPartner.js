/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Fragment, useState, useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import { ADD_PARTNER } from "actions/partner";
import { getPartnerPayload } from "utils";
import { navigate } from "@reach/router";
import shortid from "shortid";
import Layout from "components/Layout";

export default function AddPartner() {
    const [form, setFormValues] = useState({
        title: undefined,
        phone: undefined,
        email: undefined,
        INN: undefined,
        ORGN: undefined,
        communicationLanguage: "ru",
        preferredCommunicationMethod: "email",
        manager: undefined,
        category: "banks",
    });
    const store = useContext(StoreContext);

    function onTitleChange(event) {
        setFormValues({ ...form, title: event.target.value });
        console.log("%cAddPartner title change", "color: #2E7D32", event.target.value);
    }

    function onINNChange(event) {
        setFormValues({ ...form, INN: event.target.value });
        console.log("%cAddPartner INN change", "color: #2E7D32", event.target.value);
    }

    function onORGNChange(event) {
        setFormValues({ ...form, ORGN: event.target.value });
        console.log("%cAddPartner ORGN change", "color: #2E7D32", event.target.value);
    }

    function onLanguageChange(event) {
        setFormValues({ ...form, communicationLanguage: event.target.value });
        console.log("%cAddPartner language change", "color: #2E7D32", event.target.value);
    }

    function onCategoryChange(event) {
        setFormValues({ ...form, category: event.target.value });
        console.log("%cAddPartner category change", "color: #2E7D32", event.target.value);
    }

    function onPhoneChange(event) {
        setFormValues({ ...form, phone: event.target.value });
        console.log("%cAddPartner phone change", "color: #2E7D32", event.target.value);
    }

    function onEmailChange(event) {
        setFormValues({ ...form, email: event.target.value });
        console.log("%cAddPartner email change", "color: #2E7D32", event.target.value);
    }

    function onPreferredCommunicationMethodChange(event) {
        setFormValues({ ...form, preferredCommunicationMethod: event.target.value });
        console.log(
            "%cAddPartner preferred communication method change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onFormSubmit(event) {
        console.log("%cAddPartner submit", "color: #2E7D32", form);
        event.preventDefault();
        store.partner[ADD_PARTNER]({ ...getPartnerPayload(), ...form, manager: shortid() });
        navigate(BASE_PATH + "/partners");
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
                        title="Новый партнёр"
                        button="ЗАРЕГИСТРИРОВАТЬ"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">Название партнёра</InputLabel>
                                    <Input
                                        id="title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        onChange={onTitleChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel shrink htmlFor="category">
                                        Категория
                                    </InputLabel>
                                    <Select
                                        value={form.category}
                                        onChange={onCategoryChange}
                                        input={<Input name="category" id="category" />}
                                        name="category"
                                        defaultValue="banks"
                                    >
                                        <MenuItem value="banks">Банки</MenuItem>
                                        <MenuItem value="hotels">Отели</MenuItem>
                                        <MenuItem value="relax">Отдых и развлечения</MenuItem>
                                        <MenuItem value="other">Другое</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">ИНН</InputLabel>
                                    <Input
                                        id="INN"
                                        name="INN"
                                        autoComplete="INN"
                                        onChange={onINNChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">ОРГН</InputLabel>
                                    <Input
                                        id="ORGN"
                                        name="ORGN"
                                        autoComplete="ORGN"
                                        onChange={onORGNChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel shrink htmlFor="communicationLanguage">
                                        Язык коммуникации
                                    </InputLabel>
                                    <Select
                                        value={form.communicationLanguage}
                                        onChange={onLanguageChange}
                                        input={
                                            <Input
                                                name="communicationLanguage"
                                                id="communicationLanguage"
                                            />
                                        }
                                        name="communicationLanguage"
                                        defaultValue="ru"
                                    >
                                        <MenuItem value="ru">Русский</MenuItem>
                                        <MenuItem value="en">Английский</MenuItem>
                                        <MenuItem value="fr">Французский</MenuItem>
                                        <MenuItem value="ge">Немецкий</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">Телефон</InputLabel>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        autoComplete="phone"
                                        onChange={onPhoneChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">Эл. почта</InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onEmailChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <FormLabel component="legend">
                                        Предпочтительный способ связи
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="Предпочтительный способ связи"
                                        name="preferredCommunicationMethod"
                                        value={form.preferredCommunicationMethod}
                                        onChange={onPreferredCommunicationMethodChange}
                                        css={css`
                                            flex-direction: row;
                                        `}
                                        defaultValue="email"
                                    >
                                        <FormControlLabel
                                            value="email"
                                            control={<Radio />}
                                            label="Эл. адрес"
                                        />
                                        <FormControlLabel
                                            value="phone"
                                            control={<Radio />}
                                            label="Телефон"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Fragment>
                        )}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}
