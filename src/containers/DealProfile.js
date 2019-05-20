/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useEffect, useContext, useState } from "react";
import { StoreContext } from "context";
import get from "lodash/get";
import { GET_DEAL_BY_ID } from "actions/deal";
import PropTypes from "prop-types";
import moment from "moment";
import sample from "lodash/sample";
import GridItem from "components/GridItem";
import { Fragment } from "react";

export default function DealProfile({ id }) {
    const store = useContext(StoreContext);
    const [deal, setDeal] = useState({});

    useEffect(() => {
        const translations = {
            day: "eжедневно",
            week: "eженедельно",
            month: "eжемесячно",
            year: "eжегодно",
        };
        const partners = ['ООО "Омега-софт"', "ОАО Альфа-Банк"];

        if (id) {
            const document = { ...store.deal[GET_DEAL_BY_ID]({ id }) };
            if ("periodicity" in document) {
                document.periodicity = get(translations, document.periodicity);
            }
            document.partner = sample(partners);
            setDeal(document);
        }
    }, [id, store.deal]);

    const DealItem = withDeal(deal);

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        css={css`
                            font-weight: 500;
                            padding-top: 40px;
                        `}
                    >
                        {get(deal, "title")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="subtitle1"
                        css={css`
                            padding-top: 50px;
                        `}
                    >
                        {get(deal, "subtitle")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body1"
                        css={css`
                            padding-top: 10px;
                            padding-bottom: 40px;
                            max-width: 600px;
                        `}
                    >
                        {get(deal, "text")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid
                                    container
                                    css={css`
                                        padding-left: 20px;
                                        padding-top: 20px;
                                    `}
                                >
                                    <DealItem name="partner" title="Партнер" />
                                    {deal.startStation && (
                                        <DealItem name="startStation" title="Начальная станция" />
                                    )}
                                    {deal.endStation && (
                                        <DealItem name="endStation" title="Конечная станция" />
                                    )}
                                    <DealItem
                                        name="discount"
                                        title="Скидка"
                                        render={data => (
                                            <Fragment>
                                                <span>{data}</span>
                                                <span>%</span>
                                            </Fragment>
                                        )}
                                    />
                                    <DealItem name="promoCode" title="Промо код" />
                                    <DealItem
                                        name="activePeriod"
                                        title="Срок действия, переодичность"
                                        render={(_, name) => {
                                            const from = get(deal, "activePeriod.from");
                                            const to = get(deal, "activePeriod.to");
                                            const suffix = ", " + get(deal, "periodicity");
                                            return (
                                                <Fragment>
                                                    {from && !to && (
                                                        <Typography
                                                            id={name + "-from"}
                                                            name={name + "-from"}
                                                        >
                                                            от {moment(from).format("DD MMMM YYYY")}
                                                            <span>{suffix}</span>
                                                        </Typography>
                                                    )}
                                                    {!from && to && (
                                                        <Typography
                                                            id={name + "-to"}
                                                            name={name + "-to"}
                                                        >
                                                            до {moment(to).format("DD MMMM YYYY")}
                                                            <span>{suffix}</span>
                                                        </Typography>
                                                    )}
                                                    {from && to && (
                                                        <Typography
                                                            id={name + "-from-to"}
                                                            name={name + "-from-to"}
                                                        >
                                                            <span>
                                                                {moment(from).format(
                                                                    "DD MMMM YYYY"
                                                                )}
                                                            </span>
                                                            <span> - </span>
                                                            <span>
                                                                {moment(to).format("DD MMMM YYYY")}
                                                            </span>
                                                            <span>{suffix}</span>
                                                        </Typography>
                                                    )}
                                                </Fragment>
                                            );
                                        }}
                                    />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function withDeal(deal) {
    return props => <GridItem data={deal} {...props} />;
}

DealProfile.propTypes = {
    id: PropTypes.string,
};
