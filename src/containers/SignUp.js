/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { Fragment, useState, useContext, useReducer } from "react";
import moment from "moment";
import { SET_CURRENT_USER } from "actions/user";
import { StoreContext, BASE_PATH } from "context";
import { navigate } from "@reach/router";
import { LOG_IN } from "actions/ui";
import PropTypes from "prop-types";
import isArray from "lodash/isArray";
import shortid from "shortid";

const actions = {
    INITIAL: "INITIAL",
    SUBMIT: "SUBMIT",
};

function reducer(state, action) {
    switch (action.type) {
        case actions.SUBMIT:
            return { ...state, step: actions.SUBMIT };
        default:
            return { ...state, step: actions.INITIAL };
    }
}

export default function SignUp() {
    const [form, setFormValues] = useState({
        fullName: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        birthDate: moment(),
        preferredCommunicationMethod: "email",
        idDocument: {
            documentType: undefined,
            documentId: undefined,
        },
        consentToCommunication: false,
    });
    const [isPasswordShown, setPasswordShowState] = useState(false);
    const [state, dispatch] = useReducer(reducer, { step: actions.INITIAL });
    const store = useContext(StoreContext);

    function onFullNameChange(event) {
        setFormValues({ ...form, fullName: event.target.value });
        console.log("%cSignUp full name change", "color: #3F51B5", event.target.value);
    }

    function onEmailChange(event) {
        setFormValues({ ...form, phone: event.target.value });
        console.log("%cSignUp email change", "color #3F51B5", event.target.value);
    }

    function onPhoneChange(event) {
        setFormValues({ ...form, phone: event.target.value });
        console.log("%cSignUp phone change", "color #3F51B5", event.target.value);
    }

    function onPasswordChange(event) {
        setFormValues({ ...form, password: event.target.value });
        console.log("%cSignUp password change", "color #3F51B5", event.target.value);
    }

    function onBirthDateChange(date) {
        setFormValues({ ...form, birthDate: date });
        console.log("%cSignUp birth date change", "color: #3F51B5", date);
    }

    function onPreferredCommunicationMethodChange(event) {
        setFormValues({ ...form, preferredCommunicationMethod: event.target.value });
        console.log(
            "%cSignUp preferred communication method change",
            "color: #3F51B5",
            event.target.value
        );
    }

    function onDocumentTypeChange(event) {
        setFormValues({
            ...form,
            idDocument: {
                ...form.idDocument,
                documentType: event.target.value,
            },
        });
        console.log("%cSignIn ID document type change", "color: #3F51B5", event.target.value);
    }

    function onDocumentIdChange(event) {
        setFormValues({
            ...form,
            idDocument: {
                ...form.idDocument,
                documentId: event.target.value,
            },
        });
        console.log("%cSignIn ID document number change", "color: #3F51B5", event.target.value);
    }

    function onConsentToCommunicationChange(event) {
        setFormValues({ ...form, consentToCommunication: event.target.checked });
        console.log(
            "%cSignIn consent to communication change",
            "color: #3F51B5",
            event.target.checked
        );
    }

    function onFormSubmit(event) {
        event.preventDefault();
        dispatch({ type: actions.SUBMIT });
    }

    function togglePasswordVisibility() {
        setPasswordShowState(!isPasswordShown);
    }

    function onFormSuccess() {
        console.log("%cSignUp submit", "color: #3F51B5", form);
        store.user[SET_CURRENT_USER]({
            ...form,
            birthDate: form.birthDate.toDate(),
            appeal: shortid(),
        });
        store.ui[LOG_IN]();
        console.log(BASE_PATH === "" ? "/" : BASE_PATH);
        navigate(BASE_PATH === "" ? "/" : BASE_PATH);
    }

    return (
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
                <FormContextSwitcher
                    on={actions.INITIAL}
                    current={state.step}
                    render={() => (
                        <SignForm
                            title="Регистрация"
                            button="РЕГИСТРАЦИЯ"
                            onSubmit={onFormSubmit}
                            controls={() => (
                                <Fragment>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="fullName">Полное имя</InputLabel>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            autoComplete="fullName"
                                            onChange={onFullNameChange}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">Эл. адрес</InputLabel>
                                        <Input
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={onEmailChange}
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="phoneNumber">Телефон</InputLabel>
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            autoComplete="phoneNumber"
                                            onChange={onPhoneChange}
                                        />
                                    </FormControl>
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
                                        >
                                            <FormControlLabel
                                                value="email"
                                                control={
                                                    <Radio
                                                        checked={
                                                            form.preferredCommunicationMethod ===
                                                            "email"
                                                        }
                                                    />
                                                }
                                                label="Эл. адрес"
                                            />
                                            <FormControlLabel
                                                value="phone"
                                                control={
                                                    <Radio
                                                        checked={
                                                            form.preferredCommunicationMethod ===
                                                            "phone"
                                                        }
                                                    />
                                                }
                                                label="Телефон"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <FormLabel component="legend">
                                            Документы удостоверяющие личность
                                        </FormLabel>
                                        <FormControl required fullWidth>
                                            <InputLabel htmlFor="documentType">
                                                Тип документа
                                            </InputLabel>
                                            <Input
                                                id="documentType"
                                                name="documentType"
                                                autoComplete="documentType"
                                                onChange={onDocumentTypeChange}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth>
                                            <InputLabel htmlFor="documentNumber">
                                                Номер документа
                                            </InputLabel>
                                            <Input
                                                id="documentNumber"
                                                name="documentNumber"
                                                autoComplete="documentNumber"
                                                onChange={onDocumentIdChange}
                                            />
                                        </FormControl>
                                    </FormControl>
                                    <FormControlLabel
                                        required
                                        control={
                                            <Checkbox
                                                value="consentToCommunication"
                                                color="primary"
                                                onChange={onConsentToCommunicationChange}
                                            />
                                        }
                                        label="Согласие на коммуникации"
                                    />
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Пароль</InputLabel>
                                        <Input
                                            id="password"
                                            name="password"
                                            autoComplete="current-password"
                                            type={isPasswordShown ? "text" : "password"}
                                            onChange={onPasswordChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Переключить видимость пароля"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {isPasswordShown ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Fragment>
                            )}
                        />
                    )}
                />
                <FormContextSwitcher
                    on={[actions.SUBMIT]}
                    current={state.step}
                    render={() => (
                        <SignForm
                            onSubmit={onFormSuccess}
                            title="Регистрация прошла успешно"
                            button="ВОЙТИ В ЛИЧНЫЙ КАБИНЕТ"
                            noIcon
                            controls={() => (
                                <Fragment>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        css={css`
                                            margin: 20px 0 30px;
                                        `}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                Теперь вы полноценный участник программы лояльности
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            )}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}

function FormContextSwitcher({ on, current, render }) {
    if (isArray(on) && on.includes(current)) {
        return render();
    } else if (on === current) {
        return render();
    } else {
        return <Fragment />;
    }
}

FormContextSwitcher.propTypes = {
    on: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    current: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
};
