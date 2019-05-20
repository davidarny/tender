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
import StyledTableHead from "components/table/StyledTableHead";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import shortid from "shortid";
import { BASE_PATH } from "context";

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
                    Каталог
                </Typography>
            </Grid>

            <AppBar position="static">
                <Tabs value={tabIndex} onChange={onTabChange}>
                    <Tab label="Маршруты следования" />
                    <Tab label="Каталог поездов" />
                    <Tab label="Каталог вагонов" />
                </Tabs>
            </AppBar>
            {tabIndex === 0 && <RoutesInfo />}
            {tabIndex === 1 && <TrainsInfo />}
            {tabIndex === 2 && <WagonsInfo />}
        </Layout>
    );
}

function RoutesInfo() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Маршрут</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                    Санкт-Петербург - Москва
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                    Москва - Владивосток
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                    Санкт-Петербург - Чебоксары
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab />
        </Grid>
    );
}

function TrainsInfo() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Номер поезда</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/trains/${shortid()}`}>
                                    116С
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/trains/${shortid()}`}>
                                    858А
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/trains/${shortid()}`}>
                                    032А-Лев Толстой
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/trains/${shortid()}`}>
                                    100Э
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/trains/${shortid()}`}>
                                    133А
                                </LinkTableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab />
        </Grid>
    );
}

function WagonsInfo() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Идентификатор</HeaderTableCell>
                                <HeaderTableCell>Класс</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    558875
                                </LinkTableCell>
                                <TableCell>Купейный</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    993121
                                </LinkTableCell>
                                <TableCell>Плацкартный</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    2123312
                                </LinkTableCell>
                                <TableCell>Сидячий</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    5588917
                                </LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    1128917
                                </LinkTableCell>
                                <TableCell>Мягкий</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    5588917
                                </LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                    1128917
                                </LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab />
        </Grid>
    );
}

export default observer(Catalog);
