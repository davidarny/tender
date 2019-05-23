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
import { navigate, Router, Link } from "@reach/router";
import StyledTableHead from "components/table/StyledTableHead";
import FixedFab from "components/FixedFab";
import PropTypes from "prop-types";
import { GET_LOYALTY_BY_TYPE } from "actions/loyalty";
import RouteMatcher from "components/RouteMatcher";

function Loyalty() {
    const store = useContext(StoreContext);
    const [tabIndex, setTabIndex] = useState(0);

    function onTabChange(_, index) {
        setTabIndex(index);
    }

    return (
        <Layout>
            <RouteMatcher
                routes={[
                    {
                        paths: ["", "tab/base"],
                        render: () => setTabIndex(0),
                    },
                    {
                        path: "tab/extra",
                        render: () => setTabIndex(1),
                    },
                ]}
            />
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
                    <Tab component={Link} to="tab/base" label="Базовые правила" />
                    <Tab component={Link} to="tab/extra" label="Дополнительные правила" />
                </Tabs>
            </AppBar>
            <Router>
                <BaseRolesInfo
                    path="tab/base"
                    default
                    loyalties={store.loyalty[GET_LOYALTY_BY_TYPE]({ type: "base" })}
                />
                <ExtraRolesInfo
                    path="tab/extra"
                    loyalties={store.loyalty[GET_LOYALTY_BY_TYPE]({ type: "extra" })}
                />
            </Router>
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
        1: "Активно",
        2: "Не активно",
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
                                    <LinkTableCell to={BASE_PATH + `/loyalty/${loyalty.id}`}>
                                        {loyalty.title}
                                    </LinkTableCell>
                                    <TableCell>
                                        {transferTypeNamesMap[loyalty.transferType]}
                                    </TableCell>
                                    <TableCell>{conditionNamesMap[loyalty.condition]}</TableCell>
                                    <StatusTableCell active={loyalty.status === 1}>
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

BaseRolesInfo.propTypes = {
    loyalties: PropTypes.array.isRequired,
};

function ExtraRolesInfo({ loyalties }) {
    const transferTypeNamesMap = {
        withdraw: "Списание",
        income: "Начисление",
    };
    const statusNamesMap = {
        1: "Активно",
        2: "Не активно",
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
                            {loyalties.map(loyalty => (
                                <TableRow key={loyalty.id}>
                                    <LinkTableCell to={BASE_PATH + `/loyalty/${loyalty.id}`}>
                                        {loyalty.title}
                                    </LinkTableCell>
                                    <TableCell>
                                        {transferTypeNamesMap[loyalty.transferType]}
                                    </TableCell>
                                    <StatusTableCell active={loyalty.status === 1}>
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

ExtraRolesInfo.propTypes = {
    loyalties: PropTypes.array.isRequired,
};

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
