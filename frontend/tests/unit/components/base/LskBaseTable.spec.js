import LskBaseError from "@/components/base/LskBaseError";
import LskBaseIcon from "@/components/base/LskBaseIcon";
import LskBaseTable from "@/components/base/LskBaseTable";
import { createWrapper } from "UT/lsk_test_helper";

const cid = "TEST_CID";

const actions = [
    {
        title: "BUTTON TITLE",
        iconName: "mdi-monitor",
        clickFunction: (item) => item,
    },
];

const headings = {
    description: "DESCRIPTION HEADING",
    amount: "AMOUNT HEADING",
    due_date: "DUE DATE HEADING",
    invoice_date: "INVOICE DATE HEADING",
    total_amount: "TOTAL AMOUNT HEADING",
    total_amount_sum: "TOTAL AMOUNT SUM HEADING",
    vat_amount: "VAT AMOUNT HEADING",
};

const tableData = [
    {
        description: "DESCRIPTION TEXT",
        amount: "1000",
        due_date: "2021-01-01",
        invoice_date: "2021-02-02",
        total_amount: "1240",
        total_amount_sum: "3450",
        vat_amount: "240",
    },
];

const stubs = {
    LskBaseError,
    LskBaseIcon,
};

describe("LskBaseTable", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseTable, {
            propsData: {
                cid,
                headings,
                tableData,
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("headings, one data row");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseTable, {
            propsData: {
                actions,
                cid,
                headings,
                tableData,
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("action buttons, headings, one data row");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseTable, {
            propsData: {
                cid,
                errorMessage: "ERROR MESSAGE",
                headings,
                tableData: [],
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("headings, error message");
    });
});
