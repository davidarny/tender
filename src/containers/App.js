/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment, useEffect, useContext } from "react";
import JssProvider from "components/JssProvider";
import { Router, navigate } from "@reach/router";
import SignUp from "containers/SignUp";
import SignIn from "containers/SignIn";
import Partners from "containers/Partners";
import Header from "components/Header";
import Drawer from "components/Drawer";
import { StoreContext, BASE_PATH } from "context";
import { TOGGLE_DRAWER } from "actions/ui";
import { observer } from "mobx-react-lite";

function App() {
    const store = useContext(StoreContext);

    useEffect(() => {
        if (!store.ui.isLoggedIn && process.env.NODE_ENV !== "development") {
            navigate(BASE_PATH + "/login");
        }
    });

    function onDrawerToggle() {
        store.ui[TOGGLE_DRAWER]();
    }

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
                <Drawer
                    items={store.ui.drawer}
                    isOpen={store.ui.isDrawerOpen}
                    onToggle={onDrawerToggle}
                />
                <Header
                    user={store.user.current}
                    isLoggedIn={store.ui.isLoggedIn}
                    onDrawerToggle={onDrawerToggle}
                />
                <Router
                    css={css`
                        width: 100%;
                        height: 100%;
                        display: flex;
                    `}
                    basepath={BASE_PATH === "" ? "/" : BASE_PATH}
                >
                    <Partners path="partners" />
                    <SignUp path="register" />
                    <SignIn path="login" />
                </Router>
            </Fragment>
        </JssProvider>
    );
}

export default observer(App);
