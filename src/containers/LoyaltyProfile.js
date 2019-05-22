/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useEffect, useContext, useState } from "react";
import { StoreContext } from "context";
import get from "lodash/get";
import { GET_LOYALTY_BY_ID } from "actions/loyalty";
import PropTypes from "prop-types";
import GridItem from "components/GridItem";

export default function LoyaltyProfile({ id }) {
    const store = useContext(StoreContext);
    const [loyalty, setLoyalty] = useState({});

    useEffect(() => {
        if (id) {
            const document = store.loyalty[GET_LOYALTY_BY_ID]({ id });
            setLoyalty(document);
        }
    }, [id, store.loyalty]);

    const LoyaltyItem = withLoyalty(loyalty);

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
                        {get(loyalty, "title")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper>
                                <MainInfo component={LoyaltyItem} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function MainInfo({ component: LoyaltyItem }) {
    return (
        <Grid
            container
            css={css`
                padding-left: 20px;
                padding-top: 20px;
            `}
        >
            <LoyaltyItem name="transferType" title="Тип" />
            <LoyaltyItem name="condition" title="Условие" />
            <LoyaltyItem name="property" title="Свойство" />
            <LoyaltyItem name="trains" title="Список поездов" />
        </Grid>
    );
}

MainInfo.propTypes = {
    component: PropTypes.elementType.isRequired,
};

function withLoyalty(loyalty) {
    return props => <GridItem data={loyalty} {...props} />;
}

LoyaltyProfile.propTypes = {
    id: PropTypes.string,
};
