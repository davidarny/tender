/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BASE_PATH, StoreContext } from "context";
import { GET_PARTICIPANT_BY_ID } from "actions/participant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import * as PropTypes from "prop-types";
import Layout from "components/Layout";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import HeaderTableCell from "components/table/HeaderTableCell";
import CreditCard from "assets/credit-card.png";
import shortid from "shortid";
import GridItem from "components/GridItem";
import StyledTableHead from "components/table/StyledTableHead";
import LinkTableCell from "components/table/LinkTableCell";
import { GET_PARTNER_BY_ID } from "actions/partner";
import { getRandomAccountNumber, getUniqueId, getUniqueIdOfLength } from "utils";
import AlphaBankIcon from "assets/alpha-bank.png";
import TreeIcon from "assets/tree-icon.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import nth from "lodash/nth";
import RouteMatcher from "components/RouteMatcher";
import { Link, Router } from "@reach/router";

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
                document.citizenship = get(translations, "citizenship");
            }
            if ("partner" in document) {
                document.partner = get(
                    store.partner[GET_PARTNER_BY_ID]({ id: document.partner }),
                    "title"
                );
            }
            setParticipant(document);
        }
    }, [id, store.participant, store.partner]);

    const ParticipantItem = withParticipant(participant);

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
                        path: "trips",
                        render: () => setTabIndex(2),
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
                            <Tabs value={tabIndex}>
                                <Tab component={Link} to="info" label="Информация" />
                                <Tab component={Link} to="account" label="Бонусный счёт" />
                                <Tab component={Link} to="trips" label="Поездки" />
                            </Tabs>
                        </AppBar>
                    </Grid>
                    <Router
                        primary={false}
                        css={css`
                            width: 100%;
                        `}
                    >
                        <MainInfo
                            path="info"
                            default
                            component={ParticipantItem}
                            type={get(participant, "participantType")}
                        />
                        <BonusCardInfo path="account" type={get(participant, "participantType")} />
                        <TripsInfo path="trips" />
                    </Router>
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
                    <ParticipantItem name="email" title="Эл. адрес" />
                    <ParticipantItem name="phone" title="Телефон" />
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
    const [balance, setBalance] = useState(25000);
    const [addToBalance, setAddToBalance] = useState(0);
    const [open, setOpen] = useState(false);
    const data = useRef({
        accountNumber: getRandomAccountNumber(type),
        ids: [getUniqueId(), getUniqueId(), getUniqueId(), getUniqueId(), getUniqueId()],
        comments: [getUniqueIdOfLength(6), getUniqueIdOfLength(6), getUniqueIdOfLength(6)],
    });

    function onClickOpen() {
        setOpen(true);
    }

    function onClose() {
        setOpen(false);
        setAddToBalance(0);
    }

    function onBalanceChange(event) {
        setAddToBalance(event.target.value);
        console.log("%cBonusCardInfo balance change", "color: #2E7D32", event.target.value);
    }

    function onBalanceChangeSubmit() {
        setBalance(Number(addToBalance) + Number(balance));
        setAddToBalance(0);
        onClose();
    }

    return (
        <Fragment>
            <div
                css={css`
                    position: absolute;
                    top: 36px;
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
                            defaultValue={data.current.accountNumber}
                        />
                        <GridItem
                            name="bonusCard"
                            title="Бонусная карта"
                            defaultValue="9002 4873 1650 1235 (Активная)"
                        />
                        <GridItem
                            name="balance"
                            title="Баланс баллов счёта"
                            defaultValue={balance.toString()}
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
                        <Grid
                            item
                            css={css`
                                margin-bottom: 20px;
                            `}
                        >
                            <Button variant="contained" color="secondary" onClick={onClickOpen}>
                                Пополнить
                            </Button>
                        </Grid>
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
                                <LinkTableCell fake>{nth(data.current.ids, 0)}</LinkTableCell>
                                <TableCell>28 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 350</PointsTableCell>
                                <TableCell>
                                    Начисление при покупке билета №{nth(data.current.comments, 0)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell fake>{nth(data.current.ids, 1)}</LinkTableCell>
                                <TableCell>19 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell>- 350</PointsTableCell>
                                <TableCell>
                                    Списание при покупке билета №{nth(data.current.comments, 1)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell fake>{nth(data.current.ids, 2)}</LinkTableCell>
                                <TableCell>15 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 80</PointsTableCell>
                                <TableCell>По акции "На майские в Питер"</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={TreeIcon} alt='логотип "RADISSON HOTEL GROUP"' />
                                </TableCell>
                                <LinkTableCell fake>{nth(data.current.ids, 3)}</LinkTableCell>
                                <TableCell>12 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell add>+ 700</PointsTableCell>
                                <TableCell>Трансфер баллов</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <img src={AlphaBankIcon} alt='логотип АО "Альфа-Банк"' />
                                </TableCell>
                                <LinkTableCell fake>{nth(data.current.ids, 4)}</LinkTableCell>
                                <TableCell>1 мая 2019, 15:30</TableCell>
                                <TableCell>2 500 руб.</TableCell>
                                <PointsTableCell>- 40</PointsTableCell>
                                <TableCell>
                                    Списание при покупке билета №{nth(data.current.comments, 2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alertDialogTitle"
                aria-describedby="alertDialogDescription"
            >
                <DialogTitle id="alertDialogTitle">Пополнение баланса</DialogTitle>
                <DialogContent>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="balance">Сумма пополнения</InputLabel>
                        <Input
                            id="balance"
                            name="balance"
                            autoComplete="balance"
                            autoFocus
                            type="number"
                            onChange={onBalanceChange}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={onBalanceChangeSubmit} color="primary" autoFocus>
                        Пополнить
                    </Button>
                </DialogActions>
            </Dialog>
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
                            <HeaderTableCell>№ билета</HeaderTableCell>
                            <HeaderTableCell>Маршрут</HeaderTableCell>
                            <HeaderTableCell>Дата</HeaderTableCell>
                            <HeaderTableCell>Стоимость</HeaderTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                {getUniqueId()}
                            </LinkTableCell>
                            <TableCell>Казань - Санкт-Петербург</TableCell>
                            <TableCell>28 мая 2019</TableCell>
                            <TableCell>2544 р</TableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                {getUniqueId()}
                            </LinkTableCell>
                            <TableCell>Владивосток - Казань</TableCell>
                            <TableCell>19 мая 2019</TableCell>
                            <TableCell>6922 р</TableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                {getUniqueId()}
                            </LinkTableCell>
                            <TableCell>Екатеринбург - Владивосток</TableCell>
                            <TableCell>15 мая 2019</TableCell>
                            <TableCell>8974 р</TableCell>
                        </TableRow>
                        <TableRow>
                            <LinkTableCell to={BASE_PATH + `/trips/${shortid()}`}>
                                {getUniqueId()}
                            </LinkTableCell>
                            <TableCell>Санкт-Петербург - Екатеринбург</TableCell>
                            <TableCell>12 мая 2019</TableCell>
                            <TableCell>7899 р</TableCell>
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
