import flushPromises from "flush-promises";
import LskInputCheckbox from "@/components/input/LskInputCheckbox";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputCheckbox", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputCheckbox, {
            propsData: {
                cid: "TEST_CID",
                checked: true,
                label: "TEST LABEL",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("valid input");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputCheckbox, {
            propsData: {
                cid: "TEST_CID",
                checked: false,
                label: "TEST LABEL",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        wrapper.vm.$refs.provider.validate();
        await flushPromises();
        expect(wrapper.find(".v-messages__message").text()).toBe("Required");
    });
});
