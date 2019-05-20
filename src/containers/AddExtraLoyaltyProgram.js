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

export default function AddExtraLoyaltyProgram() {
    const [form, setFormValues] = useState({
        title: undefined,
        stationStart: "moscow",
        stationEnd: "kazan",
        train: "tolstoy",
        service: "vip",
        terma: undefined,
    });
    const store = useContext(StoreContext);

    function onTitleChange(event) {
        setFormValues({ ...form, title: event.target.value });
        console.log("%AddExtraLoyaltyProgram title change", "color: #2E7D32", event.target.value);
    }

    function onStationStartChange(event) {
        setFormValues({ ...form, stationStart: event.target.value });
        console.log(
            "%AddExtraLoyaltyProgram station start change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onStationEndChange(event) {
        setFormValues({ ...form, stationEnd: event.target.value });
        console.log(
            "%AddExtraLoyaltyProgram station end change",
            "color: #2E7D32",
            event.target.value
        );
    }

    function onTrainChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%AddExtraLoyaltyProgram train change", "color: #2E7D32", event.target.value);
    }

    function onTrainChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%AddExtraLoyaltyProgram train change", "color: #2E7D32", event.target.value);
    }

    function onServiceChange(event) {
        setFormValues({ ...form, train: event.target.value });
        console.log("%AddExtraLoyaltyProgram service change", "color: #2E7D32", event.target.value);
    }

    function onTermsChange(event) {
        setFormValues({ ...form, terms: event.target.value });
        console.log("%AddExtraLoyaltyProgram terms change", "color: #2E7D32", event.target.value);
    }

    function onFormSubmit(event) {
        console.log("%AddExtraLoyaltyProgram submit", "color: #2E7D32", form);
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
                                <InputLabel shrink htmlFor="stationStart-label-placeholder">
                                    Начальная станция
                                </InputLabel>
                                <Select
                                    value={form.stationStart}
                                    onChange={onStationStartChange}
                                    input={
                                        <Input
                                            name="stationStart"
                                            id="stationStart-label-placeholder"
                                        />
                                    }
                                    displayEmpty
                                    name="stationStart"
                                >
                                    <MenuItem value="moscow">Москва</MenuItem>
                                    <MenuItem value="kazan">Казань</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="stationEnd-label-placeholder">
                                    Конечная станция
                                </InputLabel>
                                <Select
                                    value={form.stationEnd}
                                    onChange={onStationEndChange}
                                    input={
                                        <Input
                                            name="stationEnd"
                                            id="stationEnd-label-placeholder"
                                        />
                                    }
                                    displayEmpty
                                    name="stationEnd"
                                >
                                    <MenuItem value="moscow">Москва</MenuItem>
                                    <MenuItem value="kazan">Казань</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="train-label-placeholder">
                                    Номер поезда
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
                            <FormControl required fullWidth margin="normal">
                                <InputLabel shrink htmlFor="service-label-placeholder">
                                    Класс обслуживания
                                </InputLabel>
                                <Select
                                    value={form.service}
                                    onChange={onServiceChange}
                                    input={<Input name="service" id="service-label-placeholder" />}
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
    );
}
