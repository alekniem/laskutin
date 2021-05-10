import axios from "axios";

axios.defaults.withCredentials = true;

const url = process.env.VUE_APP_BACKEND_URL;

const configBackend = {
    baseURL: url,
};

const configJson = {
    baseURL: url + "/api",
    headers: {
        "Content-type": "application/json",
    },
};

const configBlob = {
    baseURL: url + "/api",
    responseType: "blob",
};

export default {
    getCsrfCookie() {
        return axios.get("sanctum/csrf-cookie", configBackend);
    },

    login(username, password) {
        let data = { username, password };
        return axios.post("login", data, configBackend);
    },

    logout() {
        let data = {};
        return axios.post("logout", data, configBackend);
    },

    query(name, id, data) {
        switch (name) {
            case "billerIndex":
                return axios.get("biller", configJson);
            case "billerStore":
                return axios.post("biller", data, configJson);
            case "billerShow":
                return axios.get("biller/" + id, configJson);
            case "billerUpdate":
                return axios.put("biller/" + id, data, configJson);
            case "billerDestroy":
                return axios.delete("biller/" + id, configJson);

            case "customerIndex":
                return axios.get("customer", configJson);
            case "customerStore":
                return axios.post("customer", data, configJson);
            case "customerShow":
                return axios.get("customer/" + id, configJson);
            case "customerUpdate":
                return axios.put("customer/" + id, data, configJson);
            case "customerDestroy":
                return axios.delete("customer/" + id, configJson);

            case "invoiceIndex":
                return axios.get("invoice", configJson);
            case "invoiceStore":
                return axios.post("invoice", data, configJson);
            case "invoiceShow":
                return axios.get("invoice/" + id, configJson);
            case "invoiceUpdate":
                return axios.put("invoice/" + id, data, configJson);
            case "invoiceDestroy":
                return axios.delete("invoice/" + id, configJson);

            case "invoiceLineIndex":
                return axios.get("invoiceLine", configJson);
            case "invoiceLineStore":
                return axios.post("invoiceLine", data, configJson);
            case "invoiceLineShow":
                return axios.get("invoiceLine/" + id, configJson);
            case "invoiceLineUpdate":
                return axios.put("invoiceLine/" + id, data, configJson);
            case "invoiceLineDestroy":
                return axios.delete("invoiceLine/" + id, configJson);

            case "pdfInvoiceFetch":
                return axios.get("pdfInvoice/" + id, configBlob);

            default:
                return Promise.reject({
                    response: {
                        data: {
                            message: "Undefined API action",
                        },
                    },
                });
        }
    },
};
