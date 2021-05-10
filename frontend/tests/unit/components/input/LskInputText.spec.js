import flushPromises from "flush-promises";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputText", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputText, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "TEST VALUE",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("valid input");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputText, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        wrapper.vm.$refs.provider.validate();
        await flushPromises();
        expect(wrapper.find(".v-messages__message").text()).toBe("Required");
    });
});
