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
                                    :cid="cid + 'AddCustomerMenuItem'"
                                    text="Add new customer"
                                />
                            </LskBaseMenu>
                        </template>
                        {{ "Customers" | trans }}
                    </LskBaseToolbar>
                </template>
                <LskBaseTable
                    :actions="actions"
                    :cid="cid + 'Table'"
                    :errorMessage="errorMessage"
                    :headings="headings"
                    :tableData="tableData"
                />
                <LskDialogAddOrEditCustomer
                    :cid="cid + 'AddCustomerDialog'"
                    :key="keyAddDialog"
                    v-model="showAddDialog"
                />
                <LskDialogDelete
                    :cid="cid + 'DeleteCustomerDialog'"
                    :id="selectedId"
                    :key="keyDeleteDialog"
                    apiActionName="customerDestroy"
                    checkboxLabel="Yes, delete customer"
                    title="Delete customer"
                    v-model="showDeleteDialog"
                />
            </LskBaseCard>
        </v-col>
    </v-row>
</template>

<script>
import LskIndex from "@/mixins/LskIndex";

export default {
    name: "LskPageIndexCustomer",

    mixins: [LskIndex],

    data() {
        return {
            apiActionName: "customerIndex",
            cid: "customerIndexPage",
            headings: {
                id: "Customer id",
                name: "Name",
                address_line_one: "Address line 1",
                address_line_two: "Address line 2",
            },
            showItemRouteName: "showCustomer",
        };
    },
};
</script>
