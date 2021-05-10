import axios from "axios";
import flushPromises from "flush-promises";
import sinon from "sinon";
import LskBaseCard from "@/components/base/LskBaseCard";
import LskBaseIcon from "@/components/base/LskBaseIcon";
import LskBaseMenu from "@/components/base/LskBaseMenu";
import LskBaseMenuItem from "@/components/base/LskBaseMenuItem";
import LskBaseTable from "@/components/base/LskBaseTable";
import LskBaseToolbar from "@/components/base/LskBaseToolbar";
import LskPageIndexCustomer from "@/components/page/LskPageIndexCustomer";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.get.mockImplementation((url) => {
    if (url === "customer") {
        return Promise.resolve({
            data: [
                {
                    id: 1,
                    name: "NAME 1",
                    address_line_one: "ADDRESS LINE ONE 1",
                    address_line_two: "ADDRESS LINE TWO 1",
                },
                {
                    id: 2,
                    name: "NAME 2",
                    address_line_one: "ADDRESS LINE ONE 2",
                    address_line_two: "ADDRESS LINE TWO 2",
                },
            ],
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
    LskBaseIcon,
    LskBaseMenu,
    LskBaseMenuItem,
    LskBaseTable,
    LskBaseToolbar,
    LskDialogAddOrEditCustomer: true,
    LskDialogDelete: true,
};

describe("LskPageIndexCustomer", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexCustomer, {
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("page");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexCustomer, {
            stubs,
        });
        await flushPromises();

        const menu = wrapper.findComponent(LskBaseMenu);
        menu.find("#customerIndexPageMenuActivator").trigger("click");
        await flushPromises();
        expect(menu.html()).toMatchSnapshot("menu");

        menu.find("#customerIndexPageAddCustomerMenuItem").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogAddOrEditCustomer-stub");
        expect(dialog.html()).toMatchSnapshot("dialog add customer");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskPageIndexCustomer, {
            stubs,
        });
        await flushPromises();
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-delete").trigger("click");
        await flushPromises();
        const dialog = wrapper.find("LskDialogDelete-stub");
        expect(dialog.html()).toMatchSnapshot("dialog delete customer");
    });

    it("should call router", async () => {
        const wrapper = createWrapper(LskPageIndexCustomer, {
            stubs,
        });
        await flushPromises();
        wrapper.vm.$router = { push: sinon.spy() };
        const table = wrapper.findComponent(LskBaseTable);
        table.find(".mdi-monitor").trigger("click");
        await flushPromises();
        const param = {
            name: "showCustomer",
            params: { id: 2 },
        };
        expect(wrapper.vm.$router.push.calledWith(param)).toBe(true);
    });
});
