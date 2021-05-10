import Vue from "vue";
import Vuetify from "vuetify";
import { centsToEuros, formatDate, hasField } from "@/plugins/lsk_functions";
import "@/plugins/lsk_vee-validate";

Vue.use(Vuetify);

function trans(message) {
    return message;
}

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

const showWarning = console.warn;

console.warn = (...args) => {
    if (String(args[0]).includes("[Vuetify] Unable to locate target [data-app]")) {
        return;
    }
    showWarning(...args);
};
