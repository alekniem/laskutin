import LskBaseError from "@/components/base/LskBaseError";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseError", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseError);
        expect(wrapper.html()).toMatchSnapshot("no content in default slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseError, {
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot");
    });
});
