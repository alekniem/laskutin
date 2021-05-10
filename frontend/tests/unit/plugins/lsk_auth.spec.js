import lsk_api from "@/plugins/lsk_api";
import lsk_auth from "@/plugins/lsk_auth";

const loginCb = jest.fn();
const logoutCb = jest.fn();
lsk_auth.onChange = jest.fn();

let csrfCookieQuerySuccess = true;
let logoutQuerySuccess = true;

jest.mock("@/plugins/lsk_api.js", () => ({
    getCsrfCookie: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
}));

lsk_api.getCsrfCookie.mockImplementation(() => {
    if (csrfCookieQuerySuccess) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
});

lsk_api.login.mockImplementation((username, password) => {
    if (username === "TEST_USERNAME" && password === "TEST_PASSWORD") {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
});

lsk_api.logout.mockImplementation(() => {
    if (logoutQuerySuccess) {
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
});

describe("lsk_auth", () => {
    beforeEach(() => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        jest.clearAllMocks();
        csrfCookieQuerySuccess = true;
        logoutQuerySuccess = true;
    });

    it("should handle valid login and logout", async () => {
        expect(lsk_auth.loggedIn()).toBe(false);

        await lsk_auth.login("TEST_USERNAME", "TEST_PASSWORD", loginCb);
        expect(loginCb.mock.calls.length).toBe(1);
        expect(loginCb.mock.calls[0]).toEqual([true, ""]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(1);
        expect(lsk_auth.onChange.mock.calls[0]).toEqual([true]);

        expect(lsk_auth.loggedIn()).toBe(true);

        await lsk_auth.login("TEST_USERNAME", "TEST_PASSWORD", loginCb);
        expect(loginCb.mock.calls.length).toBe(2);
        expect(loginCb.mock.calls[1]).toEqual([true, ""]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(2);
        expect(lsk_auth.onChange.mock.calls[1]).toEqual([true]);

        expect(lsk_auth.loggedIn()).toBe(true);

        await lsk_auth.logout(logoutCb);
        expect(logoutCb.mock.calls.length).toBe(1);
        expect(logoutCb.mock.calls[0]).toEqual([false]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(3);
        expect(lsk_auth.onChange.mock.calls[2]).toEqual([false]);

        expect(lsk_auth.loggedIn()).toBe(false);

        expect(lsk_api.getCsrfCookie.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls[0]).toEqual(["TEST_USERNAME", "TEST_PASSWORD"]);
        expect(lsk_api.logout.mock.calls.length).toBe(1);
    });

    it("should handle invalid login", async () => {
        expect(lsk_auth.loggedIn()).toBe(false);

        await lsk_auth.login("TEST_USERNAME", "INVALID", loginCb);
        expect(loginCb.mock.calls.length).toBe(1);
        expect(loginCb.mock.calls[0]).toEqual([false, "Failed to login"]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(1);
        expect(lsk_auth.onChange.mock.calls[0]).toEqual([false]);

        expect(lsk_auth.loggedIn()).toBe(false);

        expect(lsk_api.getCsrfCookie.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls[0]).toEqual(["TEST_USERNAME", "INVALID"]);
        expect(lsk_api.logout.mock.calls.length).toBe(0);
    });

    it("should handle csrf cookie error", async () => {
        csrfCookieQuerySuccess = false;

        expect(lsk_auth.loggedIn()).toBe(false);

        await lsk_auth.login("TEST_USERNAME", "TEST_PASSWORD", loginCb);
        expect(loginCb.mock.calls.length).toBe(1);
        expect(loginCb.mock.calls[0]).toEqual([false, "Error in backend system"]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(1);
        expect(lsk_auth.onChange.mock.calls[0]).toEqual([false]);

        expect(lsk_auth.loggedIn()).toBe(false);

        expect(lsk_api.getCsrfCookie.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls.length).toBe(0);
        expect(lsk_api.logout.mock.calls.length).toBe(0);
    });

    it("should handle logout error", async () => {
        logoutQuerySuccess = false;

        expect(lsk_auth.loggedIn()).toBe(false);

        await lsk_auth.login("TEST_USERNAME", "TEST_PASSWORD", loginCb);
        expect(loginCb.mock.calls.length).toBe(1);
        expect(loginCb.mock.calls[0]).toEqual([true, ""]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(1);
        expect(lsk_auth.onChange.mock.calls[0]).toEqual([true]);

        expect(lsk_auth.loggedIn()).toBe(true);

        await lsk_auth.logout(logoutCb);
        expect(logoutCb.mock.calls.length).toBe(1);
        expect(logoutCb.mock.calls[0]).toEqual([true]);
        expect(lsk_auth.onChange.mock.calls.length).toBe(2);
        expect(lsk_auth.onChange.mock.calls[1]).toEqual([true]);

        expect(lsk_auth.loggedIn()).toBe(true);

        expect(lsk_api.getCsrfCookie.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls.length).toBe(1);
        expect(lsk_api.login.mock.calls[0]).toEqual(["TEST_USERNAME", "TEST_PASSWORD"]);
        expect(lsk_api.logout.mock.calls.length).toBe(1);
    });
});
