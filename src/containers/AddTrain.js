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
import { getTrainPayload } from "utils";
import { navigate } from "@reach/router";
import Layout from "components/Layout";
import { ADD_TRAIN } from "actions/train";

export default function AddTrain() {
    const [form, setFormValues] = useState({
        number: undefined,
        type: 1,
    });
    const store = useContext(StoreContext);

    function onNumberChange(event) {
        setFormValues({ ...form, number: event.target.value });
        console.log("%cTrain name change", "color: #2E7D32", event.target.value);
    }

    function onTypeChange(event) {
        setFormValues({ ...form, type: +event.target.value });
        console.log("%cTrain type change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddPartner submit", "color: #2E7D32", form);
        event.preventDefault();
        store.train[ADD_TRAIN]({ ...getTrainPayload(form.type), ...form });
        navigate(BASE_PATH + "/catalog");
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
                        title="Добавление номера поезда"
                        button="Добавить"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="train-number">Номер поезда</InputLabel>
                                    <Input
                                        id="train-number"
                                        name="train-number"
                                        autoComplete="train-number"
                                        autoFocus
                                        onChange={onNumberChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="train-type">
                                        Тип поезда
                                    </InputLabel>
                                    <Select
                                        value={form.type}
                                        onChange={onTypeChange}
                                        input={<Input name="train-type" id="train-type" />}
                                        displayEmpty
                                        name="train-type"
                                    >
                                        <MenuItem value="1">Скорый круглогодичный</MenuItem>
                                        <MenuItem value="2">
                                            Скорый сезонного и разового обращения
                                        </MenuItem>
                                        <MenuItem value="3">Пассажирский круглогодичный</MenuItem>
                                        <MenuItem value="4">Высокоскоростной</MenuItem>
                                        <MenuItem value="5">Скоростной</MenuItem>
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
