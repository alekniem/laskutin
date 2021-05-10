import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseToolbar", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseToolbar, {
            propsData: {
                titleId: "TEST_TITLE_ID",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("no content in any slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseToolbar, {
            propsData: {
                titleId: "TEST_TITLE_ID",
            },
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseToolbar, {
            propsData: {
                titleId: "TEST_TITLE_ID",
            },
            slots: {
                button: "<div>BUTTON</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in button slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseToolbar, {
            propsData: {
                titleId: "TEST_TITLE_ID",
            },
            slots: {
                default: "<div>DEFAULT</div>",
                button: "<div>BUTTON</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot and in button slot");
    });
});
