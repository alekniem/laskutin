exports.command = async function(
    tableSelector,
    rowSelector,
    columnSelector,
    titleSelector,
    title,
    buttonSelector,
    labelSelector
) {
    let actionSelector = `${tableSelector} tbody ${rowSelector} ${columnSelector} .mdi-delete`;
    let idSelector = `${tableSelector} tbody ${rowSelector} td:nth-child(1)`;
    this.assert.visible(actionSelector);
    let id = await this.lskGetText(idSelector);

    this.lskClick(actionSelector, false);
    this.assert.containsText(titleSelector, `${title} (${id})`);
    this.assert.visible(buttonSelector);
    this.expect.element(buttonSelector).not.enabled;

    this.lskClick(labelSelector);
    this.expect.element(buttonSelector).enabled;

    this.lskClick(buttonSelector);
    this.assert.not.containsText(idSelector, id);

    return this;
};
