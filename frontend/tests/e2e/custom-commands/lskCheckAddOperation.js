const upperFirst = require("lodash/upperFirst");

exports.command = function(
    menuActivatorSelector,
    menuItemSelector,
    titleSelector,
    title,
    saveButtonSelector,
    prefixToInputSelector,
    values
) {
    this.lskClick(menuActivatorSelector);
    this.lskClick(menuItemSelector);
    this.assert.containsText(titleSelector, title);
    this.assert.visible(saveButtonSelector);
    this.expect.element(saveButtonSelector).not.enabled;

    let firstSelector = null;
    Object.entries(values).forEach(([key, value]) => {
        let selector = `${prefixToInputSelector}${upperFirst(key)}Input`;
        if (firstSelector === null) {
            firstSelector = selector;
        }
        this.lskSetValue(selector, value);
    });

    this.lskClick(firstSelector);
    this.expect.element(saveButtonSelector).enabled;
    this.lskClick(saveButtonSelector);

    return this;
};
