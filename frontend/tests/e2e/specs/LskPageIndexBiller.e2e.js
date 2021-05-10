const pageId = "billerIndexPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskClick("#billerTab");
        browser.assert.urlEquals(browser.launch_url + "/biller");
        browser.assert.containsText(`#${pageId}Title`, "Laskuttajat");
    },

    after: (browser) => {
        browser.end();
    },

    "Biller index should have test biller": (browser) => {
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr:nth-last-child(1)", {
            1: "1",
            2: "Biller name",
            3: "Biller address line 1",
            4: "Biller address line 2",
            5: "biller@example.com",
            6: "+358 40 111 1111",
        });
    },

    "Add new biller should work": (browser) => {
        const dialogId = "AddBillerDialog";
        const str = browser.globals.default.randomString();
        const newValues = {
            name: `Name ${str}`,
            addressLineOne: `Address line one ${str}`,
            addressLineTwo: `Address line two ${str}`,
            email: `${str}@example.com`,
            phoneNumber: `Phone number ${str}`,
            businessIdentityCode: `Business identity code ${str}`,
            bankName: `Bank name ${str}`,
            bankIban: `Bank iban ${str}`,
            bankBic: `Bank bic ${str}`,
            pdfTitle: `Pdf title ${str}`,
            pdfAuthor: `Pdf author ${str}`,
        };

        browser.lskCheckAddOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}AddBillerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Lisää uusi laskuttaja",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckTableRowItems(`#${pageId}Table`, "tr", {
            2: newValues.name,
            3: newValues.addressLineOne,
            4: newValues.addressLineTwo,
            5: newValues.email,
            6: newValues.phoneNumber,
        });
    },

    "Show action should open correct biller page": async (browser) => {
        await browser.lskCheckShowOperation(`#${pageId}Table`, "tr", "td:nth-child(7)", "biller");
    },

    "Delete action should delete biller": async (browser) => {
        const dialogId = "DeleteBillerDialog";

        await browser.lskCheckDeleteOperation(
            `#${pageId}Table`,
            "tr",
            "td:nth-child(7)",
            `#${pageId}${dialogId}Title`,
            "Poista laskuttaja",
            `#${pageId}${dialogId}DeleteButton`,
            `label[for=${pageId}${dialogId}YesCheckboxInput]`
        );
    },
};
