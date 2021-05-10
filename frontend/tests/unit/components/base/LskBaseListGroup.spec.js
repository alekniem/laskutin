import LskBaseListGroup from "@/components/base/LskBaseListGroup";
import LskBaseListItem from "@/components/base/LskBaseListItem";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseListItem,
};

describe("LskBaseListGroup", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {},
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("no items, group collapsed");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {},
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
                value: true,
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("no items, group expanded");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {
                    test_one: { text: "TEST TEXT ONE", value: "TEST VALUE ONE" },
                },
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("one item, group collapsed");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {
                    test_one: { text: "TEST TEXT ONE", value: "TEST VALUE ONE" },
                },
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
                value: true,
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("one item, group expanded");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {
                    test_one: { text: "TEST TEXT ONE", value: "TEST VALUE ONE" },
                    test_two: { text: "TEST TEXT TWO", value: "TEST VALUE TWO" },
                },
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("two items, group collapsed");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseListGroup, {
            propsData: {
                activatorId: "TEST_ACTIVATOR_ID",
                items: {
                    test_one: { text: "TEST TEXT ONE", value: "TEST VALUE ONE" },
                    test_two: { text: "TEST TEXT TWO", value: "TEST VALUE TWO" },
                },
                parentId: "TEST_PARENT_ID",
                title: "TEST TITLE",
                value: true,
            },
            stubs,
        });
        expect(wrapper.html()).toMatchSnapshot("two items, group expanded");
    });
});
