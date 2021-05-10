import { centsToEuros, formatDate, hasField, trans } from "@/plugins/lsk_functions";

describe("centsToEuros()", () => {
    let nbsp = "\u00A0";
    let minus = "\u2212";

    it("should convert cents to euros", () => {
        expect(centsToEuros(0)).toBe("0,00" + nbsp + "€");
        expect(centsToEuros(1)).toBe("0,01" + nbsp + "€");
        expect(centsToEuros(10)).toBe("0,10" + nbsp + "€");
        expect(centsToEuros(100)).toBe("1,00" + nbsp + "€");
        expect(centsToEuros(1000)).toBe("10,00" + nbsp + "€");
        expect(centsToEuros(12345)).toBe("123,45" + nbsp + "€");
        expect(centsToEuros(1234567890)).toBe("12" + nbsp + "345" + nbsp + "678,90" + nbsp + "€");

        expect(centsToEuros(-1)).toBe(minus + "0,01" + nbsp + "€");
        expect(centsToEuros(-10)).toBe(minus + "0,10" + nbsp + "€");
        expect(centsToEuros(-100)).toBe(minus + "1,00" + nbsp + "€");
        expect(centsToEuros(-1000)).toBe(minus + "10,00" + nbsp + "€");
        expect(centsToEuros(-12345)).toBe(minus + "123,45" + nbsp + "€");
        expect(centsToEuros(-1234567890)).toBe(minus + "12" + nbsp + "345" + nbsp + "678,90" + nbsp + "€");
    });

    it("should return empty string", () => {
        expect(centsToEuros(null)).toBe("");
    });
});

describe("formatDate()", () => {
    it("should format date", () => {
        expect(formatDate("2021-01-01", "D.M.YYYY")).toBe("1.1.2021");
        expect(formatDate("2.2.2021", "YY-MM-DD")).toBe("21-02-02");
    });
});

describe("hasField()", () => {
    let obj = { name: "Foo" };

    it("should return true when field exists", () => {
        expect(hasField(obj, "name")).toBe(true);
    });

    it("should return false when field does not exist", () => {
        expect(hasField(obj, "address")).toBe(false);
    });
});

describe("trans()", () => {
    it("should translate messages", () => {
        expect(trans("Actions")).toBe("Toiminnot");
        expect(trans("Add new biller")).toBe("Lisää uusi laskuttaja");
    });

    it("should not translate messages", () => {
        expect(trans("actions")).toBe("actions");
        expect(trans("add new biller")).toBe("add new biller");
    });
});
