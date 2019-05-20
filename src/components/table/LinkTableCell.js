/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

export default function LinkTableCell({ to = "#", children }) {
    return (
        <TableCell>
            <Link
                css={css`
                    color: black;
                    font-weight: 500;
                `}
                to={to}
            >
                {children}
            </Link>
        </TableCell>
    );
}

LinkTableCell.propTypes = {
    to: PropTypes.string,
};
