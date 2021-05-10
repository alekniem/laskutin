import Lang from "lang.js";
import dayjs from "dayjs";
import lsk_messages from "@/plugins/lsk_messages";

const lang = new Lang({
    messages: lsk_messages,
    locale: "fi",
});

export function centsToEuros(cents) {
    if (cents === null) {
        return "";
    }
    let euros = cents / 100;
    return euros.toLocaleString("fi-FI", { style: "currency", currency: "EUR" });
}

export function formatDate(dateString, formatString) {
    return dayjs(dateString).format(formatString);
}

export function hasField(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
}

export function trans(message) {
    return lang.get("messages." + message).replace(/^messages./, "");
}
