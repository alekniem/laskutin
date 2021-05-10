const pageId = "invoiceIndexPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.assert.containsText(`#${pageId}Title`, "Laskut");
    },

    after: (browser) => {
        browser.end();
    },

    "Invoice index should have test invoice": (browser) => {
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr:nth-last-child(1)", {
            1: "1",
            2: "1.1.2021",
            3: "15.1.2021",
            4: "Customer name",
            5: "Biller name",
            6: "210101001",
            7: "21010 10010",
            8: "124,00 €",
        });
    },

    "Add new invoice should work": (browser) => {
        const dialogId = "AddInvoiceDialog";
        const newValues = {
            invoiceDate: "2.2.2021",
            dueDate: "16.2.2021",
            customerId: "1",
            billerId: "1",
        };

        browser.lskCheckAddOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}AddInvoiceMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Lisää uusi lasku",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr", {
            2: "2.2.2021",
            3: "16.2.2021",
            4: "Customer name",
            5: "Biller name",
            6: "210202001",
            7: "21020 20012",
            8: "0,00 €",
        });
    },

    "Show action should open correct invoice page": async (browser) => {
        await browser.lskCheckShowOperation(`#${pageId}Table`, "tr", "td:nth-child(9)", "invoice");
    },

    "Delete action should delete invoice": async (browser) => {
        const dialogId = "DeleteInvoiceDialog";

        await browser.lskCheckDeleteOperation(
            `#${pageId}Table`,
            "tr",
            "td:nth-child(9)",
            `#${pageId}${dialogId}Title`,
            "Poista lasku",
            `#${pageId}${dialogId}DeleteButton`,
            `label[for=${pageId}${dialogId}YesCheckboxInput]`
        );
    },
};
