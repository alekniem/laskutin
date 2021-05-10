import LskBaseListItem from "@/components/base/LskBaseListItem";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseListItem", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListItem, {
            propsData: {
                itemId: "TEST_ITEM_ID",
                parentId: "TEST_PARENT_ID",
                text: "TEST TEXT",
                value: "TEST VALUE",
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
