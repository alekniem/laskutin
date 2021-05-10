const upperFirst = require("lodash/upperFirst");

exports.command = function(prefixToSelector, entries) {
    Object.entries(entries).forEach(([key, value]) => {
        let selector = `${prefixToSelector}${upperFirst(key)}ListItem`;
        this.assert.containsText(`${selector} div:nth-child(1)`, value[0]);
        this.assert.containsText(`${selector} div:nth-child(2)`, value[1]);
    });

    return this;
};
