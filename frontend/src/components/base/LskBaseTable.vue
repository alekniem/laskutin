<template>
    <v-data-table
        :headers="headers"
        :id="cid"
        :items="items"
        :items-per-page="10"
        dense
        sort-by="id"
        sort-desc
        v-bind="$attrs"
    >
        <template #[`body.append`]>
            <slot name="bodyAppend" />
        </template>
        <template #[`item.actions`]="{ item }">
            <LskBaseIcon
                v-for="(action, key) in actions"
                :clickFunction="action.clickFunction"
                :cssClass="key + 1 < actions.length ? 'mr-3' : ''"
                :iconName="action.iconName"
                :key="key"
                :parameter="item"
                :title="action.title"
            />
        </template>
        <template #[`item.amount`]="{ item }">
            {{ item.amount | centsToEuros }}
        </template>
        <template #[`item.due_date`]="{ item }">
            {{ item.due_date | formatDate("D.M.YYYY") }}
        </template>
        <template #[`item.invoice_date`]="{ item }">
            {{ item.invoice_date | formatDate("D.M.YYYY") }}
        </template>
        <template #[`item.total_amount`]="{ item }">
            {{ item.total_amount | centsToEuros }}
        </template>
        <template #[`item.total_amount_sum`]="{ item }">
            {{ item.total_amount_sum | centsToEuros }}
        </template>
        <template #[`item.vat_amount`]="{ item }">
            {{ item.vat_amount | centsToEuros }}
        </template>
        <template #no-data>
            <LskBaseError v-if="errorMessage">
                {{ errorMessage | trans }}
            </LskBaseError>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: "LskBaseTable",

    props: {
        actions: { type: Array, required: false, default: () => [] },
        cid: { type: String, required: true },
        errorMessage: { type: String, required: false },
        headings: { type: Object, required: true },
        tableData: { type: Array, required: true },
    },

    computed: {
        headers() {
            let result = [];
            Object.keys(this.headings).forEach((key) => {
                result.push({
                    class: "blue--text text--darken-2",
                    text: this.trans(this.headings[key]),
                    value: key,
                });
            });
            if (this.actions.length) {
                result.push({
                    class: "blue--text text--darken-2",
                    sortable: false,
                    text: this.trans("Actions"),
                    value: "actions",
                });
            }
            return result;
        },

        items() {
            return this.tableData.map((data) => {
                let result = Object.assign({}, data);
                if (this.actions.length) {
                    result.actions = "";
                }
                return result;
            });
        },
    },
};
</script>
