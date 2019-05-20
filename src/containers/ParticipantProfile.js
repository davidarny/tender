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
import moment from "moment";

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
                            )}
                        </Paper>
                    </Grid>
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
