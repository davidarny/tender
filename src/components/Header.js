/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import { StoreContext } from "index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { TOGGLE_DRAWER } from "actions/ui";

function Header() {
    const store = useContext(StoreContext);

    function onDrawerToggle() {
        store.ui[TOGGLE_DRAWER]();
    }

    return (
        <AppBar
            position="fixed"
            css={css`
                background-color: #37474f;
                position: fixed;
                width: 100%;
                z-index: 1100;

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: 300;
                }
            `}
        >
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                css={css`
                    padding: 5px 10px;
                `}
            >
                <Grid item>
                    <IconButton color="inherit" aria-label="Open drawer" onClick={onDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Button
                        css={css`
                            text-transform: none;
                            margin-right: 10px;
                        `}
                    >
                        <Link to="/register">Sign Up</Link>
                    </Button>
                    <Button
                        css={css`
                            text-transform: none;
                        `}
                    >
                        <Link to="/login">Sign In</Link>
                    </Button>
                    <div
                        css={css`
                            margin-left: 18px;
                            display: inline-block;
                        `}
                    >
                        {store.ui.isLoggedIn ? (
                            <Chip
                                avatar={
                                    <Avatar>
                                        {_.get(store.user, "current.fullName", "Not Logged")
                                            .split(" ")
                                            .map(word => _.first(word))
                                            .join("")}
                                    </Avatar>
                                }
                                label={_.get(store.user, "current.fullName", "Not Logged")}
                            />
                        ) : (
                            <Chip label={"Not Logged"} />
                        )}
                    </div>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default observer(Header);
