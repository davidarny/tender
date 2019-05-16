/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default function SignForm({ title, controls, button, onSubmit }) {
    return (
        <Paper
            css={css`
                display: flex;
                padding: 16px 24px 24px;
                align-items: center;
                flex-direction: column;
            `}
        >
            <Avatar
                css={css`
                    background-color: #e91e63;
                    margin-bottom: 5px;
                `}
            >
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            <form
                onSubmit={onSubmit}
                css={css`
                    width: 100%;
                    margin-top: 8px;
                `}
            >
                {controls()}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    css={css`
                        margin-top: 24px;
                    `}
                >
                    {button}
                </Button>
            </form>
        </Paper>
    );
}

SignForm.propTypes = {
    title: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    controls: PropTypes.func,
    onSubmit: PropTypes.func,
};
