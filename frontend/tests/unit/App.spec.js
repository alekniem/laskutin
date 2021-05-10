import flushPromises from "flush-promises";
import App from "@/App";
import LskInputButton from "@/components/input/LskInputButton";
import lsk_auth from "@/plugins/lsk_auth";
import lsk_router from "@/plugins/lsk_router";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskInputButton,
    LskLogo: true,
};

jest.mock("@/components/page/LskPageLogin.vue", () => ({
    render: (h) => h("div", "LOGIN PAGE"),
}));

jest.mock("@/components/page/LskPageIndexInvoice.vue", () => ({
    render: (h) => h("div", "INVOICE INDEX PAGE"),
}));

jest.mock("@/plugins/lsk_auth.js", () => ({
    login: jest.fn(),
    logout: jest.fn(),
    loggedIn: jest.fn(),
}));

let fakeLoggedIn = false;

lsk_auth.login.mockImplementation(() => {
    fakeLoggedIn = true;
    lsk_auth.onChange(true);
});

lsk_auth.logout.mockImplementation(() => {
    fakeLoggedIn = false;
    lsk_auth.onChange(false);
});

lsk_auth.loggedIn.mockImplementation(() => fakeLoggedIn);

describe("App", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(App, {
            router: lsk_router,
            stubs,
        });
        await flushPromises();

        expect(wrapper.vm._data.loggedIn).toBe(false);
        expect(wrapper.html()).toMatchSnapshot("login page");

        lsk_auth.login();
        lsk_router.replace({ name: "indexInvoice" });
        await flushPromises();

        expect(wrapper.vm._data.loggedIn).toBe(true);
        expect(wrapper.html()).toMatchSnapshot("invoice index page");

        wrapper.find("#logoutButton").trigger("click");
        await flushPromises();

        expect(wrapper.vm._data.loggedIn).toBe(false);
        expect(lsk_auth.logout.mock.calls.length).toBe(1);
    });
});
