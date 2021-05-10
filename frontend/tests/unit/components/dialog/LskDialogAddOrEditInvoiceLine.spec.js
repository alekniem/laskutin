import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogAddOrEditInvoiceLine from "@/components/dialog/LskDialogAddOrEditInvoiceLine";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputMoney from "@/components/input/LskInputMoney";
import LskInputPercent from "@/components/input/LskInputPercent";
import LskInputText from "@/components/input/LskInputText";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputMoney,
    LskInputPercent,
    LskInputText,
};

describe("LskDialogAddOrEditInvoiceLine", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                invoiceId: 456,
                showDialog: false,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                invoiceId: 456,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                invoiceId: 456,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        wrapper.vm._data.inputData.description = "";
        wrapper.vm._data.inputData.amount = "INVALID";
        wrapper.vm._data.inputData.vat_percent = "INVALID";
        wrapper.vm._data.inputData.vat_amount = "INVALID";
        wrapper.vm._data.inputData.total_amount = "INVALID";
        wrapper.vm._data.otherErrors = ["ERROR ONE", "ERROR TWO"];
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct title (no id given)", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                invoiceId: 456,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Add new invoice line");
    });

    it("should have correct title (id given)", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                id: 123,
                invoiceId: 456,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.find(".v-card__title").text()).toBe("Edit invoice line (123)");
    });

    it("should update all fields based on one input value", async () => {
        const wrapper = createWrapper(LskDialogAddOrEditInvoiceLine, {
            propsData: {
                cid: "TEST_CID",
                invoiceId: 456,
                showDialog: true,
            },
            stubs,
        });
        await flushPromises();

        expect(wrapper.vm.amount).toBe("");
        expect(wrapper.vm.vatPercent).toBe("");
        expect(wrapper.vm.vatAmount).toBe("");
        expect(wrapper.vm.totalAmount).toBe("");

        wrapper.setData({ amount: 1000 });

        expect(wrapper.vm.amount).toBe("1000,00");
        expect(wrapper.vm.vatPercent).toBe("");
        expect(wrapper.vm.vatAmount).toBe("0,00");
        expect(wrapper.vm.totalAmount).toBe("1000,00");

        wrapper.setData({ vatPercent: 24 });

        expect(wrapper.vm.amount).toBe("1000,00");
        expect(wrapper.vm.vatPercent).toBe(24);
        expect(wrapper.vm.vatAmount).toBe("240,00");
        expect(wrapper.vm.totalAmount).toBe("1240,00");

        wrapper.setData({ vatAmount: 120 });

        expect(wrapper.vm.amount).toBe("500,00");
        expect(wrapper.vm.vatPercent).toBe(24);
        expect(wrapper.vm.vatAmount).toBe("120,00");
        expect(wrapper.vm.totalAmount).toBe("620,00");

        wrapper.setData({ totalAmount: 2480 });

        expect(wrapper.vm.amount).toBe("2000,00");
        expect(wrapper.vm.vatPercent).toBe(24);
        expect(wrapper.vm.vatAmount).toBe("480,00");
        expect(wrapper.vm.totalAmount).toBe("2480,00");
    });
});
