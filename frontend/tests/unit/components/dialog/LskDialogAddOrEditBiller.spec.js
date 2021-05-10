import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogAddOrEditBiller from "@/components/dialog/LskDialogAddOrEditBiller";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputText,
};

describe("LskDialogAddOrEditBiller", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditBiller, {
            propsData: {
                cid: "TEST_CID",
                showDialog: false,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditBiller, {
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
        const wrapper = createWrapper(LskDialogAddOrEditBiller, {
            propsData: {
                cid: "TEST_CID",
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        wrapper.vm._data.inputData.name = "";
        wrapper.vm._data.inputData.address_line_one = "";
        wrapper.vm._data.inputData.address_line_two = "";
        wrapper.vm._data.inputData.email = "";
        wrapper.vm._data.inputData.phone_number = "";
        wrapper.vm._data.inputData.business_identity_code = "";
        wrapper.vm._data.inputData.bank_name = "";
        wrapper.vm._data.inputData.bank_iban = "";
        wrapper.vm._data.inputData.bank_bic = "";
        wrapper.vm._data.inputData.pdf_title = "";
        wrapper.vm._data.inputData.pdf_author = "";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title (no id given)", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditBiller, {
            propsData: {
                cid: "TEST_CID",
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Add new biller");
    });

    it("should have correct title (id given)", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditBiller, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Edit biller (123)");
    });
});
