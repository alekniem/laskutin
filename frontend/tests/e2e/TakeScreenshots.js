const chalk = require("chalk");
const snakeCase = require("lodash/snakeCase");

const takeScreenshot = function(browser, counter, name) {
    let prefix = String(counter).padStart(2, "0");
    let filename = `screens/${prefix}_${snakeCase(name)}.png`;
    browser.pause(2000);
    browser.saveScreenshot(filename, () => {
        console.log(chalk.green("✔") + " Saved screenshot " + chalk.yellow(`'${filename}'`));
    });
};

module.exports = {
    "Take screenshots": (browser) => {
        let i = 1;
        let pageId = "";

        browser.resizeWindow(1200, 1024);
        browser.init();
        browser.waitForElementVisible("body");

        //----- Login page -----

        pageId = "loginPage";

        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskLogin();

        //----- Invoice index page -----

        pageId = "invoiceIndexPage";

        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}AddInvoiceMenuItem`);
        takeScreenshot(browser, i++, `${pageId}AddInvoiceDialog`);

        browser.lskClick(`#${pageId}AddInvoiceDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(9) .mdi-delete`);
        takeScreenshot(browser, i++, `${pageId}DeleteInvoiceDialog`);

        browser.lskClick(`#${pageId}DeleteInvoiceDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(9) .mdi-monitor`);

        //----- Invoice show page -----

        pageId = "invoiceShowPage";

        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}EditInvoiceMenuItem`);
        takeScreenshot(browser, i++, `${pageId}EditInvoiceDialog`);

        browser.lskClick(`#${pageId}EditInvoiceDialogCancelButton`);
        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}EditInvoiceCustomerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}EditInvoiceCustomerDialog`);

        browser.lskClick(`#${pageId}EditInvoiceCustomerDialogCancelButton`);
        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}EditInvoiceBillerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}EditInvoiceBillerDialog`);

        browser.lskClick(`#${pageId}EditInvoiceBillerDialogCancelButton`);
        browser.lskClick(`#${pageId}InvoiceLineMenuActivator`);
        browser.lskClick(`#${pageId}AddInvoiceLineMenuItem`);
        takeScreenshot(browser, i++, `${pageId}AddInvoiceLineDialog`);

        browser.lskClick(`#${pageId}AddInvoiceLineDialogCancelButton`);
        browser.lskClick(`#${pageId}InvoiceLineTable tbody tr td:nth-child(7) .mdi-delete`);
        takeScreenshot(browser, i++, `${pageId}DeleteInvoiceLineDialog`);

        browser.lskClick(`#${pageId}DeleteInvoiceLineDialogCancelButton`);
        browser.lskClick(`#${pageId}InvoiceLineTable tbody tr td:nth-child(7) .mdi-pencil`);
        takeScreenshot(browser, i++, `${pageId}EditInvoiceLineDialog`);

        browser.lskClick(`#${pageId}EditInvoiceLineDialogCancelButton`);
        browser.lskClick(`#customerTab`);

        //----- Customer index page -----

        pageId = "customerIndexPage";

        browser.lskClick(`#${pageId}Title`);
        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}AddCustomerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}AddCustomerDialog`);

        browser.lskClick(`#${pageId}AddCustomerDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(5) .mdi-delete`);
        takeScreenshot(browser, i++, `${pageId}DeleteCustomerDialog`);

        browser.lskClick(`#${pageId}DeleteCustomerDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(5) .mdi-monitor`);

        //----- Customer show page -----

        pageId = "customerShowPage";

        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}EditCustomerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}EditCustomerDialog`);

        browser.lskClick(`#${pageId}EditCustomerDialogCancelButton`);
        browser.lskClick(`#billerTab`);

        //----- Biller index page -----

        pageId = "billerIndexPage";

        browser.lskClick(`#${pageId}Title`);
        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}AddBillerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}AddBillerDialog`);

        browser.lskClick(`#${pageId}AddBillerDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(7) .mdi-delete`);
        takeScreenshot(browser, i++, `${pageId}DeleteBillerDialog`);

        browser.lskClick(`#${pageId}DeleteBillerDialogCancelButton`);
        browser.lskClick(`#${pageId}Table tbody tr td:nth-child(7) .mdi-monitor`);

        //----- Biller show page -----

        pageId = "billerShowPage";

        takeScreenshot(browser, i++, `${pageId}`);

        browser.lskClick(`#${pageId}MenuActivator`);
        browser.lskClick(`#${pageId}EditBillerMenuItem`);
        takeScreenshot(browser, i++, `${pageId}EditBillerDialog`);

        browser.end();
    },
};
