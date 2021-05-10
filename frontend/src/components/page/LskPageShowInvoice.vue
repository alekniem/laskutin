<template>
    <div>
        <v-row v-if="invoiceDataOne">
            <v-col cols="12" xs="12" sm="8" md="7" lg="4">
                <LskBaseCard>
                    <template #header>
                        <LskBaseToolbar
                            :id="cid + 'Toolbar'"
                            :titleId="cid + 'Title'"
                        >
                            <template #button>
                                <LskBaseMenu :activatorId="cid + 'MenuActivator'">
                                    <LskBaseMenuItem
                                        @click.native="downloadPdf"
                                        :cid="cid + 'DownloadPdfMenuItem'"
                                        text="Download PDF"
                                    />
                                    <LskBaseMenuItem
                                        @click.native="editInvoice"
                                        :cid="cid + 'EditInvoiceMenuItem'"
                                        text="Edit invoice"
                                    />
                                    <LskBaseMenuItem
                                        @click.native="editInvoiceCustomer"
                                        :cid="cid + 'EditInvoiceCustomerMenuItem'"
                                        text="Edit customer"
                                    />
                                    <LskBaseMenuItem
                                        @click.native="editInvoiceBiller"
                                        :cid="cid + 'EditInvoiceBillerMenuItem'"
                                        text="Edit biller"
                                    />
                                </LskBaseMenu>
                            </template>
                            {{ "Invoice information" | trans }}
                        </LskBaseToolbar>
                    </template>
                    <LskBaseList :cid="cid + 'List'">
                        <LskBaseListItem
                            v-for="(itemData, itemId) in invoiceDataOne"
                            :itemId="itemId"
                            :key="itemId"
                            :parentId="cid"
                            :text="itemData.text"
                            :value="itemData.value"
                        />
                        <LskBaseListGroup
                            :activatorId="cid + 'CustomerListActivator'"
                            :items="customerData"
                            :parentId="cid"
                            :value="true"
                            title="Customer"
                        />
                        <LskBaseListGroup
                            :activatorId="cid + 'BillerListActivator'"
                            :items="billerData"
                            :parentId="cid"
                            :value="false"
                            title="Biller"
                        />
                        <LskBaseListItem
                            v-for="(itemData, itemId) in invoiceDataTwo"
                            :itemId="itemId"
                            :key="itemId"
                            :parentId="cid"
                            :text="itemData.text"
                            :value="itemData.value"
                        />
                    </LskBaseList>
                </LskBaseCard>
            </v-col>
        </v-row>

        <v-row v-if="invoiceDataOne && invoiceLineData">
            <v-col cols="12" xs="12" sm="12" md="12" lg="9">
                <LskBaseCard>
                    <template #header>
                        <LskBaseToolbar
                            :id="cid + 'InvoiceLineToolbar'"
                            :titleId="cid + 'InvoiceLineTitle'"
                        >
                            <template #button>
                                <LskBaseMenu
                                    :activatorId="cid + 'InvoiceLineMenuActivator'"
                                >
                                    <LskBaseMenuItem
                                        @click.native="addInvoiceLine"
                                        :cid="cid + 'AddInvoiceLineMenuItem'"
                                        text="Add new invoice line"
                                    />
                                </LskBaseMenu>
                            </template>
                            {{ "Invoice lines" | trans }}
                        </LskBaseToolbar>
                    </template>
                    <LskBaseTable
                        :actions="actions"
                        :cid="cid + 'InvoiceLineTable'"
                        :disable-pagination="true"
                        :disable-sort="true"
                        :headings="headings"
                        :hide-default-footer="true"
                        :tableData="invoiceLineData"
                    >
                        <template #bodyAppend>
                            <tr class="grey--text text--darken-2 font-weight-bold">
                                <td></td>
                                <td>{{ "TOTAL" | trans }}</td>
                                <td>{{ amountSum | centsToEuros }}</td>
                                <td></td>
                                <td>{{ vatAmountSum | centsToEuros }}</td>
                                <td>{{ totalAmountSum | centsToEuros }}</td>
                                <td></td>
                            </tr>
                        </template>
                    </LskBaseTable>
                </LskBaseCard>
            </v-col>
        </v-row>

        <LskBaseError v-if="errorMessage">
            {{ errorMessage }}
        </LskBaseError>

        <LskDialogEditInvoice
            :cid="cid + 'EditInvoiceDialog'"
            :currentData="rawData"
            :id="id"
            :key="keyEditInvoice"
            v-model="showEditInvoice"
        />
        <LskDialogEditInvoiceBiller
            :cid="cid + 'EditInvoiceBillerDialog'"
            :currentData="rawData"
            :id="id"
            :key="keyEditInvoiceBiller"
            v-model="showEditInvoiceBiller"
        />
        <LskDialogEditInvoiceCustomer
            :cid="cid + 'EditInvoiceCustomerDialog'"
            :currentData="rawData"
            :id="id"
            :key="keyEditInvoiceCustomer"
            v-model="showEditInvoiceCustomer"
        />
        <LskDialogAddOrEditInvoiceLine
            :cid="cid + 'AddInvoiceLineDialog'"
            :invoiceId="id"
            :key="keyAddInvoiceLine"
            v-model="showAddInvoiceLine"
        />
        <LskDialogAddOrEditInvoiceLine
            :cid="cid + 'EditInvoiceLineDialog'"
            :currentData="selectedInvoiceLineData"
            :id="selectedInvoiceLineId"
            :invoiceId="id"
            :key="keyEditInvoiceLine"
            v-model="showEditInvoiceLine"
        />
        <LskDialogDelete
            :cid="cid + 'DeleteInvoiceLineDialog'"
            :id="selectedInvoiceLineId"
            :key="keyDeleteInvoiceLine"
            apiActionName="invoiceLineDestroy"
            checkboxLabel="Yes, delete invoice line"
            title="Delete invoice line"
            v-model="showDeleteInvoiceLine"
        />
    </div>
