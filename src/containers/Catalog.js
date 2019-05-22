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
import { navigate, Router, Link } from "@reach/router";
import PropTypes from "prop-types";
import RouteMatcher from "components/RouteMatcher";

function Catalog() {
    const store = useContext(StoreContext);
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Layout>
            <RouteMatcher
                routes={[
                    {
                        paths: ["", "routes"],
                        render: () => setTabIndex(0),
                    },
                    {
                        path: "trains",
                        render: () => setTabIndex(1),
                    },
                    {
                        path: "wagons",
                        render: () => setTabIndex(2),
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
                    Каталог
                </Typography>
            </Grid>
            <AppBar position="static">
                <Tabs value={tabIndex}>
                    <Tab component={Link} to="routes" label="Маршруты следования" />
                    <Tab component={Link} to="trains" label="Каталог поездов" />
                    <Tab component={Link} to="wagons" label="Каталог вагонов" />
                </Tabs>
            </AppBar>
            <Router>
                <RoutesInfo path="routes" default routes={store.route.routes} />
                <TrainsInfo path="trains" trains={store.train.trains} />
                <WagonsInfo path="wagons" wagons={store.wagon.wagons} />
            </Router>
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

function TrainsInfo({ trains }) {
    function onFabClick() {
        navigate(BASE_PATH + "/trains/add");
    }

    const trainTypesMap = {
        1: "Скорый круглогодичный",
        2: "Скорый сезонного и разового обращения",
        3: "Пассажирский круглогодичный",
        4: "Высокоскоростной",
        5: "Скоростной",
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Номер поезда</HeaderTableCell>
                                <HeaderTableCell>Тип поезда</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        {trains && (
                            <TableBody>
                                {trains.map(train => (
                                    <TableRow key={train.id}>
                                        <LinkTableCell to={BASE_PATH + `/trains/${train.id}`}>
                                            {train.number}
                                        </LinkTableCell>
                                        <TableCell>{trainTypesMap[train.type]}</TableCell>
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

TrainsInfo.propTypes = {
    trains: PropTypes.array.isRequired,
};

function WagonsInfo({ wagons }) {
    function onFabClick() {
        navigate(BASE_PATH + "/wagons/add");
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
                                        <TableCell to={BASE_PATH + `/wagons/${shortid()}`}>
                                            {wagon.publicId}
                                        </TableCell>
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
