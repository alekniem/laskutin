import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";

export function createWrapper(
    component,
    { propsData = {}, router = null, slots = {}, stubs = {}, vuetify = new Vuetify() } = {}
) {
    const localVue = createLocalVue();

    if (router !== null) {
        localVue.use(VueRouter);
    }

    const options = {
        localVue,
        propsData,
        router,
        slots,
        stubs,
        vuetify,
    };

    return mount(component, options);
}

export function printConsoleLog(data) {
    console.log(JSON.stringify(data, null, 4));
}
