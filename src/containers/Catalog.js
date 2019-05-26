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
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import { BASE_PATH, StoreContext } from "context";
import { navigate, Router, Link } from "@reach/router";
import * as PropTypes from "prop-types";
import RouteMatcher from "components/RouteMatcher";
import { GET_WAGON_CLASS_BY_ID, GET_WAGON_TYPE_BY_ID } from "actions/wagon";
import get from "lodash/get";
import LinkTableCell from "components/table/LinkTableCell";

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
            <Router primary={false}>
                <RoutesInfo path="" default routes={store.route.routes} />
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
                                        <LinkTableCell fake>
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
                                        <LinkTableCell fake>{train.number}</LinkTableCell>
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
    const store = useContext(StoreContext);

    function onFabClick() {
        navigate(BASE_PATH + "/wagons/add");
    }

    function getWagonTypeNameById(id) {
        const wagonType = store.wagon[GET_WAGON_TYPE_BY_ID]({ id });
        return get(wagonType, "title", "");
    }

    function getWagonClassNameById(id) {
        const wagonClass = store.wagon[GET_WAGON_CLASS_BY_ID]({ id });
        return get(wagonClass, "title", "");
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>Идентификатор</HeaderTableCell>
                                <HeaderTableCell>Тип вагона</HeaderTableCell>
                                <HeaderTableCell>Класс</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </StyledTableHead>
                        {wagons && (
                            <TableBody>
                                {wagons.map(wagon => (
                                    <TableRow key={wagon.id}>
                                        <LinkTableCell fake>{wagon.publicId}</LinkTableCell>
                                        <TableCell>{getWagonTypeNameById(wagon.type)}</TableCell>
                                        <TableCell>{getWagonClassNameById(wagon.class)}</TableCell>
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
