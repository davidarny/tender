/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import Link from "./Link";
import Typography from "@material-ui/core/Typography";

export default function Header({ logo }) {
    return (
        <header
            css={css`
                background-color: #282c34;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: calc(10px + 2vmin);
                color: white;
                text-align: center;
            `}
        >
            <img
                src={logo}
                css={css`
                    animation: logo-spin infinite 20s linear;
                    height: 40vmin;
                    pointer-events: none;
                `}
                alt="logo"
            />
            <Typography
                css={css`
                    color: white;
                `}
                variant="h5"
            >
                Edit <code>src/App.js</code> and save to reload.
            </Typography>
            <Link color="#61dafb" href="https://reactjs.org" value="Learn React" />
        </header>
    );
}

Header.propTypes = {
    logo: PropTypes.string.isRequired,
};
