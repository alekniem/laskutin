const pageId = "loginPage";

module.exports = {
    beforeEach: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
        browser.assert.title("Laskutin");
        browser.assert.containsText(`#${pageId}Title`, "Kirjaudu sisään");
    },

    afterEach: (browser) => {
        browser.end();
    },

    "Login should fail": (browser) => {
        browser.lskLogin({ password: "INVALID" });
        browser.assert.containsText(".red--text", "Kirjautuminen ei onnistunut");
        browser.assert.urlEquals(browser.launch_url + "/login");
    },

    "Login and logout should succeed": (browser) => {
        browser.lskLogin();
        browser.assert.containsText("#invoiceIndexPageTitle", "Laskut");
        browser.assert.urlEquals(browser.launch_url + "/invoice");

        browser.lskClick("#logoutButton");
        browser.assert.containsText(`#${pageId}Title`, "Kirjaudu sisään");
        browser.assert.urlEquals(browser.launch_url + "/login");
    },

    // "Login should succeed using only the keyboard": (browser) => {
    //     browser.assert.urlEquals(browser.launch_url + "/login");
    //     browser.assert.visible(`#${pageId}UsernameField`);
    //     browser.assert.visible(`#${pageId}PasswordField`);
    //     browser.expect.element(`#${pageId}UsernameField`).active;
    //     browser.lskKeys(browser.globals.username);
    //     browser.lskKeys(browser.Keys.ENTER);
    //     browser.expect.element(`#${pageId}PasswordField`).active;
    //     browser.lskKeys(browser.globals.password);
    //     browser.lskKeys(browser.Keys.ENTER);
    //     browser.assert.containsText("#invoiceIndexPageTitle", "Laskut");
    //     browser.assert.urlEquals(browser.launch_url + "/invoice");
    // },
};
