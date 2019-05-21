/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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

function Catalog() {
    const [tabIndex, setTabIndex] = useState(0);

    function onTabChange(event, index) {
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
                <TabContainer>
                    <BaseRoulesTable />
                </TabContainer>
            )}
            {tabIndex === 1 && (
                <TabContainer>
                    <ExtraRoulesTable />
                </TabContainer>
            )}
        </Layout>
    );
}

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

function BaseRoulesTable() {
    const store = useContext(StoreContext);

    function onFabClick() {
        navigate(BASE_PATH + "/loyality/add-base");
    }

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
                                <HeaderTableCell>Название</HeaderTableCell>
                                <HeaderTableCell>Тип</HeaderTableCell>
                                <HeaderTableCell>Условие</HeaderTableCell>
                                <HeaderTableCell>Статус</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.baseLoyaltyProgram.programs.map(program => {
                                let style = "";

                                if (program.status === "Активно") {
                                    style = "color: green;";
                                }

                                return (
                                    <TableRow key={program.id}>
                                        <LinkTableCell to="#">{program.title}</LinkTableCell>
                                        <TableCell>{program.type}</TableCell>
                                        <TableCell>{program.condition}</TableCell>
                                        <TableCell
                                            css={css`
                                                ${style}
                                            `}
                                        >
                                            {program.status}
                                        </TableCell>
                                        <TableCellMoreIcon />
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Fab
                css={css`
                    position: absolute;
                    right: 50px;
                    bottom: 50px;
                    background-color: #263238;
                    color: white;

                    :hover {
                        background-color: #455a64;
                    }
                `}
                onClick={onFabClick}
            >
                <AddIcon />
            </Fab>
        </Grid>
    );
}

function ExtraRoulesTable() {
    const store = useContext(StoreContext);

    function onFabClick() {
        navigate(BASE_PATH + "/loyality/add-extra");
    }

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
                                <HeaderTableCell>Название</HeaderTableCell>
                                <HeaderTableCell>Тип</HeaderTableCell>
                                <HeaderTableCell>Статус</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.extraLoyaltyProgram.programs.map(program => {
                                let style = "";

                                if (program.status === "Активно") {
                                    style = "color: green;";
                                }

                                return (
                                    <TableRow key={program.id}>
                                        <LinkTableCell to="#">{program.title}</LinkTableCell>
                                        <TableCell>{program.type}</TableCell>
                                        <TableCell
                                            css={css`
                                                ${style}
                                            `}
                                        >
                                            {program.status}
                                        </TableCell>
                                        <TableCellMoreIcon />
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Fab
                css={css`
                    position: absolute;
                    right: 50px;
                    bottom: 50px;
                    background-color: #263238;
                    color: white;

                    :hover {
                        background-color: #455a64;
                    }
                `}
                onClick={onFabClick}
            >
                <AddIcon />
            </Fab>
        </Grid>
    );
}

export default observer(Catalog);
