import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskPageNotFound from "@/components/page/LskPageNotFound";
import { createWrapper } from "UT/lsk_test_helper";

const stubs = {
    LskBaseError,
};

describe("LskPageNotFound", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageNotFound, {
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot();
    });
});
