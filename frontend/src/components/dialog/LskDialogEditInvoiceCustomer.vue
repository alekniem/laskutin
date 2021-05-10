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
                                <LskInputText
                                    :cid="cid + 'CustomerNameInput'"
                                    label="Name"
                                    vid="customer_name"
                                    v-model="inputData.customer_name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'CustomerAddressLineOneInput'"
                                    label="Address line 1"
                                    vid="customer_address_line_one"
                                    v-model="inputData.customer_address_line_one"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'CustomerAddressLineTwoInput'"
                                    label="Address line 2"
                                    vid="customer_address_line_two"
                                    v-model="inputData.customer_address_line_two"
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
    name: "LskDialogEditInvoiceCustomer",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
    },

    data() {
        return {
            fields: [
                "customer_name",
                "customer_address_line_one",
                "customer_address_line_two",
            ],
        };
    },

    computed: {
        apiActionName() {
            return "invoiceUpdate";
        },

        title() {
            return (
                this.trans("Edit customer") +
                " (" +
                this.trans("invoice") +
                " " +
                this.id +
                ")"
            );
        },
    },
};
</script>
