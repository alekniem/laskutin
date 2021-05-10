const pageId = "customerShowPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskUrl(browser.launch_url + "/customer/1");
        browser.assert.urlEquals(browser.launch_url + "/customer/1");
        browser.assert.containsText(`#${pageId}Title`, "Asiakkaan tiedot");
    },

    after: (browser) => {
        browser.end();
    },

    "Edit customer should work": (browser) => {
        const dialogId = "EditCustomerDialog";
        const str = browser.globals.default.randomString();
        const oldValues = {
            name: "Customer name",
            addressLineOne: "Customer address line 1",
            addressLineTwo: "Customer address line 2",
        };
        const newValues = {
            name: `Name ${str}`,
            addressLineOne: `Address line one ${str}`,
            addressLineTwo: `Address line two ${str}`,
        };
        const entries = (values) => ({
            id: ["Asiakkaan id", "1"],
            name: ["Nimi", values.name],
            addressLineOne: ["Osoiterivi 1", values.addressLineOne],
            addressLineTwo: ["Osoiterivi 2", values.addressLineTwo],
        });

        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditCustomerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa asiakasta (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(newValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditCustomerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa asiakasta (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
    },
};
