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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "@reach/router";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function Participants() {
    let status = "Premium";
    let totalPoints = 778;

    const [value, setValue] = React.useState(0);
    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Layout>
            <Grid
                container
                css={css`
                    padding: 20px;
                `}
            >
                <Grid item xs={3}>
                    <span>РосГосСтрах</span>
                </Grid>
                <Grid item xs={5}>
                    <span>Статус: {status}</span>
                </Grid>
                <Grid item xs={4}>
                    <span>Количество баллов: {totalPoints}</span>
                </Grid>
            </Grid>

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Участники ПЛ" />
                    <Tab label="Поездки" />
                    <Tab label="Тикеты" />
                </Tabs>
            </AppBar>
            {value === 0 && (
                <TabContainer>
                    <ParticipantsPL />
                </TabContainer>
            )}
            {value === 1 && (
                <TabContainer>
                    <Trips />
                </TabContainer>
            )}
            {value === 2 && (
                <TabContainer>
                    <Tickets />
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

function ParticipantsTableCell({ children }) {
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

function ParticipantsPL() {
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
                                <HeaderTableCell>Номер УПЛ</HeaderTableCell>
                                <HeaderTableCell>ФИО</HeaderTableCell>
                                <HeaderTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <ParticipantsTableCell>Иванов Иван Иванович</ParticipantsTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <ParticipantsTableCell>
                                    Мельников Рустам Фахитович
                                </ParticipantsTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <ParticipantsTableCell>
                                    Меньшиков Владимир Александрович
                                </ParticipantsTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <ParticipantsTableCell>
                                    Дюжев Алексей Станиславович
                                </ParticipantsTableCell>
                                <TableCellIcon />
                            </TableRow>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <ParticipantsTableCell>Лер Максим Евгеньевич</ParticipantsTableCell>
                                <TableCellIcon />
                            </TableRow>
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
            >
                <AddIcon />
            </Fab>
        </Grid>
    );
}

function Tickets() {
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
                                <HeaderTableCell>Номер Тикета</HeaderTableCell>
                                <HeaderTableCell>Тема</HeaderTableCell>
                                <HeaderTableCell>Сотрудник</HeaderTableCell>
                                <HeaderTableCell>Дата обращения</HeaderTableCell>
                                <HeaderTableCell align="right">Статус</HeaderTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1545673513</TableCell>
                                <TableCell>Мне не начислили баллы.</TableCell>
                                <TableCell>Владимир Владимирович Путин</TableCell>
                                <TableCell>1 мая 2019 17:45</TableCell>
                                <TableCell>Решено</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1545673512</TableCell>
                                <TableCell>
                                    Проблема с приложением, не могу войти в аккаунт
                                </TableCell>
                                <TableCell>Мельников Рустам Фахитович</TableCell>
                                <TableCell>2 мая 2019 17:45</TableCell>
                                <TableCell>В обработке</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>8784532456</TableCell>
                                <TableCell>Что то не так</TableCell>
                                <TableCell>Меньшиков Владимир Александрович</TableCell>
                                <TableCell>1 мая 2019 17:45</TableCell>
                                <TableCell>На рассмотрении</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>994124566</TableCell>
                                <TableCell>Все прекрасно, нам всем нравится, НО</TableCell>
                                <TableCell>Дюжев Алексей Станиславович</TableCell>
                                <TableCell>1 мая 2019 17:45</TableCell>
                                <TableCell>Решено</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>456131233</TableCell>
                                <TableCell>Как повысить статус ?</TableCell>
                                <TableCell>Лер Максим Евгеньевич</TableCell>
                                <TableCell>1 мая 2019 17:45</TableCell>
                                <TableCell>Решено</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

function Trips() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Trip />
            </Grid>
            <Grid
                item
                xs={12}
                css={css`
                    background: #fff;
                `}
            >
                <Trip />
            </Grid>
            <Grid item xs={12}>
                <Trip />
            </Grid>
            <Grid
                item
                xs={12}
                css={css`
                    background: #fff;
                `}
            >
                <Trip />
            </Grid>
            <Grid item xs={12}>
                <Trip />
            </Grid>
            <Grid
                item
                xs={12}
                css={css`
                    background: #fff;
                `}
            >
                <Trip />
            </Grid>
        </Grid>
    );
}

function Trip() {
    return (
        <Grid container>
            <Grid
                item
                xs={3}
                css={css`
                    padding: 10px;
                    line-height: 2.5;
                `}
            >
                <div
                    css={css`
                        float: right;
                        width: 2px;
                        height: 100%;
                        background: #ccc;
                        position: relative;
                        left: 10px;
                    `}
                />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Дата оформления
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    11 мая 2019 12:21
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Цифровой номер билета
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    123465364564564
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Серия и номер билета
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    ААФ 12312
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Номер поезда
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    КФ074
                </span>
            </Grid>
            <Grid
                item
                xs={2}
                css={css`
                    padding: 10px;
                    line-height: 2.5;
                `}
            >
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Станция отправления
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    ГААОВ
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Дата отправки
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    17 мая 2019 12:21
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Тип поезда
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    Дальнего следования
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Тип вагона
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    Бизнес
                </span>
            </Grid>
            <Grid
                item
                xs={2}
                css={css`
                    padding: 10px;
                    line-height: 2.5;
                `}
            >
                <div
                    css={css`
                        float: right;
                        width: 2px;
                        height: 100%;
                        background: #ccc;
                        position: relative;
                        left: 10px;
                    `}
                />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Станция Прибытия
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    МСК213
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Дата прибытия
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    18 мая 2019 12:21
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Расстояние поездки
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    866км
                </span>
            </Grid>
            <Grid
                item
                xs={3}
                css={css`
                    padding: 10px;
                    line-height: 2.5;
                `}
            >
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Код станции продажи билета
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    АААФ 21
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Терминал продажи
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    АК122
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Вид расчета
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    Безналичный
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Агент продажи
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    Соловьева А.П.
                </span>
            </Grid>
            <Grid
                item
                xs={2}
                css={css`
                    padding: 10px;
                    line-height: 2.5;
                `}
            >
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Стоимость
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    2345.5 Р
                </span>
                <br />
                <span
                    css={css`
                        float: left;
                        font-weight: bold;
                    `}
                >
                    Начислено бонусов
                </span>{" "}
                <span
                    css={css`
                        float: right;
                    `}
                >
                    345
                </span>
            </Grid>
        </Grid>
    );
}

export default observer(Participants);
