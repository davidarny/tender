/** @jsx jsx */

import { jsx, css } from "@emotion/core";

export default function Layout({ children }) {
    return (
        <div
            css={css`
                margin-top: 58px;
                margin-bottom: 20px;
                width: 100%;
                height: 100%;
            `}
        >
            {children}
        </div>
    );
}
