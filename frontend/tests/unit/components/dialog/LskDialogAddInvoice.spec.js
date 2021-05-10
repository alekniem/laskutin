import axios from "axios";
import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogAddInvoice from "@/components/dialog/LskDialogAddInvoice";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputDate from "@/components/input/LskInputDate";
import LskInputSelectBiller from "@/components/input/LskInputSelectBiller";
import LskInputSelectCustomer from "@/components/input/LskInputSelectCustomer";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation(() => Promise.resolve());

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputDate,
    LskInputSelectBiller,
    LskInputSelectCustomer,
};

describe("LskDialogAddInvoice", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddInvoice, {
            propsData: {
                cid: "TEST_CID",
                showDialog: false,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddInvoice, {
            propsData: {
                cid: "TEST_CID",
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddInvoice, {
            propsData: {
                cid: "TEST_CID",
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

        wrapper.vm._data.inputData.customer_id = "INVALID CUSTOMER ID";
        wrapper.vm._data.inputData.biller_id = "INVALID BILLER ID";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();

        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title", async () => {
        const wrapper = createWrapper(LskDialogAddInvoice, {
            propsData: {
                cid: "TEST_CID",
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Add new invoice");
    });
});
