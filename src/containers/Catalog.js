/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FixedFab from "components/FixedFab";
import { Link } from "@reach/router";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

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
            {tabIndex === 0 && (
                <TabContainer>
                    <RoutesTable />
                </TabContainer>
            )}
            {tabIndex === 1 && (
                <TabContainer>
                    <TrainsTable />
                </TabContainer>
            )}
            {tabIndex === 2 && (
                <TabContainer>
                    <WagonsTable />
                </TabContainer>
            )}
        </Layout>
    );
}

function HeaderTableCell({ children }) {
    return (
        <TableCell
            css={css`
                font-size: 0.9em;
                color: black;
            `}
        >
            {children}
        </TableCell>
    );
}

function LinkTableCell({ children }) {
    return (
        <TableCell>
            <Link
                css={css`
                    color: black;
                    font-weight: 500;
                `}
                to="#"
            >
                {children}
            </Link>
        </TableCell>
    );
}

function TableCellIcon() {
    return (
        <TableCell align="right">
            <IconButton>
                <MoreIcon />
            </IconButton>
        </TableCell>
    );
}

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

function RoutesTable() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <TableHead
                            css={css`
                                background-color: #b0bec5;
                            `}
                        >
                            <TableRow>
                                <HeaderTableCell>Маршрут</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell>Санкт-Петербург - Москва</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>Москва - Владивосток</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>Санкт-Петербург - Чебоксары</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab />
        </Grid>
    );
}

function TrainsTable() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <TableHead
                            css={css`
                                background-color: #b0bec5;
                            `}
                        >
                            <TableRow>
                                <HeaderTableCell>Номер поезда</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell>116С</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>858А</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>032А-Лев Толстой</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>100Э</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>133А</LinkTableCell>
                                <TableCellIcon />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <FixedFab />
        </Grid>
    );
}

function WagonsTable() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <TableHead
                            css={css`
                                background-color: #b0bec5;
                            `}
                        >
                            <TableRow>
                                <HeaderTableCell>Идентификатор</HeaderTableCell>
                                <HeaderTableCell>Класс</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell>558875</LinkTableCell>
                                <TableCell>Крупейный</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>993121</LinkTableCell>
                                <TableCell>Плацкартный</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>2123312</LinkTableCell>
                                <TableCell>Сидячий</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>5588917</LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>1128917</LinkTableCell>
                                <TableCell>Мягкий</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>5588917</LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <LinkTableCell>1128917</LinkTableCell>
                                <TableCell>Люкс (СВ)</TableCell>
                                <TableCellIcon />
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
