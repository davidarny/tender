/** @jsx jsx */

import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialLink from "@material-ui/core/Link";

export default function Link({ href, value, color = "black", underline = "always" }) {
    return (
        <MaterialLink
            css={{ color }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline={underline}
        >
            {value}
        </MaterialLink>
    );
}

Link.propTypes = {
    href: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string,
    underline: PropTypes.oneOf(["always", "hover", "none"]),
};
