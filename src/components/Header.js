/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Link } from "@reach/router";
import { StoreContext } from "index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";

function Header() {
    const store = useContext(StoreContext);

    return (
        <header
            css={css`
                background-color: #37474f;
                position: fixed;
                width: 100%;
                z-index: 1000;

                a {
                    margin: 0 15px 0 0;
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
                    padding: 15px;
                `}
            >
                <Grid item>
                    <Link to="/register">Sign Up</Link>
                    <Link to="/login">Sign In</Link>
                    <Link to="/legal-entity-account">Юр. Лицо</Link>
                </Grid>
                <Grid item>
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
                </Grid>
            </Grid>
        </header>
    );
}

export default observer(Header);
