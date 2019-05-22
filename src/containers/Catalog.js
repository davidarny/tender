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
            {tabIndex === 2 && <WagonsInfo wagons={store.wagon.wagons} />}
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

function WagonsInfo({ wagons }) {
    function onFabClick() {
        navigate(BASE_PATH + "/trains/add");
    }

    const wagonTypesMap = {
        1: "Купейный",
        2: "Плацкартный",
        3: "Сидячий",
        4: "Люкс (СВ)",
        5: "Мягкий",
        6: "Общий",
        7: "«Стриж»",
    };
    const wagonSubClassMap = {
        1: "2Э",
        2: "2Т",
        3: "1Р",
        4: "1Э",
        5: "1А",
        6: "3В",
        7: "1Е",
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Идентификатор</HeaderTableCell>
                                <HeaderTableCell>Класс</HeaderTableCell>
                                <HeaderTableCell>Подкласс</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        {wagons && (
                            <TableBody>
                                {wagons.map(wagon => (
                                    <TableRow key={wagon.id}>
                                        <LinkTableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                            {wagon.publicId}
                                        </LinkTableCell>
                                        <TableCell>{wagonTypesMap[wagon.type]}</TableCell>
                                        <TableCell>{wagonSubClassMap[wagon.subClass]}</TableCell>
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

WagonsInfo.propTypes = {
    wagons: PropTypes.array.isRequired,
};

export default observer(Catalog);
