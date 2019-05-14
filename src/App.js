/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import logo from "./assets/logo.svg";
import { Fragment } from "react";
import Header from "components/Header";
import JssProvider from "components/JssProvider";

export default function App() {
    return (
        <JssProvider>
            <Fragment>
                <Global
                    styles={css`
                        body {
                            margin: 0;
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
                                "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
                                "Helvetica Neue", sans-serif;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }

                        code {
                            font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
                                monospace;
                        }

                        @keyframes logo-spin {
                            from {
                                transform: rotate(0deg);
                            }
                            to {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                />
                <Header logo={logo} />
            </Fragment>
        </JssProvider>
    );
}
