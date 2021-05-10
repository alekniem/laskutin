const chalk = require("chalk");

exports.command = function(selector, value, assertVisibility = true) {
    if (assertVisibility) {
        this.assert.visible(selector);
    }

    this.getValue(selector, (result) => {
        Object.keys(result.value).forEach(() => {
            this.setValue(selector, this.Keys.BACK_SPACE);
        });

        this.setValue(selector, value, () => {
            console.log(
                chalk.green("✔") +
                    " Set value " +
                    chalk.yellow(`'${value}'`) +
                    " to element " +
                    chalk.yellow(`<${selector}>`)
            );
        });
    });

    return this;
};
