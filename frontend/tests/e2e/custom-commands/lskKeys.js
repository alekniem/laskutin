const chalk = require("chalk");

exports.command = function(keysToSend) {
    this.keys(keysToSend, () => {
        console.log(chalk.green("✔") + " Sent " + chalk.yellow(`'${keysToSend}'`) + " to the active element");
    });

    return this;
};
