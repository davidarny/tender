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
import { useContext, Fragment } from "react";
import { StoreContext } from "index";
import { TOGGLE_DRAWER } from "actions/ui";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { navigate } from "@reach/router";

function Drawer() {
    const store = useContext(StoreContext);

    function onDrawerToggle() {
        store.ui[TOGGLE_DRAWER]();
    }

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
            <MaterialDrawer
                open={store.ui.isDrawerOpen}
                anchor="left"
                PaperProps={{
                    style: {
                        width: "240px",
                    },
                }}
                onClick={onDrawerToggle}
                onKeyDown={onDrawerToggle}
            >
                <div
                    css={css`
                        height: 58px;
                    `}
                />
                <Divider />
                <List>
                    {store.ui.drawer.map((text, index) => (
                        <ListItem
                            button
                            css={css`
                                padding-top: 17px;
                                padding-bottom: 17px;
                            `}
                            key={index}
                            onClick={() => navigate(_.toLower(text))}
                        >
                            <ListItemIcon>{_.get(icons, `[${index}]`)}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </MaterialDrawer>
        </Fragment>
    );
}

export default observer(Drawer);
