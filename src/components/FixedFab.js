/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";

export default function FixedFab({ onClick }) {
    return (
        <Fab
            onClick={onClick}
            css={css`
                position: fixed;
                right: 50px;
                bottom: 50px;
                background-color: #263238;
                color: white;

                :hover {
                    background-color: #455a64;
                }
            `}
        >
            <AddIcon />
        </Fab>
    );
}

FixedFab.propTypes = {
    onClick: PropTypes.func,
};
