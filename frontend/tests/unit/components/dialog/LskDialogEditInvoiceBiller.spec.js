import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogEditInvoiceBiller from "@/components/dialog/LskDialogEditInvoiceBiller";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputText,
};

describe("LskDialogEditInvoiceBiller", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceBiller, {
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
        const wrapper = createWrapper(LskDialogEditInvoiceBiller, {
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
        const wrapper = createWrapper(LskDialogEditInvoiceBiller, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        wrapper.vm._data.inputData.biller_name = "";
        wrapper.vm._data.inputData.biller_address_line_one = "";
        wrapper.vm._data.inputData.biller_address_line_two = "";
        wrapper.vm._data.inputData.biller_email = "";
        wrapper.vm._data.inputData.biller_phone_number = "";
        wrapper.vm._data.inputData.biller_business_identity_code = "";
        wrapper.vm._data.inputData.biller_bank_name = "";
        wrapper.vm._data.inputData.biller_bank_iban = "";
        wrapper.vm._data.inputData.biller_bank_bic = "";
        wrapper.vm._data.inputData.biller_pdf_title = "";
        wrapper.vm._data.inputData.biller_pdf_author = "";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title", async () => {
        const wrapper = createWrapper(LskDialogEditInvoiceBiller, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Edit biller (invoice 123)");
    });
});
