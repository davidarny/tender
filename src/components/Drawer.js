/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import MaterialDrawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PartnersIcon from "@material-ui/icons/Public";
import ParticipantsIcon from "@material-ui/icons/List";
import TicketIcon from "@material-ui/icons/Receipt";
import StatisticIcon from "@material-ui/icons/Poll";
import DealIcon from "@material-ui/icons/LocalOffer";
import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import get from "lodash/get";
import noop from "lodash/noop";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { BASE_PATH } from "context";
import Hidden from "@material-ui/core/Hidden";

function Drawer({ items, isOpen = false, onToggle = noop }) {
    const icons = [
        <HomeIcon />,
        <PeopleIcon />,
        <PartnersIcon />,
        <ParticipantsIcon />,
        <TicketIcon />,
        <StatisticIcon />,
        <DealIcon />,
    ];

    return (
        <Fragment>
            <Hidden
                mdUp
                implementation="css"
                css={css`
                    height: 100%;
                `}
            >
                <MaterialDrawer
                    open={isOpen}
                    anchor="left"
                    PaperProps={{
                        style: {
                            width: "300px",
                        },
                    }}
                    onClick={onToggle}
                    onKeyDown={onToggle}
                >
                    <div
                        css={css`
                            height: calc(58px - 1px);
                        `}
                    />
                    <Divider />
                    <List>
                        {items.map((item, index) => (
                            <ListItem
                                button
                                css={css`
                                    padding-top: 17px;
                                    padding-bottom: 17px;
                                `}
                                key={index}
                                onClick={() => navigate(BASE_PATH + item.url)}
                            >
                                <ListItemIcon>{get(icons, `[${index}]`)}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                    </List>
                </MaterialDrawer>
            </Hidden>
            <Hidden
                smDown
                implementation="css"
                css={css`
                    height: 100%;
                `}
            >
                <MaterialDrawer
                    anchor="left"
                    variant="permanent"
                    PaperProps={{
                        style: {
                            width: "100%",
                            position: "relative",
                        },
                    }}
                    css={css`
                        height: 100%;
                    `}
                >
                    <div
                        css={css`
                            height: calc(58px - 1px);
                        `}
                    />
                    <Divider />
                    <List>
                        {items.map((item, index) => (
                            <ListItem
                                button
                                css={css`
                                    padding-top: 17px;
                                    padding-bottom: 17px;
                                `}
                                key={index}
                                onClick={() => navigate(BASE_PATH + item.url)}
                            >
                                <ListItemIcon>{get(icons, `[${index}]`)}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                    </List>
                </MaterialDrawer>
            </Hidden>
        </Fragment>
    );
}

Drawer.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default observer(Drawer);
