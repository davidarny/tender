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
    const store = useContext(StoreContext);
    const [form, setFormValues] = useState({
        publicId: undefined,
        number: undefined,
        type: store.wagonType.wagonTypes[0].id,
        class: store.wagonClass.wagonClasses[0].id,
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
        const wagonClasses = getWagonClassesByType(event.target.value);
        const nextWagonClass = wagonClasses.length ? wagonClasses[0].id : "";
        setFormValues({
            ...form,
            type: event.target.value,
            class: nextWagonClass
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

    function getWagonClassesByType (type) {
        return store.wagonClass.wagonClasses
            .filter(wagonClass => wagonClass.type === type)
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
                                        {store.wagonType.wagonTypes.map(type => (
                                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel shrink htmlFor="wagonSubclass">
                                        Подкласс
                                    </InputLabel>
                                    <Select
                                        value={form.class}
                                        onChange={onClassChange}
                                        input={<Input name="wagonSubclass" id="wagonSubclass" />}
                                        name="wagonSubclass"
                                    >
                                        {getWagonClassesByType(form.type).map(type => (
                                                <MenuItem key={type.id} value={type.id}>
                                                    {type.name}
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
