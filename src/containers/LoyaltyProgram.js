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

function Catalog() {
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
            {tabIndex === 0 && <BaseRolesTable />}
            {tabIndex === 1 && <ExtraRolesTable />}
        </Layout>
    );
}

function BaseRolesTable() {
    const store = useContext(StoreContext);

    function onFabClick() {
        navigate(BASE_PATH + "/loyality/add-base");
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
                            {store.baseLoyaltyProgram.programs.map(program => (
                                <TableRow key={program.id}>
                                    <LinkTableCell to="#">{program.title}</LinkTableCell>
                                    <TableCell>{program.type}</TableCell>
                                    <TableCell>{program.condition}</TableCell>
                                    <StatusTableCell active={program.status === "Активно"}>
                                        {program.status}
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

function ExtraRolesTable() {
    const store = useContext(StoreContext);

    function onFabClick() {
        navigate(BASE_PATH + "/loyality/add-extra");
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
                            {store.extraLoyaltyProgram.programs.map(program => (
                                <TableRow key={program.id}>
                                    <LinkTableCell to="#">{program.title}</LinkTableCell>
                                    <TableCell>{program.type}</TableCell>
                                    <StatusTableCell active={program.status === "Активно"}>
                                        {program.status}
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

export default observer(Catalog);
