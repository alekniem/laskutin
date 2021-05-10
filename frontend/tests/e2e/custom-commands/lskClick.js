const chalk = require("chalk");

exports.command = function(selector, assertVisibility = true) {
    if (assertVisibility) {
        this.assert.visible(selector);
    }

    this.click(selector, () => {
        console.log(chalk.green("✔") + " Clicked element " + chalk.yellow(`<${selector}>`));
    });

    return this;
};
