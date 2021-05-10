const pageId = "billerShowPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskUrl(browser.launch_url + "/biller/1");
        browser.assert.urlEquals(browser.launch_url + "/biller/1");
        browser.assert.containsText(`#${pageId}Title`, "Laskuttajan tiedot");
    },

    after: (browser) => {
        browser.end();
    },

    "Edit biller should work": (browser) => {
        const dialogId = "EditBillerDialog";
        const str = browser.globals.default.randomString();
        const oldValues = {
            name: "Biller name",
            addressLineOne: "Biller address line 1",
            addressLineTwo: "Biller address line 2",
            email: "biller@example.com",
            phoneNumber: "+358 40 111 1111",
            businessIdentityCode: "1234567-8",
            bankName: "Test Bank",
            bankIban: "FI11 2222 3333 4444 55",
            bankBic: "TESTFIHH",
            pdfTitle: "Test Invoice",
            pdfAuthor: "Biller name",
        };
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
        const entries = (values) => ({
            id: ["Laskuttajan id", "1"],
            name: ["Nimi", values.name],
            addressLineOne: ["Osoiterivi 1", values.addressLineOne],
            addressLineTwo: ["Osoiterivi 2", values.addressLineTwo],
            email: ["Sähköposti", values.email],
            phoneNumber: ["Puhelinnumero", values.phoneNumber],
            businessIdentityCode: ["Y-tunnus", values.businessIdentityCode],
            bankName: ["Pankin nimi", values.bankName],
            bankIban: ["IBAN-tilinumero", values.bankIban],
            bankBic: ["BIC-koodi", values.bankBic],
            pdfTitle: ["Pdf-tiedoston otsikko", values.pdfTitle],
            pdfAuthor: ["Pdf-tiedoston tekijä", values.pdfAuthor],
        });

        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditBillerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskuttajaa (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(newValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditBillerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskuttajaa (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
    },
};
