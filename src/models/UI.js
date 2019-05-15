import { types } from "mobx-state-tree";
import { LOG_IN, LOG_OUT, TOGGLE_DRAWER } from "actions/ui";
import { BASE_PATH } from "context";

const DrawerItem = types.model({
    title: types.string,
    url: types.string,
});

const UiStore = types
    .model({
        isLoggedIn: types.optional(types.boolean, false),
        drawer: types.optional(types.array(DrawerItem), [
            { title: "Главная", url: BASE_PATH === "" ? "/" : BASE_PATH },
            { title: "Управление системой", url: BASE_PATH + "/management" },
            { title: "Партнеры", url: BASE_PATH + "/partners" },
            { title: "Участники ПЛ", url: BASE_PATH + "/participants" },
            { title: "Тикеты", url: BASE_PATH + "/tickets" },
            { title: "Статистика", url: BASE_PATH + "/statistic" },
            { title: "Акции", url: BASE_PATH + "/deals" },
        ]),
        isDrawerOpen: types.optional(types.boolean, false),
    })
    .actions(self => ({
        [LOG_IN]() {
            self.isLoggedIn = true;
        },

        [LOG_OUT]() {
            self.isLoggedIn = false;
        },

        [TOGGLE_DRAWER]() {
            self.isDrawerOpen = !self.isDrawerOpen;
        },
    }));

export default UiStore;
