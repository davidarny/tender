/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import get from "lodash/get";
import PropTypes from "prop-types";

export default function GridItem({ name, pathToProp, data, title, defaultValue, render }) {
    if (!pathToProp) {
        pathToProp = name;
    }
    const value = get(data, pathToProp, defaultValue);
    if (!value) {
        return null;
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
                    <Typography id={name} component="div" name={name}>
                        {render && render(value, name, title)}
                        {!render && value}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

GridItem.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    defaultValue: PropTypes.string,
    pathToProp: PropTypes.string,
    render: PropTypes.func,
};
