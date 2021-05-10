import flushPromises from "flush-promises";
import LskBaseMenu from "@/components/base/LskBaseMenu";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseMenu", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskBaseMenu, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("no content in default slot, menu hidden");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskBaseMenu, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
            },
        });
        await flushPromises();
        wrapper.find("button").trigger("click");
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("no content in default slot, menu visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskBaseMenu, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
            },
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("content in default slot, menu hidden");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskBaseMenu, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
            },
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        await flushPromises();
        wrapper.find("button").trigger("click");
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("content in default slot, menu visible");
    });
});
