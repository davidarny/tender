/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import { BASE_PATH, StoreContext } from "context";
import { useContext } from "react";
import { navigate } from "@reach/router";
import StyledTableHead from "components/table/StyledTableHead";
import FixedFab from "components/FixedFab";
import PropTypes from "prop-types";
import shortid from "shortid";
import { GET_LOYALTY_BY_TYPE } from "actions/loyalty";

function Loyalty() {
    const store = useContext(StoreContext);
    const [tabIndex, setTabIndex] = useState(0);

    function onTabChange(_, index) {
        setTabIndex(index);
    }

    return (
        <Layout>
            <Grid container>
                <Typography
                    variant="h2"
                    css={css`
                        font-weight: 500;
                        padding-top: 20px;
                        padding-bottom: 50px;
                    `}
                >
                    Программа лояльности
                </Typography>
            </Grid>
            <AppBar position="static">
                <Tabs value={tabIndex} onChange={onTabChange}>
                    <Tab label="Базовые правила" />
                    <Tab label="Дополнительные правила" />
                </Tabs>
            </AppBar>
            {tabIndex === 0 && (
                <BaseRolesInfo loyalties={store.loyalty[GET_LOYALTY_BY_TYPE]({ type: "base" })} />
            )}
            {tabIndex === 1 && (
                <ExtraRolesInfo loyalties={store.loyalty[GET_LOYALTY_BY_TYPE]({ type: "extra" })} />
            )}
        </Layout>
    );
}

function BaseRolesInfo({ loyalties }) {
    const transferTypeNamesMap = {
        withdraw: "Списание",
        income: "Начисление",
    };
    const conditionNamesMap = {
        cost: "Стоимость",
        distance: "Расстояние",
    };
    const statusNamesMap = {
        active: "Активно",
        nonActive: "Не активно",
    };

    function onFabClick() {
        navigate(BASE_PATH + "/loyalty/add/base");
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Название</HeaderTableCell>
                                <HeaderTableCell>Тип</HeaderTableCell>
                                <HeaderTableCell>Условие</HeaderTableCell>
                                <HeaderTableCell>Статус</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {loyalties.map(loyalty => (
                                <TableRow key={loyalty.id}>
                                    <LinkTableCell to={BASE_PATH + `/loyalty/${shortid()}`}>
                                        {loyalty.title}
                                    </LinkTableCell>
                                    <TableCell>
                                        {transferTypeNamesMap[loyalty.transferType]}
                                    </TableCell>
                                    <TableCell>{conditionNamesMap[loyalty.condition]}</TableCell>
                                    <StatusTableCell active={loyalty.status === "active"}>
                                        {statusNamesMap[loyalty.status]}
                                    </StatusTableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

function ExtraRolesInfo({ loyalties: loyalty }) {
    const transferTypeNamesMap = {
        withdraw: "Списание",
        income: "Начисление",
    };
    const statusNamesMap = {
        active: "Активно",
        nonActive: "Не активно",
    };

    function onFabClick() {
        navigate(BASE_PATH + "/loyalty/add/extra");
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Название</HeaderTableCell>
                                <HeaderTableCell>Тип</HeaderTableCell>
                                <HeaderTableCell>Статус</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {loyalty.map(loyalty => (
                                <TableRow key={loyalty.id}>
                                    <LinkTableCell to={BASE_PATH + `/loyalty/${shortid()}`}>
                                        {loyalty.title}
                                    </LinkTableCell>
                                    <TableCell>
                                        {transferTypeNamesMap[loyalty.transferType]}
                                    </TableCell>
                                    <StatusTableCell active={loyalty.status === "active"}>
                                        {statusNamesMap[loyalty.status]}
                                    </StatusTableCell>
                                    <StatusTableCell />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

function StatusTableCell({ active = false, children }) {
    return (
        <TableCell
            css={css`
                color: ${active ? "#4CAF50" : "black"};
            `}
        >
            {children}
        </TableCell>
    );
}

StatusTableCell.propTypes = {
    active: PropTypes.bool,
};

export default observer(Loyalty);
