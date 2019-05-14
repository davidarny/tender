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
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { Fragment, useState, useContext } from "react";
import moment from "moment";
import { SET_CURRENT_USER } from "actions/user";
import { StoreContext } from "index";
import { navigate } from "@reach/router";
import faker from "faker";

export default function SignUp() {
    const [fullName, setFullName] = useState();
    const [birthDate, setBirthDate] = useState(moment());
    const [preferredCommunicationMethod, setPreferredCommunicationMethod] = useState("email");
    const [idDocument, setIdDocument] = useState({
        documentType: undefined,
        documentId: undefined,
    });
    const [consentToCommunication, setConsentToCommunication] = useState(false);

    const store = useContext(StoreContext);

    function onFullNameChange(event) {
        setFullName(event.target.value);
        console.log("%cSignIn full name change", "color: #3F51B5", event.target.value);
    }

    function onBirthDateChange(date) {
        setBirthDate(date);
        console.log("%cSignUp birth date change", "color: #3F51B5", date);
    }

    function onPreferredCommunicationMethodChange(event) {
        setPreferredCommunicationMethod(event.target.value);
        console.log(
            "%cSignUp preferred communication method change",
            "color: #3F51B5",
            event.target.value
        );
    }

    function onDocumentTypeChange(event) {
        setIdDocument({ ...idDocument, documentType: event.target.value });
        console.log("%cSignIn ID document type change", "color: #3F51B5", event.target.value);
    }

    function onDocumentIdChange(event) {
        setIdDocument({ ...idDocument, documentId: event.target.value });
        console.log("%cSignIn ID document number change", "color: #3F51B5", event.target.value);
    }

    function onConsentToCommunicationChange(event) {
        setConsentToCommunication(event.target.checked);
        console.log(
            "%cSignIn consent to communication change",
            "color: #3F51B5",
            event.target.checked
        );
    }

    function onFormSubmit(event) {
        const payload = {
            fullName,
            birthDate: birthDate.toDate(),
            preferredCommunicationMethod,
            idDocument,
            consentToCommunication,
        };
        console.log("%cSignIn submit", "color: #3F51B5", payload);
        event.preventDefault();
        store.user[SET_CURRENT_USER]({
            ...payload,
            appeal: faker.random.uuid(),
        });
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
                    max-width: 500px;
                `}
            >
                <SignForm
                    title="Sign Up"
                    button="SIGN UP"
                    onSubmit={onFormSubmit}
                    controls={() => (
                        <Fragment>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    autoComplete="fullName"
                                    autoFocus
                                    onChange={onFullNameChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        id="birthDate"
                                        margin="normal"
                                        label="Birth Date"
                                        value={birthDate}
                                        onChange={onBirthDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <FormLabel component="legend">
                                    Preferred Communication Method
                                </FormLabel>
                                <RadioGroup
                                    aria-label="Preferred Communication Method"
                                    name="preferredCommunicationMethod"
                                    value={preferredCommunicationMethod}
                                    onChange={onPreferredCommunicationMethodChange}
                                >
                                    <FormControlLabel
                                        value="email"
                                        control={<Radio />}
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        value="phone"
                                        control={<Radio />}
                                        label="Phone"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <FormLabel component="legend">ID document</FormLabel>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="documentType">Document Type</InputLabel>
                                    <Input
                                        id="documentType"
                                        name="documentType"
                                        autoComplete="documentType"
                                        onChange={onDocumentTypeChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="documentNumber">
                                        Document Number
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
                                label="Consent To Communication"
                            />
                        </Fragment>
                    )}
                />
            </Grid>
        </Grid>
    );
}
