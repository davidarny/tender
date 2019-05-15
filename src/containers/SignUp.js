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
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { Fragment, useState, useContext, useReducer } from "react";
import moment from "moment";
import { SET_CURRENT_USER } from "actions/user";
import { StoreContext } from "context";
import { navigate } from "@reach/router";
import faker from "faker";
import { LOG_IN } from "actions/ui";
import PropTypes from "prop-types";
import _ from "lodash";

const actions = {
    INITIAL: "INITIAL",
    SUBMIT: "SUBMIT",
    SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
};

function reducer(state, action) {
    switch (action.type) {
        case actions.SUBMIT:
            return { ...state, step: actions.SUBMIT };
        case actions.SUBMIT_SUCCESS:
            return { ...state, step: actions.SUBMIT_SUCCESS };
        case actions.REDIRECT_TO_LOGIN:
            return { ...state, step: actions.REDIRECT_TO_LOGIN };
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
    const [isSnackbarOpen, setSnackbarState] = useState(false);
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

    function onSnackbarClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarState(false);
    }

    function onFormSubmit(event) {
        event.preventDefault();
        dispatch({ type: actions.SUBMIT });
    }

    function onConfirmSuccess(event) {
        event.preventDefault();
        dispatch({ type: actions.SUBMIT_SUCCESS });
        setSnackbarState(true);
    }

    function togglePasswordVisibility() {
        setPasswordShowState(!isPasswordShown);
    }

    function onFormSuccess() {
        console.log("%cSignUp submit", "color: #3F51B5", form);
        store.user[SET_CURRENT_USER]({
            ...form,
            birthDate: form.birthDate.toDate(),
            appeal: faker.random.uuid(),
        });
        store.ui[LOG_IN]();
        navigate("/");
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
                    on={[actions.SUBMIT, actions.SUBMIT_SUCCESS]}
                    current={state.step}
                    render={() => (
                        <SignForm
                            onSubmit={onConfirmSuccess}
                            title="Confirm Sign Up"
                            button="CONFIRM"
                            controls={() => (
                                <Fragment>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="confirmCode">Confirm Code</InputLabel>
                                        <Input
                                            id="confirmCode"
                                            name="confirmCode"
                                            autoComplete="confirmCode"
                                            autoFocus
                                        />
                                    </FormControl>
                                </Fragment>
                            )}
                        />
                    )}
                />
                <FormContextSwitcher
                    on={actions.SUBMIT_SUCCESS}
                    current={state.step}
                    render={() => (
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            open={isSnackbarOpen}
                            autoHideDuration={2000}
                            onClose={onSnackbarClose}
                            onExited={onFormSuccess}
                        >
                            <SnackbarContent
                                aria-describedby="client-snackbar"
                                message={
                                    <span id="client-snackbar">
                                        <CheckCircleIcon
                                            css={css`
                                                vertical-align: bottom;
                                                margin-right: 5px;
                                            `}
                                        />
                                        <span>You're successfully registered!</span>
                                    </span>
                                }
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        onClick={onSnackbarClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            />
                        </Snackbar>
                    )}
                />
            </Grid>
        </Grid>
    );
}

function FormContextSwitcher({ on, current, render }) {
    if (_.isArray(on) && on.includes(current)) {
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
