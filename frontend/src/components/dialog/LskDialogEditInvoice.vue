<template>
    <v-dialog max-width="700" persistent v-model="dialogVisible">
        <ValidationObserver #default="{ handleSubmit, invalid }" ref="observer">
            <v-form>
                <v-card>
                    <v-card-title :id="cid + 'Title'">
                        {{ title }}
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col>
                                <LskInputDate
                                    :cid="cid + 'InvoiceDateInput'"
                                    label="Invoice date"
                                    vid="invoice_date"
                                    v-model="inputData.invoice_date"
                                />
                            </v-col>
                            <v-col>
                                <LskInputDate
                                    :cid="cid + 'DueDateInput'"
                                    label="Due date"
                                    vid="due_date"
                                    v-model="inputData.due_date"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'InvoiceNumberInput'"
                                    label="Invoice number"
                                    vid="invoice_number"
                                    v-model="inputData.invoice_number"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'ReferenceNumberInput'"
                                    label="Reference number"
                                    vid="reference_number"
                                    v-model="inputData.reference_number"
                                />
                            </v-col>
                        </v-row>
                        <template v-if="otherErrors">
                            <LskBaseError
                                v-for="(error, key) in otherErrors"
                                :key="key"
                            >
                                {{ error | trans }}
                            </LskBaseError>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <LskInputButton
                            @click.native="processCancel"
                            :cid="cid + 'CancelButton'"
                            buttonText="Cancel"
                        />
                        <LskInputButton
                            @click.native="handleSubmit(processSave)"
                            :cid="cid + 'SaveButton'"
                            :disabled="invalid || saveButtonDisabled"
                            buttonText="Save"
                        />
                    </v-card-actions>
                </v-card>
            </v-form>
        </ValidationObserver>
    </v-dialog>
</template>

<script>
import LskDialogAddOrEdit from "@/mixins/LskDialogAddOrEdit";

export default {
    name: "LskDialogEditInvoice",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
    },

    data() {
        return {
            fields: [
                "invoice_date",
                "due_date",
                "invoice_number",
                "reference_number",
            ],
        };
    },

    computed: {
        apiActionName() {
            return "invoiceUpdate";
        },

        title() {
            return this.trans("Edit invoice") + " (" + this.id + ")";
        },
    },
};
</script>
