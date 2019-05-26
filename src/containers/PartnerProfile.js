/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tab from "@material-ui/core/Tab";
import { useEffect, useContext, useState, Fragment } from "react";
import { StoreContext, BASE_PATH } from "context";
import get from "lodash/get";
import { GET_PARTNER_BY_ID } from "actions/partner";
import * as PropTypes from "prop-types";
import moment from "moment";
import LinkTableCell from "components/table/LinkTableCell";
import HeaderTableCell from "components/table/HeaderTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import GridItem from "components/GridItem";
import StyledTableHead from "components/table/StyledTableHead";
import { GET_PARTICIPANTS_OF_PARTNER } from "actions/partner";
import AlphaBankBigIcon from "assets/alpha-bank-big.png";
import RouteMatcher from "components/RouteMatcher";
import { Router, Link } from "@reach/router";
import { getRandomAccountNumber, getUniqueIdOfLength, getUniqueId } from "utils";

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

    const PartnerItem = withPartner(partner);

    return (
        <Layout>
            <RouteMatcher
                routes={[
                    {
                        paths: ["", "info"],
                        render: () => setTabIndex(0),
                    },
                    {
                        path: "account",
                        render: () => setTabIndex(1),
                    },
                    {
                        path: "participants",
                        render: () => setTabIndex(2),
                    },
                    {
                        path: "deals",
                        render: () => setTabIndex(3),
                    },
                ]}
            />
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
                                <Tabs value={tabIndex}>
                                    <Tab component={Link} to="info" label="Информация" />
                                    <Tab component={Link} to="account" label="Бонусный счёт" />
                                    <Tab component={Link} to="participants" label="Участники ПЛ" />
                                    <Tab component={Link} to="deals" label="Акции" />
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Router>
                                <MainInfo
                                    path=""
                                    default
                                    icon={get(partner, "icon")}
                                    component={PartnerItem}
                                />
                                <BonusCardInfo path="account" type="individual" />
                                <ParticipantsInfo
                                    path="participants"
                                    participants={store.partner[GET_PARTICIPANTS_OF_PARTNER]({
                                        partnerId: id,
                                        model: store.participant,
                                    })}
                                />
                                <DealsInfo path="deals" deals={store.deal.deals} />
                            </Router>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function MainInfo({ component: PartnerItem, icon }) {
    const partnerIconsMap = {
        alpha: {
            src: AlphaBankBigIcon,
            alt: 'логотип АО "Альфа-Банк"',
        },
    };

    return (
        <Paper>
            <Grid
                container
                css={css`
                    padding-left: 20px;
                    padding-top: 20px;
                `}
            >
                <Grid item xs={6}>
                    <Grid container>
                        <PartnerItem name="INN" title="ИНН" />
                        <PartnerItem name="ORGN" title="ОРГН" />
                        <PartnerItem name="manager" title="Контактное лицо" />
                        <PartnerItem
                            name="email"
                            title="Эл. адрес"
                            defaultValue="example@mail.com"
                        />
                        <PartnerItem
                            name="phone"
                            title="Телефон"
                            defaultValue={`+${getUniqueIdOfLength(11)}`}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {icon && partnerIconsMap[icon] && (
                        <div
                            css={css`
                                border: 1px dashed #ccc;
                                display: inline-block;
                                padding: 10px;
                            `}
                        >
                            <img src={partnerIconsMap[icon].src} alt={partnerIconsMap[icon].alt} />
                        </div>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}

MainInfo.propTypes = {
    component: PropTypes.elementType.isRequired,
};

function BonusCardInfo({ type }) {
    return (
        <Fragment>
            <Grid item xs={12}>
                <Paper>
                    <Grid
                        container
                        css={css`
                            padding-left: 20px;
                            padding-top: 20px;
                        `}
                    >
                        <GridItem
                            name="accountNumber"
                            title="Номер счёта"
                            defaultValue={getRandomAccountNumber(type)}
                        />
                        <GridItem
                            name="balance"
                            title="Баланс баллов счёта"
                            defaultValue="350 000"
                            render={value => (
                                <div
                                    css={css`
                                        color: #f44336;
                                        font-size: larger;
                                        font-weight: 500;
                                        text-decoration: underline;
                                    `}
                                >
                                    {value}
                                </div>
                            )}
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="h5"
                    css={css`
                        font-weight: 500;
                        padding-top: 40px;
                        padding-bottom: 50px;
                    `}
                >
                    История начисления и списания баллов
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <HeaderTableCell>№ транзакции</HeaderTableCell>
                                <HeaderTableCell>Дата транзакции</HeaderTableCell>
                                <HeaderTableCell>Получатель</HeaderTableCell>
                                <HeaderTableCell>Баллы</HeaderTableCell>
                                <HeaderTableCell>Комментарий</HeaderTableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <TableRow>
                                <LinkTableCell fake>{getUniqueId()}</LinkTableCell>
                                <TableCell>28 мая 2019, 15:30</TableCell>
                                <TableCell>{getRandomAccountNumber(type)}</TableCell>
                                <TableCell>- 350</TableCell>
                                <TableCell>
                                    Зачисление при покупке билета №{getUniqueIdOfLength(6)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <LinkTableCell fake>{getUniqueId()}</LinkTableCell>
                                <TableCell>19 мая 2019, 15:30</TableCell>
                                <TableCell>{getRandomAccountNumber(type)}</TableCell>
                                <TableCell>- 350</TableCell>
                                <TableCell>
                                    Зачисление при покупке билета №{getUniqueIdOfLength(6)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <LinkTableCell fake>{getUniqueId()}</LinkTableCell>
                                <TableCell>15 мая 2019, 15:30</TableCell>
                                <TableCell>{getRandomAccountNumber(type)}</TableCell>
                                <TableCell>- 350</TableCell>
                                <TableCell>
                                    Зачисление при покупке билета №{getUniqueIdOfLength(6)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <LinkTableCell fake>{getUniqueId()}</LinkTableCell>
                                <TableCell>12 мая 2019, 15:30</TableCell>
                                <TableCell>{getRandomAccountNumber(type)}</TableCell>
                                <TableCell>- 350</TableCell>
                                <TableCell>
                                    Зачисление при покупке билета №{getUniqueIdOfLength(6)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <LinkTableCell fake>{getUniqueId()}</LinkTableCell>
                                <TableCell>1 мая 2019, 15:30</TableCell>
                                <TableCell>{getRandomAccountNumber(type)}</TableCell>
                                <TableCell>- 350</TableCell>
                                <TableCell>
                                    Зачисление при покупке билета №{getUniqueIdOfLength(6)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Fragment>
    );
}

BonusCardInfo.propTypes = {
    type: PropTypes.string,
};

function ParticipantsInfo({ participants }) {
    const accountTypesMap = {
        personal: "Личный",
        corporate: "Корпоративный",
        family: "Семейный",
    };

    return (
        <Paper>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        <HeaderTableCell>ФИО</HeaderTableCell>
                        <HeaderTableCell>Тип</HeaderTableCell>
                        <HeaderTableCell align="right" />
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {participants.map(participant => {
                        return (
                            <TableRow key={participant.id}>
                                <LinkTableCell to={BASE_PATH + `/participants/${participant.id}`}>
                                    {participant.fullName}
                                </LinkTableCell>
                                <TableCell>{accountTypesMap[participant.accountType]}</TableCell>
                                <TableCellMoreIcon />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

ParticipantsInfo.propTypes = {
    participants: PropTypes.array.isRequired,
};

function DealsInfo({ deals }) {
    return (
        <Paper>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        <HeaderTableCell>Название</HeaderTableCell>
                        <HeaderTableCell>Срок действия</HeaderTableCell>
                        <HeaderTableCell align="right" />
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {deals.map(deal => {
                        const { from, to } = deal.activePeriod;
                        return (
                            <TableRow key={deal.id}>
                                <LinkTableCell to={BASE_PATH + `/deals/${deal.id}`}>
                                    {deal.title}
                                </LinkTableCell>
                                {from && !to && (
                                    <TableCell>от {moment(from).format("DD MMMM YYYY")}</TableCell>
                                )}
                                {!from && to && (
                                    <TableCell>до {moment(to).format("DD MMMM YYYY")}</TableCell>
                                )}
                                {from && to && (
                                    <TableCell>
                                        <span>{moment(from).format("DD MMMM YYYY")}</span>
                                        <span> - </span>
                                        <span>{moment(to).format("DD MMMM YYYY")}</span>
                                    </TableCell>
                                )}
                                <TableCellMoreIcon />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

DealsInfo.propTypes = {
    deals: PropTypes.array.isRequired,
};

function withPartner(partner) {
    return props => <GridItem data={partner} {...props} />;
}

PartnerProfile.propTypes = {
    id: PropTypes.string,
};
