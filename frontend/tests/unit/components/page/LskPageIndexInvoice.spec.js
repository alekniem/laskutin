import axios from "axios";
import flushPromises from "flush-promises";
import sinon from "sinon";
import LskBaseCard from "@/components/base/LskBaseCard";
import LskBaseIcon from "@/components/base/LskBaseIcon";
import LskBaseMenu from "@/components/base/LskBaseMenu";
import LskBaseMenuItem from "@/components/base/LskBaseMenuItem";
import LskBaseTable from "@/components/base/LskBaseTable";
import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import LskPageIndexInvoice from "@/components/page/LskPageIndexInvoice";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation((url) => {
    if (url === "invoice") {
        return Promise.resolve({
            data: [
                {
                    id: 1,
                    invoice_date: "2021-01-01",
                    due_date: "2021-01-02",
                    customer_name: "CUSTOMER NAME 1",
                    biller_name: "BILLER NAME 1",
                    invoice_number: "INVOICE NUMBER 1",
                    formatted_reference_number: "FORMATTED REFERENCE NUMBER 1",
                    total_amount_sum: "100",
                },
                {
                    id: 2,
                    invoice_date: "2021-02-01",
                    due_date: "2021-02-02",
                    customer_name: "CUSTOMER NAME 2",
                    biller_name: "BILLER NAME 2",
                    invoice_number: "INVOICE NUMBER 2",
                    formatted_reference_number: "FORMATTED REFERENCE NUMBER 2",
                    total_amount_sum: "200",
                },
            ],
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "GET QUERY ERROR",
            },
        },
    });
});

const stubs = {
    LskBaseCard,
    LskBaseIcon,
    LskBaseMenu,
    LskBaseMenuItem,
    LskBaseTable,
    LskBaseToolbar,
    LskDialogAddInvoice: true,
    LskDialogDelete: true,
};

describe("LskPageIndexInvoice", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexInvoice, {
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("page");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexInvoice, {
            stubs,
        });
        await flushPromises();

        const menu = wrapper.findComponent(LskBaseMenu);
        menu.find("#invoiceIndexPageMenuActivator").trigger("click");
        await flushPromises();
        expect(menu.html()).toMatchSnapshot("menu");

        menu.find("#invoiceIndexPageAddInvoiceMenuItem").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogAddInvoice-stub");
        expect(dialog.html()).toMatchSnapshot("dialog add invoice");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexInvoice, {
            stubs,
        });
        await flushPromises();
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-delete").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogDelete-stub");
        expect(dialog.html()).toMatchSnapshot("dialog delete invoice");
    });

    it("should call router", async () => {
        const wrapper = createWrapper(LskPageIndexInvoice, {
            stubs,
        });
        await flushPromises();
        wrapper.vm.$router = { push: sinon.spy() };
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-monitor").trigger("click");
        await flushPromises();
        const param = {
            name: "showInvoice",
            params: { id: 2 },
        };
        expect(wrapper.vm.$router.push.calledWith(param)).toBe(true);
    });
});
