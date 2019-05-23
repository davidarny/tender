/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import FixedFab from "components/FixedFab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { navigate } from "@reach/router";
import { BASE_PATH, StoreContext } from "context";
import { useContext } from "react";
import StyledTableHead from "components/table/StyledTableHead";
import LinkTableCell from "components/table/LinkTableCell";
import HeaderTableCell from "components/table/HeaderTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import AlphaBankIcon from "assets/alpha-bank.png";

function Partners() {
    const store = useContext(StoreContext);
    const categoryNamesMap = {
        banks: "Банки",
        hotels: "Отели",
        relax: "Отдых и развлечения",
        other: "Другие",
    };

    function onFabClick() {
        navigate(BASE_PATH + "/partners/add");
    }

    const partnerIconsMap = {
        alpha: AlphaBankIcon,
    };

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
                            <StyledTableHead>
                                <TableRow>
                                    <HeaderTableCell />
                                    <HeaderTableCell>Партнер</HeaderTableCell>
                                    <HeaderTableCell>Категория</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {store.partner.partners.map(partner => {
                                    return (
                                        <TableRow key={partner.id}>
                                            <TableCell width={20}>
                                                {partner.icon && (
                                                    <img
                                                        src={partnerIconsMap[partner.icon]}
                                                        alt=""
                                                    />
                                                )}
                                            </TableCell>
                                            <LinkTableCell
                                                to={BASE_PATH + `/partners/${partner.id}`}
                                            >
                                                {partner.title}
                                            </LinkTableCell>
                                            <TableCell>
                                                {categoryNamesMap[partner.category]}
                                            </TableCell>
                                            <TableCellMoreIcon />
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <FixedFab onClick={onFabClick} />
            </Grid>
        </Layout>
    );
}

export default observer(Partners);
