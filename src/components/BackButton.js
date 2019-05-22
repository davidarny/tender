/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Fab from "@material-ui/core/Fab";
import BackIcon from "@material-ui/icons/KeyboardBackspace";

export default function BackButton() {
    function onButtonClick() {
        window.history.back();
    }

    return (
        <Fab
            onClick={onButtonClick}
            css={css`
                background-color: white;
                color: black;
                width: 36px;
                height: 36px;
            `}
        >
            <BackIcon />
        </Fab>
    );
}
