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
import {
    ADD_WAGON,
    GET_WAGON_TYPES,
    GET_WAGON_CLASSES,
    GET_WAGON_CLASSES_BY_ABBR,
} from "actions/wagon";
import first from "lodash/first";

export default function AddWagon() {
    const store = useContext(StoreContext);
    const [form, setFormValues] = useState({
        publicId: undefined,
        number: undefined,
        type: first(store.wagon[GET_WAGON_TYPES]()).id,
        class: first(store.wagon[GET_WAGON_CLASSES]()).id,
    });

    function onPublicIdChange(event) {
        setFormValues({ ...form, publicId: event.target.value });
        console.log("%cAddWagon publicId change", "color: #2E7D32", event.target.value);
    }

    function onNumberChange(event) {
        setFormValues({ ...form, number: event.target.value });
        console.log("%cAddWagon number change", "color: #2E7D32", event.target.value);
    }

    function onTypeChange(event) {
        const wagonClasses = store.wagon[GET_WAGON_CLASSES_BY_ABBR]({ abbr: event.target.value });
        const nextWagonClass = wagonClasses.length ? first(wagonClasses).id : "";
        setFormValues({
            ...form,
            type: event.target.value,
            class: nextWagonClass,
        });
        console.log("%cAddWagon type change", "color: #2E7D32", event.target.value);
        console.log("%cAddWagon class change", "color: #2E7D32", nextWagonClass);
    }

    function onClassChange(event) {
        setFormValues({ ...form, class: event.target.value });
        console.log("%cAddWagon class change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddWagon submit", "color: #2E7D32", form);
        event.preventDefault();
        store.wagon[ADD_WAGON]({ ...getWagonPayload(), ...form });
        navigate(BASE_PATH + "/catalog/wagons");
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
                                        Тип вагона
                                    </InputLabel>
                                    <Select
                                        value={form.type}
                                        onChange={onTypeChange}
                                        input={<Input name="wagonType" id="wagonType" />}
                                        name="wagonType"
                                    >
                                        {store.wagon[GET_WAGON_TYPES]().map(wagonType => (
                                            <MenuItem key={wagonType.id} value={wagonType.id}>
                                                {wagonType.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="wagonClass">
                                        Класс обслуживания
                                    </InputLabel>
                                    <Select
                                        value={form.class}
                                        onChange={onClassChange}
                                        input={<Input name="wagonClass" id="wagonClass" />}
                                        name="wagonClass"
                                    >
                                        {store.wagon[GET_WAGON_CLASSES_BY_ABBR]({
                                            abbr: form.type,
                                        }).map(wagonClass => (
                                            <MenuItem key={wagonClass.id} value={wagonClass.id}>
                                                {wagonClass.title}
                                            </MenuItem>
                                        ))}
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
