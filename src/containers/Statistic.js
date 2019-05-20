/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
import { Link } from "@reach/router";
import Chart from "react-google-charts";
import Loading from "components/Loading";

function Statistic() {
    return (
        <Layout>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        css={css`
                            font-weight: 500;
                            padding-top: 20px;
                            padding-bottom: 50px;
                        `}
                    >
                        Статистика
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Chart
                        height={450}
                        chartType="ColumnChart"
                        loader={<Loading />}
                        data={[
                            ["City", "2010 Population"],
                            ["Январь", 59000],
                            ["Февраль", 80000],
                            ["Март", 85000],
                            ["Апрель", 98000],
                            ["Май", 90000],
                            ["Июнь", 0],
                            ["Июль", 0],
                            ["Август", 0],
                            ["Сентябрь", 0],
                            ["Октябрь", 0],
                            ["Ноябрь", 0],
                            ["Декабрь", 0],
                        ]}
                        options={{
                            chartArea: { width: "80%", bottom: 100, top: 100 },
                            hAxis: {
                                title: "Кол-во поездок, 2019 г",
                                titleTextStyle: {
                                    bold: true,
                                    italic: false,
                                    fontSize: 18,
                                },
                            },
                            legend: { position: "none" },
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    css={css`
                        margin-top: 20px;
                    `}
                >
                    <Paper>
                        <Table>
                            <TableHead
                                css={css`
                                    background-color: #b0bec5;
                                `}
                            >
                                <TableRow>
                                    <HeaderTableCell>Маршрут</HeaderTableCell>
                                    <HeaderTableCell>Дата</HeaderTableCell>
                                    <HeaderTableCell>Стоимость</HeaderTableCell>
                                    <HeaderTableCell>Баллы</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <StatisticTableCell>
                                        Казань - Санкт-Петербург
                                    </StatisticTableCell>
                                    <TableCell>28 мая 19</TableCell>
                                    <TableCell>2544 р</TableCell>
                                    <TableCell>+350</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <StatisticTableCell>Владивосток - Казань</StatisticTableCell>
                                    <TableCell>19 мая 19</TableCell>
                                    <TableCell>6922 р</TableCell>
                                    <TableCell>+700</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <StatisticTableCell>
                                        Екатеринбург - Владивосток
                                    </StatisticTableCell>
                                    <TableCell>15 мая 19</TableCell>
                                    <TableCell>8974 р</TableCell>
                                    <TableCell>+89</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <StatisticTableCell>
                                        Санкт-Петербург - Екатеринбург
                                    </StatisticTableCell>
                                    <TableCell>12 мая 19</TableCell>
                                    <TableCell>7899 р</TableCell>
                                    <TableCell>+777</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
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

function StatisticTableCell({ children }) {
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

export default observer(Statistic);
