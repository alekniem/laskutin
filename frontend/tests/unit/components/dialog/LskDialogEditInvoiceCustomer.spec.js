import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogEditInvoiceCustomer from "@/components/dialog/LskDialogEditInvoiceCustomer";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputText,
};

describe("LskDialogEditInvoiceCustomer", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceCustomer, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: false,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceCustomer, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceCustomer, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        wrapper.vm._data.inputData.customer_name = "";
        wrapper.vm._data.inputData.customer_address_line_one = "";
        wrapper.vm._data.inputData.customer_address_line_two = "";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceCustomer, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Edit customer (invoice 123)");
    });
});
