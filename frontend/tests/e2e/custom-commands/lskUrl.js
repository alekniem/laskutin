const chalk = require("chalk");

exports.command = function(url) {
    this.url(url, () => {
        console.log(chalk.green("✔") + " Navigated to " + chalk.yellow(`'${url}'`));
    });

    return this;
};
