/** @jsx jsx */

import { css, jsx } from "@emotion/core";
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
import * as PropTypes from "prop-types";
import { BASE_PATH } from "context";
import BackButton from "components/BackButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LogoutIcon from "@material-ui/icons/ExitToApp";

function Header({ user, isLoggedIn = false, onDrawerToggle = noop, onLogoutClick = noop }) {
    const [anchorEl, setAnchorEl] = useState(null);

    function onMenuClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function onCloseMenu() {
        setAnchorEl(null);
    }

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
                    {!isLoggedIn && (
                        <Fragment>
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
                        </Fragment>
                    )}
                    <div
                        css={css`
                            margin-left: 18px;
                            display: inline-block;
                        `}
                    >
                        {isLoggedIn ? (
                            <Chip
                                aria-owns={anchorEl ? "profile-menu" : undefined}
                                aria-haspopup="true"
                                onClick={onMenuClick}
                                avatar={
                                    <Avatar>
                                        {get(user, "fullName", "Не авторизован")
                                            .split(" ")
                                            .slice(0, 2)
                                            .map(word => first(word).toUpperCase())
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
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onCloseMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem
                    onClick={() => {
                        onLogoutClick();
                        onCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">Выход</Typography>
                </MenuItem>
            </Menu>
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
