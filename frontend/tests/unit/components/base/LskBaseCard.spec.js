import LskBaseCard from "@/components/base/LskBaseCard";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseCard", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseCard);
        expect(wrapper.html()).toMatchSnapshot("no content in any slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseCard, {
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseCard, {
            slots: {
                header: "<div>HEADER</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in header slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseCard, {
            slots: {
                default: "<div>DEFAULT</div>",
                header: "<div>HEADER</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot and in header slot");
    });
});
