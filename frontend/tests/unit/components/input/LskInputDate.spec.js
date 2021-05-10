import flushPromises from "flush-promises";
import LskInputDate from "@/components/input/LskInputDate";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputDate", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputDate, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "2021-01-01",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.vm._data.textFieldValue).toBe("1.1.2021");
        expect(wrapper.html()).toMatchSnapshot("valid input");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputDate, {
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
        expect(wrapper.vm._data.textFieldValue).toBe("INVALID");
        expect(wrapper.find(".v-messages__message").text()).toBe("Invalid date");
    });
});
