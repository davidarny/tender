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
import { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import StyledTableHead from "components/table/StyledTableHead";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import shortid from "shortid";
import { BASE_PATH, StoreContext } from "context";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

function Catalog() {
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
            {tabIndex === 0 && <RoutesInfo routes={store.route.routes} />}
            {tabIndex === 1 && <TrainsInfo />}
            {tabIndex === 2 && <WagonsInfo />}
        </Layout>
    );
}

function RoutesInfo({ routes }) {
    const statusNamesMap = {
        1: "Действует",
        2: "Приостановлен",
    };

    function onFabClick() {
        navigate(BASE_PATH + "/routes/add");
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Маршрут</HeaderTableCell>
                                <HeaderTableCell>Статус</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        {routes && (
                            <TableBody>
                                {routes.map(route => (
                                    <TableRow key={route.id}>
                                        <LinkTableCell to={BASE_PATH + `/routes/${route.id}`}>
                                            {route.startStation} - {route.endStation}
                                        </LinkTableCell>
                                        <TableCell
                                            css={css`
                                                color: ${route.status === 1 ? "#4CAF50" : "black"};
                                            `}
                                        >
                                            {statusNamesMap[route.status]}
                                        </TableCell>
                                        <TableCellMoreIcon />
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </Paper>
            </Grid>
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

RoutesInfo.propTypes = {
    routes: PropTypes.array.isRequired,
};

function TrainsInfo() {
    function onFabClick() {
        navigate(BASE_PATH + "/trains/add");
    }

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
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

function WagonsInfo() {
    function onFabClick() {
        navigate(BASE_PATH + "/trains/add");
    }

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
            <FixedFab onClick={onFabClick} />
        </Grid>
    );
}

export default observer(Catalog);
