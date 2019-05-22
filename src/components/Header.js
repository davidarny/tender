/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import { observer } from "mobx-react-lite";
import noop from "lodash/noop";
import get from "lodash/get";
import first from "lodash/first";
import PropTypes from "prop-types";
import { BASE_PATH } from "context";
import BackButton from "components/BackButton";

function Header({ user, isLoggedIn = false, onDrawerToggle = noop }) {
    return (
        <AppBar
            position="relative"
            css={css`
                background-color: #37474f;
                width: 100%;
                height: 58px;

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
                    height: 100%;
                `}
            >
                <Grid item>
                    {isLoggedIn && (
                        <Grid container alignItems="center">
                            <Grid item>
                                <Hidden mdUp implementation="css">
                                    <IconButton
                                        color="inherit"
                                        aria-label="Open drawer"
                                        onClick={onDrawerToggle}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Hidden>
                            </Grid>
                            <Grid item>
                                <BackButton />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        css={css`
                            text-transform: none;
                            margin-right: 10px;
                        `}
                    >
                        <Link to={BASE_PATH + "/register"}>Регистрация</Link>
                    </Button>
                    <Button
                        css={css`
                            text-transform: none;
                        `}
                    >
                        <Link to={BASE_PATH + "/login"}>Вход в личный кабинет</Link>
                    </Button>
                    <div
                        css={css`
                            margin-left: 18px;
                            display: inline-block;
                        `}
                    >
                        {isLoggedIn ? (
                            <Chip
                                avatar={
                                    <Avatar>
                                        {get(user, "fullName", "Не авторизован")
                                            .split(" ")
                                            .map(word => first(word))
                                            .join("")}
                                    </Avatar>
                                }
                                label={get(user, "fullName", "Не авторизован")}
                            />
                        ) : (
                            <Chip label={"Не авторизован"} />
                        )}
                    </div>
                </Grid>
            </Grid>
        </AppBar>
    );
}

Header.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string,
    }),
    isLoggedIn: PropTypes.bool,
    onDrawerToggle: PropTypes.func,
};

export default observer(Header);
