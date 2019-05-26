/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "@reach/router";
import * as PropTypes from "prop-types";

export default function LinkTableCell({ to = "#", fake = false, children }) {
    return (
        <TableCell>
            {fake && (
                <div
                    css={css`
                        color: black;
                        font-weight: 500;
                        text-decoration: underline;
                    `}
                >
                    {children}
                </div>
            )}
            {!fake && (
                <Link
                    css={css`
                        color: black;
                        font-weight: 500;
                    `}
                    to={to}
                >
                    {children}
                </Link>
            )}
        </TableCell>
    );
}

LinkTableCell.propTypes = {
    to: PropTypes.string,
    fake: PropTypes.bool,
};
