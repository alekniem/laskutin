import lsk_api from "@/plugins/lsk_api";
import { ValidationObserver } from "vee-validate";

export default {
    components: {
        ValidationObserver,
    },

    model: {
        prop: "showDialog",
        event: "dialog",
    },

    props: {
        id: { type: [String, Number], required: false, default: null },
        currentData: { type: Object, required: false, default: null },
        showDialog: { type: Boolean, required: true },
    },

    data() {
        return {
            dialogVisible: this.showDialog,
            fields: [],
            inputData: {},
            errors: {},
            otherErrors: [],
        };
    },

    computed: {
        apiActionName() {
            return null;
        },

        originalData() {
            if (this.currentData === null) {
                return this.emptyData();
            }
            return this.currentData;
        },

        saveButtonDisabled() {
            for (let key in this.inputData) {
                if (this.hasField(this.originalData, key) && this.inputData[key] != this.originalData[key]) {
                    return false;
                }
            }
            return true;
        },
    },

    watch: {
        showDialog(value) {
            this.dialogVisible = value;
        },
    },

    created() {
        this.resetInputData();
        this.resetErrors();
    },

    methods: {
        emptyData() {
            let result = {};
            this.fields.forEach((field) => {
                result[field] = "";
            });
            return result;
        },

        resetInputData() {
            this.inputData = {};
            this.fields.forEach((field) => {
                if (this.hasField(this.originalData, field)) {
                    this.$set(this.inputData, field, this.originalData[field]);
                } else {
                    this.$set(this.inputData, field, "");
                }
            });
        },

        resetErrors() {
            this.errors = {};
            this.fields.forEach((field) => this.$set(this.errors, field, []));
            this.otherErrors = [];
        },

        processCancel() {
            this.$emit("dialog", false);
        },

        processSave() {
            lsk_api
                .query(this.apiActionName, this.id, this.inputData)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse() {
            this.$emit("dialog", false);
        },

        parseError(data) {
            this.resetErrors();

            if (this.hasField(data, "errors")) {
                for (let id in data.errors) {
                    for (let key in data.errors[id]) {
                        if (this.hasField(this.errors, id)) {
                            this.errors[id].push(this.trans(data.errors[id][key]));
                        } else {
                            this.otherErrors.push(this.trans(data.errors[id][key]));
                        }
                    }
                }
            } else if (this.hasField(data, "message")) {
                this.otherErrors.push(this.trans(data.message));
            } else {
                this.otherErrors.push(this.trans("Unidentified error"));
            }

            this.$refs.observer.setErrors(this.errors);
        },
    },
};
