const chalk = require("chalk");

exports.command = function() {
    this.back(() => {
        console.log(chalk.green("✔") + " Navigated backwards");
    });

    return this;
};
