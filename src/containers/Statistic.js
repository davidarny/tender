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
                        Список акций
                    </Typography>
                </Grid>
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
                                    <HeaderTableCell>Правила</HeaderTableCell>
                                    <HeaderTableCell>Срок действия</HeaderTableCell>
                                    <HeaderTableCell>Партнер</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <StatisticTableCell>Летний</StatisticTableCell>
                                    <TableCell>более 500 км</TableCell>
                                    <TableCell>до 15 сен 2019</TableCell>
                                    <TableCell>ООО "Омега-софт"</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <StatisticTableCell>На майские в Питер</StatisticTableCell>
                                    <TableCell>более 2500 руб</TableCell>
                                    <TableCell>1-15 авг 2019</TableCell>
                                    <TableCell>ОАО Альфа-Банк</TableCell>
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
