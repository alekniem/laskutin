import LskBaseMenuItem from "@/components/base/LskBaseMenuItem";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseMenuItem", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseMenuItem, {
            propsData: {
                cid: "TEST_CID",
                text: "TEST TEXT",
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
