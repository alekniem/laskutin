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
    if (menuItemSelector !== null) {
        this.lskClick(menuItemSelector);
    }
    this.assert.containsText(titleSelector, title);
    this.assert.visible(saveButtonSelector);
    this.expect.element(saveButtonSelector).not.enabled;

    Object.entries(values).forEach(([key, value]) => {
        let selector = `${prefixToInputSelector}${upperFirst(key)}Input`;
        this.lskSetValue(selector, value);
    });

    this.expect.element(saveButtonSelector).enabled;
    this.lskClick(saveButtonSelector);

    return this;
};
