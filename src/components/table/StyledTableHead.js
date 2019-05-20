/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import TableHead from "@material-ui/core/TableHead";

export default function StyledTableHead({ children }) {
    return (
        <TableHead
            css={css`
                background-color: #b0bec5;
            `}
        >
            {children}
        </TableHead>
    );
}
