/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

export default function Loading() {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            css={css`
                width: 100%;
                min-height: 100%;
            `}
        >
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );
}
