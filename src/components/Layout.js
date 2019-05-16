/** @jsx jsx */

import { jsx, css } from "@emotion/core";

export default function Layout({ children }) {
    return (
        <div
            css={css`
                margin-top: 58px;
                display: flex;
                width: inherit;
            `}
        >
            <div
                css={css`
                    width: inherit;
                `}
            >
                {children}
            </div>
        </div>
    );
}
