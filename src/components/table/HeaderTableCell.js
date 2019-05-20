/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import TableCell from "@material-ui/core/TableCell";

export default function HeaderTableCell({ children }) {
    return (
        <TableCell
            css={css`
                font-size: 0.9em;
                color: black;
            `}
        >
            {children}
        </TableCell>
    );
}
