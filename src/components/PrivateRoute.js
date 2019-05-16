/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Redirect } from "@reach/router";
import PropTypes from "prop-types";

export default function PrivateRoute({ isLoggedIn, noRedirect = false, render }) {
    if (!isLoggedIn) {
        if (noRedirect) {
            return null;
        } else {
            return <Redirect to="/login" noThrow />;
        }
    } else {
        return render();
    }
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    noRedirect: PropTypes.bool,
    render: PropTypes.func.isRequired,
};
