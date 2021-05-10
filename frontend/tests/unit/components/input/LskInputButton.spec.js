import LskInputButton from "@/components/input/LskInputButton";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskInputButton", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskInputButton, {
            propsData: {
                buttonText: "TEST BUTTON TEXT",
                cid: "TEST_CID",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("default values");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskInputButton, {
            propsData: {
                buttonText: "TEST BUTTON TEXT",
                color: "purple",
                cid: "TEST_CID",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("purple color");
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskInputButton, {
            propsData: {
                buttonText: "TEST BUTTON TEXT",
                color: "purple",
                disabled: true,
                cid: "TEST_CID",
            },
        });
        expect(wrapper.html()).toMatchSnapshot("disabled");
    });
});
