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
            { title: "Партнеры", url: "/partners" },
            { title: "Участники ПЛ", url: "/participants" },
            { title: "Акции", url: "/deals" },
            { title: "Каталог", url: "/catalog" },
            { title: "Статистика", url: "/statistic" },
            { title: "Программа лояльности", url: "/loyalty" },
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
