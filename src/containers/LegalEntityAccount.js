/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";

export default function LegalEntityAccount() {
    let status = "Premium";
    let totalPoints = 778;

    return (
        <Grid
            container
            css={css`
                position: relative;
                top: 70px;
            `}
        >
            <Grid item xs={3}>
                <span>РосГосСтрах</span>
            </Grid>
            <Grid item xs={5}>
                <span>Статус: {status}</span>
            </Grid>
            <Grid item xs={4}>
                <span>Количество баллов: {totalPoints}</span>
            </Grid>
        </Grid>
    );
}
