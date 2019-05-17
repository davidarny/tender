/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";
import { BASE_PATH } from "context";

export default function PrivateRoute({ isLoggedIn, noRedirect = false, render, ...rest }) {
    if (!isLoggedIn) {
        if (noRedirect) {
            return null;
        } else {
            return process.env.NODE_ENV === "development" ? null : (
                <Redirect to={BASE_PATH + "/login"} noThrow />
            );
        }
    } else {
        return render(rest);
    }
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    noRedirect: PropTypes.bool,
    render: PropTypes.func.isRequired,
};
