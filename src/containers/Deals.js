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
import { useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import sample from "lodash/sample";
import moment from "moment";
import StyledTableHead from "components/table/StyledTableHead";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";

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
                            <StyledTableHead>
                                <TableRow>
                                    <HeaderTableCell>Название</HeaderTableCell>
                                    <HeaderTableCell>Срок действия</HeaderTableCell>
                                    <HeaderTableCell>Партнер</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {store.deal.deals.map(deal => {
                                    const { from, to } = deal.activePeriod;
                                    return (
                                        <TableRow key={deal.id}>
                                            <LinkTableCell to={BASE_PATH + `/deals/${deal.id}`}>
                                                {deal.title}
                                            </LinkTableCell>
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
                                            <TableCellMoreIcon />
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

export default observer(Deals);
