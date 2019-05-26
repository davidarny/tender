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
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

export default function AddLoyalty({ type }) {
    const [form, setFormValues] = useState({
        title: undefined,
        distance: undefined,
        cost: undefined,
        points: undefined,
        transferType: "income",
        condition: "distance",
        property: "every",
        train: undefined,
        trains: undefined,
        startStation: undefined,
        endStation: undefined,
        service: "vip",
        termsStart: moment(),
        termsEnd: moment(),
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
        const condition = event.target.value;
        if (condition === "distance") {
            setFormValues({ ...form, condition, cost: undefined, property: "every" });
        }
        if (condition === "cost") {
            setFormValues({ ...form, condition, distance: undefined, property: "more" });
        }
        console.log("%cAddLoyalty condition change", "color: #3F51B5", event.target.value);
    }

    function onTermsStartChange(date) {
        setFormValues({ ...form, termsStart: date });
        console.log("%cAddLoyalty terms start change", "color: #3F51B5", date);
    }

    function onTermsEndChange(date) {
        setFormValues({ ...form, termsEnd: date });
        console.log("%cAddLoyalty terms end change", "color: #3F51B5", date);
    }

    function onPropertyChange(event) {
        setFormValues({ ...form, property: event.target.value });
        console.log("%cAddLoyalty property change", "color: #3F51B5", event.target.value);
    }

    function onDistanceChange(event) {
        setFormValues({ ...form, distance: event.target.value });
        console.log("%cAddLoyalty distance change", "color: #3F51B5", event.target.value);
    }

    function onCostChange(event) {
        setFormValues({ ...form, cost: event.target.value });
        console.log("%cAddLoyalty cost change", "color: #3F51B5", event.target.value);
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
            property: `${form.points || 345} баллов за каждые ${form.distance || 600} км`,
            trains: "116C, 858A, 032A-Лев Толстой",
            termsStart: form.termsStart.toDate(),
            termsEnd: form.termsEnd.toDate(),
        });
        navigate(BASE_PATH + `/loyalty/${form.loyaltyType}`);
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
                                            >
                                                <MenuItem value="every">Каждые</MenuItem>
                                                <MenuItem value="more">Более</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {form.condition === "distance" && (
                                            <FormControl margin="normal" required fullWidth>
                                                <InputLabel htmlFor="distance">
                                                    Расстояние
                                                </InputLabel>
                                                <Input
                                                    id="distance"
                                                    name="distance"
                                                    autoComplete="distance"
                                                    onChange={onDistanceChange}
                                                />
                                            </FormControl>
                                        )}
                                        {form.condition === "cost" && (
                                            <FormControl margin="normal" required fullWidth>
                                                <InputLabel htmlFor="cost">Стоимость</InputLabel>
                                                <Input
                                                    id="cost"
                                                    name="cost"
                                                    autoComplete="cost"
                                                    onChange={onCostChange}
                                                />
                                            </FormControl>
                                        )}
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
                                            >
                                                <MenuItem value="vip">VIP</MenuItem>
                                                <MenuItem value="nonVip">NO VIP</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <MuiPickersUtilsProvider
                                                utils={MomentUtils}
                                                css={css`
                                                    width: 40%;
                                                `}
                                            >
                                                <DatePicker
                                                    id="terms"
                                                    margin="normal"
                                                    label="Срок действия, начало"
                                                    value={form.termsStart}
                                                    onChange={onTermsStartChange}
                                                    format="DD MMM YYYY"
                                                />
                                            </MuiPickersUtilsProvider>
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <DatePicker
                                                    id="terms"
                                                    margin="normal"
                                                    label="Срок действия, конец"
                                                    value={form.termsEnd}
                                                    onChange={onTermsEndChange}
                                                    format="DD MMM YYYY"
                                                />
                                            </MuiPickersUtilsProvider>
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
