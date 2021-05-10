<template>
    <div>
        <v-row v-if="customerData">
            <v-col cols="12" xs="12" sm="8" md="7" lg="4">
                <LskBaseCard>
                    <template #header>
                        <LskBaseToolbar :titleId="cid + 'Title'">
                            <template #button>
                                <LskBaseMenu :activatorId="cid + 'MenuActivator'">
                                    <LskBaseMenuItem
                                        @click.native="editCustomer"
                                        :cid="cid + 'EditCustomerMenuItem'"
                                        text="Edit customer"
                                    />
                                </LskBaseMenu>
                            </template>
                            {{ "Customer information" | trans }}
                        </LskBaseToolbar>
                    </template>
                    <LskBaseList :cid="cid + 'List'">
                        <LskBaseListItem
                            v-for="(itemData, itemId) in customerData"
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

        <LskBaseError v-if="errorMessage">
            {{ errorMessage }}
        </LskBaseError>

        <LskDialogAddOrEditCustomer
            :cid="cid + 'EditCustomerDialog'"
            :currentData="rawData"
            :id="id"
            :key="keyEditCustomer"
            v-model="showEditCustomer"
        />
    </div>
</template>

<script>
import lsk_api from "@/plugins/lsk_api";

export default {
    name: "LskPageShowCustomer",

    props: {
        id: { type: [String, Number], required: true },
    },

    data() {
        return {
            apiActionName: "customerShow",
            cid: "customerShowPage",
            customerData: null,
            errorMessage: null,
            rawData: {},

            counterEditCustomer: 0,
            showEditCustomer: false,
        };
    },

    computed: {
        keyEditCustomer() {
            return "edit_customer_" + this.counterEditCustomer;
        },
    },

    watch: {
        showEditCustomer(value) {
            if (!value) this.queryApi();
        },
    },

    mounted() {
        this.queryApi();
    },

    methods: {
        editCustomer() {
            this.counterEditCustomer++;
            this.showEditCustomer = true;
        },

        queryApi() {
            lsk_api
                .query(this.apiActionName, this.id, null)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse(data) {
            this.rawData = data;

            this.customerData = {
                id: { text: "Customer id", value: data.id },
                name: { text: "Name", value: data.name },
                address_line_one: {
                    text: "Address line 1",
                    value: data.address_line_one,
                },
                address_line_two: {
                    text: "Address line 2",
                    value: data.address_line_two,
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

            this.errorMessage = null;
        },

        parseError(data) {
            this.rawData = {};
            this.customerData = null;
            this.errorMessage = data.message || "Failed to get data";
        },
    },
};
</script>
