/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment, useEffect, useContext } from "react";
import JssProvider from "components/JssProvider";
import { Router, navigate } from "@reach/router";
import SignUp from "containers/SignUp";
import SignIn from "containers/SignIn";
import Header from "components/Header";
import Drawer from "components/Drawer";
import { StoreContext } from "index";
import Partners from "./Partners";

export default function App() {
    const store = useContext(StoreContext);

    useEffect(() => {
        if (!store.ui.isLoggedIn && process.env.NODE_ENV !== "development") {
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
                        #root {
                            margin: 0;
                            width: 100%;
                            height: 100%;
                        }

                        body {
                            background: #eeeeee;
                        }
                    `}
                />
                <Drawer />
                <Header />
                <Router
                    css={css`
                        width: 100%;
                        height: 100%;
                        display: flex;
                    `}
                >
                    <Partners path="/partners" />
                    <SignUp path="/register" />
                    <SignIn path="/login" />
                </Router>
            </Fragment>
        </JssProvider>
    );
}
