/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import { Fragment, useState, useContext } from "react";
import { StoreContext } from "context";
import { SET_CURRENT_USER } from "actions/user";
import { getUserPayload } from "utils";
import { LOG_IN } from "actions/ui";
import { navigate } from "@reach/router";

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const store = useContext(StoreContext);

    function onEmailChange(event) {
        setEmail(event.target.value);
        console.log("%cSignIn email change", "color: #3F51B5", event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
        console.log("%cSignIn password change", "color: #3F51B5", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cSignIn submit", "color: #3F51B5", { email, password });
        event.preventDefault();
        store.user[SET_CURRENT_USER]({ ...getUserPayload(), email, password });
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
                    max-width: 400px;
                `}
            >
                <SignForm
                    title="Вход в личный кабинет"
                    button="ВХОД"
                    onSubmit={onFormSubmit}
                    controls={() => (
                        <Fragment>
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
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={onPasswordChange}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Запомнить меня"
                            />
                        </Fragment>
                    )}
                />
            </Grid>
        </Grid>
    );
}