</template>

<script>
import lsk_api from "@/plugins/lsk_api";

export default {
    name: "LskPageShowInvoice",

    props: {
        id: { type: [String, Number], required: true },
    },

    data() {
        return {
            cid: "invoiceShowPage",
            actions: [
                {
                    title: "Edit",
                    iconName: "mdi-pencil",
                    clickFunction: this.editInvoiceLine,
                },
                {
                    title: "Delete",
                    iconName: "mdi-delete",
                    clickFunction: this.deleteInvoiceLine,
                },
            ],
            headings: {
                id: "Id",
                description: "Description",
                amount: "Amount",
                vat_percent: "VAT percent",
                vat_amount: "VAT amount",
                total_amount: "Total amount",
            },
            selectedInvoiceLineId: null,
            selectedInvoiceLineData: null,

            apiActionName: "invoiceShow",
            rawData: {},
            invoiceDataOne: null,
            invoiceDataTwo: null,
            billerData: null,
            customerData: null,
            invoiceLineData: null,
            amountSum: 0,
            vatAmountSum: 0,
            totalAmountSum: 0,

            counterEditInvoice: 0,
            counterEditInvoiceBiller: 0,
            counterEditInvoiceCustomer: 0,
            counterAddInvoiceLine: 0,
            counterEditInvoiceLine: 0,
            counterDeleteInvoiceLine: 0,

            showEditInvoice: false,
            showEditInvoiceBiller: false,
            showEditInvoiceCustomer: false,
            showAddInvoiceLine: false,
            showEditInvoiceLine: false,
            showDeleteInvoiceLine: false,

            errorMessage: null,
        };
    },

    computed: {
        keyEditInvoice() {
            return "edit_invoice_" + this.counterEditInvoice;
        },

        keyEditInvoiceBiller() {
            return "edit_invoice_biller_" + this.counterEditInvoiceBiller;
        },

        keyEditInvoiceCustomer() {
            return "edit_invoice_customer_" + this.counterEditInvoiceCustomer;
        },

        keyAddInvoiceLine() {
            return "add_invoice_line_" + this.counterAddInvoiceLine;
        },

        keyEditInvoiceLine() {
            return "edit_invoice_line_" + this.counterEditInvoiceLine;
        },

        keyDeleteInvoiceLine() {
            return "delete_invoice_line_" + this.counterDeleteInvoiceLine;
        },
    },

    watch: {
        showEditInvoice(value) {
            if (!value) this.queryApi();
        },

        showEditInvoiceBiller(value) {
            if (!value) this.queryApi();
        },

        showEditInvoiceCustomer(value) {
            if (!value) this.queryApi();
        },

        showAddInvoiceLine(value) {
            if (!value) this.queryApi();
        },

        showEditInvoiceLine(value) {
            if (!value) this.queryApi();
        },

        showDeleteInvoiceLine(value) {
            if (!value) this.queryApi();
        },
    },

    mounted() {
        this.queryApi();
    },

    methods: {
        editInvoice() {
            this.counterEditInvoice++;
            this.showEditInvoice = true;
        },

        editInvoiceBiller() {
            this.counterEditInvoiceBiller++;
            this.showEditInvoiceBiller = true;
        },

        editInvoiceCustomer() {
            this.counterEditInvoiceCustomer++;
            this.showEditInvoiceCustomer = true;
        },

        addInvoiceLine() {
            this.counterAddInvoiceLine++;
            this.showAddInvoiceLine = true;
        },

        editInvoiceLine(item) {
            this.selectedInvoiceLineId = item.id;
            this.selectedInvoiceLineData = this.getInvoiceLineData(item.id);
            this.counterEditInvoiceLine++;
            this.showEditInvoiceLine = true;
        },

        deleteInvoiceLine(item) {
            this.selectedInvoiceLineId = item.id;
            this.counterDeleteInvoiceLine++;
            this.showDeleteInvoiceLine = true;
        },

        getInvoiceLineData(invoiceLineId) {
            let result = this.invoiceLineData.filter(
                (data) => data.id === invoiceLineId
            );
            return result[0];
        },

        queryApi() {
            lsk_api
                .query(this.apiActionName, this.id, null)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse(data) {
            this.rawData = data;
            this.invoiceDataOne = {
                id: { text: "Invoice id", value: data.id },
                invoice_date: {
                    text: "Invoice date",
                    value: this.formatDate(data.invoice_date, "D.M.YYYY"),
                },
                due_date: {
                    text: "Due date",
                    value: this.formatDate(data.due_date, "D.M.YYYY"),
                },
            };
            this.invoiceDataTwo = {
                invoice_number: {
                    text: "Invoice number",
                    value: data.invoice_number,
                },
                reference_number: {
                    text: "Reference number",
                    value: data.formatted_reference_number,
                },
                total_amount_sum: {
                    text: "Total amount",
                    value: this.centsToEuros(data.total_amount_sum),
                },
                created_at: {
                    text: "Created",
                    value: this.formatDate(
                        data.created_at,
                        "D.M.YYYY HH:mm:ss"
                    ),
                },
                updated_at: {
                    text: "Updated",
                    value: this.formatDate(
                        data.updated_at,
                        "D.M.YYYY HH:mm:ss"
                    ),
                },
            };
            this.billerData = {
                biller_name: { text: "Name", value: data.biller_name },
                biller_address_line_one: {
                    text: "Address line 1",
                    value: data.biller_address_line_one,
                },
                biller_address_line_two: {
                    text: "Address line 2",
                    value: data.biller_address_line_two,
                },
                biller_email: { text: "Email", value: data.biller_email },
                biller_phone_number: {
                    text: "Phone number",
                    value: data.biller_phone_number,
                },
                biller_business_identity_code: {
                    text: "Business identity code",
                    value: data.biller_business_identity_code,
                },
                biller_bank_name: {
                    text: "Bank name",
                    value: data.biller_bank_name,
                },
                biller_bank_iban: {
                    text: "Bank iban",
                    value: data.biller_bank_iban,
                },
                biller_bank_bic: {
                    text: "Bank bic",
                    value: data.biller_bank_bic,
                },
                biller_pdf_title: {
                    text: "Pdf title",
                    value: data.biller_pdf_title,
                },
                biller_pdf_author: {
                    text: "Pdf author",
                    value: data.biller_pdf_author,
                },
            };
            this.customerData = {
                customer_name: { text: "Name", value: data.customer_name },
                customer_address_line_one: {
                    text: "Address line 1",
                    value: data.customer_address_line_one,
                },
                customer_address_line_two: {
                    text: "Address line 2",
                    value: data.customer_address_line_two,
                },
            };
            this.invoiceLineData = data.invoice_lines;
            this.amountSum = data.amount_sum;
            this.vatAmountSum = data.vat_amount_sum;
            this.totalAmountSum = data.total_amount_sum;
            this.errorMessage = null;
        },

        parseError(data) {
            this.rawData = {};
            this.invoiceDataOne = null;
            this.invoiceDataTwo = null;
            this.billerData = null;
            this.customerData = null;
            this.invoiceLineData = null;
            this.amountSum = 0;
            this.vatAmountSum = 0;
            this.totalAmountSum = 0;
            this.errorMessage = data.message || "Failed to get data";
        },

        downloadPdf() {
            lsk_api
                .query("pdfInvoiceFetch", this.id, null)
                .then((response) => this.parsePdfResponse(response))
                .catch(() => this.parsePdfError());
        },

        parsePdfResponse(response) {
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(new Blob([response.data]));
            a.download = response.headers["x-pdf-filename"] || "invoice.pdf";
            a.type = "application/pdf";
            document.body.appendChild(a);
            a.click();
        },

        parsePdfError() {
            console.log("Failed to download pdf"); // eslint-disable-line
        },
    },
};
</script>
