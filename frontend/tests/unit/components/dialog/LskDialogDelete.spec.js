import axios from "axios";
import flushPromises from "flush-promises";
import LskBaseError from "@/components/base/LskBaseError";
import LskDialogDelete from "@/components/dialog/LskDialogDelete";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputCheckbox from "@/components/input/LskInputCheckbox";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.delete.mockImplementation((url) => {
    if (url === "customer/123") {
        return Promise.resolve({
            data: {
                message: "DELETE QUERY OK",
            },
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "DELETE QUERY ERROR",
            },
        },
    });
});

const getPropsData = ({
    apiActionName = "customerDestroy",
    checkboxLabel = "TEST CHECKBOX LABEL",
    cid = "TEST_CID",
    id = 123,
    showDialog = true,
    title = "TEST TITLE",
} = {}) => ({
    apiActionName,
    checkboxLabel,
    cid,
    id,
    showDialog,
    title,
});

const stubs = {
    LskBaseError,
    LskInputButton,
    LskInputCheckbox,
};

describe("LskDialogDelete", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData({ showDialog: false }),
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData(),
            stubs,
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData(),
            stubs,
        });
        await flushPromises();
        wrapper.vm._data.apiError = "API ERROR";
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should change 'delete' button from disabled to enabled", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData(),
            stubs,
        });
        await flushPromises();

        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.find("#TEST_CIDDeleteButton").attributes().disabled).toBeDefined();

        wrapper.find("#TEST_CIDYesCheckboxInput").trigger("click");
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.find("#TEST_CIDDeleteButton").attributes().disabled).toBeUndefined();
    });

    it("should emit 'dialog' event on success", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData(),
            stubs,
        });
        await flushPromises();
        wrapper.find("#TEST_CIDYesCheckboxInput").trigger("click");
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        wrapper.find("#TEST_CIDDeleteButton").trigger("click");
        await flushPromises();
        expect(wrapper.emitted().dialog).toStrictEqual([[false]]);
    });

    it("should show an error message on failure", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData({ id: 456 }),
            stubs,
        });
        await flushPromises();
        wrapper.find("#TEST_CIDYesCheckboxInput").trigger("click");
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        wrapper.find("#TEST_CIDDeleteButton").trigger("click");
        await flushPromises();
        expect(wrapper.vm._data.apiError).toStrictEqual("DELETE QUERY ERROR");
    });

    it("should emit 'dialog' event on cancel", async () => {
        const wrapper = createWrapper(LskDialogDelete, {
            propsData: getPropsData(),
            stubs,
        });
        await flushPromises();
        wrapper.find("#TEST_CIDCancelButton").trigger("click");
        await flushPromises();
        expect(wrapper.emitted().dialog).toStrictEqual([[false]]);
    });
});
