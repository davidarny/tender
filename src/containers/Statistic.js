/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chart from "react-google-charts";
import Loading from "components/Loading";
import StyledTableHead from "components/table/StyledTableHead";
import LinkTableCell from "components/table/LinkTableCell";
import HeaderTableCell from "components/table/HeaderTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import shortid from "shortid";
import { BASE_PATH } from "context";

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
                            <StyledTableHead>
                                <TableRow>
                                    <HeaderTableCell>Маршрут</HeaderTableCell>
                                    <HeaderTableCell>Дата</HeaderTableCell>
                                    <HeaderTableCell>Стоимость</HeaderTableCell>
                                    <HeaderTableCell>Баллы</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                <TableRow>
                                    <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                        Казань - Санкт-Петербург
                                    </LinkTableCell>
                                    <TableCell>28 мая 19</TableCell>
                                    <TableCell>2544 р</TableCell>
                                    <TableCell>+350</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                        Владивосток - Казань
                                    </LinkTableCell>
                                    <TableCell>19 мая 19</TableCell>
                                    <TableCell>6922 р</TableCell>
                                    <TableCell>+700</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                        Екатеринбург - Владивосток
                                    </LinkTableCell>
                                    <TableCell>15 мая 19</TableCell>
                                    <TableCell>8974 р</TableCell>
                                    <TableCell>+89</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell to={BASE_PATH + `/routes/${shortid()}`}>
                                        Санкт-Петербург - Екатеринбург
                                    </LinkTableCell>
                                    <TableCell>12 мая 19</TableCell>
                                    <TableCell>7899 р</TableCell>
                                    <TableCell>+777</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default observer(Statistic);
