import flushPromises from "flush-promises";
import LskInputMoney from "@/components/input/LskInputMoney";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputMoney", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputMoney, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "123,45",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("valid input");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputMoney, {
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
        expect(wrapper.find(".v-messages__message").text()).toBe("Invalid money amount");
    });
});
