exports.command = async function(tableSelector, rowSelector, columnSelector, path) {
    let actionSelector = `${tableSelector} tbody ${rowSelector} ${columnSelector} .mdi-monitor`;
    let idSelector = `${tableSelector} tbody ${rowSelector} td:nth-child(1)`;
    this.assert.visible(actionSelector);
    let id = await this.lskGetText(idSelector);

    this.lskClick(actionSelector, false);
    this.assert.urlEquals(this.launch_url + "/" + path + "/" + id);
    this.lskBack();
    this.assert.urlEquals(this.launch_url + "/" + path);

    return this;
};
