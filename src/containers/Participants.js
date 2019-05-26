/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FixedFab from "components/FixedFab";
import Typography from "@material-ui/core/Typography";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import { useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import StyledTableHead from "components/table/StyledTableHead";
import { navigate } from "@reach/router";

function Participants() {
    const store = useContext(StoreContext);
    const accountTypesMap = {
        personal: "Личный",
        corporate: "Корпоративный",
        family: "Семейный",
    };

    function onFabClick() {
        navigate(BASE_PATH + "/participants/add");
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
                    Список участников ПЛ
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <HeaderTableCell>ФИО</HeaderTableCell>
                                    <HeaderTableCell>Партнёр</HeaderTableCell>
                                    <HeaderTableCell>Тип</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {store.participant.participants.map(participant => {
                                    return (
                                        <TableRow key={participant.id}>
                                            <LinkTableCell
                                                to={BASE_PATH + `/participants/${participant.id}`}
                                            >
                                                {participant.fullName}
                                            </LinkTableCell>
                                            <TableCell>
                                                {accountTypesMap[participant.accountType]}
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

export default observer(Participants);
