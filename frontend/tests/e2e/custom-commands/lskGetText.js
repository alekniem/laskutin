const chalk = require("chalk");

module.exports = class LskGetTextCommand {
    async command(selector) {
        let object = await this.api.getText(selector);
        let text = object.value;

        this.api.perform(() => {
            console.log(
                chalk.green("✔") +
                    " Got text " +
                    chalk.yellow(`'${text}'`) +
                    " from element " +
                    chalk.yellow(`<${selector}>`)
            );
        });

        return text;
    }
};
