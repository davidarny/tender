/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import { observer } from "mobx-react-lite";
import Layout from "components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import HeaderTableCell from "components/table/HeaderTableCell";
import LinkTableCell from "components/table/LinkTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import { useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import { GET_PARTNER_BY_ID } from "actions/partner";

function Participants() {
    const store = useContext(StoreContext);
    const types = {
        personal: "Личный",
        corporate: "Корпоративный",
        family: "Семейный",
    };

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
                            <TableHead
                                css={css`
                                    background-color: #b0bec5;
                                `}
                            >
                                <TableRow>
                                    <HeaderTableCell>ФИО</HeaderTableCell>
                                    <HeaderTableCell>Партнёр</HeaderTableCell>
                                    <HeaderTableCell>Тип</HeaderTableCell>
                                    <HeaderTableCell align="right" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {store.participant.participants.map(participant => {
                                    const partner = store.partner[GET_PARTNER_BY_ID]({
                                        id: participant.partner,
                                    });
                                    console.log(participant.partner);
                                    return (
                                        <TableRow key={participant.id}>
                                            <LinkTableCell
                                                to={BASE_PATH + `/participants/${partner.id}`}
                                            >
                                                {participant.fullName}
                                            </LinkTableCell>
                                            <TableCell>{partner.title}</TableCell>
                                            <TableCell>{types[participant.type]}</TableCell>
                                            <TableCellMoreIcon />
                                        </TableRow>
                                    );
                                })}
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

export default observer(Participants);
