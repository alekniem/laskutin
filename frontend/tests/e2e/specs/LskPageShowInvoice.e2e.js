const pageId = "invoiceShowPage";

module.exports = {
    before: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskUrl(browser.launch_url + "/invoice/1");
        browser.assert.urlEquals(browser.launch_url + "/invoice/1");
        browser.assert.containsText(`#${pageId}Title`, "Laskun tiedot");
        browser.assert.containsText(`#${pageId}InvoiceLineTitle`, "Laskun rivit");
    },

    after: (browser) => {
        browser.end();
    },

    "Edit invoice should work": (browser) => {
        const dialogId = "EditInvoiceDialog";
        const oldValues = {
            invoiceDate: "1.1.2021",
            dueDate: "15.1.2021",
            invoiceNumber: "210101001",
            referenceNumber: "21010 10010",
        };
        const newValues = {
            invoiceDate: "3.3.2021",
            dueDate: "17.3.2021",
            invoiceNumber: "210303001",
            referenceNumber: "21030 30014",
        };
        const entries = (values) => ({
            id: ["Laskun id", "1"],
            invoiceDate: ["Laskun päivämäärä", values.invoiceDate],
            dueDate: ["Eräpäivä", values.dueDate],
            invoiceNumber: ["Laskun numero", values.invoiceNumber],
            referenceNumber: ["Viitenumero", values.referenceNumber],
        });

        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskua (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(newValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskua (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
    },

    "Edit invoice's customer should work": (browser) => {
        const dialogId = "EditInvoiceCustomerDialog";
        const str = browser.globals.default.randomString();
        const oldValues = {
            customerName: "Customer name",
            customerAddressLineOne: "Customer address line 1",
            customerAddressLineTwo: "Customer address line 2",
        };
        const newValues = {
            customerName: `Name ${str}`,
            customerAddressLineOne: `Address line one ${str}`,
            customerAddressLineTwo: `Address line two ${str}`,
        };
        const entries = (values) => ({
            customerName: ["Nimi", values.customerName],
            customerAddressLineOne: ["Osoiterivi 1", values.customerAddressLineOne],
            customerAddressLineTwo: ["Osoiterivi 2", values.customerAddressLineTwo],
        });

        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceCustomerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa asiakasta (lasku 1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(newValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceCustomerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa asiakasta (lasku 1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
    },

    "Edit invoice's biller should work": (browser) => {
        const dialogId = "EditInvoiceBillerDialog";
        const str = browser.globals.default.randomString();
        const oldValues = {
            billerName: "Biller name",
            billerAddressLineOne: "Biller address line 1",
            billerAddressLineTwo: "Biller address line 2",
            billerEmail: "biller@example.com",
            billerPhoneNumber: "+358 40 111 1111",
            billerBusinessIdentityCode: "1234567-8",
            billerBankName: "Test Bank",
            billerBankIban: "FI11 2222 3333 4444 55",
            billerBankBic: "TESTFIHH",
            billerPdfTitle: "Test Invoice",
            billerPdfAuthor: "Biller name",
        };
        const newValues = {
            billerName: `Name ${str}`,
            billerAddressLineOne: `Address line one ${str}`,
            billerAddressLineTwo: `Address line two ${str}`,
            billerEmail: `${str}@example.com`,
            billerPhoneNumber: `Phone number ${str}`,
            billerBusinessIdentityCode: `Business identity code ${str}`,
            billerBankName: `Bank name ${str}`,
            billerBankIban: `Bank iban ${str}`,
            billerBankBic: `Bank bic ${str}`,
            billerPdfTitle: `Pdf title ${str}`,
            billerPdfAuthor: `Pdf author ${str}`,
        };
        const entries = (values) => ({
            billerName: ["Nimi", values.billerName],
            billerAddressLineOne: ["Osoiterivi 1", values.billerAddressLineOne],
            billerAddressLineTwo: ["Osoiterivi 2", values.billerAddressLineTwo],
            billerEmail: ["Sähköposti", values.billerEmail],
            billerPhoneNumber: ["Puhelinnumero", values.billerPhoneNumber],
            billerBusinessIdentityCode: ["Y-tunnus", values.billerBusinessIdentityCode],
            billerBankName: ["Pankin nimi", values.billerBankName],
            billerBankIban: ["IBAN-tilinumero", values.billerBankIban],
            billerBankBic: ["BIC-koodi", values.billerBankBic],
            billerPdfTitle: ["Pdf-tiedoston otsikko", values.billerPdfTitle],
            billerPdfAuthor: ["Pdf-tiedoston tekijä", values.billerPdfAuthor],
        });

        browser.lskClick(`#${pageId}BillerListActivator`);
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceBillerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskuttajaa (lasku 1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(newValues));
        browser.lskCheckEditOperation(
            `#${pageId}MenuActivator`,
            `#${pageId}EditInvoiceBillerMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskuttajaa (lasku 1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckListItems(`#${pageId}`, entries(oldValues));
        browser.lskClick(`#${pageId}BillerListActivator`);
    },

    "Invoice lines should have test line": (browser) => {
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(1)", {
            1: "1",
            2: "Lorem ipsum dolor sit amet",
            3: "100,00 €",
            4: "24",
            5: "24,00 €",
            6: "124,00 €",
        });
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(2)", {
            1: "",
            2: "YHTEENSÄ",
            3: "100,00 €",
            4: "",
            5: "24,00 €",
            6: "124,00 €",
        });
        browser.lskCheckListItems(`#${pageId}`, {
            totalAmountSum: ["Kokonaissumma", "124,00 €"],
        });
    },

    "Add new invoice line should work": (browser) => {
        const dialogId = "AddInvoiceLineDialog";
        const str = browser.globals.default.randomString();
        const newValues = {
            description: `Description ${str}`,
            amount: "200",
            vatPercent: "24",
        };

        browser.lskCheckAddOperation(
            `#${pageId}InvoiceLineMenuActivator`,
            `#${pageId}AddInvoiceLineMenuItem`,
            `#${pageId}${dialogId}Title`,
            "Lisää uusi laskun rivi",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(1)", {
            2: "Lorem ipsum dolor sit amet",
            3: "100,00 €",
            4: "24",
            5: "24,00 €",
            6: "124,00 €",
        });
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(2)", {
            2: newValues.description,
            3: "200,00 €",
            4: "24",
            5: "48,00 €",
            6: "248,00 €",
        });
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(3)", {
            2: "YHTEENSÄ",
            3: "300,00 €",
            4: "",
            5: "72,00 €",
            6: "372,00 €",
        });
        browser.lskCheckListItems(`#${pageId}`, {
            totalAmountSum: ["Kokonaissumma", "372,00 €"],
        });
    },

    "Edit invoice line should work": (browser) => {
        const dialogId = "EditInvoiceLineDialog";
        const str = browser.globals.default.randomString();
        const oldValues = {
            description: "Lorem ipsum dolor sit amet",
            amount: "100",
            vatPercent: "24",
        };
        const newValues = {
            description: `Description ${str}`,
            amount: "50",
            vatPercent: "10",
        };

        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(1)", {
            2: oldValues.description,
            3: "100,00 €",
            4: "24",
            5: "24,00 €",
            6: "124,00 €",
        });
        browser.lskCheckEditOperation(
            `#${pageId}InvoiceLineTable tbody tr:nth-child(1) td:nth-child(7) .mdi-pencil`,
            null,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskun riviä (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            newValues
        );
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(1)", {
            2: newValues.description,
            3: "50,00 €",
            4: "10",
            5: "5,00 €",
            6: "55,00 €",
        });
        browser.lskCheckEditOperation(
            `#${pageId}InvoiceLineTable tbody tr:nth-child(1) td:nth-child(7) .mdi-pencil`,
            null,
            `#${pageId}${dialogId}Title`,
            "Muokkaa laskun riviä (1)",
            `#${pageId}${dialogId}SaveButton`,
            `#${pageId}${dialogId}`,
            oldValues
        );
        browser.lskCheckTableRowItems(`#${pageId}InvoiceLineTable`, "tr:nth-child(1)", {
            2: oldValues.description,
            3: "100,00 €",
            4: "24",
            5: "24,00 €",
            6: "124,00 €",
        });
    },

    "Delete invoice line should work": async (browser) => {
        const dialogId = "DeleteInvoiceLineDialog";

        browser.lskCheckListItems(`#${pageId}`, {
            totalAmountSum: ["Kokonaissumma", "372,00 €"],
        });
        await browser.lskCheckDeleteOperation(
            `#${pageId}InvoiceLineTable`,
            "tr:nth-child(2)",
            "td:nth-child(7)",
            `#${pageId}${dialogId}Title`,
            "Poista laskun rivi",
            `#${pageId}${dialogId}DeleteButton`,
            `label[for=${pageId}${dialogId}YesCheckboxInput]`
        );
        browser.lskCheckListItems(`#${pageId}`, {
            totalAmountSum: ["Kokonaissumma", "124,00 €"],
        });
    },
};
