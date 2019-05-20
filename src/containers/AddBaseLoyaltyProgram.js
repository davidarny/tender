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
import { navigate } from "@reach/router";
import shortid from "shortid";

export default function AddBaseLoyaltyProgram() {
    const [form, setFormValues] = useState({
        title: undefined,
        distance: undefined,
        points: undefined,
        pointsType: "points-in",
        condition: "distance",
        property: "every",
        train: "tolstoy",
    });
    const store = useContext(StoreContext);

    function onTitleChange(event) {
        setFormValues({ ...form, title: event.target.value });
        console.log("%AddBaseLoyaltyProgram title change", "color: #2E7D32", event.target.value);
    }

    function onPointsTypeChange(event) {
        setFormValues({ ...form, pointsType: event.target.value });
        console.log(
            "%AddBaseLoyaltyProgram points type change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onConditionChange(event) {
        setFormValues({ ...form, condition: event.target.value });
        console.log(
            "%AddBaseLoyaltyProgram condition change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onPropertyChange(event) {
        setFormValues({ ...form, property: event.target.value });
        console.log("%AddBaseLoyaltyProgram property change", "color: #2E7D32", event.target.value);
    }

    function onDistanceChange(event) {
        setFormValues({ ...form, distance: event.target.value });
        console.log(
            "%AddBaseLoyaltyProgram ddistance change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onPointsChange(event) {
        setFormValues({ ...form, points: event.target.value });
        console.log("%AddBaseLoyaltyProgram points change", "color: #2E7D32", event.target.value);
    }

    function onTrainChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%AddBaseLoyaltyProgram train change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%AddBaseLoyaltyProgram submit", "color: #2E7D32", form);
        event.preventDefault();
        // TODO: save data
        navigate(BASE_PATH + "/loyality");
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            css={css`
                width: 100%;
                height: 100%;
                margin-top: 30px;
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
                    title="Добавление базового правила"
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
                                <InputLabel shrink htmlFor="pointsType-label-placeholder">
                                    Тип
                                </InputLabel>
                                <Select
                                    value={form.pointsType}
                                    onChange={onPointsTypeChange}
                                    input={
                                        <Input
                                            name="pointsType"
                                            id="pointsType-label-placeholder"
                                        />
                                    }
                                    displayEmpty
                                    name="pointsType"
                                >
                                    <MenuItem value="points-in">Начисление баллов</MenuItem>
                                    <MenuItem value="points-out">Списание баллов</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="condition-label-placeholder">
                                    Условие
                                </InputLabel>
                                <Select
                                    value={form.condition}
                                    onChange={onConditionChange}
                                    input={
                                        <Input name="condition" id="condition-label-placeholder" />
                                    }
                                    displayEmpty
                                    name="condition"
                                >
                                    <MenuItem value="distance">Расстояние</MenuItem>
                                    <MenuItem value="cost">Стоимость</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="property-label-placeholder">
                                    Свойство
                                </InputLabel>
                                <Select
                                    value={form.property}
                                    onChange={onPropertyChange}
                                    input={
                                        <Input name="property" id="property-label-placeholder" />
                                    }
                                    displayEmpty
                                    name="property"
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
                                <InputLabel htmlFor="points">Количество баллов</InputLabel>
                                <Input
                                    id="points"
                                    name="points"
                                    autoComplete="points"
                                    onChange={onPointsChange}
                                />
                            </FormControl>
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="train-label-placeholder">
                                    Список поездов
                                </InputLabel>
                                <Select
                                    value={form.train}
                                    onChange={onTrainChange}
                                    input={<Input name="train" id="train-label-placeholder" />}
                                    displayEmpty
                                    name="train"
                                >
                                    <MenuItem value="tolstoy">116C-Лев Толстой</MenuItem>
                                    <MenuItem value="pushkin">118В-Александр Пушкин</MenuItem>
                                </Select>
                            </FormControl>
                        </Fragment>
                    )}
                />
            </Grid>
        </Grid>
    );
}
