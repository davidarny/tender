/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect, useState, useContext, useRef } from "react";
import { StoreContext, BASE_PATH } from "context";
import { GET_PARTICIPANT_BY_ID } from "actions/participant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import PropTypes from "prop-types";
import Layout from "components/Layout";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Link } from "@reach/router";
import { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import HeaderTableCell from "components/table/HeaderTableCell";
import CreditCard from "assets/credit-card.png";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import shortid from "shortid";
import GridItem from "components/GridItem";
import StyledTableHead from "components/table/StyledTableHead";
import LinkTableCell from "components/table/LinkTableCell";
import { GET_PARTNER_BY_ID } from "actions/partner";
import { getUniqueIdOfLength } from "utils";
import first from "lodash/first";
import AlphaBankIcon from "assets/alpha-bank.png";
import TreeIcon from "assets/tree-icon.png";

export default function ParticipantProfile({ id }) {
    const store = useContext(StoreContext);
    const [participant, setParticipant] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const translations = {
            RU: "Российская Федерация",
        };
        if (id) {
            const document = { ...store.participant[GET_PARTICIPANT_BY_ID]({ id }) };
            if ("citizenship" in document) {
                document.citizenship = get(translations, document.citizenship);
            }
            if ("partner" in document) {
                document.partner = store.partner[GET_PARTNER_BY_ID]({ id: document.partner }).title;
            }
            setParticipant(document);
        }
    }, [id, store.participant, store.partner]);

    function onTabChange(_, index) {
        setTabIndex(index);
    }

    const ParticipantItem = withParticipant(participant);

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
                        {get(participant, "fullName")}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    css={css`
                        position: relative;
                    `}
                >
                    <Grid item xs={12}>
                        <AppBar position="static">
                            <Tabs value={tabIndex} onChange={onTabChange}>
                                <Tab label="Информация" />
                                <Tab label="Бонусный счёт" />
                                <Tab label="Поездки" />
                            </Tabs>
                        </AppBar>
                    </Grid>
                    {tabIndex === 0 && (
                        <MainInfo
                            component={ParticipantItem}
                            type={get(participant, "participantType")}
                        />
                    )}
                    {tabIndex === 1 && <BonusCardInfo type={get(participant, "participantType")} />}
                    {tabIndex === 2 && <TripsInfo />}
                </Grid>
            </Grid>
        </Layout>
    );
}

function MainInfo({ component: ParticipantItem, type }) {
    return (
        <Grid item xs={12}>
            <Paper>
                <Grid
                    container
                    css={css`
                        padding-left: 20px;
                        padding-top: 20px;
                    `}
                >
                    <ParticipantItem name="number" title="Номер участника ПЛ" />
                    <ParticipantItem name="email" title="Эл. адрес" />
                    <ParticipantItem name="phone" title="Телефон" />
                    {type === "individual" && (
                        <Fragment>
                            <ParticipantItem
                                name="birthDate"
                                title="Дата рождения"
                                render={data => moment(data).format("DD MMMM YYYY")}
                            />
                            <ParticipantItem name="citizenship" title="Гражданство" />
                            <ParticipantItem name="passport" title="Паспортные данные" />
                        </Fragment>
                    )}
                    {type === "legalEntity" && (
                        <Fragment>
                            <ParticipantItem name="partner" title="Компания" />
                            <ParticipantItem name="INN" title="ИНН" />
                            <ParticipantItem name="ORGN" title="ОРГН" />
                        </Fragment>
                    )}
                </Grid>
            </Paper>
        </Grid>
    );
}

MainInfo.propTypes = {
    component: PropTypes.elementType.isRequired,
    type: PropTypes.string,
};

