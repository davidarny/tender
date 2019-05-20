/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { useEffect, useState, useContext } from "react";
import { StoreContext } from "context";
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

export default function ParticipantProfile({ id }) {
    const store = useContext(StoreContext);
    const [participant, setParticipant] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (id) {
            const document = store.participant[GET_PARTICIPANT_BY_ID]({ id });
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
                <Grid container>
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
                                    <ParticipantItem name="INN" path="idData.INN" title="ИНН" />
                                    <ParticipantItem name="ORGN" path="idData.ORGN" title="ОРГН" />
                                    <ParticipantItem
                                        name="manager"
                                        title="Менеджер"
                                        partner={participant}
                                    />
                                    <ParticipantItem
                                        name="email"
                                        title="Эл. адрес"
                                        defaultValue="example@mail.com"
                                    />
                                    <ParticipantItem
                                        name="phone"
                                        title="Телефон"
                                        defaultValue="+7 (111) 222-33-44"
                                    />
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function GridItem({ name, path, title, partner: participant, defaultValue }) {
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
                        {get(participant, path, defaultValue)}
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
    path: PropTypes.string,
};

function withParticipant(partner) {
    return props => <GridItem participant={partner} {...props} />;
}
