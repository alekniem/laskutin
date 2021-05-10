import flushPromises from "flush-promises";
import LskInputPercent from "@/components/input/LskInputPercent";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputPercent", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputPercent, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "24",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("valid input");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputPercent, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "INVALID",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        wrapper.vm.$refs.provider.validate();
        await flushPromises();
        expect(wrapper.find(".v-messages__message").text()).toBe("Invalid percent value");
    });
});
