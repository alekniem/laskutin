const pageId = "customerIndexPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskClick("#customerTab");
        browser.assert.urlEquals(browser.launch_url + "/customer");
        browser.assert.containsText(`#${pageId}Title`, "Asiakkaat");
    },

    after: (browser) => {
        browser.end();
    },

    "Customer index should have test customer": (browser) => {
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr:nth-last-child(1)", {
            1: "1",
            2: "Customer name",
            3: "Customer address line 1",
            4: "Customer address line 2",
        });
    },

    "Add new customer should work": (browser) => {
        const dialogId = "AddCustomerDialog";
        const str = browser.globals.default.randomString();
        const newValues = {
            name: `Name ${str}`,
            addressLineOne: `Address line one ${str}`,
            addressLineTwo: `Address line two ${str}`,
        };

        browser.lskCheckAddOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}AddCustomerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Lisää uusi asiakas",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr", {
            2: newValues.name,
            3: newValues.addressLineOne,
            4: newValues.addressLineTwo,
        });
    },

    "Show action should open correct customer page": async (browser) => {
        await browser.lskCheckShowOperation(`#${pageId}Table`, "tr", "td:nth-child(5)", "customer");
    },

    "Delete action should delete customer": async (browser) => {
        const dialogId = "DeleteCustomerDialog";

        await browser.lskCheckDeleteOperation(
            `#${pageId}Table`,
            "tr",
            "td:nth-child(5)",
            `#${pageId}${dialogId}Title`,
            "Poista asiakas",
            `#${pageId}${dialogId}DeleteButton`,
            `label[for=${pageId}${dialogId}YesCheckboxInput]`
        );
    },
};
