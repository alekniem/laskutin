<template>
    <v-row>
        <v-col cols="12">
            <LskBaseCard>
                <template #header>
                    <LskBaseToolbar :titleId="cid + 'Title'">
                        <template #button>
                            <LskBaseMenu :activatorId="cid + 'MenuActivator'">
                                <LskBaseMenuItem
                                    @click.native="addItem"
                                    :cid="cid + 'AddInvoiceMenuItem'"
                                    text="Add new invoice"
                                />
                            </LskBaseMenu>
                        </template>
                        {{ "Invoices" | trans }}
                    </LskBaseToolbar>
                </template>
                <LskBaseTable
                    :actions="actions"
                    :cid="cid + 'Table'"
                    :errorMessage="errorMessage"
                    :headings="headings"
                    :tableData="tableData"
                />
                <LskDialogAddInvoice
                    :cid="cid + 'AddInvoiceDialog'"
                    :key="keyAddDialog"
                    v-model="showAddDialog"
                />
                <LskDialogDelete
                    :cid="cid + 'DeleteInvoiceDialog'"
                    :id="selectedId"
                    :key="keyDeleteDialog"
                    apiActionName="invoiceDestroy"
                    checkboxLabel="Yes, delete invoice"
                    title="Delete invoice"
                    v-model="showDeleteDialog"
                />
            </LskBaseCard>
        </v-col>
    </v-row>
</template>

<script>
import LskIndex from "@/mixins/LskIndex";

export default {
    name: "LskPageIndexInvoice",

    mixins: [LskIndex],

    data() {
        return {
            apiActionName: "invoiceIndex",
            cid: "invoiceIndexPage",
            headings: {
                id: "Invoice id",
                invoice_date: "Invoice date",
                due_date: "Due date",
                customer_name: "Customer",
                biller_name: "Biller",
                invoice_number: "Invoice number",
                formatted_reference_number: "Reference number",
                total_amount_sum: "Total amount",
            },
            showItemRouteName: "showInvoice",
        };
    },
};
</script>
