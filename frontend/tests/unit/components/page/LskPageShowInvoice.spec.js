import axios from "axios";
import flushPromises from "flush-promises";
import sinon from "sinon";
import LskBaseCard from "@/components/base/LskBaseCard";
import LskBaseError from "@/components/base/LskBaseError";
import LskBaseIcon from "@/components/base/LskBaseIcon";
import LskBaseList from "@/components/base/LskBaseList";
import LskBaseListGroup from "@/components/base/LskBaseListGroup";
import LskBaseListItem from "@/components/base/LskBaseListItem";
import LskBaseMenu from "@/components/base/LskBaseMenu";
import LskBaseMenuItem from "@/components/base/LskBaseMenuItem";
import LskBaseTable from "@/components/base/LskBaseTable";
import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import LskPageShowInvoice from "@/components/page/LskPageShowInvoice";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation((url) => {
    if (url === "invoice/123") {
        return Promise.resolve({
            data: {
                id: 123,
                invoice_date: "2021-01-01",
                due_date: "2021-02-02",
                customer_name: "CUSTOMER NAME",
                customer_address_line_one: "CUSTOMER ADDRESS LINE ONE",
                customer_address_line_two: "CUSTOMER ADDRESS LINE TWO",
                biller_name: "BILLER NAME",
                biller_address_line_one: "BILLER ADDRESS LINE ONE",
                biller_address_line_two: "BILLER ADDRESS LINE TWO",
                biller_email: "BILLER EMAIL",
                biller_phone_number: "BILLER PHONE NUMBER",
                biller_business_identity_code: "BILLER BUSINESS IDENTITY CODE",
                biller_bank_name: "BILLER BANK NAME",
                biller_bank_iban: "BILLER BANK IBAN",
                biller_bank_bic: "BILLER BANK BIC",
                biller_pdf_title: "BILLER PDF TITLE",
                biller_pdf_author: "BILLER PDF AUTHOR",
                invoice_number: "INVOICE NUMBER",
                formatted_reference_number: "FORMATTED REFERENCE NUMBER",
                amount_sum: "3000",
                vat_amount_sum: "720",
                total_amount_sum: "3720",
                created_at: "2021-01-01 12:00:01",
                updated_at: "2021-02-02 12:00:02",
                invoice_lines: [
                    {
                        id: 1,
                        invoice_id: 123,
                        description: "DESCRIPTION 1",
                        amount: "1000",
                        vat_percent: "24",
                        vat_amount: "240",
                        total_amount: "1240",
                    },
                    {
                        id: 2,
                        invoice_id: 123,
                        description: "DESCRIPTION 2",
                        amount: "2000",
                        vat_percent: "24",
                        vat_amount: "480",
                        total_amount: "2480",
                    },
                ],
            },
        });
    }
    if (url === "pdfInvoice/123") {
        return Promise.resolve({
            data: "PDF DATA",
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
    LskBaseError,
    LskBaseIcon,
    LskBaseList,
    LskBaseListGroup,
    LskBaseListItem,
    LskBaseMenu,
    LskBaseMenuItem,
    LskBaseTable,
    LskBaseToolbar,
    LskDialogAddOrEditInvoiceLine: true,
    LskDialogDelete: true,
    LskDialogEditInvoice: true,
    LskDialogEditInvoiceBiller: true,
    LskDialogEditInvoiceCustomer: true,
};

describe("LskPageShowInvoice", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowInvoice, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.vm._data).toMatchSnapshot("data");
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("customer data visible");
        wrapper.find("#invoiceShowPageBillerListActivator").trigger("click");
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("biller data visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowInvoice, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();

        const toolbar = wrapper.find("#invoiceShowPageToolbar");
        toolbar.find("#invoiceShowPageMenuActivator").trigger("click");
        await flushPromises();
        expect(toolbar.html()).toMatchSnapshot("invoice information toolbar");

        sinon.stub(wrapper.vm, "parsePdfResponse");
        toolbar.find("#invoiceShowPageDownloadPdfMenuItem").trigger("click");
        await flushPromises();
        const param = { data: "PDF DATA" };
        expect(wrapper.vm.parsePdfResponse.calledWith(param)).toBe(true);

        sinon.spy(wrapper.vm, "editInvoice");
        toolbar.find("#invoiceShowPageEditInvoiceMenuItem").trigger("click");
        await flushPromises();
        const editInvoice = wrapper.find("LskDialogEditInvoice-stub");
        expect(editInvoice.html()).toMatchSnapshot("dialog edit invoice");
        expect(wrapper.vm.editInvoice.calledOnce).toBe(true);

        sinon.spy(wrapper.vm, "editInvoiceCustomer");
        toolbar.find("#invoiceShowPageEditInvoiceCustomerMenuItem").trigger("click");
        await flushPromises();
        const editInvoiceCustomer = wrapper.find("LskDialogEditInvoiceCustomer-stub");
        expect(editInvoiceCustomer.html()).toMatchSnapshot("dialog edit invoice customer");
        expect(wrapper.vm.editInvoiceCustomer.calledOnce).toBe(true);

        sinon.spy(wrapper.vm, "editInvoiceBiller");
        toolbar.find("#invoiceShowPageEditInvoiceBillerMenuItem").trigger("click");
        await flushPromises();
        const editInvoiceBiller = wrapper.find("LskDialogEditInvoiceBiller-stub");
        expect(editInvoiceBiller.html()).toMatchSnapshot("dialog edit invoice biller");
        expect(wrapper.vm.editInvoiceBiller.calledOnce).toBe(true);
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowInvoice, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();

        const toolbar = wrapper.find("#invoiceShowPageInvoiceLineToolbar");
        toolbar.find("#invoiceShowPageInvoiceLineMenuActivator").trigger("click");
        await flushPromises();
        expect(toolbar.html()).toMatchSnapshot("invoice line toolbar");

        sinon.spy(wrapper.vm, "addInvoiceLine");
        toolbar.find("#invoiceShowPageAddInvoiceLineMenuItem").trigger("click");
        await flushPromises();
        const addInvoiceLine = wrapper.find("LskDialogAddOrEditInvoiceLine-stub");
        expect(addInvoiceLine.html()).toMatchSnapshot("dialog add invoice line");
        expect(wrapper.vm.addInvoiceLine.calledOnce).toBe(true);
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowInvoice, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-pencil").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogAddOrEditInvoiceLine-stub");
        expect(dialog.html()).toMatchSnapshot("dialog edit invoice line");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowInvoice, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-delete").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogDelete-stub");
        expect(dialog.html()).toMatchSnapshot("dialog delete invoice line");
    });
});
