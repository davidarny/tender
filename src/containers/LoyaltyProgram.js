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
import FixedFab from "components/FixedFab";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import { BASE_PATH } from "context";
import { navigate } from "@reach/router";
import StyledTableHead from "components/table/StyledTableHead";
import shortid from "shortid";

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
            {tabIndex === 0 && <BaseRolesInfo />}
            {tabIndex === 1 && <ExtraRolesInfo />}
        </Layout>
    );
}

function BaseRolesInfo() {
    function onFabClick() {
        navigate(BASE_PATH + "loyality/add-base");
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
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `rules/${shortid()}`}>
                                    Стандартное правило
                                </LinkTableCell>
                                <TableCell>Списание</TableCell>
                                <TableCell>Расстояние</TableCell>
                                <ActiveTableCell>Активно</ActiveTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `rules/${shortid()}`}>
                                    Дальние поездки
                                </LinkTableCell>
                                <TableCell>Начисление</TableCell>
                                <TableCell>Стоимость</TableCell>
                                <ActiveTableCell>Активно</ActiveTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `rules/${shortid()}`}>
                                    Стандартное правлило
                                </LinkTableCell>
                                <TableCell>Начисление</TableCell>
                                <TableCell>Стоимость</TableCell>
                                <TableCell>Не активно</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

function ExtraRolesInfo() {
    function onFabClick() {
        navigate(BASE_PATH + "loyality/add-extra");
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
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `rules/${shortid()}`}>
                                    Тестовое правило
                                </LinkTableCell>
                                <TableCell>Списание</TableCell>
                                <ActiveTableCell>Активно</ActiveTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `rules/${shortid()}`}>
                                    Поездки в столицу
                                </LinkTableCell>
                                <TableCell>Начисление</TableCell>
                                <ActiveTableCell>Активно</ActiveTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

function ActiveTableCell({ children }) {
    return (
        <TableCell
            css={css`
                color: #4caf50;
            `}
        >
            {children}
        </TableCell>
    );
}

export default observer(Catalog);
