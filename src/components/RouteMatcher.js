/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Match } from "@reach/router";
import PropTypes from "prop-types";

export default function RouteMatcher({ routes }) {
    return routes.map(route => {
        if (route.paths) {
            return route.paths.map(path => {
                return (
                    <Match key={path} path={path}>
                        {props => props.match && route.render()}
                    </Match>
                );
            });
        } else if (route.path) {
            return (
                <Match key={route.path} path={route.path}>
                    {props => props.match && route.render()}
                </Match>
            );
        } else {
            return null;
        }
    });
}

RouteMatcher.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            paths: PropTypes.arrayOf(PropTypes.string),
            path: PropTypes.string,
            render: PropTypes.func.isRequired,
        })
    ).isRequired,
};
