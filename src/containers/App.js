/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment, useContext } from "react";
import JssProvider from "components/JssProvider";
import { Router, Match } from "@reach/router";
import Header from "components/Header";
import Drawer from "components/Drawer";
import PrivateRoute from "components/PrivateRoute";
import { StoreContext, BASE_PATH } from "context";
import { TOGGLE_DRAWER, LOG_OUT } from "actions/ui";
import { observer } from "mobx-react-lite";
import Loadable from "react-loadable";
import Loading from "components/Loading";
import Grid from "@material-ui/core/Grid";

const AsyncPartners = Loadable({
    loader: () => import("containers/Partners"),
    loading: Loading,
});
const AsyncParticipants = Loadable({
    loader: () => import("containers/Participants"),
    loading: Loading,
});
const AsyncSignUp = Loadable({
    loader: () => import("containers/SignUp"),
    loading: Loading,
});
const AsyncSignIn = Loadable({
    loader: () => import("containers/SignIn"),
    loading: Loading,
});

function App() {
    const store = useContext(StoreContext);

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
                        body {
                            margin: 0;
                            height: 100%;
                            width: 100%;
                        }

                        body {
                            background: #eeeeee;
                        }
                    `}
                />
                <PrivateRoute
                    isLoggedIn={store.ui.isLoggedIn}
                    noRedirect
                    render={() => (
                        <Fragment>
                            <Match path="/login">
                                {props => props.match && store.ui[LOG_OUT]()}
                            </Match>
                            <Match path="/register">
                                {props => props.match && store.ui[LOG_OUT]()}
                            </Match>
                        </Fragment>
                    )}
                />
                <Grid
                    container
                    direction="row"
                    css={css`
                        width: 100%;
                        height: 100%;
                        flex-wrap: nowrap;
                    `}
                >
                    <Grid
                        item
                        css={css`
                            flex-shrink: 0;
                            height: 100%;
                        `}
                    >
                        {store.ui.isLoggedIn && (
                            <Drawer
                                items={store.ui.drawer}
                                isOpen={store.ui.isDrawerOpen}
                                onToggle={onDrawerToggle}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        css={css`
                            flex-grow: 1;
                        `}
                    >
                        <Header
                            user={store.user.current}
                            isLoggedIn={store.ui.isLoggedIn}
                            onDrawerToggle={onDrawerToggle}
                        />
                        <Router
                            css={css`
                                width: ${store.ui.isLoggedIn ? "calc(100% - 60px)" : "100%"};
                                height: calc(100% - 58px);
                                padding: ${store.ui.isLoggedIn ? "0 40px 0 20px" : "0"};
                                display: flex;
                            `}
                            basepath={BASE_PATH === "" ? "/" : BASE_PATH}
                        >
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="/"
                                render={() => <Fragment />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="partners"
                                render={() => <AsyncPartners />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="participants"
                                render={() => <AsyncParticipants />}
                            />
                            <AsyncSignUp path="register" />
                            <AsyncSignIn path="login" />
                        </Router>
                    </Grid>
                </Grid>
            </Fragment>
        </JssProvider>
    );
}

export default observer(App);
