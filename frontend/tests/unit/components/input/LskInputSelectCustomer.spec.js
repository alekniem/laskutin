import axios from "axios";
import flushPromises from "flush-promises";
import LskInputSelectCustomer from "@/components/input/LskInputSelectCustomer";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockResolvedValue({
    data: [
        { id: 1, name: "A", address_line_one: "AA", address_line_two: "AAA" },
        { id: 2, name: "B", address_line_one: "BB", address_line_two: "BBB" },
        { id: 3, name: "C", address_line_one: "CC", address_line_two: "CCC" },
    ],
});

describe("LskInputSelectCustomer", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputSelectCustomer, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "1",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("selection not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskInputSelectCustomer, {
            propsData: {
                cid: "TEST_CID",
                label: "TEST LABEL",
                value: "1",
                vid: "TEST_VID",
            },
        });
        await flushPromises();
        wrapper.find("#TEST_CID").trigger("click");
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("selection visible");
    });

    it("should show an error message", async () => {
        const wrapper = createWrapper(LskInputSelectCustomer, {
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
        expect(wrapper.find(".v-messages__message").text()).toBe("Invalid customer id");
    });
});
