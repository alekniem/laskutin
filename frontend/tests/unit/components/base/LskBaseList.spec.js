import LskBaseList from "@/components/base/LskBaseList";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseList", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseList, {
            propsData: {
                cid: "TEST_CID",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("no content in default slot");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseList, {
            propsData: {
                cid: "TEST_CID",
            },
            slots: {
                default: "<div>DEFAULT</div>",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("content in default slot");
    });
});
