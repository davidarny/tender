/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect, useState, useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import { GET_PARTICIPANT_BY_ID } from "actions/participant";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HeaderTableCell from "components/table/HeaderTableCell";
import CreditCard from "assets/credit-card.png";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import shortid from "shortid";

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
            setParticipant(document);
        }
    }, [id, store.participant]);

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
                                <Tab label="Тикеты" />
                            </Tabs>
                        </AppBar>
                    </Grid>
                    {tabIndex === 0 && (
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
                                    <ParticipantItem
                                        name="birthDate"
                                        title="Дата рождения"
                                        render={data => moment(data).format("DD MMMM YYYY")}
                                    />
                                    <ParticipantItem name="citizenship" title="Гражданство" />
                                    <ParticipantItem name="passport" title="Паспортные данные" />
                                </Grid>
                            </Paper>
                        </Grid>
                    )}
                    {tabIndex === 1 && (
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
                                            defaultValue="00000000456521"
                                            render={data => (
                                                <Select
                                                    value={data}
                                                    input={
                                                        <Input
                                                            name="accountNumber"
                                                            id="accountNumber"
                                                        />
                                                    }
                                                    name="accountNumber"
                                                >
                                                    <MenuItem value={data}>{data}</MenuItem>
                                                </Select>
                                            )}
                                        />
                                        <GridItem
                                            name="bonusCard"
                                            title="Бонусная карта"
                                            defaultValue="9002 4873 1650 (Активная)"
                                        />
                                        <GridItem
                                            name="balance"
                                            title="Баланс баллов счёта"
                                            defaultValue="25 000"
                                            render={data => (
                                                <Link
                                                    css={css`
                                                        color: #f44336;
                                                        font-size: larger;
                                                        font-weight: 500;
                                                    `}
                                                    to={BASE_PATH + `/account/${shortid()}`}
                                                >
                                                    {data}
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
                                        <TableHead
                                            css={css`
                                                background-color: #b0bec5;
                                            `}
                                        >
                                            <TableRow>
                                                <HeaderTableCell>Дата и время</HeaderTableCell>
                                                <HeaderTableCell>Баллы</HeaderTableCell>
                                                <HeaderTableCell>Комментарий</HeaderTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>28 мая 2019, 15:30</TableCell>
                                                <TableCell
                                                    css={css`
                                                        color: #4caf50;
                                                        font-weight: 500;
                                                    `}
                                                >
                                                    + 350
                                                </TableCell>
                                                <TableCell>
                                                    Начисление при покупке билета №124578
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>19 мая 2019, 15:30</TableCell>
                                                <TableCell
                                                    css={css`
                                                        font-weight: 500;
                                                    `}
                                                >
                                                    - 350
                                                </TableCell>
                                                <TableCell>
                                                    Списание при покупке билета №124578
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>15 мая 2019, 15:30</TableCell>
                                                <TableCell
                                                    css={css`
                                                        color: #4caf50;
                                                        font-weight: 500;
                                                    `}
                                                >
                                                    + 80
                                                </TableCell>
                                                <TableCell>По акции "На майские в Питер"</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>12 мая 2019, 15:30</TableCell>
                                                <TableCell
                                                    css={css`
                                                        color: #4caf50;
                                                        font-weight: 500;
                                                    `}
                                                >
                                                    + 700
                                                </TableCell>
                                                <TableCell>Трансфер баллов</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Fragment>
                    )}
                </Grid>
            </Grid>
        </Layout>
    );
}

function GridItem({ name, objectPath, title, participant, defaultValue, render }) {
    if (!objectPath) {
        objectPath = name;
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
                        {render && render(get(participant, objectPath, defaultValue))}
                        {!render && get(participant, objectPath, defaultValue)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

GridItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    participant: PropTypes.object,
    defaultValue: PropTypes.string,
    objectPath: PropTypes.string,
    render: PropTypes.func,
};

function withParticipant(participant) {
    return props => <GridItem participant={participant} {...props} />;
}
