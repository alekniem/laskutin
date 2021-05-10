import VueRouter from "vue-router";
import lsk_router from "@/plugins/lsk_router";
import { beforeEach as routerBeforeEach } from "@/plugins/lsk_router";

describe("lsk_router", () => {
    it("should be an instance of VueRouter", () => {
        expect(lsk_router).toBeInstanceOf(VueRouter);
    });

    it("should be in 'history' mode", () => {
        expect(lsk_router.mode).toBe("history");
    });
});

const next = jest.fn();

describe("lsk_router's beforeEach", () => {
    beforeEach(() => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        next.mockClear();
    });

    it("should redirect properly (not authenticated)", () => {
        const redirects = {
            index: "login",
            login: "",
            indexBiller: "login",
            showbiller: "login",
            indexCustomer: "login",
            showCustomer: "login",
            indexInvoice: "login",
            showInvoice: "login",
            foo: "login",
            bar: "login",
        };

        Object.keys(redirects).forEach((toName) => {
            let to = { name: toName };
            let from = {};
            let expected = redirects[toName] === "" ? [] : [{ name: redirects[toName] }];
            routerBeforeEach(to, from, next);
            expect(next.mock.calls[0]).toEqual(expected);
            next.mockClear();
        });
    });

    it("should redirect properly (authenticated)", () => {
        const redirects = {
            index: "indexInvoice",
            login: "indexInvoice",
            indexBiller: "",
            showbiller: "",
            indexCustomer: "",
            showCustomer: "",
            indexInvoice: "",
            showInvoice: "",
            foo: "",
            bar: "",
        };

        Object.keys(redirects).forEach((toName) => {
            let to = { name: toName };
            let from = {};
            let expected = redirects[toName] === "" ? [] : [{ name: redirects[toName] }];
            localStorage.setItem("token", "1");
            routerBeforeEach(to, from, next);
            expect(next.mock.calls[0]).toEqual(expected);
            next.mockClear();
        });
    });
});
