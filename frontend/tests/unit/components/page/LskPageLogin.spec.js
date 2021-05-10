import axios from "axios";
import flushPromises from "flush-promises";
import sinon from "sinon";
import LskBaseCard from "@/components/base/LskBaseCard";
import LskBaseError from "@/components/base/LskBaseError";
import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import LskInputButton from "@/components/input/LskInputButton";
import LskPageLogin from "@/components/page/LskPageLogin";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation((url) => {
    if (url === "sanctum/csrf-cookie") {
        return Promise.resolve({
            data: {
                message: "CSRF COOKIE QUERY OK",
            },
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "GET QUERY ERROR",
            },
        },
    });
});

axios.post.mockImplementation((url, data) => {
    if (url === "login" && data.username === "test" && data.password === "valid") {
        return Promise.resolve({
            data: {
                message: "LOGIN QUERY OK",
            },
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "POST QUERY ERROR",
            },
        },
    });
});

const stubs = {
    LskBaseCard,
    LskBaseError,
    LskBaseToolbar,
    LskInputButton,
};

describe("LskPageLogin", () => {
    beforeEach(() => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageLogin, {
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("should handle valid login", async () => {
        const wrapper = createWrapper(LskPageLogin, {
            stubs,
        });
        await flushPromises();
        wrapper.vm.$router = { replace: sinon.spy() };
        wrapper.find("#loginPageUsernameField").setValue("test");
        wrapper.find("#loginPagePasswordField").setValue("valid");
        await flushPromises();
        wrapper.find("#loginPageLoginButton").trigger("click");
        await flushPromises();
        const param = {
            name: "indexInvoice",
        };
        expect(wrapper.vm.$router.replace.calledWith(param)).toBe(true);
        expect(wrapper.vm._data.error).toBe("");
    });

    it("should handle invalid login", async () => {
        const wrapper = createWrapper(LskPageLogin, {
            stubs,
        });
        await flushPromises();
        wrapper.vm.$router = { replace: sinon.spy() };
        wrapper.find("#loginPageUsernameField").setValue("test");
        wrapper.find("#loginPagePasswordField").setValue("invalid");
        await flushPromises();
        wrapper.find("#loginPageLoginButton").trigger("click");
        await flushPromises();
        expect(wrapper.vm.$router.replace.called).toBe(false);
        expect(wrapper.vm._data.error).toBe("Failed to login");
    });
});
