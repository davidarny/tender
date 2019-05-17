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
import { useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import sample from "lodash/sample";
import moment from "moment";
import PropTypes from "prop-types";

function Deals() {
    const store = useContext(StoreContext);
    const partners = ['ООО "Омега-софт"', "ОАО Альфа-Банк"];

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
                                    <HeaderTableCell>Срок действия</HeaderTableCell>
                                    <HeaderTableCell>Партнер</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {store.deal.deals.map(deal => {
                                    const { from, to } = deal.activePeriod;
                                    return (
                                        <TableRow key={deal.id}>
                                            <DealsTableCell to={BASE_PATH + `/deals/${deal.id}`}>
                                                {deal.title}
                                            </DealsTableCell>
                                            {from && !to && (
                                                <TableCell>
                                                    от {moment(from).format("DD MMMM YYYY")}
                                                </TableCell>
                                            )}
                                            {!from && to && (
                                                <TableCell>
                                                    до {moment(to).format("DD MMMM YYYY")}
                                                </TableCell>
                                            )}
                                            {from && to && (
                                                <TableCell>
                                                    <span>
                                                        {moment(from).format("DD MMMM YYYY")}
                                                    </span>
                                                    <span> - </span>
                                                    <span>{moment(to).format("DD MMMM YYYY")}</span>
                                                </TableCell>
                                            )}
                                            <TableCell>{sample(partners)}</TableCell>
                                            <TableCellIcon />
                                        </TableRow>
                                    );
                                })}
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

function DealsTableCell({ to, children }) {
    return (
        <TableCell>
            <Link
                css={css`
                    color: black;
                    font-weight: 500;
                `}
                to={to}
            >
                {children}
            </Link>
        </TableCell>
    );
}

DealsTableCell.propTypes = {
    to: PropTypes.string,
};

function TableCellIcon() {
    return (
        <TableCell align="right">
            <IconButton>
                <MoreIcon />
            </IconButton>
        </TableCell>
    );
}

export default observer(Deals);
