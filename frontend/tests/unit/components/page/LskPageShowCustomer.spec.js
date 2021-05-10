import axios from "axios";
import flushPromises from "flush-promises";
import LskBaseCard from "@/components/base/LskBaseCard";
import LskBaseError from "@/components/base/LskBaseError";
import LskBaseList from "@/components/base/LskBaseList";
import LskBaseListItem from "@/components/base/LskBaseListItem";
import LskBaseMenu from "@/components/base/LskBaseMenu";
import LskBaseMenuItem from "@/components/base/LskBaseMenuItem";
import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import LskPageShowCustomer from "@/components/page/LskPageShowCustomer";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation((url) => {
    if (url === "customer/123") {
        return Promise.resolve({
            data: {
                id: 123,
                name: "NAME",
                address_line_one: "ADDRESS LINE ONE",
                address_line_two: "ADDRESS LINE TWO",
                created_at: "2021-01-01 12:00:01",
                updated_at: "2021-02-02 12:00:02",
            },
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "GET QUERY ERROR",
            },
        },
    });
});

const stubs = {
    LskBaseCard,
    LskBaseError,
    LskBaseList,
    LskBaseListItem,
    LskBaseMenu,
    LskBaseMenuItem,
    LskBaseToolbar,
    LskDialogAddOrEditCustomer: true,
};

describe("LskPageShowCustomer", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowCustomer, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("page");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowCustomer, {
            propsData: {
                id: "INVALID",
            },
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageShowCustomer, {
            propsData: {
                id: 123,
            },
            stubs,
        });
        await flushPromises();

        const menu = wrapper.findComponent(LskBaseMenu);
        menu.find("#customerShowPageMenuActivator").trigger("click");
        await flushPromises();
        expect(menu.html()).toMatchSnapshot("menu");

        menu.find("#customerShowPageEditCustomerMenuItem").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogAddOrEditCustomer-stub");
        expect(dialog.html()).toMatchSnapshot("dialog edit customer");
    });
});
