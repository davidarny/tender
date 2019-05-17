/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import { useEffect, useContext, useState } from "react";
import { StoreContext } from "context";
import get from "lodash/get";
import { GET_DEAL_BY_ID } from "actions/deal";
import PropTypes from "prop-types";
import moment from "moment";
import sample from "lodash/sample";

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
            if (!document) {
                return;
            }
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
                                    <DealItem name="discount" suffix="%" title="Скидка" />
                                    <DealItem name="promoCode" title="Промо код" />
                                    <DealDateItem
                                        from={get(deal, "activePeriod.from")}
                                        to={get(deal, "activePeriod.to")}
                                        name="activePeriod"
                                        title="Срок действия, переодичность"
                                        suffix={", " + get(deal, "periodicity")}
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

function GridItem({ name, path, title, deal, translations, suffix }) {
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
                    {translations && (
                        <Typography id={name} name={name}>
                            <span>{translations[get(deal, path)]}</span>
                            <span>{suffix}</span>
                        </Typography>
                    )}
                    {!translations && (
                        <Typography id={name} name={name}>
                            <span>{get(deal, path)}</span>
                            <span>{suffix}</span>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

GridItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deal: PropTypes.object,
    path: PropTypes.string,
    suffix: PropTypes.string,
    translations: PropTypes.object,
};

function DealDateItem({ from, to, name, title, suffix }) {
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
                    {from && !to && (
                        <Typography id={name + "-from"} name={name + "-from"}>
                            от {moment(from).format("DD MMMM YYYY")}
                            <span>{suffix}</span>
                        </Typography>
                    )}
                    {!from && to && (
                        <Typography id={name + "-to"} name={name + "-to"}>
                            до {moment(to).format("DD MMMM YYYY")}
                            <span>{suffix}</span>
                        </Typography>
                    )}
                    {from && to && (
                        <Typography id={name + "-from-to"} name={name + "-from-to"}>
                            <span>{moment(from).format("DD MMMM YYYY")}</span>
                            <span> - </span>
                            <span>{moment(to).format("DD MMMM YYYY")}</span>
                            <span>{suffix}</span>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

DealDateItem.propTypes = {
    from: PropTypes.object,
    to: PropTypes.object,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    suffix: PropTypes.string,
};

function withDeal(deal) {
    return props => <GridItem deal={deal} {...props} />;
}

DealProfile.propTypes = {
    id: PropTypes.string.isRequired,
};
