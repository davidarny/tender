/** @jsx jsx */

import { jsx } from "@emotion/core";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import TableCell from "@material-ui/core/TableCell";

export default function TableCellMoreIcon() {
    return (
        <TableCell align="right">
            <IconButton>
                <MoreIcon />
            </IconButton>
        </TableCell>
    );
}
