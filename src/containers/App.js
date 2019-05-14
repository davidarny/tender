/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment } from "react";
import JssProvider from "components/JssProvider";
import { Router } from "@reach/router";
import SignUp from "containers/SignUp";
import SignIn from "containers/SignIn";
import Header from "components/Header";

export default function App() {
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
                </Router>
            </Fragment>
        </JssProvider>
    );
}
