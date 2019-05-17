/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@reach/router";
import Tab from "@material-ui/core/Tab";
import { useEffect, useContext, useState } from "react";
import { StoreContext } from "context";
import get from "lodash/get";
import { GET_PARTNER_BY_ID } from "actions/partner";
import PropTypes from "prop-types";

export default function PartnerProfile({ id }) {
    const store = useContext(StoreContext);
    const [partner, setPartner] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (id) {
            const document = store.partner[GET_PARTNER_BY_ID]({ id });
            setPartner(document);
        }
    }, [id, store.partner]);

    function onTabChange(event, index) {
        setTabIndex(index);
    }

    const PartnerItem = withPartner(partner);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        css={css`
                            font-weight: 500;
                            padding-top: 40px;
                            padding-bottom: 50px;
                        `}
                    >
                        {get(partner, "title")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={tabIndex} onChange={onTabChange}>
                                    <Tab label="Информация" />
                                    <Tab label="Участники ПЛ" />
                                    <Tab label="Акции" />
                                    <Tab label="Тикеты" />
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                {tabIndex === 0 && (
                                    <Grid
                                        container
                                        css={css`
                                            padding-left: 20px;
                                            padding-top: 20px;
                                        `}
                                    >
                                        <PartnerItem name="INN" path="idData.INN" title="ИНН" />
                                        <PartnerItem name="ORGN" path="idData.ORGN" title="ОРГН" />
                                        <PartnerItem
                                            name="manager"
                                            title="Менеджер"
                                            partner={partner}
                                        />
                                        <PartnerItem
                                            name="email"
                                            title="Эл. адрес"
                                            defaultValue="example@mail.com"
                                        />
                                        <PartnerItem
                                            name="phone"
                                            title="Телефон"
                                            defaultValue="+7 (111) 222-33-44"
                                        />
                                    </Grid>
                                )}
                                {tabIndex === 1 && (
                                    <Table>
                                        <TableHead
                                            css={css`
                                                background-color: #b0bec5;
                                            `}
                                        >
                                            <TableRow>
                                                <HeaderTableCell>Номер УПЛ</HeaderTableCell>
                                                <HeaderTableCell>ФИО</HeaderTableCell>
                                                <HeaderTableCell align="right" />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>1545673513</TableCell>
                                                <ParticipantsTableCell>
                                                    Иванов Иван Иванович
                                                </ParticipantsTableCell>
                                                <TableCellIcon />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>1545673513</TableCell>
                                                <ParticipantsTableCell>
                                                    Мельников Рустам Фахитович
                                                </ParticipantsTableCell>
                                                <TableCellIcon />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>1545673513</TableCell>
                                                <ParticipantsTableCell>
                                                    Меньшиков Владимир Александрович
                                                </ParticipantsTableCell>
                                                <TableCellIcon />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>1545673513</TableCell>
                                                <ParticipantsTableCell>
                                                    Дюжев Алексей Станиславович
                                                </ParticipantsTableCell>
                                                <TableCellIcon />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>1545673513</TableCell>
                                                <ParticipantsTableCell>
                                                    Лер Максим Евгеньевич
                                                </ParticipantsTableCell>
                                                <TableCellIcon />
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
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

function ParticipantsTableCell({ children }) {
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

function GridItem({ name, path, title, partner, defaultValue }) {
    if (!path) {
        path = name;
    }
    return (
        <Grid
            item
            xs={12}
            css={css`
                margin-bottom: 20px;
            `}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    css={css`
                        margin-bottom: 10px;
                    `}
                >
                    <InputLabel htmlFor={name}>{title}</InputLabel>
                </Grid>
                <Grid item xs={12}>
                    <Typography id={name} name={name}>
                        {get(partner, path, defaultValue)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

GridItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    partner: PropTypes.object,
    defaultValue: PropTypes.string,
    path: PropTypes.string,
};

function withPartner(partner) {
    return props => <GridItem partner={partner} {...props} />;
}

PartnerProfile.propTypes = {
    id: PropTypes.string.isRequired,
};
