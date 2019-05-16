/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment, useEffect, useContext } from "react";
import JssProvider from "components/JssProvider";
import { Router, navigate } from "@reach/router";
import SignUp from "containers/SignUp";
import SignIn from "containers/SignIn";
import LegalEntityAccount from "containers/LegalEntityAccount";
import Header from "components/Header";
import { StoreContext } from "index";

export default function App() {
    const store = useContext(StoreContext);

    useEffect(() => {
        if (!store.ui.isLoggedIn) {
            navigate("/login");
        }
    });

    return (
        <JssProvider>
            <Fragment>
                <Global
                    styles={css`
                        body {
                            font-family: "Roboto", sans-serif;
                        }

                        html,
                        body,
                        #root,
                        div[role="group"] {
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        }

                        body {
                            background: #eeeeee;
                        }
                    `}
                />
                <Header />
                <Router>
                    <SignUp path="/register" />
                    <SignIn path="/login" />
                    <LegalEntityAccount path="/legal-entity-account" />
                </Router>
            </Fragment>
        </JssProvider>
    );
}
