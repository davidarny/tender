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
                                    <HeaderTableCell>Кол-во поездок</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                <TableRow>
                                    <LinkTableCell fake>Казань - Санкт-Петербург</LinkTableCell>
                                    <TableCell>28 мая 19</TableCell>
                                    <TableCell>2502</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell fake>Владивосток - Казань</LinkTableCell>
                                    <TableCell>19 мая 19</TableCell>
                                    <TableCell>8457</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell fake>Екатеринбург - Владивосток</LinkTableCell>
                                    <TableCell>15 мая 19</TableCell>
                                    <TableCell>578</TableCell>
                                    <TableCellMoreIcon />
                                </TableRow>
                                <TableRow>
                                    <LinkTableCell fake>
                                        Санкт-Петербург - Екатеринбург
                                    </LinkTableCell>
                                    <TableCell>12 мая 19</TableCell>
                                    <TableCell>899</TableCell>
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
