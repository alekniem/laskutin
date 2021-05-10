import flushPromises from "flush-promises";
import sinon from "sinon";
import LskBaseIcon from "@/components/base/LskBaseIcon";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskBaseIcon", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should match snapshot", () => {
        const wrapper = createWrapper(LskBaseIcon, {
            propsData: {
                clickFunction: (param) => param,
                cssClass: "mr-3",
                iconName: "mdi-pencil",
                parameter: {},
                title: "TEST TITLE",
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("should call function when icon is clicked", async () => {
        const spy = sinon.spy();
        const param = { test: "TEST" };
        const wrapper = createWrapper(LskBaseIcon, {
            propsData: {
                clickFunction: spy,
                iconName: "mdi-pencil",
                parameter: param,
                title: "TEST TITLE",
            },
        });
        await flushPromises();
        wrapper.find("button").trigger("click");
        await flushPromises();
        expect(spy.calledWith(param)).toBe(true);
    });
});
