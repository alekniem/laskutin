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
                                    :cid="cid + 'BillerNameInput'"
                                    label="Name"
                                    vid="biller_name"
                                    v-model="inputData.biller_name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerAddressLineOneInput'"
                                    label="Address line 1"
                                    vid="biller_address_line_one"
                                    v-model="inputData.biller_address_line_one"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerAddressLineTwoInput'"
                                    label="Address line 2"
                                    vid="biller_address_line_two"
                                    v-model="inputData.biller_address_line_two"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerEmailInput'"
                                    label="Email"
                                    vid="biller_email"
                                    v-model="inputData.biller_email"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerPhoneNumberInput'"
                                    label="Phone number"
                                    vid="biller_phone_number"
                                    v-model="inputData.biller_phone_number"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerBusinessIdentityCodeInput'"
                                    label="Business identity code"
                                    vid="biller_business_identity_code"
                                    v-model="inputData.biller_business_identity_code"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerBankNameInput'"
                                    label="Bank name"
                                    vid="biller_bank_name"
                                    v-model="inputData.biller_bank_name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerBankIbanInput'"
                                    label="Bank iban"
                                    vid="biller_bank_iban"
                                    v-model="inputData.biller_bank_iban"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerBankBicInput'"
                                    label="Bank bic"
                                    vid="biller_bank_bic"
                                    v-model="inputData.biller_bank_bic"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerPdfTitleInput'"
                                    label="Pdf title"
                                    vid="biller_pdf_title"
                                    v-model="inputData.biller_pdf_title"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BillerPdfAuthorInput'"
                                    label="Pdf author"
                                    vid="biller_pdf_author"
                                    v-model="inputData.biller_pdf_author"
                                />
                            </v-col>
                            <v-col />
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
    name: "LskDialogEditInvoiceBiller",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
    },

    data() {
        return {
            fields: [
                "biller_name",
                "biller_address_line_one",
                "biller_address_line_two",
                "biller_email",
                "biller_phone_number",
                "biller_business_identity_code",
                "biller_bank_name",
                "biller_bank_iban",
                "biller_bank_bic",
                "biller_pdf_title",
                "biller_pdf_author",
            ],
        };
    },

    computed: {
        apiActionName() {
            return "invoiceUpdate";
        },

        title() {
            return (
                this.trans("Edit biller") +
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
