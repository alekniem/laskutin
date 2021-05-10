import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import App from "@/App.vue";
import { centsToEuros, formatDate, hasField, trans } from "@/plugins/lsk_functions";
import lsk_router from "@/plugins/lsk_router";
import lsk_vuetify from "@/plugins/lsk_vuetify";
import "@/plugins/lsk_vee-validate";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.filter("centsToEuros", centsToEuros);
Vue.filter("formatDate", formatDate);
Vue.filter("trans", trans);

Vue.mixin({
    methods: {
        centsToEuros,
        formatDate,
        hasField,
        trans,
    },
});

const requireComponent = require.context("./components", true, /Lsk[A-Z]\w+\.vue$/);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(
            fileName
                .split("/")
                .pop()
                .replace(/\.\w+$/, "")
        )
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
    router: lsk_router,
    vuetify: lsk_vuetify,
    render: (h) => h(App),
}).$mount("#app");
