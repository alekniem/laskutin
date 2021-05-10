import LskLogo from "@/components/logo/LskLogo";
import { createWrapper } from "UT/lsk_test_helper";

describe("LskLogo", () => {
    it("should match snapshot", () => {
        const wrapper = createWrapper(LskLogo);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
