exports.command = function(tableSelector, rowSelector, entries) {
    Object.entries(entries).forEach(([key, value]) => {
        this.assert.containsText(`${tableSelector} tbody ${rowSelector} td:nth-child(${key})`, value);
    });

    return this;
};
