import axios from "axios";
import lsk_api from "@/plugins/lsk_api";

jest.mock("axios");

let counter = {
    get: 0,
    post: 0,
    put: 0,
    delete: 0,
};

describe("lsk_api.getCsrfCookie()", () => {
    it("should make correct axios.get() call", async () => {
        let value = "Response for cookie query";
        axios.get.mockResolvedValue(value);
        await lsk_api.getCsrfCookie().then((response) => {
            expect(response).toBe(value);
        });
        expect(axios.get.mock.calls[counter.get][0]).toBe("sanctum/csrf-cookie");
        counter.get++;
    });
});

describe("lsk_api.login()", () => {
    it("should make correct axios.post() call", async () => {
        let username = "Username for login";
        let password = "Password for login";
        let value = "Response for login";
        let data = { username, password };
        axios.post.mockResolvedValue(value);
        await lsk_api.login(username, password).then((response) => {
            expect(response).toBe(value);
        });
        expect(axios.post.mock.calls[counter.post][0]).toBe("login");
        expect(axios.post.mock.calls[counter.post][1]).toStrictEqual(data);
        counter.post++;
    });
});

describe("lsk_api.logout()", () => {
    it("should make correct axios.post() call", async () => {
        let value = "Response for logout";
        let data = {};
        axios.post.mockResolvedValue(value);
        await lsk_api.logout().then((response) => {
            expect(response).toBe(value);
        });
        expect(axios.post.mock.calls[counter.post][0]).toBe("logout");
        expect(axios.post.mock.calls[counter.post][1]).toStrictEqual(data);
        counter.post++;
    });
});

describe("lsk_api.query()", () => {
    it("should make correct axios.get() call", () => {
        const queries = [
            { name: "billerIndex", id: null, url: "biller" },
            { name: "billerShow", id: 123, url: "biller/123" },
            { name: "customerIndex", id: null, url: "customer" },
            { name: "customerShow", id: 123, url: "customer/123" },
            { name: "invoiceIndex", id: null, url: "invoice" },
            { name: "invoiceShow", id: 123, url: "invoice/123" },
            { name: "invoiceLineIndex", id: null, url: "invoiceLine" },
            { name: "invoiceLineShow", id: 123, url: "invoiceLine/123" },
            { name: "pdfInvoiceFetch", id: 123, url: "pdfInvoice/123" },
        ];
        queries.forEach(async (obj) => {
            let value = "Response for " + obj.name;
            axios.get.mockResolvedValue(value);
            await lsk_api.query(obj.name, obj.id, null).then((response) => {
                expect(response).toBe(value);
            });
            expect(axios.get.mock.calls[counter.get][0]).toBe(obj.url);
            counter.get++;
        });
    });

    it("should make correct axios.post() call", () => {
        const queries = [
            { name: "billerStore", url: "biller" },
            { name: "customerStore", url: "customer" },
            { name: "invoiceStore", url: "invoice" },
            { name: "invoiceLineStore", url: "invoiceLine" },
        ];
        queries.forEach(async (obj) => {
            let value = "Response for " + obj.name;
            let data = "Data for " + obj.name;
            axios.post.mockResolvedValue(value);
            await lsk_api.query(obj.name, null, data).then((response) => {
                expect(response).toBe(value);
            });
            expect(axios.post.mock.calls[counter.post][0]).toBe(obj.url);
            expect(axios.post.mock.calls[counter.post][1]).toBe(data);
            counter.post++;
        });
    });

    it("should make correct axios.put() call", () => {
        const queries = [
            { name: "billerUpdate", id: 123, url: "biller/123" },
            { name: "customerUpdate", id: 123, url: "customer/123" },
            { name: "invoiceUpdate", id: 123, url: "invoice/123" },
            { name: "invoiceLineUpdate", id: 123, url: "invoiceLine/123" },
        ];
        queries.forEach(async (obj) => {
            let value = "Response for " + obj.name;
            let data = "Data for " + obj.name;
            axios.put.mockResolvedValue(value);
            await lsk_api.query(obj.name, obj.id, data).then((response) => {
                expect(response).toBe(value);
            });
            expect(axios.put.mock.calls[counter.put][0]).toBe(obj.url);
            expect(axios.put.mock.calls[counter.put][1]).toBe(data);
            counter.put++;
        });
    });

    it("should make correct axios.delete() call", () => {
        const queries = [
            { name: "billerDestroy", id: 123, url: "biller/123" },
            { name: "customerDestroy", id: 123, url: "customer/123" },
            { name: "invoiceDestroy", id: 123, url: "invoice/123" },
            { name: "invoiceLineDestroy", id: 123, url: "invoiceLine/123" },
        ];
        queries.forEach(async (obj) => {
            let value = "Response for " + obj.name;
            axios.delete.mockResolvedValue(value);
            await lsk_api.query(obj.name, obj.id, null).then((response) => {
                expect(response).toBe(value);
            });
            expect(axios.delete.mock.calls[counter.delete][0]).toBe(obj.url);
            counter.delete++;
        });
    });

    it("should reject invalid name parameter", async () => {
        let expected = {
            response: {
                data: {
                    message: "Undefined API action",
                },
            },
        };
        expect.assertions(1);
        await expect(lsk_api.query("INVALID", null, null)).rejects.toStrictEqual(expected);
    });
});
