import VueRouter from "vue-router";
import lsk_auth from "@/plugins/lsk_auth";
import lsk_routes from "@/plugins/lsk_routes";

export function beforeEach(to, from, next) {
    if (lsk_auth.loggedIn()) {
        if (to.name === "index" || to.name === "login") {
            next({ name: "indexInvoice" });
        } else {
            next();
        }
    } else {
        if (to.name === "login") {
            next();
        } else {
            next({ name: "login" });
        }
    }
}

const router = new VueRouter({
    routes: lsk_routes,
    mode: "history",
});

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
