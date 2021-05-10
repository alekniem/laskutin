<template>
    <v-dialog max-width="700" persistent v-model="dialogVisible">
        <ValidationObserver #default="{ handleSubmit, invalid }" ref="observer">
            <v-form>
                <v-card>
                    <v-card-title :id="cid + 'Title'">
                        {{ title | trans }} ({{ id }})
                    </v-card-title>
                    <v-card-text>
                        <LskInputCheckbox
                            :cid="cid + 'YesCheckboxInput'"
                            :label="trans(checkboxLabel)"
                            vid="yes_checkbox"
                            v-model="checkbox"
                        />
                        <LskBaseError v-if="apiError">
                            {{ apiError | trans }}
                        </LskBaseError>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <LskInputButton
                            @click.native="processCancel"
                            :cid="cid + 'CancelButton'"
                            buttonText="Cancel"
                        />
                        <LskInputButton
                            @click.native="handleSubmit(processDelete)"
                            :cid="cid + 'DeleteButton'"
                            :disabled="invalid || deleteButtonDisabled"
                            buttonText="Delete"
                        />
                    </v-card-actions>
                </v-card>
            </v-form>
        </ValidationObserver>
    </v-dialog>
</template>

<script>
import lsk_api from "@/plugins/lsk_api";
import { ValidationObserver } from "vee-validate";

export default {
    name: "LskDialogDelete",

    components: {
        ValidationObserver,
    },

    model: {
        prop: "showDialog",
        event: "dialog",
    },

    props: {
        apiActionName: { type: String, required: true },
        checkboxLabel: { type: String, required: true },
        cid: { type: String, required: true },
        id: { type: [String, Number], required: false },
        showDialog: { type: Boolean, required: true },
        title: { type: String, required: true },
    },

    data() {
        return {
            apiError: null,
            checkbox: false,
            dialogVisible: this.showDialog,
        };
    },

    computed: {
        deleteButtonDisabled() {
            return !this.checkbox;
        },
    },

    watch: {
        showDialog(value) {
            this.dialogVisible = value;
        },
    },

    methods: {
        processCancel() {
            this.$emit("dialog", false);
        },

        processDelete() {
            lsk_api
                .query(this.apiActionName, this.id, null)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse() {
            this.$emit("dialog", false);
        },

        parseError(data) {
            this.apiError = data.message || "Failed to delete item";
        },
    },
};
</script>
