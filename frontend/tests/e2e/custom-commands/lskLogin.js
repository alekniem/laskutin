exports.command = function({ username = this.globals.username, password = this.globals.password } = {}) {
    const pageId = "loginPage";

    this.assert.urlEquals(this.launch_url + "/login");

    this.lskSetValue(`#${pageId}UsernameField`, username);
    this.lskSetValue(`#${pageId}PasswordField`, password);
    this.lskClick(`#${pageId}LoginButton`);

    return this;
};
