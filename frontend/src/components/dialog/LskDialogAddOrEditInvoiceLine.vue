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
                                    :cid="cid + 'DescriptionInput'"
                                    label="Description"
                                    vid="description"
                                    v-model="inputData.description"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputMoney
                                    :cid="cid + 'AmountInput'"
                                    label="Amount"
                                    vid="amount"
                                    v-model="amount"
                                />
                            </v-col>
                            <v-col>
                                <LskInputPercent
                                    :cid="cid + 'VatPercentInput'"
                                    label="VAT percent"
                                    vid="vat_percent"
                                    v-model="vatPercent"
                                />
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <LskInputMoney
                                    :cid="cid + 'VatAmountInput'"
                                    label="VAT amount"
                                    vid="vat_amount"
                                    v-model="vatAmount"
                                />
                            </v-col>
                            <v-col>
                                <LskInputMoney
                                    :cid="cid + 'TotalAmountInput'"
                                    label="Total amount"
                                    vid="total_amount"
                                    v-model="totalAmount"
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
    name: "LskDialogAddOrEditInvoiceLine",

    mixins: [LskDialogAddOrEdit],

    props: {
        cid: { type: String, required: true },
        invoiceId: { type: [String, Number], required: true },
    },

    data() {
        return {
            fields: [
                "description",
                "amount",
                "vat_percent",
                "vat_amount",
                "total_amount",
            ],
        };
    },

    computed: {
        apiActionName() {
            return this.id ? "invoiceLineUpdate" : "invoiceLineStore";
        },

        title() {
            return this.id
                ? this.trans("Edit invoice line") + " (" + this.id + ")"
                : this.trans("Add new invoice line");
        },

        amount: {
            get: function () {
                return this.formatMoney(this.inputData.amount);
            },
            set: function (value) {
                if (value === "") {
                    this.inputData.amount = null;
                    this.inputData.vat_amount = null;
                    this.inputData.total_amount = null;
                    return;
                }

                this.inputData.amount = this.toCents(value);

                if (isNaN(this.inputData.amount)) {
                    return;
                }

                this.inputData.vat_amount = Math.round(
                    this.inputData.amount * (this.inputData.vat_percent / 100)
                );

                this.inputData.total_amount =
                    this.inputData.amount + this.inputData.vat_amount;
            },
        },

        vatPercent: {
            get: function () {
                return this.formatPercent(this.inputData.vat_percent);
            },
            set: function (value) {
                if (value === "") {
                    this.inputData.vat_percent = null;
                    this.inputData.vat_amount = null;
                    this.inputData.total_amount = this.inputData.amount;
                    return;
                }

                this.inputData.vat_percent = Number(value);

                if (isNaN(this.inputData.vat_percent)) {
                    return;
                }

                this.inputData.vat_amount = Math.round(
                    this.inputData.amount * (this.inputData.vat_percent / 100)
                );

                this.inputData.total_amount =
                    this.inputData.amount + this.inputData.vat_amount;
            },
        },

        vatAmount: {
            get: function () {
                return this.formatMoney(this.inputData.vat_amount);
            },
            set: function (value) {
                if (value === "") {
                    this.inputData.amount = null;
                    this.inputData.vat_amount = null;
                    this.inputData.total_amount = null;
                    return;
                }

                this.inputData.vat_amount = this.toCents(value);

                if (isNaN(this.inputData.vat_amount)) {
                    return;
                }

                this.inputData.amount = Math.round(
                    this.inputData.vat_amount /
                        (this.inputData.vat_percent / 100)
                );

                this.inputData.total_amount =
                    this.inputData.amount + this.inputData.vat_amount;
            },
        },

        totalAmount: {
            get: function () {
                return this.formatMoney(this.inputData.total_amount);
            },
            set: function (value) {
                if (value === "") {
                    this.inputData.amount = null;
                    this.inputData.vat_amount = null;
                    this.inputData.total_amount = null;
                    return;
                }

                this.inputData.total_amount = this.toCents(value);

                if (isNaN(this.inputData.total_amount)) {
                    return;
                }

                this.inputData.amount = Math.round(
                    this.inputData.total_amount /
                        ((this.inputData.vat_percent + 100) / 100)
                );

                this.inputData.vat_amount =
                    this.inputData.total_amount - this.inputData.amount;
            },
        },
    },

    created() {
        this.$set(this.inputData, "invoice_id", this.invoiceId);
    },

    methods: {
        toCents(amount) {
            if (typeof amount === "string") {
                amount = amount.replace(",", ".");
            }
            return Math.round(Number(amount) * 100);
        },

        formatMoney(amount) {
            if (amount === "" || amount === null) {
                return "";
            }
            return (amount / 100).toFixed(2).replace(".", ",");
        },

        formatPercent(amount) {
            if (amount === null) {
                return "";
            }
            return amount;
        },
    },
};
</script>
