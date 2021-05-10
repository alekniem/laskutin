<template>
    <div>
        <v-row v-if="billerData">
            <v-col cols="12" xs="12" sm="8" md="7" lg="4">
                <LskBaseCard>
                    <template #header>
                        <LskBaseToolbar :titleId="cid + 'Title'">
                            <template #button>
                                <LskBaseMenu :activatorId="cid + 'MenuActivator'">
                                    <LskBaseMenuItem
                                        @click.native="editBiller"
                                        :cid="cid + 'EditBillerMenuItem'"
                                        text="Edit biller"
                                    />
                                </LskBaseMenu>
                            </template>
                            {{ "Biller information" | trans }}
                        </LskBaseToolbar>
                    </template>
                    <LskBaseList :cid="cid + 'List'">
                        <LskBaseListItem
                            v-for="(itemData, itemId) in billerData"
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

        <LskDialogAddOrEditBiller
            :cid="cid + 'EditBillerDialog'"
            :currentData="rawData"
            :id="id"
            :key="keyEditBiller"
            v-model="showEditBiller"
        />
    </div>
</template>

<script>
import lsk_api from "@/plugins/lsk_api";

export default {
    name: "LskPageShowBiller",

    props: {
        id: { type: [String, Number], required: true },
    },

    data() {
        return {
            apiActionName: "billerShow",
            cid: "billerShowPage",
            billerData: null,
            errorMessage: null,
            rawData: {},

            counterEditBiller: 0,
            showEditBiller: false,
        };
    },

    computed: {
        keyEditBiller() {
            return "edit_biller_" + this.counterEditBiller;
        },
    },

    watch: {
        showEditBiller(value) {
            if (!value) this.queryApi();
        },
    },

    mounted() {
        this.queryApi();
    },

    methods: {
        editBiller() {
            this.counterEditBiller++;
            this.showEditBiller = true;
        },

        queryApi() {
            lsk_api
                .query(this.apiActionName, this.id, null)
                .then((response) => this.parseResponse(response.data))
                .catch((error) => this.parseError(error.response.data));
        },

        parseResponse(data) {
            this.rawData = data;

            this.billerData = {
                id: { text: "Biller id", value: data.id },
                name: { text: "Name", value: data.name },
                address_line_one: {
                    text: "Address line 1",
                    value: data.address_line_one,
                },
                address_line_two: {
                    text: "Address line 2",
                    value: data.address_line_two,
                },
                email: { text: "Email", value: data.email },
                phone_number: {
                    text: "Phone number",
                    value: data.phone_number,
                },
                business_identity_code: {
                    text: "Business identity code",
                    value: data.business_identity_code,
                },
                bank_name: { text: "Bank name", value: data.bank_name },
                bank_iban: { text: "Bank iban", value: data.bank_iban },
                bank_bic: { text: "Bank bic", value: data.bank_bic },
                pdf_title: { text: "Pdf title", value: data.pdf_title },
                pdf_author: { text: "Pdf author", value: data.pdf_author },
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
            this.billerData = null;
            this.errorMessage = data.message || "Failed to get data";
        },
    },
};
</script>
