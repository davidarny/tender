/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import { Fragment, useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

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
                    title="Sign In"
                    button="SIGN IN"
                    onSubmit={onFormSubmit}
                    controls={() => (
                        <Fragment>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={onEmailChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
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
                                label="Remember me"
                            />
                        </Fragment>
                    )}
                />
            </Grid>
        </Grid>
    );
}
