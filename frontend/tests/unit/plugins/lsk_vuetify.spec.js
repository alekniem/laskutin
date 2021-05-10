import Vuetify from "vuetify";
import lsk_vuetify from "@/plugins/lsk_vuetify";

describe("lsk_vuetify", () => {
    it("should be an instance of Vuetify", () => {
        expect(lsk_vuetify).toBeInstanceOf(Vuetify);
    });
});
