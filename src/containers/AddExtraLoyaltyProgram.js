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
import { ADD_EXTRA_LOYALTY } from "actions/extraLoyalty";
import { getExtraLoyaltyProgramPayload } from "utils";
import { navigate } from "@reach/router";
import Layout from "components/Layout";

export default function AddExtraLoyaltyProgram() {
    const [form, setFormValues] = useState({
        title: undefined,
        type: "Начисление",
        stationStart: "Москва",
        stationEnd: "Казань",
        train: "tolstoy",
        service: "vip",
        terms: undefined,
    });
    const store = useContext(StoreContext);

    function onTitleChange(event) {
        setFormValues({ ...form, title: event.target.value });
        console.log("%cAddExtraLoyaltyProgram title change", "color: #2E7D32", event.target.value);
    }

    function onTypeChange(event) {
        setFormValues({ ...form, type: event.target.value });
        console.log(
            "%сAddExtraLoyaltyProgram points type change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onStationStartChange(event) {
        setFormValues({ ...form, stationStart: event.target.value });
        console.log(
            "%cAddExtraLoyaltyProgram station start change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onStationEndChange(event) {
        setFormValues({ ...form, stationEnd: event.target.value });
        console.log(
            "%cAddExtraLoyaltyProgram station end change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onTrainChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%cAddExtraLoyaltyProgram train change", "color: #2E7D32", event.target.value);
    }

    function onServiceChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log(
            "%cAddExtraLoyaltyProgram service change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onTermsChange(event) {
        setFormValues({ ...form, terms: event.target.value });
        console.log("%cAddExtraLoyaltyProgram terms change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddExtraLoyaltyProgram submit", "color: #2E7D32", form);
        event.preventDefault();
        store.extraLoyaltyProgram[ADD_EXTRA_LOYALTY]({
            ...getExtraLoyaltyProgramPayload(),
            ...form,
            status: "Не активно",
        });
        navigate(BASE_PATH + "/loyality");
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
                        title="Добавление дополнительного правила"
                        button="ДОБАВИТЬ"
                        onSubmit={onFormSubmit}
                        controls={() => (
                            <Fragment>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="title">Название</InputLabel>
                                    <Input
                                        id="title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        onChange={onTitleChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel shrink htmlFor="type">
                                        Тип
                                    </InputLabel>
                                    <Select
                                        value={form.type}
                                        onChange={onTypeChange}
                                        input={<Input name="type" id="type" />}
                                        displayEmpty
                                        name="type"
                                    >
                                        <MenuItem value="Начисление">Начисление баллов</MenuItem>
                                        <MenuItem value="Списание">Списание баллов</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel shrink htmlFor="stationStart">
                                        Начальная станция
                                    </InputLabel>
                                    <Select
                                        value={form.stationStart}
                                        onChange={onStationStartChange}
                                        input={<Input name="stationStart" id="stationStart" />}
                                        displayEmpty
                                        name="stationStart"
                                    >
                                        <MenuItem value="Москва">Москва</MenuItem>
                                        <MenuItem value="Казань">Казань</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel shrink htmlFor="stationEnd">
                                        Конечная станция
                                    </InputLabel>
                                    <Select
                                        value={form.stationEnd}
                                        onChange={onStationEndChange}
                                        input={<Input name="stationEnd" id="stationEnd" />}
                                        displayEmpty
                                        name="stationEnd"
                                    >
                                        <MenuItem value="moscow">Москва</MenuItem>
                                        <MenuItem value="kazan">Казань</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel shrink htmlFor="train">
                                        Номер поезда
                                    </InputLabel>
                                    <Select
                                        value={form.train}
                                        onChange={onTrainChange}
                                        input={<Input name="train" id="train" />}
                                        displayEmpty
                                        name="train"
                                    >
                                        <MenuItem value="tolstoy">116C-Лев Толстой</MenuItem>
                                        <MenuItem value="pushkin">118В-Александр Пушкин</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth margin="normal">
                                    <InputLabel shrink htmlFor="service">
                                        Класс обслуживания
                                    </InputLabel>
                                    <Select
                                        value={form.service}
                                        onChange={onServiceChange}
                                        input={<Input name="service" id="service" />}
                                        displayEmpty
                                        name="service"
                                    >
                                        <MenuItem value="vip">VIP</MenuItem>
                                        <MenuItem value="noVip">NO VIP</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="terms">
                                        Срок действия, периодичность
                                    </InputLabel>
                                    <Input
                                        id="terms"
                                        name="terms"
                                        autoComplete="terms"
                                        onChange={onTermsChange}
                                    />
                                </FormControl>
                            </Fragment>
                        )}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}
