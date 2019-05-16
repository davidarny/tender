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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "@reach/router";

function Partners() {
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
                        Список партнеров
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
                                    <HeaderTableCell>Партнер</HeaderTableCell>
                                    <HeaderTableCell>Категория</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <PartnersTableCell>АО "Альфа-Банк"</PartnersTableCell>
                                    <TableCell>Банки</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <PartnersTableCell>RADISSON HOTEL GROUP</PartnersTableCell>
                                    <TableCell>Отели</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <PartnersTableCell>Окко</PartnersTableCell>
                                    <TableCell>Отдых и развелчения</TableCell>
                                    <TableCellIcon />
                                </TableRow>
                                <TableRow>
                                    <PartnersTableCell>РФСО "Локомотив"</PartnersTableCell>
                                    <TableCell>Другие</TableCell>
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

function PartnersTableCell({ children }) {
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

export default observer(Partners);
