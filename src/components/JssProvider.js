import React from "react";
import ReactJssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById("jss-insertion-point"),
});

export default function JssProvider({ children }) {
    return (
        <ReactJssProvider jss={jss} generateClassName={generateClassName}>
            {children}
        </ReactJssProvider>
    );
}
