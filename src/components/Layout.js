/** @jsx jsx */

import { jsx, css } from "@emotion/core";

export default function Layout({ children }) {
    return (
        <div
            css={css`
                margin-top: 58px;
                width: 100%;
            `}
        >
            {children}
        </div>
    );
}
