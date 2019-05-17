/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
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
                        {get(partner, "title")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
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
                                <Grid container>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="title">ИНН</InputLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input
                                            id="INN"
                                            name="INN"
                                            value={get(partner, "idData.INN")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

PartnerProfile.propTypes = {
    id: PropTypes.string.isRequired,
};
