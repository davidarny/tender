import { types } from "mobx-state-tree";
import { LOG_IN, LOG_OUT, TOGGLE_DRAWER } from "actions/ui";

const DrawerItem = types.model({
    title: types.string,
    url: types.string,
});

const UiStore = types
    .model({
        isLoggedIn: types.optional(types.boolean, false),
        drawer: types.optional(types.array(DrawerItem), [
            { title: "Главная", url: "/" },
            { title: "Управление системой", url: "/management" },
            { title: "Партнеры", url: "/partners" },
            { title: "Участники ПЛ", url: "/participants" },
            { title: "Тикеты", url: "/tickets" },
            { title: "Статистика", url: "/statistic" },
            { title: "Акции", url: "/deals" },
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
