const chalk = require("chalk");

module.exports = class LskGetValueCommand {
    async command(selector) {
        let object = await this.api.getValue(selector);
        let value = object.value;

        this.api.perform(() => {
            console.log(
                chalk.green("✔") +
                    " Got value " +
                    chalk.yellow(`'${value}'`) +
                    " from element " +
                    chalk.yellow(`<${selector}>`)
            );
        });

        return value;
    }
};
