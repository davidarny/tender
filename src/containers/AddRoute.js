/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SignForm from "components/SignForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Fragment, useState, useContext } from "react";
import { StoreContext, BASE_PATH } from "context";
import { getRoutePayload } from "utils";
import { navigate } from "@reach/router";
import Layout from "components/Layout";
import { ADD_ROUTE } from "actions/route";

export default function AddRoute() {
    const [form, setFormValues] = useState({
        startStation: "Москва",
        endStation: "Санкт-Петербург",
    });
    const store = useContext(StoreContext);

    function onStartStationChange(event) {
        setFormValues({ ...form, startStation: event.target.value });
        console.log("%cAddRoute start station change", "color: #2E7D32", event.target.value);
    }

    function onEndStationChange(event) {
        setFormValues({ ...form, endStation: event.target.value });
        console.log("%cAddRoute end station change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddRoute submit", "color: #2E7D32", form);
        event.preventDefault();
        store.route[ADD_ROUTE]({ ...getRoutePayload(), ...form });
        navigate(BASE_PATH + "/catalog/routes");
    }

    return (
        <Layout centered>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                css={css`
                    width: 100%;
                    height: 100%;
                `}
            >
                <Grid
                    item
                    css={css`
                        max-width: 600px;
                    `}
                >
                    <SignForm
                        noIcon
                        title="Добавление маршрута"
                        button="ДОБАВИТЬ"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="startStation">
                                        Станция отправления поезда
                                    </InputLabel>
                                    <Select
                                        value={form.startStation}
                                        onChange={onStartStationChange}
                                        input={<Input name="startStation" id="startStation" />}
                                        name="startStation"
                                    >
                                        <MenuItem value="Москва">Москва</MenuItem>
                                        <MenuItem value="Санкт-Петербург">Санкт-Петербург</MenuItem>
                                        <MenuItem value="Казань">Казань</MenuItem>
                                        <MenuItem value="Чебоксары">Чебоксары</MenuItem>
                                        <MenuItem value="Йошкар-Ола">Йошкар-Ола</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="endStation">
                                        Станция прибытия
                                    </InputLabel>
                                    <Select
                                        value={form.endStation}
                                        onChange={onEndStationChange}
                                        input={<Input name="endStation" id="endStation" />}
                                        name="endStation"
                                    >
                                        <MenuItem value="Москва">Москва</MenuItem>
                                        <MenuItem value="Санкт-Петербург">Санкт-Петербург</MenuItem>
                                        <MenuItem value="Казань">Казань</MenuItem>
                                        <MenuItem value="Чебоксары">Чебоксары</MenuItem>
                                        <MenuItem value="Йошкар-Ола">Йошкар-Ола</MenuItem>
                                    </Select>
                                </FormControl>
                            </Fragment>
                        )}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}
