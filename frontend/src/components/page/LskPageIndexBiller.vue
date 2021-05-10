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
                                    :cid="cid + 'AddBillerMenuItem'"
                                    text="Add new biller"
                                />
                            </LskBaseMenu>
                        </template>
                        {{ "Billers" | trans }}
                    </LskBaseToolbar>
                </template>
                <LskBaseTable
                    :actions="actions"
                    :cid="cid + 'Table'"
                    :errorMessage="errorMessage"
                    :headings="headings"
                    :tableData="tableData"
                />
                <LskDialogAddOrEditBiller
                    :cid="cid + 'AddBillerDialog'"
                    :key="keyAddDialog"
                    v-model="showAddDialog"
                />
                <LskDialogDelete
                    :cid="cid + 'DeleteBillerDialog'"
                    :id="selectedId"
                    :key="keyDeleteDialog"
                    apiActionName="billerDestroy"
                    checkboxLabel="Yes, delete biller"
                    title="Delete biller"
                    v-model="showDeleteDialog"
                />
            </LskBaseCard>
        </v-col>
    </v-row>
</template>

<script>
import LskIndex from "@/mixins/LskIndex";

export default {
    name: "LskPageIndexBiller",

    mixins: [LskIndex],

    data() {
        return {
            apiActionName: "billerIndex",
            cid: "billerIndexPage",
            headings: {
                id: "Biller id",
                name: "Name",
                address_line_one: "Address line 1",
                address_line_two: "Address line 2",
                email: "Email",
                phone_number: "Phone number",
            },
            showItemRouteName: "showBiller",
        };
    },
};
</script>