function BonusCardInfo({ type }) {
    const prefix = getAccountPrefix(type);
    const accounts = useRef([
        prefix + getUniqueIdOfLength(2) + "_" + getUniqueIdOfLength(12),
        prefix + getUniqueIdOfLength(2) + "_" + getUniqueIdOfLength(12),
        prefix + getUniqueIdOfLength(2) + "_" + getUniqueIdOfLength(12),
        prefix + getUniqueIdOfLength(2) + "_" + getUniqueIdOfLength(12),
    ]);
    const [account, setAccount] = useState(first(accounts.current));

    function onAccountChange(event) {
        console.log("%cBonusCardInfo account change", "color: #795548", event.target.value);
        setAccount(event.target.value);
    }

    return (
        <Fragment>
            <div
                css={css`
                    position: absolute;
                    top: 50px;
                    width: 100%;
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                `}
            >
                <img
                    css={css`
                        width: 200px;
                        margin-right: 20px;
                    `}
                    src={CreditCard}
                    alt="credit card"
                />
            </div>
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
                            render={value => (
                                <Select
                                    value={account}
                                    input={<Input name="accountNumber" id="accountNumber" />}
                                    name="accountNumber"
                                    onChange={onAccountChange}
                                >
                                    {accounts.current.map(account => (
                                        <MenuItem key={account} value={account}>
                                            {account}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <GridItem
                            name="bonusCard"
                            title="Бонусная карта"
                            defaultValue="9002 4873 1650 1235 (Активная)"
                        />
                        <GridItem
                            name="balance"
                            title="Баланс баллов счёта"
                            defaultValue="25 000"
                            render={value => (
                                <Link
                                    css={css`
                                        color: #f44336;
                                        font-size: larger;
                                        font-weight: 500;
                                    `}
                                    to={BASE_PATH + `/account/${shortid()}`}
                                >
                                    {value}
                                </Link>
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
                                <HeaderTableCell />
                                <HeaderTableCell>№ транзакции</HeaderTableCell>
                                <HeaderTableCell>Дата транзакции</HeaderTableCell>
                                <HeaderTableCell>Сумма транзакции</HeaderTableCell>
                                <HeaderTableCell>Баллы</HeaderTableCell>
                                <HeaderTableCell>Комментарий</HeaderTableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell to={BASE_PATH + `/history/${shortid()}`}>
                                    00240441222
                                </LinkTableCell>
                                <TableCell>28 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 350</PointsTableCell>
                                <TableCell>Начисление при покупке билета №124578</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell to={BASE_PATH + `/history/${shortid()}`}>
                                    00240441222
                                </LinkTableCell>
                                <TableCell>19 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell>- 350</PointsTableCell>
                                <TableCell>Списание при покупке билета №124578</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell to={BASE_PATH + `/history/${shortid()}`}>
                                    00240441222
                                </LinkTableCell>
                                <TableCell>15 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 80</PointsTableCell>
                                <TableCell>По акции "На майские в Питер"</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={TreeIcon} alt='логотип "RADISSON HOTEL GROUP"' />
                                </TableCell>
                                <LinkTableCell to={BASE_PATH + `/history/${shortid()}`}>
                                    00240441222
                                </LinkTableCell>
                                <TableCell>12 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 700</PointsTableCell>
                                <TableCell>Трансфер баллов</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell to={BASE_PATH + `/history/${shortid()}`}>
                                    00240441222
                                </LinkTableCell>
                                <TableCell>1 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell>- 40</PointsTableCell>
                                <TableCell>Списание при покупке билета №124578</TableCell>
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

function TripsInfo() {
    return (
        <Grid item xs={12}>
            <Paper>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <HeaderTableCell>Маршрут</HeaderTableCell>
                            <HeaderTableCell>Дата</HeaderTableCell>
                            <HeaderTableCell>Стоимость</HeaderTableCell>
                            <HeaderTableCell>Баллы</HeaderTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                Казань - Санкт-Петербург
                            </LinkTableCell>
                            <TableCell>28 мая 2019</TableCell>
                            <TableCell>2544 р</TableCell>
                            <PointsTableCell add>+ 350</PointsTableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                Владивосток - Казань
                            </LinkTableCell>
                            <TableCell>19 мая 2019</TableCell>
                            <TableCell>6922 р</TableCell>
                            <PointsTableCell add>+ 700</PointsTableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                Екатеринбург - Владивосток
                            </LinkTableCell>
                            <TableCell>15 мая 2019</TableCell>
                            <TableCell>8974 р</TableCell>
                            <PointsTableCell add>+ 80</PointsTableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                Санкт-Петербург - Екатеринбург
                            </LinkTableCell>
                            <TableCell>12 мая 2019</TableCell>
                            <TableCell>7899 р</TableCell>
                            <PointsTableCell add>+ 720</PointsTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}

function PointsTableCell({ add = false, children }) {
    return (
        <TableCell
            css={css`
                color: ${add ? "#4caf50" : "black"};
                font-weight: 500;
            `}
        >
            {children}
        </TableCell>
    );
}

PointsTableCell.propTypes = {
    add: PropTypes.bool,
};

function withParticipant(participant) {
    return props => <GridItem data={participant} {...props} />;
}

ParticipantProfile.propTypes = {
    id: PropTypes.string,
};

function getAccountPrefix(type) {
    if (type === "individual") {
        // Префикс личного счёта
        return "P";
    }
    if (type === "legalEntity") {
        // Префикс корпоративного счёта
        return "C";
    }
    // Неопределённый префикс
    return "U";
}
