import axios from "axios";
import flushPromises from "flush-promises";
import LskInputButton from "@/components/input/LskInputButton";
import LskInputText from "@/components/input/LskInputText";
import LskDialogAddOrEdit from "@/mixins/LskDialogAddOrEdit";
import { createWrapper } from "UT/lsk_test_helper";

jest.mock("axios");

axios.post.mockImplementation((url, data) => {
    if (url === "customer" && data.test_one === "TEST ONE") {
        return Promise.resolve({
            data: {
                message: "POST QUERY OK",
            },
        });
    }
    return Promise.reject({
        response: {
            data: {
                message: "POST QUERY ERROR",
            },
        },
    });
});

const testComponent = function() {
    return {
        name: "TestComponent",
        components: {
            LskInputButton,
            LskInputText,
        },
        mixins: [LskDialogAddOrEdit],
        data() {
            return {
                fields: ["test_one", "test_two"],
            };
        },
        computed: {
            apiActionName() {
                return "customerStore";
            },
        },
        template: `
            <v-dialog max-width="700" persistent v-model="dialogVisible">
                <ValidationObserver #default="{ handleSubmit, invalid }" ref="observer">
                    <v-form>
                        <LskInputText
                            cid="testOneInput"
                            label="Test one"
                            vid="test_one"
                            v-model="inputData.test_one"
                        />
                        <LskInputText
                            cid="testTwoInput"
                            label="Test two"
                            vid="test_two"
                            v-model="inputData.test_two"
                        />
                        <LskInputButton
                            @click.native="processCancel"
                            buttonText="Cancel"
                            cid="cancelButton"
                        />
                        <LskInputButton
                            @click.native="handleSubmit(processSave)"
                            :disabled="invalid || saveButtonDisabled"
                            buttonText="Save"
                            cid="saveButton"
                        />
                    </v-form>
                </ValidationObserver>
            </v-dialog>
        `,
    };
};

describe("LskDialogAddOrEdit", () => {
    it("should match snapshot", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: false,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog not visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("dialog visible");
    });

    it("should match snapshot", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();
        wrapper.vm._data.inputData.test_one = "";
        wrapper.vm._data.inputData.test_two = "";
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.html()).toMatchSnapshot("error messages");
    });

    it("should have correct input data", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                currentData: {
                    test_one: "TEST ONE",
                    test_two: "TEST TWO",
                },
                showDialog: true,
            },
        });
        await flushPromises();
        expect(wrapper.vm._data.inputData).toStrictEqual(wrapper.vm._props.currentData);
    });

    it("should change 'save' button from disabled to enabled", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();

        wrapper.vm._data.inputData.test_one = "";
        wrapper.vm._data.inputData.test_two = "";
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.find("#saveButton").attributes().disabled).toBeDefined();

        wrapper.vm._data.inputData.test_one = "TEST ONE";
        wrapper.vm._data.inputData.test_two = "TEST TWO";
        await flushPromises();
        wrapper.vm.$refs.observer.validate();
        await flushPromises();
        expect(wrapper.find("#saveButton").attributes().disabled).toBeUndefined();
    });

    it("should emit 'dialog' event on success", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();
        wrapper.vm._data.inputData.test_one = "TEST ONE";
        wrapper.vm._data.inputData.test_two = "TEST TWO";
        await flushPromises();
        wrapper.find("#saveButton").trigger("click");
        await flushPromises();
        let key = axios.post.mock.calls.length - 1;
        expect(axios.post.mock.calls[key][1]).toStrictEqual(wrapper.vm._data.inputData);
        expect(wrapper.emitted().dialog).toStrictEqual([[false]]);
    });

    it("should show an error message on failure", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();
        wrapper.vm._data.inputData.test_one = "INVALID";
        wrapper.vm._data.inputData.test_two = "INVALID";
        await flushPromises();
        wrapper.find("#saveButton").trigger("click");
        await flushPromises();
        let key = axios.post.mock.calls.length - 1;
        expect(axios.post.mock.calls[key][1]).toStrictEqual(wrapper.vm._data.inputData);
        expect(wrapper.vm._data.otherErrors).toStrictEqual(["POST QUERY ERROR"]);
    });

    it("should emit 'dialog' event on cancel", async () => {
        const wrapper = createWrapper(testComponent(), {
            propsData: {
                showDialog: true,
            },
        });
        await flushPromises();
        wrapper.find("#cancelButton").trigger("click");
        await flushPromises();
        expect(wrapper.emitted().dialog).toStrictEqual([[false]]);
    });
});
