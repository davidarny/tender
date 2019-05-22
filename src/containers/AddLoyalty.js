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
import { ADD_LOYALTY } from "actions/loyalty";
import { getLoyaltyPayload } from "utils";
import { navigate } from "@reach/router";
import Layout from "components/Layout";

export default function AddLoyalty({ type }) {
    const [form, setFormValues] = useState({
        title: undefined,
        distance: undefined,
        points: undefined,
        transferType: "income",
        condition: "distance",
        property: "every",
        train: undefined,
        trains: undefined,
        startStation: undefined,
        endStation: undefined,
        service: "vip",
        terms: undefined,
        loyaltyType: type,
    });
    const store = useContext(StoreContext);

    function onTitleChange(event) {
        setFormValues({ ...form, title: event.target.value });
        console.log("%cAddLoyalty title change", "color: #3F51B5", event.target.value);
    }

    function onTransferTypeChange(event) {
        setFormValues({ ...form, transferType: event.target.value });
        console.log("%cAddLoyalty transfer ype change", "color: #3F51B5", event.target.value);
    }

    function onStartStationChange(event) {
        setFormValues({ ...form, startStation: event.target.value });
        console.log("%cAddLoyalty station start change", "color: #3F51B5", event.target.value);
    }

    function onEndStationChange(event) {
        setFormValues({ ...form, endStation: event.target.value });
        console.log("%cAddLoyalty station end change", "color: #3F51B5", event.target.value);
    }

    function onTrainChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%cAddLoyalty train change", "color: #3F51B5", event.target.value);
    }

    function onServiceChange(event) {
        setFormValues({ ...form, service: event.target.value });
        console.log("%cAddLoyalty service change", "color: #3F51B5", event.target.value);
    }

    function onConditionChange(event) {
        setFormValues({ ...form, condition: event.target.value });
        console.log("%cAddLoyalty condition change", "color: #3F51B5", event.target.value);
    }

    function onTermsChange(event) {
        setFormValues({ ...form, terms: event.target.value });
        console.log("%cAddLoyalty terms change", "color: #3F51B5", event.target.value);
    }

    function onPropertyChange(event) {
        setFormValues({ ...form, property: event.target.value });
        console.log("%cAddLoyalty property change", "color: #3F51B5", event.target.value);
    }

    function onDistanceChange(event) {
        setFormValues({ ...form, distance: event.target.value });
        console.log("%cAddLoyalty distance change", "color: #3F51B5", event.target.value);
    }

    function onPointsChange(event) {
        setFormValues({ ...form, points: event.target.value });
        console.log("%cAddLoyalty points change", "color: #3F51B5", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%cAddLoyalty submit", "color: #3F51B5", form);
        event.preventDefault();
        store.loyalty[ADD_LOYALTY]({
            ...getLoyaltyPayload(type),
            ...form,
            loyaltyType: type,
            status: 2,
            property: `${form.points} балов за каждые ${form.distance} км`,
            trains: "116C, 858A, 032A-Лев Толстой",
        });
        navigate(BASE_PATH + "/loyalty");
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
                        title={getFormTitle(type)}
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
                                    <InputLabel shrink htmlFor="transferType">
                                        Тип
                                    </InputLabel>
                                    <Select
                                        value={form.transferType}
                                        onChange={onTransferTypeChange}
                                        input={<Input name="transferType" id="transferType" />}
                                        name="transferType"
                                        defaultValue="income"
                                    >
                                        <MenuItem value="income">Начисление баллов</MenuItem>
                                        <MenuItem value="withdraw">Списание баллов</MenuItem>
                                    </Select>
                                </FormControl>
                                {type === "base" && (
                                    <Fragment>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="condition">
                                                Условие
                                            </InputLabel>
                                            <Select
                                                value={form.condition}
                                                onChange={onConditionChange}
                                                input={<Input name="condition" id="condition" />}
                                                name="condition"
                                                defaultValue="distance"
                                            >
                                                <MenuItem value="distance">Расстояние</MenuItem>
                                                <MenuItem value="cost">Стоимость</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="property">
                                                Свойство
                                            </InputLabel>
                                            <Select
                                                value={form.property}
                                                onChange={onPropertyChange}
                                                input={<Input name="property" id="property" />}
                                                name="property"
                                                defaultValue="every"
                                            >
                                                <MenuItem value="every">Каждые</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="distance">Расстояние</InputLabel>
                                            <Input
                                                id="distance"
                                                name="distance"
                                                autoComplete="distance"
                                                onChange={onDistanceChange}
                                            />
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="points">
                                                Количество баллов
                                            </InputLabel>
                                            <Input
                                                id="points"
                                                name="points"
                                                autoComplete="points"
                                                onChange={onPointsChange}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="train">
                                                Список поездов
                                            </InputLabel>
                                            <Select
                                                value={form.train || "116C-Лев Толстой"}
                                                onChange={onTrainChange}
                                                input={<Input name="train" id="train" />}
                                                name="train"
                                                defaultValue="116C-Лев Толстой"
                                            >
                                                <MenuItem value="116C-Лев Толстой">
                                                    116C-Лев Толстой
                                                </MenuItem>
                                                <MenuItem value="118В-Александр Пушкин">
                                                    118В-Александр Пушкин
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Fragment>
                                )}
                                {type === "extra" && (
                                    <Fragment>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="startStation">
                                                Начальная станция
                                            </InputLabel>
                                            <Select
                                                value={form.startStation || "Москва"}
                                                onChange={onStartStationChange}
                                                input={
                                                    <Input name="startStation" id="startStation" />
                                                }
                                                name="startStation"
                                                defaultValue="Москва"
                                            >
                                                <MenuItem value="Москва">Москва</MenuItem>
                                                <MenuItem value="Казань">Казань</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="endStation">
                                                Конечная станция
                                            </InputLabel>
                                            <Select
                                                value={form.endStation || "Казань"}
                                                onChange={onEndStationChange}
                                                input={<Input name="endStation" id="endStation" />}
                                                name="endStation"
                                                defaultValue="Казань"
                                            >
                                                <MenuItem value="Москва">Москва</MenuItem>
                                                <MenuItem value="Казань">Казань</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel shrink htmlFor="train">
                                                Номер поезда
                                            </InputLabel>
                                            <Select
                                                value={form.train || "116C-Лев Толстой"}
                                                onChange={onTrainChange}
                                                input={<Input name="train" id="train" />}
                                                defaultValue="116C-Лев Толстой"
                                                name="train"
                                            >
                                                <MenuItem value="116C-Лев Толстой">
                                                    116C-Лев Толстой
                                                </MenuItem>
                                                <MenuItem value="118В-Александр Пушкин">
                                                    118В-Александр Пушкин
                                                </MenuItem>
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
                                                name="service"
                                                defaultValue="vip"
                                            >
                                                <MenuItem value="vip">VIP</MenuItem>
                                                <MenuItem value="nonVip">NO VIP</MenuItem>
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
                            </Fragment>
                        )}
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}

function getFormTitle(type) {
    if (type === "base") {
        return "Добавление базового правила";
    }
    if (type === "extra") {
        return "Добавление дополнительного правила";
    }
}
