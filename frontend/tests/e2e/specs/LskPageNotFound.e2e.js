const invalidPath = "/asdfasdfasdf";

module.exports = {
    beforeEach: (browser) => {
        browser.init();
        browser.waitForElementVisible("body");
    },

    afterEach: (browser) => {
        browser.end();
    },

    "Invalid url should redirect to login page": (browser) => {
        browser.assert.urlEquals(browser.launch_url + "/login");
        browser.lskUrl(browser.launch_url + invalidPath);
        browser.assert.urlEquals(browser.launch_url + "/login");
    },

    "Invalid url should show 'not found' page": (browser) => {
        browser.lskLogin();
        browser.assert.urlEquals(browser.launch_url + "/invoice");
        browser.lskUrl(browser.launch_url + invalidPath);
        browser.assert.urlEquals(browser.launch_url + invalidPath);
        browser.assert.containsText(".red--text", "Sivua ei löydy");
    },
};
