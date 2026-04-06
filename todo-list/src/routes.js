import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import EditTodo from "./pages/EditTodo.vue";
import AddTodo from "./pages/AddTodo.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/todos/create",
            name: "Add Todo",
            component: AddTodo,
        },
        {
            path: "/todos/:id/edit",
            name: "Edit Todo",
            component: EditTodo,
            props: true,
        },
        {
            path: "/about",
            name: "About",
            component: About,
        },
    ],
});

export { router }
