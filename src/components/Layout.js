/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

export default function Layout({ children, centered = false }) {
    return (
        <div
            css={css`
                padding: ${centered ? "20px" : "50px"} 0 20px;
                width: 100%;
                min-height: 100%;
            `}
        >
            {children}
        </div>
    );
}

Layout.propTypes = {
    centered: PropTypes.bool,
};
