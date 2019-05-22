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
import { getWagonPayload } from "utils";
import { navigate } from "@reach/router";
import Layout from "components/Layout";
import { ADD_WAGON } from "actions/wagon";

export default function AddWagon() {
    const [form, setFormValues] = useState({
        publicId: undefined,
        number: undefined,
        type: 1,
        subClass: 1,
    });
    const store = useContext(StoreContext);

    function onPublicIdChange(event) {
        setFormValues({ ...form, publicId: event.target.value });
        console.log("%cAddWagon publicId change", "color: #2E7D32", event.target.value);
    }

    function onNumberChange(event) {
        setFormValues({ ...form, number: event.target.value });
        console.log("%cAddWagon number change", "color: #2E7D32", event.target.value);
    }

    function onTypeChange(event) {
        setFormValues({ ...form, type: +event.target.value });
        console.log("%cAddWagon type change", "color: #2E7D32", event.target.value);
    }

    function onSubClassChange(event) {
        setFormValues({ ...form, subClass: +event.target.value });
        console.log("%cAddWagon subClass change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddWagon submit", "color: #2E7D32", form);
        event.preventDefault();
        store.wagon[ADD_WAGON]({ ...getWagonPayload(), ...form });
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
                        title="Добавление вагона"
                        button="ДОБАВИТЬ"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="wagonPublicId">
                                        Идентификатор вагона
                                    </InputLabel>
                                    <Input
                                        id="wagonPublicId"
                                        name="wagonPublicId"
                                        autoComplete="wagonPublicId"
                                        autoFocus
                                        onChange={onPublicIdChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="wagonNumber">Номер вагона</InputLabel>
                                    <Input
                                        id="wagonNumber"
                                        name="wagonNumber"
                                        autoComplete="wagonNumber"
                                        onChange={onNumberChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="wagonType">
                                        Класс
                                    </InputLabel>
                                    <Select
                                        value={form.type}
                                        onChange={onTypeChange}
                                        input={<Input name="wagonType" id="wagonType" />}
                                        name="wagonType"
                                    >
                                        <MenuItem value="1">Купейный</MenuItem>
                                        <MenuItem value="2">Плацкартный</MenuItem>
                                        <MenuItem value="3">Сидячий</MenuItem>
                                        <MenuItem value="4">Люкс (СВ)</MenuItem>
                                        <MenuItem value="5">Мягкий</MenuItem>
                                        <MenuItem value="6">Общий</MenuItem>
                                        <MenuItem value="7">«Стриж»</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="wagonSubclass">
                                        Подкласс
                                    </InputLabel>
                                    <Select
                                        value={form.subClass}
                                        onChange={onSubClassChange}
                                        input={<Input name="wagonSubclass" id="wagonSubclass" />}
                                        name="wagonSubclass"
                                    >
                                        <MenuItem value="1">2Э</MenuItem>
                                        <MenuItem value="2">2Т</MenuItem>
                                        <MenuItem value="3">1Р</MenuItem>
                                        <MenuItem value="4">1Э</MenuItem>
                                        <MenuItem value="5">1А</MenuItem>
                                        <MenuItem value="6">3В</MenuItem>
                                        <MenuItem value="7">1Е</MenuItem>
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
