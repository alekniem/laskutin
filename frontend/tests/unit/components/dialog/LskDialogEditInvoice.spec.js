import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogEditInvoice from "@/components/dialog/LskDialogEditInvoice";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputDate from "@/components/input/LskInputDate";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputDate,
    LskInputText,
};

describe("LskDialogEditInvoice", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogEditInvoice, {
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
        const wrapper = createWrapper(LskDialogEditInvoice, {
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
        const wrapper = createWrapper(LskDialogEditInvoice, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();

        const invoiceDateInput = wrapper.find("#TEST_CIDInvoiceDateInput");
        invoiceDateInput.element.value = "INVALID INVOICE DATE";
        invoiceDateInput.trigger("input");
        const dueDateInput = wrapper.find("#TEST_CIDDueDateInput");
        dueDateInput.element.value = "INVALID DUE DATE";
        dueDateInput.trigger("input");
        await flushPromises();

        wrapper.vm._data.inputData.invoice_number = "";
        wrapper.vm._data.inputData.reference_number = "";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();

        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title", async () => {
        const wrapper = createWrapper(LskDialogEditInvoice, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Edit invoice (123)");
    });
});
