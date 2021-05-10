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
                                    :cid="cid + 'NameInput'"
                                    label="Name"
                                    vid="name"
                                    v-model="inputData.name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'AddressLineOneInput'"
                                    label="Address line 1"
                                    vid="address_line_one"
                                    v-model="inputData.address_line_one"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'AddressLineTwoInput'"
                                    label="Address line 2"
                                    vid="address_line_two"
                                    v-model="inputData.address_line_two"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'EmailInput'"
                                    label="Email"
                                    vid="email"
                                    v-model="inputData.email"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'PhoneNumberInput'"
                                    label="Phone number"
                                    vid="phone_number"
                                    v-model="inputData.phone_number"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BusinessIdentityCodeInput'"
                                    label="Business identity code"
                                    vid="business_identity_code"
                                    v-model="inputData.business_identity_code"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BankNameInput'"
                                    label="Bank name"
                                    vid="bank_name"
                                    v-model="inputData.bank_name"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BankIbanInput'"
                                    label="Bank iban"
                                    vid="bank_iban"
                                    v-model="inputData.bank_iban"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'BankBicInput'"
                                    label="Bank bic"
                                    vid="bank_bic"
                                    v-model="inputData.bank_bic"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'PdfTitleInput'"
                                    label="Pdf title"
                                    vid="pdf_title"
                                    v-model="inputData.pdf_title"
                                />
                            </v-col>
                            <v-col>
                                <LskInputText
                                    :cid="cid + 'PdfAuthorInput'"
                                    label="Pdf author"
                                    vid="pdf_author"
                                    v-model="inputData.pdf_author"
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
    name: "LskDialogAddOrEditBiller",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
    },

    data() {
        return {
            fields: [
                "name",
                "address_line_one",
                "address_line_two",
                "email",
                "phone_number",
                "business_identity_code",
                "bank_name",
                "bank_iban",
                "bank_bic",
                "pdf_title",
                "pdf_author",
            ],
        };
    },

    computed: {
        apiActionName() {
            return this.id ? "billerUpdate" : "billerStore";
        },

        title() {
            return this.id
                ? this.trans("Edit biller") + " (" + this.id + ")"
                : this.trans("Add new biller");
        },
    },
};
</script>
