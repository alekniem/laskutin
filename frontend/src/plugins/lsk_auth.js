import lsk_api from "@/plugins/lsk_api";

export default {
    async login(username, password, cb) {
        if (localStorage.getItem("token")) {
            if (cb) cb(true, "");
            this.onChange(true);
            return;
        }

        try {
            await lsk_api.getCsrfCookie();
        } catch (error) {
            if (cb) cb(false, "Error in backend system");
            this.onChange(false);
            return;
        }

        try {
            await lsk_api.login(username, password);
            localStorage.setItem("token", "1");
            if (cb) cb(true, "");
            this.onChange(true);
        } catch (error) {
            if (cb) cb(false, "Failed to login");
            this.onChange(false);
        }
    },

    async logout(cb) {
        try {
            await lsk_api.logout();
            localStorage.removeItem("token");
            if (cb) cb(false);
            this.onChange(false);
        } catch (error) {
            if (cb) cb(true);
            this.onChange(true);
        }
    },

    loggedIn() {
        return !!localStorage.getItem("token");
    },

    onChange() {},
};
